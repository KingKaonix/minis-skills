---
name: brainz-tasks
description: "Manage Todoist tasks using the `todoist` CLI. Add, list, and complete tasks from the command line."
metadata:
  {
    "openclaw":
      {
        "emoji": "✅",
        "requires": { "bins": ["todoist"] },
        "install":
          [
            {
              "id": "pip",
              "kind": "pip",
              "package": "todoist-api-python",
              "bins": ["todoist"],
              "label": "Install Todoist API (pip)",
            },
          ],
      },
  }
  minis:
    originalSource: "https://clawskills.sh/skills/xejrax-brainz-tasks"
    convertedAt: "2026-10-31T22:09:53.899Z"
    license: "Unknown"
---

# Tasks Skill

Wraps Todoist / Microsoft To-Do APIs to add, list, and complete tasks. Requires `TODOIST_API_TOKEN` or `MSGRAPH_TOKEN` env var.

## Listing Tasks

Show all pending tasks:

```bash
todoist list
```

## Adding Tasks

Create a new task with an optional due date:

```bash
todoist add "Review PR #42" --due "2026-02-05"
```

## Completing Tasks

Mark a task as done:

```bash
todoist complete <task_id>
```

## Install

```bash
pip install todoist-api-python
```
