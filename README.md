# minisskills

A community catalog of installable skills for [Minis](https://openminis.app), the private on-device AI agent.

Browse 5,000+ skills, read the full `SKILL.md`, and download a ready-to-install `.zip` directly from the site. On each skill page there's also a **Copy install prompt** button that copies instructions you can paste straight into Minis to install the skill directly — no manual download or unzip needed. No accounts, no marketplace gate, no links back to third-party directories.

## Stack

- **Next.js 15** (App Router) + React 19
- **Tailwind CSS 4**
- **Vercel** for hosting
- Static skill packages served from `public/downloads/`

## Local development

```bash
npm install
npm run data   # regenerate public/site-skills.json from skills.json
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected). No extra build settings needed.
4. Deploy.

Set `NEXT_PUBLIC_SITE_URL` to your production URL if you want canonical metadata to point at it.

## Analytics (Vercel Postgres)

Download, install, page-view, and online-count stats are stored in Postgres.
Set one of these in your Vercel project settings:

- `DATABASE_URL` — full Postgres connection string (Vercel Postgres provides this)
- `POSTGRES_URL` — alternate connection string

When neither is set, analytics silently degrades to empty defaults (no database required for local development). The `analytics_events` table is created automatically on first use.

## Project layout

```
├── src/app/                 # Next.js App Router pages + components
│   ├── page.tsx             # home
│   ├── skills/              # catalog + skill detail pages
│   ├── categories/          # category index
│   ├── about/               # about + install guide
│   └── components/          # shared UI (e.g. CopyInstallPrompt)
├── src/lib/skills.ts        # server-side catalog helpers
├── public/
│   ├── site-skills.json     # compact catalog shipped to the site
│   ├── skills/<slug>/       # rendered SKILL.md copies
│   └── downloads/<slug>.zip # self-hosted skill packages
├── skills/<slug>/           # source skill packages (SKILL.md + SOURCE.md)
├── scripts/
│   ├── build-site-data.mjs  # skills.json -> public/site-skills.json
│   └── convert-skills.mjs   # upstream catalog -> Minis packages
├── skills.json              # raw catalog metadata
└── legacy/                  # previous Vue 3 site (kept for reference)
```

## Skill format

Each skill is a directory with a `SKILL.md` file:

```md
---
name: web-search
description: >
  Search the web when the user asks for current information, recent news,
  or anything that requires live data.
---

# Web Search

...
```

The site renders the Markdown body on the skill detail page and serves the
same file inside the downloadable zip.

## Installing a skill from the catalog

On a skill detail page you have two ways to get the skill into Minis:

1. **Download .zip** — grab the self-hosted package, unzip it into your Minis
   skills directory, and ask Minis to use the skill.
2. **Copy install prompt** — click "Copy install prompt" next to the download
   button, then paste the copied text into your Minis chat. It tells the agent
   which skill to install and points it at the skill's `SKILL.md`, so Minis can
   fetch and load the instructions directly.

Either way, review `SKILL.md` (and any bundled scripts) before installing,
especially for skills that touch credentials, the shell, or your personal data.

## Attribution

The catalog aggregates community-built skills. Each package contains a
`SOURCE.md` with the original source and license note when available. Review
`SKILL.md` and any bundled scripts before installing a skill.

## Legacy

The previous Vue 3 + Vite site is preserved in [`legacy/`](./legacy) and is not
part of the Next.js build or deployment.
