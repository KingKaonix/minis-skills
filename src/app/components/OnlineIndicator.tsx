"use client";

import { useEffect, useState } from "react";

type OnlineCounts = { human: number; agent: number };

const API = "/api/analytics?online=1";
const POLL_MS = 30_000;

/**
 * Subtle live indicator showing how many humans and agents are currently
 * online (seen within the last 5 minutes via presence heartbeats).
 */
export default function OnlineIndicator() {
  const [counts, setCounts] = useState<OnlineCounts>({ human: 0, agent: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setInterval>;

    async function fetchCounts() {
      try {
        const res = await fetch(API, { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as { online?: OnlineCounts };
          if (mounted && data.online) setCounts(data.online);
        }
      } catch {
        // Best-effort; keep showing the last known values.
      } finally {
        if (mounted) setLoaded(true);
      }
    }

    fetchCounts();
    timer = setInterval(fetchCounts, POLL_MS);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <span
      className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2.5 py-0.5 text-[11px] font-medium text-black/50 transition-colors hover:border-primary hover:text-primary dark:border-white/15 dark:bg-white/5 dark:text-white/50 dark:hover:border-primary dark:hover:text-primary"
      title={`${counts.human} humans and ${counts.agent} agents online`}
    >
      {loaded ? (
        <>
          <span className="text-black dark:text-white">👥 {counts.human}</span>
          <span className="text-black/40 dark:text-white/40">·</span>
          <span className="text-black dark:text-white">🤖 {counts.agent}</span>
        </>
      ) : (
        <>
          <span className="animate-pulse text-black dark:text-white">👥 —</span>
          <span className="text-black/40 dark:text-white/40">·</span>
          <span className="animate-pulse text-black dark:text-white">🤖 —</span>
        </>
      )}
    </span>
  );
}
