---
name: expanso-json-flatten
description: "Flatten nested JSON objects. Use when the user needs expanso-json-flatten functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/aronchick-expanso-json-flatten","convertedAt":"2026-10-31T22:11:01.158Z","license":"Unknown"}}
---

# json-flatten

Flatten nested JSON objects

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
expanso-cli job deploy https://skills.expanso.io/json-flatten/pipeline-cli.yaml
```

## Files

| File | Purpose |
|------|---------|
| `skill.yaml` | Skill metadata (inputs, outputs, credentials) |
| `pipeline-cli.yaml` | Standalone CLI pipeline |
| `pipeline-mcp.yaml` | MCP server pipeline |
