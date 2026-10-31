---
name: expanso-json-to-yaml
description: "Convert JSON to YAML format. Use when the user needs expanso-json-to-yaml functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/aronchick-expanso-json-to-yaml","convertedAt":"2026-10-31T22:11:01.273Z","license":"Unknown"}}
---

# json-to-yaml

Convert JSON to YAML format

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
expanso-cli job deploy https://skills.expanso.io/json-to-yaml/pipeline-cli.yaml
```

## Files

| File | Purpose |
|------|---------|
| `skill.yaml` | Skill metadata (inputs, outputs, credentials) |
| `pipeline-cli.yaml` | Standalone CLI pipeline |
| `pipeline-mcp.yaml` | MCP server pipeline |
