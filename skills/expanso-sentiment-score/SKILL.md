---
name: expanso-sentiment-score
description: "\"Score text sentiment from -1 (negative) to +1 (positive)\". Use when the user needs expanso-sentiment-score functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/aronchick-expanso-sentiment-score","convertedAt":"2026-10-31T22:11:01.970Z","license":"Unknown"}}
---

# sentiment-score

"Score text sentiment from -1 (negative) to +1 (positive)"

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
expanso-cli job deploy https://skills.expanso.io/sentiment-score/pipeline-cli.yaml
```

## Files

| File | Purpose |
|------|---------|
| `skill.yaml` | Skill metadata (inputs, outputs, credentials) |
| `pipeline-cli.yaml` | Standalone CLI pipeline |
| `pipeline-mcp.yaml` | MCP server pipeline |
