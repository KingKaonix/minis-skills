---
name: brew-install
description: "Install missing binaries via dnf (Fedora/Bazzite package manager)"
metadata:
  {
    "openclaw":
      {
        "emoji": "📦",
        "requires": { "bins": ["dnf"] },
        "install": [],
      },
  }
  minis:
    originalSource: "https://clawskills.sh/skills/xejrax-brew-install"
    convertedAt: "2026-10-31T22:09:54.732Z"
    license: "Unknown"
---

# Brew Install

Install missing binaries via dnf, the Fedora/Bazzite package manager. Despite the name, this skill wraps `dnf` on Bazzite rather than Homebrew.

## Commands

```bash
# Install a package
brew-install <package>

# Search for a package
brew-install search <query>
```

## Install

No installation needed. `dnf` is the default package manager on Fedora/Bazzite and is always present.
