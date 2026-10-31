---
name: get-kalshi-live-games
description: "Fetch currently live Kalshi sports markets using the browser. Use when the user needs get-kalshi-live-games functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/kanakamedalasumanth-get-kalshi-live-games","convertedAt":"2026-10-31T22:11:23.607Z","license":"Unknown"}}
---

# Skill: Get Kalshi Live Games

## Purpose
Fetch currently live Kalshi sports markets using the browser.

## Tool Policy
- MUST use the browser tool
- MUST NOT use web_search or web_fetch for live market data

## Steps
1. Start browser if not running.
2. Open https://kalshi.com
3. Navigate to live sports markets.
4. Extract up to 5 currently running games.
5. Return only:
   - Game name
   - Probability

