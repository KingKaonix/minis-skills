/**
 * Postgres-backed analytics store for minisskills.
 *
 * Requires a DATABASE_URL (or POSTGRES_URL) environment variable pointing at a
 * Postgres database (e.g. Vercel Postgres). When no database URL is configured,
 * all operations silently degrade to empty defaults so the site keeps working
 * in local development without a database.
 *
 * Events are stored in an `analytics_events` table and stats are computed by
 * aggregating, which avoids read-modify-write race conditions across serverless
 * invocations.
 *
 * Tracked event types: page_view, download, install, presence.
 * Visitors are classified as "human" or "agent" by User-Agent.
 */

import { Pool } from "pg";

export const ONLINE_WINDOW_MS = 5 * 60 * 1000;

export type VisitorType = "human" | "agent";

export type SkillRecord = {
  downloads: number;
  installs: number;
  pageViews: number;
  uniqueVisitors: number;
};

export type PageRecord = {
  pageViews: number;
  uniqueVisitors: number;
};

export type AnalyticsEvent =
  | { type: "page_view"; path: string; visitorId: string; visitorType: VisitorType }
  | { type: "download"; skill: string; visitorId: string; visitorType: VisitorType }
  | { type: "install"; skill: string; visitorId: string; visitorType: VisitorType }
  | { type: "presence"; visitorId: string; visitorType: VisitorType };

const EMPTY_SKILL: SkillRecord = {
  downloads: 0,
  installs: 0,
  pageViews: 0,
  uniqueVisitors: 0,
};

const EMPTY_PAGE: PageRecord = { pageViews: 0, uniqueVisitors: 0 };

const EMPTY_ONLINE = { human: 0, agent: 0 };

const EMPTY_TOTALS = { downloads: 0, installs: 0, pageViews: 0, visitors: 0 };

let pool: Pool | null = null;

function getPool(): Pool | null {
  if (pool) return pool;
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) return null;
  pool = new Pool({ connectionString: url });
  return pool;
}

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS analytics_events (
    id BIGSERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,
    skill_directory TEXT,
    page_path TEXT,
    visitor_id TEXT NOT NULL,
    visitor_type TEXT NOT NULL DEFAULT 'human',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS idx_analytics_events_skill_dir
    ON analytics_events(skill_directory) WHERE skill_directory IS NOT NULL;
  CREATE INDEX IF NOT EXISTS idx_analytics_events_page_path
    ON analytics_events(page_path) WHERE page_path IS NOT NULL;
  CREATE INDEX IF NOT EXISTS idx_analytics_events_visitor_created
    ON analytics_events(visitor_id, created_at);
`;

async function ensureSchema(p: Pool) {
  await p.query(SCHEMA);
}

export function classifyVisitor(userAgent: string | undefined): VisitorType {
  const patterns = [
    "bot", "crawl", "spider", "slurp", "bingbot", "googlebot", "yahoo",
    "duckduckbot", "curl", "wget", "python-requests", "httpclient",
    "http client", "headless", "phantom", "puppeteer", "playwright",
    "selenium", "automation", "agent", "gpt", "claude", "openai", "anthropic",
  ];
  const lower = (userAgent ?? "").toLowerCase();
  if (!lower) return "human";
  return patterns.some((p) => lower.includes(p.toLowerCase())) ? "agent" : "human";
}

export async function recordEvent(event: AnalyticsEvent): Promise<void> {
  const p = getPool();
  if (!p) return;
  try {
    await ensureSchema(p);
    let skillDirectory: string | null = null;
    let pagePath: string | null = null;
    if (event.type === "download" || event.type === "install") {
      skillDirectory = event.skill;
    } else if (event.type === "page_view") {
      pagePath = event.path;
    }
    await p.query(
      `INSERT INTO analytics_events
         (event_type, skill_directory, page_path, visitor_id, visitor_type)
       VALUES ($1, $2, $3, $4, $5)`,
      [event.type, skillDirectory, pagePath, event.visitorId, event.visitorType]
    );
  } catch {
    // Best-effort tracking; never break the page.
  }
}

export async function getSkillStats(directory: string): Promise<SkillRecord> {
  const p = getPool();
  if (!p) return EMPTY_SKILL;
  try {
    await ensureSchema(p);
    const res = await p.query(
      `SELECT
         COALESCE(SUM(CASE WHEN event_type = 'download' THEN 1 ELSE 0 END), 0) as downloads,
         COALESCE(SUM(CASE WHEN event_type = 'install' THEN 1 ELSE 0 END), 0) as installs,
         COALESCE(SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END), 0) as page_views,
         COALESCE(COUNT(DISTINCT CASE WHEN event_type IN ('download','install','page_view')
                                   THEN visitor_id END), 0) as unique_visitors
       FROM analytics_events
       WHERE skill_directory = $1`,
      [directory]
    );
    const row = res.rows[0];
    return {
      downloads: Number(row.downloads ?? 0),
      installs: Number(row.installs ?? 0),
      pageViews: Number(row.page_views ?? 0),
      uniqueVisitors: Number(row.unique_visitors ?? 0),
    };
  } catch {
    return EMPTY_SKILL;
  }
}

export async function getPageStats(pathName: string): Promise<PageRecord> {
  const p = getPool();
  if (!p) return EMPTY_PAGE;
  try {
    await ensureSchema(p);
    const res = await p.query(
      `SELECT
         COALESCE(SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END), 0) as page_views,
         COALESCE(COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN visitor_id END), 0) as unique_visitors
       FROM analytics_events
       WHERE page_path = $1`,
      [pathName]
    );
    const row = res.rows[0];
    return {
      pageViews: Number(row.page_views ?? 0),
      uniqueVisitors: Number(row.unique_visitors ?? 0),
    };
  } catch {
    return EMPTY_PAGE;
  }
}

export async function getOnlineCounts(): Promise<{ human: number; agent: number }> {
  const p = getPool();
  if (!p) return EMPTY_ONLINE;
  try {
    await ensureSchema(p);
    const res = await p.query(
      `SELECT visitor_type, COUNT(DISTINCT visitor_id) as count
       FROM analytics_events
       WHERE event_type = 'presence'
         AND created_at > NOW() - $1::interval
       GROUP BY visitor_type`,
      [`${ONLINE_WINDOW_MS} milliseconds`]
    );
    let human = 0;
    let agent = 0;
    for (const row of res.rows) {
      if (row.visitor_type === "human") human = Number(row.count ?? 0);
      else if (row.visitor_type === "agent") agent = Number(row.count ?? 0);
    }
    return { human, agent };
  } catch {
    return EMPTY_ONLINE;
  }
}

export async function getSiteTotals() {
  const p = getPool();
  if (!p) return EMPTY_TOTALS;
  try {
    await ensureSchema(p);
    const res = await p.query(
      `SELECT
         COALESCE(SUM(CASE WHEN event_type = 'download' THEN 1 ELSE 0 END), 0) as downloads,
         COALESCE(SUM(CASE WHEN event_type = 'install' THEN 1 ELSE 0 END), 0) as installs,
         COALESCE(SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END), 0) as page_views,
         COALESCE(COUNT(DISTINCT visitor_id), 0) as visitors
       FROM analytics_events`
    );
    const row = res.rows[0];
    return {
      downloads: Number(row.downloads ?? 0),
      installs: Number(row.installs ?? 0),
      pageViews: Number(row.page_views ?? 0),
      visitors: Number(row.visitors ?? 0),
    };
  } catch {
    return EMPTY_TOTALS;
  }
}
