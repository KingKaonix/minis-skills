/**
 * Self-contained analytics store for minisskills.
 *
 * Data is persisted to `data/analytics.json` (gitignored, created at runtime).
 * Each event is a read-modify-write on the JSON file. For a low-traffic catalog
 * this is sufficient and requires no external service or database. The store can
 * be swapped for a database later without changing the API surface.
 *
 * Tracked event types:
 *  - page_view   : a unique visitor loads a page
 *  - download    : a skill .zip is downloaded
 *  - install     : the "copy install prompt" action (proxy for an install)
 *  - presence    : heartbeat keeping a visitor marked as "online"
 *
 * Visitors are classified as "human" (regular browser) or "agent" (automation /
 * headless / bot / curl-like user agents) based on the User-Agent string.
 * A visitor is considered "online" when they last sent a presence heartbeat
 * within ONLINE_WINDOW_MS.
 */

import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "analytics.json");

// A visitor counts as online if seen within the last 5 minutes.
export const ONLINE_WINDOW_MS = 5 * 60 * 1000;

export type VisitorType = "human" | "agent";

interface VisitorRecord {
  type: VisitorType;
  firstSeen: string;
  lastSeen: string;
  paths: Record<string, number>;
}

interface SkillRecord {
  downloads: number;
  installs: number;
  pageViews: number;
  uniqueVisitors: string[];
}

interface PageRecord {
  pageViews: number;
  uniqueVisitors: string[];
}

interface AnalyticsData {
  visitors: Record<string, VisitorRecord>;
  skills: Record<string, SkillRecord>;
  pages: Record<string, PageRecord>;
}

const EMPTY_DATA: AnalyticsData = {
  visitors: {},
  skills: {},
  pages: {},
};

/** Keywords that mark a visitor as an agent / automation rather than a human. */
const AGENT_PATTERNS = [
  "bot",
  "crawl",
  "spider",
  "slurp",
  "bingbot",
  "googlebot",
  "yahoo",
  "duckduckbot",
  "curl",
  "wget",
  "python-requests",
  "httpclient",
  "http client",
  "headless",
  "phantom",
  "puppeteer",
  "playwright",
  "selenium",
  "automation",
  "agent",
  "gpt",
  "claude",
  "openai",
  "anthropic",
];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadData(): AnalyticsData {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<AnalyticsData>;
    return {
      visitors: parsed.visitors ?? {},
      skills: parsed.skills ?? {},
      pages: parsed.pages ?? {},
    };
  } catch {
    return { ...EMPTY_DATA };
  }
}

function saveData(data: AnalyticsData) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function nowISO() {
  return new Date().toISOString();
}

export function classifyVisitor(userAgent: string | undefined): VisitorType {
  const ua = (userAgent ?? "").toLowerCase();
  if (!ua) return "human";
  if (AGENT_PATTERNS.some((pattern) => ua.includes(pattern.toLowerCase()))) {
    return "agent";
  }
  return "human";
}

export type AnalyticsEvent =
  | { type: "page_view"; path: string; visitorId: string; visitorType: VisitorType }
  | { type: "download"; skill: string; visitorId: string; visitorType: VisitorType }
  | { type: "install"; skill: string; visitorId: string; visitorType: VisitorType }
  | { type: "presence"; visitorId: string; visitorType: VisitorType };

/**
 * Record an analytics event. Safe to call repeatedly; unique visitors are
 * deduplicated by visitorId per skill/page.
 */
export function recordEvent(event: AnalyticsEvent): void {
  const data = loadData();
  const now = nowISO();

  switch (event.type) {
    case "page_view": {
      const visitor = upsertVisitor(data, event.visitorId, event.visitorType, now);
      visitor.paths[event.path] = (visitor.paths[event.path] ?? 0) + 1;

      const page = data.pages[event.path] ?? {
        pageViews: 0,
        uniqueVisitors: [],
      };
      page.pageViews += 1;
      if (!page.uniqueVisitors.includes(event.visitorId)) {
        page.uniqueVisitors.push(event.visitorId);
      }
      data.pages[event.path] = page;
      break;
    }
    case "download": {
      upsertVisitor(data, event.visitorId, event.visitorType, now);
      const skill = data.skills[event.skill] ?? {
        downloads: 0,
        installs: 0,
        pageViews: 0,
        uniqueVisitors: [],
      };
      skill.downloads += 1;
      if (!skill.uniqueVisitors.includes(event.visitorId)) {
        skill.uniqueVisitors.push(event.visitorId);
      }
      data.skills[event.skill] = skill;
      break;
    }
    case "install": {
      upsertVisitor(data, event.visitorId, event.visitorType, now);
      const skill = data.skills[event.skill] ?? {
        downloads: 0,
        installs: 0,
        pageViews: 0,
        uniqueVisitors: [],
      };
      skill.installs += 1;
      if (!skill.uniqueVisitors.includes(event.visitorId)) {
        skill.uniqueVisitors.push(event.visitorId);
      }
      data.skills[event.skill] = skill;
      break;
    }
    case "presence": {
      upsertVisitor(data, event.visitorId, event.visitorType, now);
      break;
    }
  }

  saveData(data);
}

function upsertVisitor(
  data: AnalyticsData,
  visitorId: string,
  type: VisitorType,
  now: string,
): VisitorRecord {
  const existing = data.visitors[visitorId];
  if (existing) {
    existing.lastSeen = now;
    existing.type = type;
    return existing;
  }
  const record: VisitorRecord = {
    type,
    firstSeen: now,
    lastSeen: now,
    paths: {},
  };
  data.visitors[visitorId] = record;
  return record;
}

/** Stats for a single skill. */
export function getSkillStats(directory: string) {
  const data = loadData();
  return data.skills[directory] ?? {
    downloads: 0,
    installs: 0,
    pageViews: 0,
    uniqueVisitors: [],
  };
}

/** Stats for a single page path. */
export function getPageStats(pathName: string) {
  const data = loadData();
  return data.pages[pathName] ?? { pageViews: 0, uniqueVisitors: [] };
}

/** Count of visitors currently online (within ONLINE_WINDOW_MS), by type. */
export function getOnlineCounts(): { human: number; agent: number } {
  const data = loadData();
  const cutoff = Date.now() - ONLINE_WINDOW_MS;
  let human = 0;
  let agent = 0;
  for (const visitor of Object.values(data.visitors)) {
    const lastSeen = new Date(visitor.lastSeen).getTime();
    if (isNaN(lastSeen) || lastSeen < cutoff) continue;
    if (visitor.type === "human") human += 1;
    else agent += 1;
  }
  return { human, agent };
}

/** Site-wide totals. */
export function getSiteTotals() {
  const data = loadData();
  let downloads = 0;
  let installs = 0;
  let pageViews = 0;
  for (const skill of Object.values(data.skills)) {
    downloads += skill.downloads;
    installs += skill.installs;
    pageViews += skill.pageViews;
  }
  return { downloads, installs, pageViews, visitors: Object.keys(data.visitors).length };
}
