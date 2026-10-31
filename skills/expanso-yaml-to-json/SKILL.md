---
name: expanso-yaml-to-json
description: "Convert YAML to JSON format. Use when the user needs expanso-yaml-to-json functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/aronchick-expanso-yaml-to-json","convertedAt":"2026-10-31T22:11:02.089Z","license":"Unknown"}}
---

# yaml-to-json

Convert YAML to JSON format

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
expanso-cli job deploy https://skills.expanso.io/yaml-to-json/pipeline-cli.yaml
```

## Files

| File | Purpose |
|------|---------|
| `skill.yaml` | Skill metadata (inputs, outputs, credentials) |
| `pipeline-cli.yaml` | Standalone CLI pipeline |
| `pipeline-mcp.yaml` | MCP server pipeline |
