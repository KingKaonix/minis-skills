---
name: antfarm-cli
description: "Always use full path: `node ~/.openclaw/workspace/antfarm/dist/cli/cli.js`. Use when the user needs antfarm-cli functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/felipetruman-antfarm-cli","convertedAt":"2026-10-31T22:30:16.845Z","license":"Unknown"}}
---

# Antfarm CLI Skill

Always use full path: `node ~/.openclaw/workspace/antfarm/dist/cli/cli.js`

## Commands

### Workflow
```bash
# List available workflows
node ~/.openclaw/workspace/antfarm/dist/cli/cli.js workflow list

# Install workflow
node ~/.openclaw/workspace/antfarm/dist/cli/cli.js workflow install <name>

# Run workflow
node ~/.openclaw/workspace/antfarm/dist/cli/cli.js workflow run <workflow-id> "<task>"

# Check status
node ~/.openclaw/workspace/antfarm/dist/cli/cli.js workflow status "<query>"
```

### Dashboard
```bash
# Start
node ~/.openclaw/workspace/antfarm/dist/cli/cli.js dashboard start

# Status
node ~/.openclaw/workspace/antfarm/dist/cli/cli.js dashboard status
```

### Logs
```bash
# Recent activity
node ~/.openclaw/workspace/antfarm/dist/cli/cli.js logs

# Specific run
node ~/.openclaw/workspace/antfarm/dist/cli/cli.js logs <run-id>
```
