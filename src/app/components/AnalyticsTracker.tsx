"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type VisitorType = "human" | "agent";

const API = "/api/analytics";
const HEARTBEAT_MS = 30_000;
const VISITOR_KEY = "minis_visitor";

function generateVisitorId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function classifyVisitor(ua: string): VisitorType {
  const patterns = [
    "bot", "crawl", "spider", "slurp", "bingbot", "googlebot", "yahoo",
    "duckduckbot", "curl", "wget", "python-requests", "httpclient",
    "http client", "headless", "phantom", "puppeteer", "playwright",
    "selenium", "automation", "agent", "gpt", "claude", "openai", "anthropic",
  ];
  const lower = ua.toLowerCase();
  return patterns.some((p) => lower.includes(p.toLowerCase())) ? "agent" : "human";
}

async function sendEvent(event: {
  event: string;
  skill?: string;
  path?: string;
  visitorId: string;
  visitorType: VisitorType;
}) {
  try {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    });
  } catch {
    // Best-effort tracking; never break the page.
  }
}

/**
 * Hook that initialises a visitor id, reports a page view on mount and on
 * every client-side navigation, keeps a presence heartbeat alive, and exposes
 * recordDownload / recordInstall.
 */
export function useAnalytics() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [visitorType, setVisitorType] = useState<VisitorType>("human");
  const pathname = usePathname();

  useEffect(() => {
    let id =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(VISITOR_KEY)
        : null;
    if (!id) {
      id = generateVisitorId();
      try {
        localStorage?.setItem(VISITOR_KEY, id ?? "");
      } catch {
        // localStorage unavailable; fall back to per-session id.
      }
    }
    if (id) {
      setVisitorId(id);
      setVisitorType(
        classifyVisitor(typeof navigator !== "undefined" ? navigator.userAgent : ""),
      );
    }
  }, []);

  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!visitorId) return;
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    void sendEvent({ event: "page_view", path, visitorId, visitorType });

    void sendEvent({ event: "presence", visitorId, visitorType });
    heartbeatRef.current = setInterval(() => {
      void sendEvent({ event: "presence", visitorId, visitorType });
    }, HEARTBEAT_MS);

    return () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, [visitorId, visitorType, pathname]);

  const recordDownload = (skill: string) => {
    if (!visitorId) return;
    void sendEvent({ event: "download", skill, visitorId, visitorType });
  };

  const recordInstall = (skill: string) => {
    if (!visitorId) return;
    void sendEvent({ event: "install", skill, visitorId, visitorType });
  };

  return { visitorId, visitorType, recordDownload, recordInstall };
}

/**
 * Invisible tracker: mounts the analytics hook (page view + presence
 * heartbeat) without rendering anything. Use in the root layout.
 */
export default function AnalyticsTracker() {
  useAnalytics();
  return null;
}
