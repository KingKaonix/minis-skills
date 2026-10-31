---
name: auto-test-generator
description: "Automatically generate basic unit/integration tests for OpenClaw skills. Use when the user needs auto-test-generator functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/autogame-17-auto-test-generator","convertedAt":"2026-10-31T22:09:39.885Z","license":"Unknown"}}
---

# Auto Test Generator

Automatically generate basic unit/integration tests for OpenClaw skills.
Use this to improve code quality and prevent regressions during evolution.

## Usage

```bash
node skills/auto-test-generator/index.js <skill-name>
```

## How It Works

1. Scans the target skill directory.
2. Analyzes `index.js` for exports.
3. Generates a `test.js` file with basic assertions (module loads, --help works).
4. Runs the generated test immediately.

## Example

```bash
node skills/auto-test-generator/index.js skill-health-monitor
```

Output:
- Creates `skills/skill-health-monitor/test.js`
- Runs it
- Reports success/failure
