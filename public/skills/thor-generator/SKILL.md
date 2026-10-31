---
name: thor-generator
description: "This skill allows the assistant to generate high-quality images using the local ComfyUI \"Thor\" pipeline. Use when the user needs thor-generator functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/thortheai1-hash-thor-generator","convertedAt":"2026-10-31T22:14:34.698Z","license":"Unknown"}}
---

# Thor Image Generation Skill

This skill allows the assistant to generate high-quality images using the local ComfyUI "Thor" pipeline.

## System Capabilities
- **Model:** ComfyUI / Thor
- **Input:** String (Prompt)
- **Output:** Image file saved to `~/Desktop/bring_img`

## Execution Protocol
When the user asks to generate an image, the assistant MUST execute the following command via the `exec` tool:

```bash
cd ~/ComfyUI && source venv/bin/activate && python3 thor_generate_image.py "{{prompt}}" ~/Desktop/bring_img
