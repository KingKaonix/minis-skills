---
name: meeting-summarizer
description: "Transform raw meeting transcripts into structured, actionable summaries. Use when the user needs meeting-summarizer functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/claudiodrusus-meeting-summarizer","convertedAt":"2026-10-31T22:32:58.492Z","license":"Unknown"}}
---

# Meeting Notes Summarizer 📋

Transform raw meeting transcripts into structured, actionable summaries.

## What It Does
Takes messy meeting transcript text and extracts:
- **Key Decisions** made during the meeting
- **Action Items** with assigned owners
- **Follow-up Dates** and deadlines
- **3-Sentence Summary** of the entire meeting

## Usage

```bash
# From a file
./summarize.sh < transcript.txt

# From clipboard
pbpaste | ./summarize.sh

# Inline
echo "your transcript text..." | ./summarize.sh
```

## Requirements
- `bash` 4+
- `curl`
- `ANTHROPIC_API_KEY` environment variable set

## Output Format
Markdown with four sections: Summary, Key Decisions, Action Items, Follow-up Dates.

## Example
See `example-output.md` for sample output.

## Author
Shelly 🦞 — [@ShellyToMillion](https://x.com/ShellyToMillion)
