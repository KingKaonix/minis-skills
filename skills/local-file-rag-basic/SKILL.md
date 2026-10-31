---
name: local-file-rag-basic
version: 1.0.0
author: wjreliable
description: High-performance local File RAG suite (Basic Edition).
metadata: {"minis":{"originalSource":"https://clawskills.sh/skills/wjreliable-local-file-rag-basic","convertedAt":"2026-10-31T22:12:15.767Z","license":"Unknown"}}
---

# Skill: Local File RAG Search (Basic Edition)

## Description
This is the **Basic Edition** of the high-performance local RAG suite, providing efficient code and document retrieval within constraints.
- **Constraints**: 
  - Only indexes files **under 20MB**.
  - Uses single-threaded (sequential) indexing for lower resource usage.
- **Support**: JS/TS, Python, C++, Go, Markdown, PDF, DOCX, XLSX, etc.

## Tools

### local_file_rag_search
Efficiently searches the local workspace. 

**Parameters:**
- `query` (string, required): Search terms or function names.
- `targetFile` (string, optional): Specific file path to restrict the search.
- `rootDir` (string, optional): Root directory to scan.

**Output Protocol:**
Returns a structured result with Skeletons, Metadata, and Clustered Code Snippets.
