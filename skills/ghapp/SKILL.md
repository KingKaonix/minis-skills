---
name: ghapp
description: Give your AI agents and automations their own GitHub (App) identity. Authenticate using GitHub Apps so every commit, PR, and action is attributed to the bot — not your personal account.
homepage: https://github.com/operator-kit/ghapp-cli
metadata: {"clawdbot":{"emoji":"🔑","requires":{"bins":["ghapp"]},"install":[{"id":"brew","kind":"brew","formula":"operator-kit/tap/ghapp","bins":["ghapp"],"label":"Install ghapp (brew)"}]},"minis":{"originalSource":"https://clawskills.sh/skills/rmorse-ghapp","convertedAt":"2026-10-31T22:11:24.276Z","license":"Unknown"}}
---

# ghapp

Use `ghapp` to authenticate as a GitHub App so `git` and `gh` commands use installation tokens. Requires a GitHub App with App ID, Installation ID, and a private key (.pem).

Setup
- `ghapp setup` — interactive wizard: enter App ID, Installation ID, key path, then configure auth
- `ghapp auth configure` — configure git + gh authentication (if skipped during setup)
- `ghapp auth status` — show current auth config and diagnostics

Commands
- `ghapp --help` — list all commands and flags
- `ghapp token` — print an installation token (cached; `--no-cache` for fresh)
- `ghapp auth configure [--gh-auth shell-function|path-shim|none]` — configure how git/gh authenticate
- `ghapp auth status` — check auth health
- `ghapp auth reset [--remove-key]` — undo all auth config
- `ghapp config set`, `ghapp config get [key]`, `ghapp config path` — manage config
- `ghapp update` — self-update to latest release
- `ghapp version` — print version

gh auth modes (passed to `auth configure`)
- `shell-function` — auto-authenticates gh commands via shell integration (recommended)
- `path-shim` — wrapper binary for CI/containers
- `none` — static token in hosts.yml

Notes
- After setup, `git clone/push/pull` and `gh` work without manual tokens.
- Commits are attributed to the app's bot account (e.g., `myapp[bot]`).
- Tokens are cached locally and auto-refreshed.
- Config stored at `~/.config/ghapp/config.yaml`.
