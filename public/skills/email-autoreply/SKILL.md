---
name: email-autoreply
description: "Generate context-aware email replies. Use when the user needs email-autoreply functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/user520512-email-autoreply","convertedAt":"2026-10-31T22:10:53.497Z","license":"Unknown"}}
---

# Email Auto-Reply Generator

Generate context-aware email replies.

## Usage

```bash
npx email-autoreply
```

## API

```typescript
import { generateReply } from 'email-autoreply';

const reply = await generateReply({
  scenario: "product-inquiry",
  tone: "professional",
  originalEmail: "你们的产品多少钱？"
});
```
