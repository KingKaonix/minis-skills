---
name: togetherai-tts
description: "Text-to-speech using TogetherAI API with MiniMax speech-2.6-turbo model. Use when the user needs togetherai-tts functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/marcus20232023-togetherai-tts","convertedAt":"2026-10-31T22:14:36.909Z","license":"Unknown"}}
---

# TogetherAI TTS

Text-to-speech using TogetherAI API with MiniMax speech-2.6-turbo model.

## Usage

```bash
cd /home/marc/clawd/skills/togetherai_tts
node index.js "your text here" output.mp3
```

## Configuration

Set these in `.env`:
- `TOGETHERAI_API_KEY`: Your TogetherAI API key
- `TOGETHERAI_MODEL`: Model to use (default: minimax/speech-2.6-turbo)
- `TTS_FORMAT`: Output format (default: mp3)
- `TTS_VOICE`: Voice to use (default: default)
