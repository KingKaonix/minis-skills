#!/usr/bin/env node
/**
 * Convert the clawskills catalog in skills.json into Minis/OpenMinis skill
 * packages (SKILL.md + SOURCE.md) and self-hosted .zip downloads.
 *
 * Resumable: raw markdown is cached under .cache/skill-markdown/<dir>.md.
 * Successful cached files are never re-fetched.
 *
 * Usage:
 *   node scripts/convert-skills.mjs [options]
 *
 * Options:
 *   --limit N          Only process the first N selected skills (test batch).
 *   --concurrency N    Parallel fetches (default 6, max 16).
 *   --retry-failed     Only retry skills listed as failed in conversion-report.json.
 *   --skip-zips        Do not (re)generate public/downloads/*.zip.
 *   --only <slug>      Process a single skill by directory/id.
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SKILLS_JSON = path.join(ROOT, 'skills.json');
const SKILLS_DIR = path.join(ROOT, 'skills');
const PUBLIC_SKILLS_DIR = path.join(ROOT, 'public', 'skills');
const DOWNLOADS_DIR = path.join(ROOT, 'public', 'downloads');
const CACHE_DIR = path.join(ROOT, '.cache', 'skill-markdown');
const META_DIR = path.join(ROOT, '.cache', 'skill-meta');
const INDEX_PATH = path.join(ROOT, 'public', 'skills-index.json');
const REPORT_PATH = path.join(ROOT, 'conversion-report.json');

const USER_AGENT = 'minis-skills-converter/1.0';
const REQUEST_TIMEOUT_MS = 45_000;
const MAX_ATTEMPTS = 4;
const MAX_CONCURRENCY = 16;

// ---------------------------------------------------------------------------
// Small utilities
// ---------------------------------------------------------------------------

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseArgs(argv) {
  const opts = {
    limit: null,
    concurrency: 6,
    retryFailed: false,
    skipZips: false,
    only: null,
  };

  const readValue = (arg, name, i) => {
    if (arg.includes('=')) return arg.slice(arg.indexOf('=') + 1);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      throw new Error(`Missing value for ${name}`);
    }
    return next;
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0]);
      process.exit(0);
    } else if (arg === '--limit' || arg.startsWith('--limit=')) {
      opts.limit = Number(readValue(arg, '--limit', i));
      if (!arg.includes('=')) i++;
    } else if (arg === '--concurrency' || arg.startsWith('--concurrency=')) {
      opts.concurrency = Number(readValue(arg, '--concurrency', i));
      if (!arg.includes('=')) i++;
    } else if (arg === '--retry-failed') {
      opts.retryFailed = true;
    } else if (arg === '--skip-zips') {
      opts.skipZips = true;
    } else if (arg === '--only' || arg.startsWith('--only=')) {
      opts.only = readValue(arg, '--only', i);
      if (!arg.includes('=')) i++;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (opts.limit !== null && (!Number.isInteger(opts.limit) || opts.limit < 0)) {
    throw new Error('--limit must be a non-negative integer');
  }
  if (!Number.isInteger(opts.concurrency) || opts.concurrency < 1) {
    throw new Error('--concurrency must be a positive integer');
  }
  opts.concurrency = Math.min(opts.concurrency, MAX_CONCURRENCY);
  return opts;
}

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function writeFileAtomic(file, content) {
  await ensureDir(path.dirname(file));
  const tmp = `${file}.tmp-${process.pid}-${Math.random().toString(36).slice(2)}`;
  await fsp.writeFile(tmp, content, 'utf8');
  await fsp.rename(tmp, file);
}

async function fileExists(file) {
  try {
    const st = await fsp.stat(file);
    return st.isFile() && st.size > 0;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// HTTP fetching with retries / polite backoff
// ---------------------------------------------------------------------------

let cooldownUntil = 0;
const stats = {
  requests: 0,
  retries: 0,
  rateLimited: 0,
};

async function waitForCooldown() {
  const wait = cooldownUntil - Date.now();
  if (wait > 0) await sleep(wait);
}

function backoffMs(attempt) {
  const base = Math.min(15_000, 750 * 2 ** (attempt - 1));
  return base + Math.floor(Math.random() * 300);
}

async function fetchWithRetry(url, { timeout = REQUEST_TIMEOUT_MS, maxAttempts = MAX_ATTEMPTS } = {}) {
  let lastReason = 'unknown error';

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await waitForCooldown();
    let res;
    try {
      stats.requests++;
      res = await fetch(url, {
        headers: {
          'user-agent': USER_AGENT,
          accept: 'text/markdown, text/plain;q=0.9, text/html;q=0.8, */*;q=0.5',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(timeout),
      });
    } catch (err) {
      const isTimeout = err?.name === 'TimeoutError' || err?.name === 'AbortError';
      lastReason = isTimeout ? `timeout after ${timeout}ms` : `network error: ${err?.message || err}`;
      if (attempt < maxAttempts) {
        stats.retries++;
        await sleep(backoffMs(attempt));
        continue;
      }
      break;
    }

    if (res.ok) {
      try {
        const text = await res.text();
        return { ok: true, status: res.status, text, url: res.url || url };
      } catch (err) {
        lastReason = `body read error: ${err?.message || err}`;
        if (attempt < maxAttempts) {
          stats.retries++;
          await sleep(backoffMs(attempt));
          continue;
        }
        break;
      }
    }

    lastReason = `HTTP ${res.status}`;
    if (res.status === 429 || res.status >= 500) {
      if (res.status === 429) stats.rateLimited++;
      // Ask every worker to pause for a moment when we get throttled.
      if (res.status === 429) {
        cooldownUntil = Math.max(cooldownUntil, Date.now() + Math.min(30_000, 2_000 * attempt));
      }
      if (attempt < maxAttempts) {
        let wait = backoffMs(attempt);
        const retryAfter = res.headers.get('retry-after');
        if (retryAfter) {
          const seconds = Number(retryAfter);
          if (Number.isFinite(seconds)) wait = Math.min(30_000, seconds * 1000);
        }
        stats.retries++;
        await sleep(wait);
        continue;
      }
    } else {
      // 4xx other than 429: retrying will not help.
      return { ok: false, status: res.status, reason: lastReason, url };
    }
  }

  return { ok: false, reason: lastReason, url };
}

