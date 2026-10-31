---
name: system-resource-monitor
description: A clean, reliable system resource monitor for CPU load, RAM, Swap, and Disk usage. Optimized for OpenClaw.
version: 1.0.0
author: Yennefer & Geralt
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/passersss-system-resource-monitor","convertedAt":"2026-10-31T22:14:25.441Z","license":"Unknown"}}
---

# System Resource Monitor

A specialized skill designed to provide concise, real-time server health reports. Unlike bloated alternatives, it uses native system calls for maximum reliability and speed.

## Features
- **CPU Load**: Displays 1, 5, and 15-minute averages.
- **Memory**: Tracks both physical RAM and Swap usage.
- **Disk**: Monitors root partition capacity and percentage.
- **Uptime**: Shows how long your "horse" has been running.

## Usage
Simply ask the agent for "system status", "resource usage", or "server health".
The skill executes the local `./scripts/monitor.sh` script.
