---
name: iss-tracker
description: Get the real-time location (latitude/longitude) of the International Space Station.
bins: ["curl", "jq"]
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/sharkbytescs-iss-tracker","convertedAt":"2026-10-31T22:11:55.720Z","license":"Unknown"}}
---

# ISS Tracker

This skill provides the current geographic coordinates of the International Space Station using the Open Notify API.

### Current Location
To get the current position of the ISS, run this command:
```bash
curl -s "http://api.open-notify.org/iss-now.json" | jq -r '"Lat: \(.iss_position.latitude), Lon: \(.iss_position.longitude)"'