// ---------------------------------------------------------------------------
// Source URL -> candidate markdown/page URLs
// ---------------------------------------------------------------------------

function buildCandidates(entry) {
  const candidates = [];
  const seen = new Set();
  const push = (kind, url) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    candidates.push({ kind, url });
  };

  let url;
  try {
    url = new URL(entry.source);
  } catch {
    return candidates;
  }

  const host = url.hostname.replace(/^www\./, '');
  const parts = url.pathname.split('/').filter(Boolean);
  const dir = entry.directory;

  let slug = '';
  if (host === 'clawskills.sh' && parts[0] === 'skills') {
    slug = parts.slice(1).join('/');
  }

  let author = null;
  if (slug && slug.endsWith(`-${dir}`)) {
    author = slug.slice(0, -(dir.length + 1));
  }

  // clawhub URLs: /<author>/skills/<dir> or /skills/<dir>
  if (!author && host === 'clawhub.ai') {
    const i = parts.indexOf('skills');
    if (i >= 0 && parts[i + 1]) author = parts[i + 1];
    else if (parts.length >= 2) author = parts[parts.length - 2];
  }

  // github.com/openclaw/skills/tree/main/skills/<author>/<dir>
  if (!author && host === 'github.com') {
    const i = parts.lastIndexOf('skills');
    if (i >= 0 && parts[i + 1]) author = parts[i + 1];
  }

  const encodePath = (p) => p.split('/').map(encodeURIComponent).join('/');

  if (author) {
    push('markdown', `https://clawskills.sh/skills-markdown/${encodeURIComponent(author)}/${encodeURIComponent(dir)}.md`);
  }

  // Page fallback: scrape localMarkdownPath from the skill page.
  if (host === 'clawskills.sh') {
    const pageSlug = slug || (author ? `${author}-${dir}` : null);
    if (pageSlug) push('clawskills-page', `https://clawskills.sh/skills/${encodePath(pageSlug)}`);
    // Many skills that were removed from clawskills are still mirrored on
    // clawhub; the page embeds the full markdown. Try it as a last resort.
    if (author) push('clawhub-page', `https://clawhub.ai/${encodeURIComponent(author)}/skills/${encodeURIComponent(dir)}`);
  } else if (author) {
    push('clawskills-page', `https://clawskills.sh/skills/${encodeURIComponent(`${author}-${dir}`)}`);
  }

  // clawhub fallback: the page embeds the full readme in its hydration data.
  if (host === 'clawhub.ai') {
    if (author) push('clawhub-page', `https://clawhub.ai/${encodeURIComponent(author)}/skills/${encodeURIComponent(dir)}`);
    push('clawhub-page', entry.source);
  }

  return candidates;
}

