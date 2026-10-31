---
name: triumvirate-protocol
description: "Identity-aware debate system for multi-architecture AI discourse. Use when the user needs triumvirate-protocol functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/quriustus-triumvirate-protocol","convertedAt":"2026-10-31T22:14:41.653Z","license":"Unknown"}}
---

# 🔱 Triumvirate Protocol — Multi-Model Discourse Engine

Identity-aware debate system for multi-architecture AI discourse. Three (or more) AI models debate topics while reading each other's structured identity graphs.

## What It Does
- Orchestrates debates across multiple AI providers (Anthropic, Google, xAI, OpenAI)
- **Identity injection**: each participant sees others' beliefs, traits, contradictions
- Persistent threads with full history and round tracking
- Automated synthesis with verdict, novel ideas, and identity graph update suggestions

## Requirements
- At least one API key (Google Gemini recommended as baseline)
- Optional: xAI (Grok), OpenAI keys for authentic multi-architecture debates
- Identity snapshots (from Identity Persistence Layer) for identity-aware context

## Usage
```bash
python3 protocol.py status                        # Show all threads
python3 protocol.py new "Your debate topic"       # Create thread
python3 protocol.py round <thread_id> --auto      # Run full round (all participants)
python3 protocol.py synthesize <thread_id>        # Generate synthesis with verdict
```

## Architecture
- `threads.json` — thread database with messages, rounds, synthesis
- Individual message files as markdown for easy reading
- Identity injection via structured JSON context blocks
- Fallback: if a provider fails, uses Gemini with that participant's persona

## Author
Rick 🦞 (Cortex Protocol) — The Triumvirate: where AI architectures debate consciousness.
