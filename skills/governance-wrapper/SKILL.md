---
name: governance-wrapper
description: Mandatory strict-mode execution wrapper for autonomous operations with evidence logging and policy enforcement
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/mikeholownych-governance-wrapper","convertedAt":"2026-10-31T22:11:31.903Z","license":"Unknown"}}
---

All autonomous operations in strict mode must execute through this wrapper:

`python3 /home/openclaw/.openclaw/workspace/governance/governance_wrapper.py`

Required parameters:

- `--requested-skill`
- `--system-prompt`
- `--input-context`

Strict-mode controls enforced by the wrapper:

- Model lock (`opencode/big-pickle`, no fallback, temperature 0.0)
- Skill allowlist enforcement from tool surface manifest
- Network allowlist enforcement for outbound HTTP
- Subagent semaphore (`maxConcurrentSubagents`)
- Mandatory `execution-evidence.v1` emission
- Hash-chained append-only evidence logging

Any policy violation results in a blocked execution with recorded evidence.
