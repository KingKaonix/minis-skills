---
name: feishu-common
description: "Shared Feishu authentication and API helper for OpenClaw Feishu skills. Use when the user needs feishu-common functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/autogame-17-feishu-common","convertedAt":"2026-10-31T22:11:06.544Z","license":"Unknown"}}
---

# feishu-common Skill

## Description
Shared Feishu authentication and API helper for OpenClaw Feishu skills.

Provides:
- Tenant token acquisition and cache
- Retry and timeout handling
- Authenticated request wrapper with token refresh

## Install Requirement
Install this skill before installing or running dependent Feishu skills.

## Usage
Dependent skills should import from `feishu-common`:

```javascript
const { getToken, fetchWithRetry, fetchWithAuth } = require("../feishu-common/index.js");
```

Compatibility alias is also available:

```javascript
const { getToken, fetchWithAuth } = require("../feishu-common/feishu-client.js");
```

## Files
- `index.js`: Main implementation.
- `feishu-client.js`: Compatibility alias to `index.js`.
