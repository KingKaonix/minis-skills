#!/usr/bin/env node
/**
 * Builds the compact dataset the website ships to the browser.
 *
 * Source of truth: skills.json (the catalog metadata).
 * Output: public/site-skills.json
 *
 * We deliberately drop the upstream `source` URL: downloads are self-hosted
 * from /downloads/<directory>.zip, and the site never links back to the
 * original directory.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const input = path.join(root, "skills.json");
const output = path.join(root, "public", "site-skills.json");

const catalog = JSON.parse(fs.readFileSync(input, "utf8"));

function formatSize(bytes) {
  if (!bytes) return undefined;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const downloadsDir = path.join(root, "public", "downloads");
const hasPackages =
  fs.existsSync(downloadsDir) &&
  fs.readdirSync(downloadsDir).some((file) => file.endsWith(".zip"));

const seen = new Set();
const skills = [];

for (const entry of catalog) {
  const directory = entry.directory || entry.id;
  if (!directory || seen.has(directory)) continue;
  seen.add(directory);

  const categories = Array.isArray(entry.categories) ? entry.categories.filter(Boolean) : [];
  const description =
    (entry.description || entry.shortDescription || "").trim() ||
    `A community-built skill for Minis: ${entry.name || directory}.`;

  const zipPath = path.join(downloadsDir, `${directory}.zip`);
  const hasZip = fs.existsSync(zipPath);
  // When packages exist, only list skills that actually have a downloadable
  // package. This keeps dead download links out of the catalog.
  if (hasPackages && !hasZip) continue;
  const size = hasZip ? formatSize(fs.statSync(zipPath).size) : undefined;

  skills.push({
    id: entry.id || directory,
    name: entry.name || directory,
    directory,
    description,
    categories,
    downloadUrl: `/downloads/${directory}.zip`,
    skillPath: `/skills/${directory}/SKILL.md`,
    ...(size ? { size } : {}),
  });
}

skills.sort((a, b) => a.name.localeCompare(b.name));

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(skills));

console.log(
  `Wrote ${skills.length} skills to ${path.relative(root, output)} (${(
    fs.statSync(output).size / 1024
  ).toFixed(0)} KB)`,
);