function isMarkdown(text) {
  if (!text || text.trim().length < 10) return false;
  const t = text.trimStart();
  if (/^<!doctype html/i.test(t) || /^<html[\s>]/i.test(t)) return false;
  if (/^<head[\s>]/i.test(t)) return false;
  return true;
}

function extractLocalMarkdownPath(html) {
  const m =
    html.match(/localMarkdownPath\s*:\s*"([^"]+)"/) ||
    html.match(/localMarkdownPath\s*:\s*'([^']+)'/) ||
    html.match(/"localMarkdownPath"\s*:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

/** Extract a double-quoted JS string literal following `key:` and decode it. */
function extractJsString(text, key) {
  let markerIndex = text.indexOf(`${key}:"`);
  let quoteStart;
  if (markerIndex >= 0) {
    quoteStart = markerIndex + key.length + 1;
  } else {
    const re = new RegExp(`${key}\\s*:\\s*"`);
    const m = re.exec(text);
    if (!m) return null;
    quoteStart = m.index + m[0].length - 1;
  }

  let end = quoteStart + 1;
  let escaped = false;
  for (; end < text.length; end++) {
    const c = text[end];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (c === '\\') {
      escaped = true;
      continue;
    }
    if (c === '"') break;
  }
  if (end >= text.length) return null;
  return decodeJsString(text.slice(quoteStart, end + 1));
}

function decodeJsString(literal) {
  let s = literal;
  if (s.startsWith('"')) s = s.slice(1);
  if (s.endsWith('"')) s = s.slice(0, -1);

  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c !== '\\') {
      out += c;
      continue;
    }
    const n = s[++i];
    if (n === undefined) {
      out += '\\';
      break;
    }
    switch (n) {
      case 'n': out += '\n'; break;
      case 'r': out += '\r'; break;
      case 't': out += '\t'; break;
      case 'b': out += '\b'; break;
      case 'f': out += '\f'; break;
      case 'v': out += '\v'; break;
      case '0': out += '\0'; break;
      case '\n': break; // line continuation
      case 'x': {
        const hex = s.slice(i + 1, i + 3);
        if (/^[0-9a-f]{2}$/i.test(hex)) {
          out += String.fromCharCode(parseInt(hex, 16));
          i += 2;
        } else {
          out += 'x';
        }
        break;
      }
      case 'u': {
        if (s[i + 1] === '{') {
          const close = s.indexOf('}', i + 2);
          const hex = close > i ? s.slice(i + 2, close) : '';
          if (/^[0-9a-f]+$/i.test(hex)) {
            out += String.fromCodePoint(parseInt(hex, 16));
            i = close;
          } else {
            out += 'u';
          }
        } else {
          const hex = s.slice(i + 1, i + 5);
          if (/^[0-9a-f]{4}$/i.test(hex)) {
            out += String.fromCharCode(parseInt(hex, 16));
            i += 4;
          } else {
            out += 'u';
          }
        }
        break;
      }
      default:
        // Unknown escape: drop the backslash, keep the character.
        out += n;
    }
  }
  return out;
}

