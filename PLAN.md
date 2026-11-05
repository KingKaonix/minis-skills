# Analytics & Tracking Plan

## Goal
Track and display:
1. Downloads + installs per skill (on skill detail pages, subtle)
2. Unique page views (per skill page)
3. Humans online vs agents online (site-wide, live)

## Architecture (self-contained, no external service)
- `src/lib/analytics.ts` — server-side JSON store (`data/analytics.json`) with read-modify-write
- `src/app/api/analytics/route.ts` — GET stats / POST record event
- `src/app/components/AnalyticsTracker.tsx` ("use client") — visitor ID (localStorage), human/agent UA detection, page_view/download/install events, heartbeat
- `src/app/components/OnlineIndicator.tsx` ("use client") — humans/agents online pill
- Skill detail page — server-render download/install/page-view counts, subtle display
- CopyInstallPrompt — track install on click

## Data model (analytics.json)
```
{
  visitors: { id: {type, firstSeen, lastSeen, paths} },
  skills: { dir: {downloads, installs, pageViews, uniqueVisitors[]} },
  pages: { path: {pageViews, uniqueVisitors[]} }
}
```

## Files
- NEW src/lib/analytics.ts
- NEW src/app/api/analytics/route.ts
- NEW src/app/components/AnalyticsTracker.tsx
- NEW src/app/components/OnlineIndicator.tsx
- EDIT src/app/skills/[slug]/page.tsx (counts + tracking)
- EDIT src/app/components/CopyInstallPrompt.tsx (install tracking)
- EDIT src/app/layout.tsx (add tracker + online indicator)
- NEW data/ (gitignored, created at runtime)

## Notes
- Vercel serverless FS is read-only in prod; file-based store works in dev and on platforms with persistent FS. Structure is swap-able for a DB.
- "agent" = UA matches automation/headless/bot/curl patterns; "human" = regular browser.
- Online = seen within last 5 minutes via heartbeat.
