---
name: native-run
description: "Native Run is an OpenClaw skill that allows executing native commands. Use when the user needs native-run functionality."
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/sadikjarvis-native-run","convertedAt":"2026-10-31T22:12:47.327Z","license":"Unknown"}}
---

# Native Run

## Overview
Native Run is an OpenClaw skill that allows executing native commands on the
local machine where the OpenClaw gateway is running.

This skill is useful for automation, testing and local tooling.

## What this skill does
- Executes native commands
- Returns output back to OpenClaw
- Runs only on the local gateway machine

## Usage

Send a message that matches the configured pattern.

Example:

Run native: whoami

## Platform
Windows

## Security notice
This skill can execute local commands.
Use only in a trusted environment.