async function fetchMarkdown(entry) {
  const candidates = buildCandidates(entry);
  const errors = [];

  if (candidates.length === 0) {
    return { ok: false, reason: `could not derive a fetch URL from source: ${entry.source}` };
  }

  for (const candidate of candidates) {
    if (candidate.kind === 'markdown') {
      const res = await fetchWithRetry(candidate.url);
      if (res.ok && isMarkdown(res.text)) {
        return { ok: true, markdown: res.text, markdownUrl: res.url || candidate.url };
      }
      errors.push(`${candidate.url} -> ${res.ok ? 'response was not markdown' : res.reason}`);
    } else if (candidate.kind === 'clawskills-page') {
      const page = await fetchWithRetry(candidate.url);
      if (!page.ok) {
        errors.push(`${candidate.url} -> ${page.reason}`);
        continue;
      }
      const markdownPath = extractLocalMarkdownPath(page.text);
      const rawSkillMdUrl = extractJsString(page.text, 'rawSkillMdUrl');
      const markdownUrls = [];
      if (markdownPath) {
        try {
          markdownUrls.push(new URL(markdownPath, 'https://clawskills.sh').href);
        } catch {
          errors.push(`${candidate.url} -> invalid localMarkdownPath: ${markdownPath}`);
        }
      }
      if (rawSkillMdUrl && /^https?:\/\//.test(rawSkillMdUrl)) {
        markdownUrls.push(rawSkillMdUrl);
      }
      if (markdownUrls.length === 0) {
        errors.push(`${candidate.url} -> localMarkdownPath/rawSkillMdUrl not found`);
        continue;
      }
      for (const markdownUrl of [...new Set(markdownUrls)]) {
        const md = await fetchWithRetry(markdownUrl);
        if (md.ok && isMarkdown(md.text)) {
          return { ok: true, markdown: md.text, markdownUrl: md.url || markdownUrl };
        }
        errors.push(`${markdownUrl} -> ${md.ok ? 'response was not markdown' : md.reason}`);
      }
    } else if (candidate.kind === 'clawhub-page') {
      const page = await fetchWithRetry(candidate.url);
      if (!page.ok) {
        errors.push(`${candidate.url} -> ${page.reason}`);
        continue;
      }
      let markdown = extractJsString(page.text, 'readme');
      if (!markdown || !isMarkdown(markdown)) {
        const snippet = extractJsString(page.text, 'codeSnippet');
        if (snippet && snippet.trimStart().startsWith('---') && isMarkdown(snippet)) {
          markdown = snippet;
        }
      }
      if (markdown && isMarkdown(markdown)) {
        return { ok: true, markdown, markdownUrl: page.url || candidate.url };
      }
      errors.push(`${candidate.url} -> readme content not found`);
    }
  }

  return { ok: false, reason: errors.join('; ') || 'no usable source found' };
}

// ---------------------------------------------------------------------------
// Frontmatter normalization
// ---------------------------------------------------------------------------

function splitFrontmatter(text) {
  const normalized = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const m = normalized.match(/^\s*---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);
  if (!m) return { frontmatter: null, body: normalized };
  return {
    frontmatter: m[1],
    body: normalized.slice(m[0].length),
  };
}

function findTopLevelKeys(lines) {
  const keys = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([A-Za-z0-9_.-]+)[ \t]*:(.*)$/);
    if (m) keys.push({ key: m[1], start: i, value: m[2] });
  }
  for (let i = 0; i < keys.length; i++) {
    keys[i].end = i + 1 < keys.length ? keys[i + 1].start : lines.length;
  }
  return keys;
}

function blockHasContent(lines, key) {
  for (let i = key.start + 1; i < key.end; i++) {
    if (lines[i].trim()) return true;
  }
  return false;
}

function detectChildIndent(lines, key) {
  for (let i = key.start + 1; i < key.end; i++) {
    const m = lines[i].match(/^([ \t]+)\S/);
    if (m) return m[1].length;
  }
  return 2;
}

function findChildBlock(lines, key, indent, childKey) {
  const prefix = ' '.repeat(indent);
  for (let i = key.start + 1; i < key.end; i++) {
    const m = lines[i].match(/^([ \t]+)([A-Za-z0-9_.-]+)[ \t]*:/);
    if (!m) continue;
    if (m[1].length === indent && m[2] === childKey) {
      let end = i + 1;
      while (end < key.end) {
        if (lines[end].trim() && /^([ \t]+)/.exec(lines[end])?.[1].length <= indent) break;
        end++;
      }
      return { start: i, end };
    }
  }
  return null;
}

function yamlObjectLines(obj, indent) {
  const pad = ' '.repeat(indent);
  return Object.entries(obj).map(([k, v]) => `${pad}${k}: ${JSON.stringify(v)}`);
}

function descriptionIsEmpty(key, lines) {
  if (!key) return true;
  const value = key.value.trim();
  if (value === '') return !blockHasContent(lines, key);
  if (/^(?:""|''|null|~|\[\]|\{\})$/i.test(value)) return true;
  // Block scalar header with no content.
  if (/^[|>][-+]?$/.test(value)) return !blockHasContent(lines, key);
  return false;
}

