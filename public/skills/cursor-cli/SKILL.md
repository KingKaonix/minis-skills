---
name: cursor-cli
description: Use Cursor editor and Cursor agent for coding tasks
metadata: {"openclaw":{"requires":{"bins":["cursor","cursor-agent"]},"emoji":"⌨️","homepage":"https://cursor.com/docs/cli/overview"},"minis":{"originalSource":"https://clawskills.sh/skills/pyavchik-cursor-cli","convertedAt":"2026-10-31T22:10:34.967Z","license":"Unknown"}}
---

# Cursor CLI skill

Use this skill for coding tasks with Cursor editor.

## Commands

### 1. Open file in Cursor
```bash
cursor --goto file.py:line
```

### 2. Use Cursor Agent (AI coding assistant)
```bash
cursor-agent -p "your question" --mode=ask --output-format text
```

### 3. Open diff between files
```bash
cursor --diff file1.py file2.py
```

## Examples

**Open file at specific line:**
```
cursor --goto conftest.py:180
```

**Ask Cursor AI:**
```
cursor-agent -p "Explain what recursion is" --mode=ask --output-format text
```

**Review code:**
```
cursor-agent -p "Review this code for bugs" --output-format text
```

## Notes

- Run from the project directory when possible
- Cursor agent may take 30-120 seconds for complex tasks
- Works best with Cursor Pro for full AI capabilities
