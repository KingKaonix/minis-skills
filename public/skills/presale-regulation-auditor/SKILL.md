---
name: presale-regulation-auditor
description: Audit regulation freshness and update policy-driven controls without hardcoding. Use when checking if sales/process regulations are outdated, inconsistent with operations, or need config-level updates.
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/dtsiomo-presale-regulation-auditor","convertedAt":"2026-10-31T22:13:23.096Z","license":"Unknown"}}
---

Audit regulations as a repeatable config-driven workflow.

## Execute
1. Collect current regulation sources and version dates.
2. Compare each rule against active operational behavior and incidents.
3. Detect stale, conflicting, or non-executable rules.
4. Translate approved changes into config proposals (`policy_checks`, `fact_resolution`, routing impacts).
5. Produce a change report with risk class and rollout recommendation.

## Required output
- Staleness matrix (rule -> status -> evidence).
- Proposed config diffs.
- Backward-compatibility notes.

## Reference
Use `references/regulation-check-workflow.md` for step-by-step audit structure.