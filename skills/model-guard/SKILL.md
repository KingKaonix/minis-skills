---
name: model-guard
description: "Automatically monitors Anti-Gravity model quotas and switches the default model to the one with the highest. Use when the user needs model-guard functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/sarielwang93-model-guard","convertedAt":"2026-10-31T22:12:37.689Z","license":"Unknown"}}
---

# Model Guard

Automatically monitors Anti-Gravity model quotas and switches the default model to the one with the highest remaining quota. If all Anti-Gravity models are below 20%, it falls back to the native `gemini-flash` model.

## Usage

- **Manual trigger**: `model-guard`
- **Auto trigger**: Designed to be run via `cron` or `heartbeat`.

## Configuration

Edit `guard.js` to change the `THRESHOLD` (default 20%) or `FALLBACK_MODEL`.
