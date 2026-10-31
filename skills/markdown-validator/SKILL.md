---
name: markdown-validator
description: Validates Markdown files for broken local links.
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/wanng-ide-markdown-validator","convertedAt":"2026-10-31T22:12:24.874Z","license":"Unknown"}}
---

# Markdown Validator

Validates Markdown files for broken local links. Use this skill to check internal documentation consistency.

## Usage

```bash
# Validate current directory
openclaw exec node skills/markdown-validator/index.js .

# Validate specific file
openclaw exec node skills/markdown-validator/index.js README.md
```

## Features

- Scans recursively
- Checks relative links
- Ignores external URLs (http/https)
- Ignores anchors within the same file (#anchor)
- Outputs JSON report of broken links with line numbers

## Example Output

```json
[
  {
    "file": "/path/to/README.md",
    "valid": false,
    "brokenLinks": [
      {
        "text": "Link Text",
        "url": "./broken-link.md",
        "line": 10
      }
    ]
  }
]
```
