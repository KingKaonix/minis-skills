/**
 * Analytics API.
 *
 * GET    /api/analytics?skill=<dir>&path=<path>&online=1   -> stats
 * POST   /api/analytics                                    -> record an event
 *
 * Body (POST): { event, skill?, path?, visitorId, visitorType? }
 */

import { NextRequest, NextResponse } from "next/server";
import {
  recordEvent,
  getSkillStats,
  getPageStats,
  getOnlineCounts,
  classifyVisitor,
} from "@/lib/analytics";

export const dynamic = "force-dynamic";

function getVisitorId(req: NextRequest): string {
  const cookie = req.cookies.get("minis_visitor")?.value;
  return cookie ?? "unknown";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skill = searchParams.get("skill");
  const path = searchParams.get("path");
  const online = searchParams.get("online") === "1";

  const body: Record<string, unknown> = {};
  if (skill) body.skill = getSkillStats(skill);
  if (path) body.page = getPageStats(path);
  if (online) body.online = getOnlineCounts();
  if (!skill && !path && !online) {
    body.skill = {};
    body.page = {};
    body.online = getOnlineCounts();
  }

  return NextResponse.json(body);
}

export async function POST(req: NextRequest) {
  let body: {
    event: string;
    skill?: string;
    path?: string;
    visitorId?: string;
    visitorType?: "human" | "agent";
    userAgent?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const visitorId = body.visitorId || getVisitorId(req);
  const visitorType =
    body.visitorType ??
    classifyVisitor(req.headers.get("user-agent") ?? "");

  try {
    switch (body.event) {
      case "page_view":
        if (!body.path) throw new Error("path required");
        recordEvent({
          type: "page_view",
          path: body.path,
          visitorId,
          visitorType,
        });
        break;
      case "download":
        if (!body.skill) throw new Error("skill required");
        recordEvent({
          type: "download",
          skill: body.skill,
          visitorId,
          visitorType,
        });
        break;
      case "install":
        if (!body.skill) throw new Error("skill required");
        recordEvent({
          type: "install",
          skill: body.skill,
          visitorId,
          visitorType,
        });
        break;
      case "presence":
        recordEvent({ type: "presence", visitorId, visitorType });
        break;
      default:
        return NextResponse.json({ error: "unknown event" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400 },
    );
  }

  const res = NextResponse.json({ ok: true });
  // Set the visitor cookie so subsequent requests are deduplicated.
  res.cookies.set("minis_visitor", visitorId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
