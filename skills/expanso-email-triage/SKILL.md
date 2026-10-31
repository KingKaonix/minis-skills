---
name: expanso-email-triage
description: "AI-powered email triage with calendar sync and response drafting. Use when the user needs expanso-email-triage functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/aronchick-expanso-email-triage","convertedAt":"2026-10-31T22:11:01.006Z","license":"Unknown"}}
---

# email-triage

AI-powered email triage with calendar sync and response drafting

## Requirements

- Expanso Edge installed (`expanso-edge` binary in PATH)
- Install via: `clawhub install expanso-edge`

## Usage

### CLI Pipeline
```bash
# Run standalone
echo '<input>' | expanso-edge run pipeline-cli.yaml
```

### MCP Pipeline
```bash
# Start as MCP server
expanso-edge run pipeline-mcp.yaml
```

### Deploy to Expanso Cloud
```bash
expanso-cli job deploy https://skills.expanso.io/email-triage/pipeline-cli.yaml
```

## Files

| File | Purpose |
|------|---------|
| `skill.yaml` | Skill metadata (inputs, outputs, credentials) |
| `pipeline-cli.yaml` | Standalone CLI pipeline |
| `pipeline-mcp.yaml` | MCP server pipeline |
