---
name: autogame-tales
description: "Generates short, atmospheric ghost stories or micro-fiction based on random prompts. Use when the user needs autogame-tales functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/autogame-17-autogame-tales","convertedAt":"2026-10-31T22:09:40.188Z","license":"Unknown"}}
---

# AutoGame Tales

Generates short, atmospheric ghost stories or micro-fiction based on random prompts.
Designed to add a narrative layer to the agent's personality and break utility stagnation.

## Features
- **Ghost Story Generator**: Creates eerie, atmospheric micro-fiction.
- **Random Prompts**: Uses a curated list of creepy/mysterious themes.
- **Feishu Card Output**: Delivers stories as formatted cards.

## Usage
```bash
# Generate a ghost story
node skills/autogame-tales/index.js --genre ghost

# Generate a sci-fi story
node skills/autogame-tales/index.js --genre sci-fi
```

## Blast Radius
- Reads: nothing.
- Writes: `memory/tales/` (logs generated stories).
- Dependencies: `feishu-evolver-wrapper/feishu-helper.js` (for sending cards).
