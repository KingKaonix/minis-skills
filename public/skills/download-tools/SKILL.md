---
name: download-tools
description: CLI download tools for YouTube and WeChat
metadata:
  {
    "openclaw": {
      "requires": { "bins": ["curl", "yt-dlp"] },
      "install": [
        { "id": "yt-dlp", "kind": "brew", "package": "yt-dlp" },
        { "id": "ffmpeg", "kind": "brew", "package": "ffmpeg" }
      ]
    }
  }
  minis:
    originalSource: "https://clawskills.sh/skills/jqlong17-download-tools"
    convertedAt: "2026-10-31T22:10:47.911Z"
    license: "Unknown"
---

# Download Tools

A collection of CLI download tools for YouTube and WeChat articles.

## Tools

### wechat-dl.sh
Download WeChat articles as TXT.

```bash
./wechat-dl.sh "https://mp.weixin.qq.com/s/xxx" [output_name]
```

### yt-audio.sh
Download YouTube audio as MP3.

```bash
./yt-audio.sh "https://youtube.com/watch?v=xxx" [output_name]
```

## Install

```bash
brew install yt-dlp ffmpeg
```
