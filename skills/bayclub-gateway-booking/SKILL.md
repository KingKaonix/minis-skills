---
name: bayclub-gateway-booking
description: "Book and manage tennis/pickleball courts at Bay Club."
user-invocable: true
metadata: {"original":"{","minis":{"originalSource":"https://clawskills.sh/skills/elizabethsiegle-bayclub-gateway-booking","convertedAt":"2026-10-31T22:09:45.997Z","license":"Unknown"}}
---

# Bay Club Manager
This skill uses Stagehand and TypeScript to automate browser bookings.

## Instructions
When the user asks to book or check courts:
1. Use the `shell` tool to run the implementation script.
2. The command to run is: `NODE_ENV=development STAGEHAND_ENV=LOCAL HEADLESS=true npx ts-node --transpile-only {baseDir}/bayclub_skills.ts`
3. Pass user arguments (date, time, club) as strings to the script.

## Files
- Logic: `{baseDir}/bayclub_skills.ts`
- Browser Engine: `{baseDir}/BayClubBot.ts`
