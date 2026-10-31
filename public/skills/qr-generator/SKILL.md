---
name: qr-generator
description: Generate QR codes from text or URL for mobile scanning.
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/autogame-17-qr-generator","convertedAt":"2026-10-31T22:13:27.761Z","license":"Unknown"}}
---

# QR Generator

Generates a QR code image (PNG/SVG) or terminal output from a given text or URL.
Useful for transferring long URLs, WiFi credentials, or text snippets to mobile devices via Feishu (scan QR).

## Usage

```bash
# Generate a QR code image
node skills/qr-generator/index.js --text "https://openclaw.ai" --output "qr_code.png"

# Generate to terminal (ASCII art)
node skills/qr-generator/index.js --text "Hello World" --terminal
```

## Options

- `-t, --text <text>`: The text or URL to encode (required).
- `-o, --output <path>`: Output file path (e.g., `code.png`, `code.svg`).
- `--terminal`: Output QR code as ASCII art to the terminal.
- `--width <number>`: Width of the image (default: 500).
- `--color-dark <hex>`: Dark color (default: `#000000`).
- `--color-light <hex>`: Light color (default: `#ffffff`).

## Example: Send QR to Feishu

```bash
# 1. Generate QR code
node skills/qr-generator/index.js --text "https://example.com" --output "temp_qr.png"

# 2. Send to user via Feishu
node skills/feishu-image/send.js --target "ou_xxx" --file "temp_qr.png"

# 3. Clean up
rm temp_qr.png
```
