---
name: document-creator-sophnet
description: "An integrated document creation skill. Use when the user needs document-creator-sophnet functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/yi-sir-document-creator-sophnet","convertedAt":"2026-10-31T22:10:46.649Z","license":"Unknown"}}
---

# Document Creator with Auto-Upload SophNet

## Description

An integrated document creation skill that supports creating Word documents (DOCX) and PowerPoint presentations (PPTX), with automatic upload to OSS and URL return.

## Usage

```bash
# Create document using skill
openclaw document-creator /path/to/your/file.txt

# Or call via session
# In OpenClaw session: Create document /path/to/file.png
```

## Configuration Requirements

- Set `SOPH_API_KEY` environment variable
- Or configure sophnet API key in OpenClaw config file

## Supported Parameters

- `file_path`: Local file path to upload (required)

## Return Value

- Success: Returns signed URL string
- Failure: Throws exception with error message

## Dependencies

- Python 3.7+
- requests library
- OpenClaw config access permission