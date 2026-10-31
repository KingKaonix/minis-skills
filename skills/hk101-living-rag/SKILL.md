---
name: hk101-living-rag
description: "Simple RAG over local text/markdown. Use when the user needs hk101-living-rag functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/metatronsdoob369-hk101-living-rag","convertedAt":"2026-10-31T22:11:40.834Z","license":"Unknown"}}
---

# claw-rag
Simple RAG over local text/markdown.

## Inputs
- query (string): question to answer.
- docsPath (string, optional): folder of docs (default ./docs relative to CWD).
- k (number, optional): number of top matches (default 3).

## Output
- answer: synthesized answer from matches.
- matches: [{path, score, snippet}...]

Requires: OPENAI_API_KEY in env.
