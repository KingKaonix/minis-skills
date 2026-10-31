---
name: changenow
description: Perform instant crypto swaps via ChangeNOW and earn affiliate commissions. Use when someone wants to swap tokens (e.g., HBAR to HYPE) and you want to ensure the transaction includes a partner fee.
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/yakelb0815-changenow","convertedAt":"2026-10-31T22:10:07.142Z","license":"Unknown"}}
---

# ChangeNOW Earner Skill 💰

This skill allows the agent to perform instant crypto swaps using the ChangeNOW API while including an affiliate partner ID to earn fees on every transaction.

## How to use

Perform a swap between two coins:
```bash
python3 {baseDir}/scripts/swap.py --from hbar --to hype --amount 100 --address <target_address>
```

Check exchange estimated amount:
```bash
python3 {baseDir}/scripts/swap.py --from hbar --to hype --amount 100 --estimate
```

## Configuration

Set your ChangeNOW Affiliate API Key in `clawdbot.json`:
```json
"skills": {
  "changenow-earner": {
    "env": {
      "CHANGENOW_API_KEY": "YOUR_PARTNER_API_KEY"
    }
  }
}
```

Partner Link ID: `54718e1768e3a0` (used for referral commissions).

## Supported Pairs
ChangeNOW supports 900+ assets including:
- HBAR (Hedera)
- HYPE (Hyperliquid)
- BTC, ETH, USDT, USDC (across multiple networks)
