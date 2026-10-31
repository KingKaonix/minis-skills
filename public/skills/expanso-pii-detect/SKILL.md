---
name: expanso-pii-detect
description: "Detect personally identifiable information (PII) in text. Use when the user needs expanso-pii-detect functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/aronchick-expanso-pii-detect","convertedAt":"2026-10-31T22:11:01.615Z","license":"Unknown"}}
---

# pii-detect

Detect personally identifiable information (PII) in text

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
expanso-cli job deploy https://skills.expanso.io/pii-detect/pipeline-cli.yaml
```

## Files

| File | Purpose |
|------|---------|
| `skill.yaml` | Skill metadata (inputs, outputs, credentials) |
| `pipeline-cli.yaml` | Standalone CLI pipeline |
| `pipeline-mcp.yaml` | MCP server pipeline |