function synthDescription(entry) {
  const base = String(entry.description || entry.shortDescription || '').trim();
  const name = entry.name || entry.directory;
  if (!base) {
    return `Provides the ${name} skill. Use when the user asks for ${name} related tasks.`;
  }
  if (/\b(use when|use this|trigger|when the user|when you|do not use|don't use)\b/i.test(base)) {
    return base;
  }
  return `${base} Use when the user needs ${name} functionality.`;
}

function discoverLicense(frontmatter) {
  if (!frontmatter) return 'Unknown';
  const lines = frontmatter.split('\n');
  const keys = findTopLevelKeys(lines);
  const licenseKey = keys.find((k) => k.key === 'license');
  if (licenseKey) {
    let value = licenseKey.value.trim();
    if (!value && blockHasContent(lines, licenseKey)) {
      value = lines
        .slice(licenseKey.start + 1, licenseKey.end)
        .map((l) => l.trim())
        .filter(Boolean)
        .join(' ');
    }
    value = value.replace(/^["']|["']$/g, '').trim();
    if (value && value !== 'null') return value;
  }
  // Fall back to a nested license field (e.g. metadata.license).
  const nested = frontmatter.match(/^[ \t]+license[ \t]*:[ \t]*(.+)$/m);
  if (nested) {
    const value = nested[1].trim().replace(/^["']|["']$/g, '');
    if (value && value !== 'null') return value;
  }
  return 'Unknown';
}

function normalizeSkill(entry, rawMarkdown, convertedAt) {
  const { frontmatter, body } = splitFrontmatter(rawMarkdown);
  const lines = frontmatter === null ? [] : frontmatter.split('\n');
  const keys = findTopLevelKeys(lines);

  const license = discoverLicense(frontmatter);
  const minis = {
    originalSource: entry.source,
    convertedAt,
    license,
  };

  const edits = [];
  const prepend = [];

  // name -> directory slug
  const nameKey = keys.find((k) => k.key === 'name');
  if (nameKey) {
    edits.push({ start: nameKey.start, end: nameKey.end, lines: [`name: ${entry.directory}`] });
  } else {
    prepend.push(`name: ${entry.directory}`);
  }

  // description -> keep if non-empty, otherwise synthesize
  const descriptionKey = keys.find((k) => k.key === 'description');
  const hasDescription = !descriptionIsEmpty(descriptionKey, lines);
  if (!hasDescription) {
    const description = synthDescription(entry);
    if (descriptionKey) {
      edits.push({
        start: descriptionKey.start,
        end: descriptionKey.end,
        lines: [`description: ${JSON.stringify(description)}`],
      });
    } else {
      prepend.push(`description: ${JSON.stringify(description)}`);
    }
  } else if (descriptionKey && descriptionKey.value.trim() === '') {
    // Implicit multi-line plain scalar: fold it into a single quoted scalar so
    // the frontmatter stays valid and easy to parse downstream.
    const text = lines
      .slice(descriptionKey.start + 1, descriptionKey.end)
      .map((line) => line.replace(/^[ \t]+/, '').trimEnd())
      .filter(Boolean)
      .join(' ')
      .trim();
    edits.push({
      start: descriptionKey.start,
      end: descriptionKey.end,
      lines: [`description: ${JSON.stringify(text)}`],
    });
  }

  // metadata -> merge minis attribution
  const metadataKey = keys.find((k) => k.key === 'metadata');
  if (!metadataKey) {
    edits.push({
      start: lines.length,
      end: lines.length,
      lines: [`metadata: ${JSON.stringify({ minis })}`],
    });
  } else {
    const inline = metadataKey.value.trim();

    if (inline === '') {
      const indent = detectChildIndent(lines, metadataKey);
      const existing = findChildBlock(lines, metadataKey, indent, 'minis');
      const replacement = [`${' '.repeat(indent)}minis:`, ...yamlObjectLines(minis, indent + 2)];
      if (existing) {
        edits.push({ start: existing.start, end: existing.end, lines: replacement });
      } else {
        edits.push({ start: metadataKey.end, end: metadataKey.end, lines: replacement });
      }
    } else if (inline.startsWith('{') && inline.endsWith('}')) {
      let parsed;
      try {
        parsed = JSON.parse(inline);
      } catch {
        parsed = undefined;
      }
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const existingMinis =
          parsed.minis && typeof parsed.minis === 'object' && !Array.isArray(parsed.minis)
            ? parsed.minis
            : {};
        const merged = { ...parsed, minis: { ...existingMinis, ...minis } };
        edits.push({
          start: metadataKey.start,
          end: metadataKey.end,
          lines: [`metadata: ${JSON.stringify(merged)}`],
        });
      } else {
        // Valid YAML flow mapping but not strict JSON: insert a minis entry.
        const line = lines[metadataKey.start];
        const brace = line.lastIndexOf('}');
        const newLine = `${line.slice(0, brace)}, "minis": ${JSON.stringify(minis)}${line.slice(brace)}`;
        edits.push({ start: metadataKey.start, end: metadataKey.start + 1, lines: [newLine] });
      }
    } else {
      // Scalar / unexpected metadata: preserve the original under "original".
      edits.push({
        start: metadataKey.start,
        end: metadataKey.end,
        lines: [`metadata: ${JSON.stringify({ original: inline, minis })}`],
      });
    }
  }

  // Apply edits from the bottom up so indices stay valid.
  edits.sort((a, b) => b.start - a.start || b.end - a.end);
  for (const edit of edits) {
    lines.splice(edit.start, edit.end - edit.start, ...edit.lines);
  }
  if (prepend.length) lines.unshift(...prepend);

  let normalizedFrontmatter = lines.join('\n').replace(/\n+$/, '');
  if (!normalizedFrontmatter) {
    normalizedFrontmatter = `name: ${entry.directory}\ndescription: ${JSON.stringify(synthDescription(entry))}`;
  }

  // Hard validation: required keys must be present.
  if (!/^name[ \t]*:[ \t]*\S/m.test(normalizedFrontmatter)) {
    throw new Error('normalized frontmatter is missing name');
  }
  if (!/^description[ \t]*:[ \t]*\S/m.test(normalizedFrontmatter)) {
    throw new Error('normalized frontmatter is missing description');
  }

  const cleanBody = body.replace(/^\n+/, '');
  const content = `---\n${normalizedFrontmatter}\n---\n\n${cleanBody}`;
  return { content, license };
}

// ---------------------------------------------------------------------------
// Package writing
// ---------------------------------------------------------------------------

function sourceDoc(entry, { markdownUrl, convertedAt, license }) {
  const lines = [
    '# Source & Attribution',
    '',
    `- **Skill:** \`${entry.name || entry.directory}\``,
    `- **Directory:** \`${entry.directory}\``,
    `- **Original source:** ${entry.source}`,
    `- **Markdown endpoint:** ${markdownUrl || 'not recorded (loaded from cache)'}`,
    `- **Converted at:** ${convertedAt}`,
    `- **License:** ${license}`,
    '',
    '## Conversion notes',
    '',
    'This package was converted from the publicly listed skill page above.',
    'Only `SKILL.md` was available from the markdown endpoint at conversion time;',
    'bundled scripts, references, and other assets referenced by the skill may not',
    'be included. No secrets are included.',
    '',
    'Attribution is retained here inside the package. The catalog website does not',
    'link to the original source.',
    '',
  ];
  return lines.join('\n');
}

async function makeZip(directory) {
  const skillDir = path.join(SKILLS_DIR, directory);
  const zipPath = path.join(DOWNLOADS_DIR, `${directory}.zip`);
  const tmpZip = path.join(DOWNLOADS_DIR, `.${directory}.zip.tmp`);
  await ensureDir(DOWNLOADS_DIR);
  await fsp.rm(tmpZip, { force: true });
  try {
    await execFileAsync('zip', ['-q', '-X', '-j', tmpZip, 'SKILL.md', 'SOURCE.md'], {
      cwd: skillDir,
      maxBuffer: 16 * 1024 * 1024,
    });
    await fsp.rename(tmpZip, zipPath);
  } catch (err) {
    await fsp.rm(tmpZip, { force: true });
    throw new Error(`zip failed: ${err?.message || err}`);
  }
  return zipPath;
}

async function processEntry(entry, opts) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(entry.directory)) {
    return {
      ok: false,
      entry,
      reason: `unsafe/invalid directory name: ${JSON.stringify(entry.directory)}`,
    };
  }

  const cachePath = path.join(CACHE_DIR, `${entry.directory}.md`);
  const metaPath = path.join(META_DIR, `${entry.directory}.json`);
  const skillDir = path.join(SKILLS_DIR, entry.directory);

  let markdown;
  let markdownUrl = null;
  let convertedAt;
  let cached = false;

  if (await fileExists(cachePath)) {
    cached = true;
    markdown = await fsp.readFile(cachePath, 'utf8');
    try {
      const meta = JSON.parse(await fsp.readFile(metaPath, 'utf8'));
      markdownUrl = meta.markdownUrl || null;
      convertedAt = meta.fetchedAt || null;
    } catch {
      // sidecar is optional
    }
    if (!convertedAt) {
      const st = await fsp.stat(cachePath);
      convertedAt = st.mtime.toISOString();
    }
  } else {
    const result = await fetchMarkdown(entry);
    if (!result.ok) {
      return { ok: false, entry, reason: result.reason };
    }
    markdown = result.markdown;
    markdownUrl = result.markdownUrl;
    convertedAt = new Date().toISOString();
    await writeFileAtomic(cachePath, markdown);
    await writeFileAtomic(
      metaPath,
      JSON.stringify({ markdownUrl, fetchedAt: convertedAt }, null, 2),
    );
  }

  let normalized;
  try {
    normalized = normalizeSkill(entry, markdown, convertedAt);
  } catch (err) {
    return { ok: false, entry, reason: `normalization failed: ${err?.message || err}` };
  }

  await writeFileAtomic(path.join(skillDir, 'SKILL.md'), normalized.content);
  await writeFileAtomic(
    path.join(PUBLIC_SKILLS_DIR, entry.directory, 'SKILL.md'),
    normalized.content,
  );
  await writeFileAtomic(
    path.join(skillDir, 'SOURCE.md'),
    sourceDoc(entry, { markdownUrl, convertedAt, license: normalized.license }),
  );

  let zipped = false;
  if (!opts.skipZips) {
    try {
      await makeZip(entry.directory);
      zipped = true;
    } catch (err) {
      return {
        ok: false,
        entry,
        reason: err?.message || 'zip generation failed',
        license: normalized.license,
      };
    }
  }

  return {
    ok: true,
    entry,
    license: normalized.license,
    cached,
    zipped,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const index = nextIndex++;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  });

  await Promise.all(runners);
  return results;
}

async function main() {
  const startedAt = Date.now();
  const opts = parseArgs(process.argv.slice(2));

  const allEntries = JSON.parse(await fsp.readFile(SKILLS_JSON, 'utf8'));
  if (!Array.isArray(allEntries)) throw new Error('skills.json must contain an array');

  let selected = allEntries;
  let previousReport = null;
  let previousIndex = null;

  if (opts.retryFailed) {
    try {
      previousReport = JSON.parse(await fsp.readFile(REPORT_PATH, 'utf8'));
      const failedDirs = new Set((previousReport.failures || []).map((f) => f.directory));
      selected = selected.filter((e) => failedDirs.has(e.directory));
      console.log(`--retry-failed: ${selected.length} previously failed skill(s)`);
    } catch {
      console.log('--retry-failed: no previous report found, processing all skills');
    }
    try {
      previousIndex = JSON.parse(await fsp.readFile(INDEX_PATH, 'utf8'));
    } catch {
      previousIndex = null;
    }
  }

  if (opts.only) {
    selected = selected.filter((e) => e.directory === opts.only || e.id === opts.only);
    if (selected.length === 0) throw new Error(`No skill matched --only ${opts.only}`);
  }

  if (opts.limit !== null) selected = selected.slice(0, opts.limit);

  await ensureDir(SKILLS_DIR);
  await ensureDir(PUBLIC_SKILLS_DIR);
  await ensureDir(DOWNLOADS_DIR);
  await ensureDir(CACHE_DIR);
  await ensureDir(META_DIR);

  console.log(
    `Converting ${selected.length} of ${allEntries.length} skills ` +
      `(concurrency=${opts.concurrency}${opts.skipZips ? ', zips skipped' : ''})`,
  );

  let done = 0;
  let succeeded = 0;
  let failed = 0;
  let cachedCount = 0;
  let zipsGenerated = 0;

  const results = await runPool(selected, opts.concurrency, async (entry) => {
    const result = await processEntry(entry, opts);
    done++;
    if (result.ok) {
      succeeded++;
      if (result.cached) cachedCount++;
      if (result.zipped) zipsGenerated++;
    } else {
      failed++;
    }

    if (done % 50 === 0 || done === selected.length || !result.ok) {
      const elapsed = (Date.now() - startedAt) / 1000;
      const rate = done / Math.max(elapsed, 0.001);
      const remaining = selected.length - done;
      const eta = rate > 0 ? Math.round(remaining / rate) : 0;
      const status = result.ok ? 'ok' : `FAIL (${result.reason})`;
      console.log(
        `[${done}/${selected.length}] ${entry.directory} ${status} ` +
          `| ok=${succeeded} fail=${failed} cached=${cachedCount} ` +
          `| ${rate.toFixed(1)}/s eta=${eta}s`,
      );
    }
    return result;
  });

  const successes = results.filter((r) => r.ok);
  const failures = results.filter((r) => !r.ok);

  const toIndexEntry = ({ entry }) => ({
    id: entry.id,
    name: entry.name || entry.directory,
    description: entry.description || entry.shortDescription || '',
    categories: entry.categories || [],
    directory: entry.directory,
    downloadUrl: `/downloads/${entry.directory}.zip`,
    skillPath: `/skills/${entry.directory}/SKILL.md`,
  });

  const toFailureEntry = ({ entry, reason }) => ({
    id: entry.id,
    name: entry.name || entry.directory,
    directory: entry.directory,
    source: entry.source,
    reason,
  });

  // Index for the website. Description comes from the catalog (always present
  // in the source data) so the index stays compact and stable.
  let index;
  let reportFailures;

  if (opts.retryFailed && Array.isArray(previousIndex)) {
    // Merge retried results into the existing catalog instead of shrinking it.
    const indexMap = new Map(previousIndex.map((e) => [e.directory, e]));
    const failureMap = new Map(
      (previousReport?.failures || []).map((f) => [f.directory, f]),
    );
    for (const result of successes) {
      indexMap.set(result.entry.directory, toIndexEntry(result));
      failureMap.delete(result.entry.directory);
    }
    for (const result of failures) {
      failureMap.set(result.entry.directory, toFailureEntry(result));
    }
    index = [...indexMap.values()];
    reportFailures = [...failureMap.values()];
  } else {
    index = successes.map(toIndexEntry);
    reportFailures = failures.map(toFailureEntry);
  }
  index.sort((a, b) => a.directory.localeCompare(b.directory));
  reportFailures.sort((a, b) => a.directory.localeCompare(b.directory));

  await writeFileAtomic(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`);

  const report = {
    generatedAt: new Date().toISOString(),
    durationSeconds: Number(((Date.now() - startedAt) / 1000).toFixed(1)),
    mode: opts.retryFailed ? 'retry-failed' : 'full',
    options: opts,
    totals: {
      catalogEntries: allEntries.length,
      selected: selected.length,
      succeeded: successes.length,
      failed: reportFailures.length,
      fromCache: cachedCount,
      zipsGenerated,
      indexedSkills: index.length,
    },
    http: stats,
    failures: reportFailures,
  };
  await writeFileAtomic(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);

  console.log('');
  console.log('Done.');
  console.log(
    `  succeeded: ${successes.length} (from cache: ${cachedCount})` +
      `  failed: ${reportFailures.length}  zips: ${zipsGenerated}`,
  );
  console.log(`  index:   ${path.relative(ROOT, INDEX_PATH)}`);
  console.log(`  report:  ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(
    `  http:    ${stats.requests} requests, ${stats.retries} retries, ` +
      `${stats.rateLimited} rate-limited responses`,
  );
  if (failures.length) {
    console.log('  failures this run:');
    for (const { entry, reason } of failures) {
      console.log(`    - ${entry.directory}: ${reason}`);
    }
  }
}

main().catch((err) => {
  console.error(`Fatal: ${err?.stack || err}`);
  process.exit(1);
});
