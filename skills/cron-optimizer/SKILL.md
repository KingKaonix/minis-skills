---
name: cron-optimizer
description: Optimizes system cron jobs by removing stale, disabled, or redundant entries to reduce exec noise.
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/autogame-17-cron-optimizer","convertedAt":"2026-10-31T22:26:48.532Z","license":"Unknown"}}
---

# Cron Optimizer

This skill cleans up the OpenClaw cron system by removing:
- Stale "at" jobs older than 24 hours.
- Disabled jobs that have not run recently.
- Redundant or duplicate "Mad Dog" evolver loops.

## Usage

```bash
node skills/cron-optimizer/index.js
```

## Features
- **Reduces Exec Noise**: Cleans up phantom cron jobs that trigger `exec` usage.
- **System Stability**: Ensures critical watchdogs are present.
- **Resource Management**: Removes stale job definitions from memory.
