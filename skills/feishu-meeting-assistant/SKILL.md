---
name: feishu-meeting-assistant
description: "Scans your Feishu Calendar for upcoming events with attached documents (Doc, Sheet, Bitable), reads their content. Use when the user needs feishu-meeting-assistant functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/autogame-17-feishu-meeting-assistant","convertedAt":"2026-10-31T22:31:42.157Z","license":"Unknown"}}
---

# Feishu Meeting Assistant

Scans your Feishu Calendar for upcoming events with attached documents (Doc, Sheet, Bitable), reads their content, and prepares a summarized briefing card for the user.

## Usage

```bash
# Check upcoming meetings (next 24h) and generate briefings
node skills/feishu-meeting-assistant/check.js
```

## Features
- Detects meetings in the next 24 hours.
- Parses event descriptions for Feishu Doc/Sheet/Bitable links.
- Fetches document content using `feishu-doc`.
- Generates a concise briefing card with key points.
- Sends the briefing to the user via `feishu-card`.

## Configuration
- Requires `feishu-calendar` and `feishu-doc` skills to be installed and configured.
