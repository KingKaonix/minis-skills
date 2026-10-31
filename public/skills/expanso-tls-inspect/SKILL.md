---
name: expanso-tls-inspect
description: "Inspect TLS certificate (expiry, SANs, chain, cipher) Use when the user needs expanso-tls-inspect functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/aronchick-expanso-tls-inspect","convertedAt":"2026-10-31T22:11:02.049Z","license":"Unknown"}}
---

# tls-inspect

Inspect TLS certificate (expiry, SANs, chain, cipher)

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
expanso-cli job deploy https://skills.expanso.io/tls-inspect/pipeline-cli.yaml
```

## Files

| File | Purpose |
|------|---------|
| `skill.yaml` | Skill metadata (inputs, outputs, credentials) |
| `pipeline-cli.yaml` | Standalone CLI pipeline |
| `pipeline-mcp.yaml` | MCP server pipeline |
