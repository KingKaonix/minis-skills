import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  FileCode2,
  FolderTree,
  Info,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About & install guide",
  description:
    "Learn what Minis skills are, how SKILL.md packages work, and how to install a downloaded skill.",
};

const FAQ = [
  {
    q: "Do I need an account to download a skill?",
    a: "No. Every package is served directly from this site. There is no sign-up, paywall, or tracking gate.",
  },
  {
    q: "Where do the skills come from?",
    a: "The catalog aggregates community-built skills. Each package keeps its original attribution and source note inside SOURCE.md so you can verify where it came from.",
  },
  {
    q: "Are the packages safe to run?",
    a: "Skills are instruction sets, and some bundle scripts. Read SKILL.md and any scripts before installing, especially for skills that touch credentials, the shell, or your personal data.",
  },
  {
    q: "Can I submit my own skill?",
    a: "Yes. Open a pull request against the GitHub repository with a lowercase kebab-case directory and a SKILL.md containing name and description in the frontmatter.",
  },
];

export default function AboutPage() {
  return (
    <div className="section">
      <div className="shell">
        <div className="max-w-3xl">
          <span className="eyebrow inline-flex items-center gap-2">
            <Info size={13} /> About minisskills
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
            Skills are how Minis learns new tricks
          </h1>
          <p className="mt-4 text-base leading-7 text-black/55 dark:text-white/55">
            <a
              href="https://openminis.app"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:text-orange-600"
            >
              Minis
            </a>{" "}
            is a private, on-device AI agent. A skill is a folder containing a{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.85em] text-dark dark:bg-white/10 dark:text-white">
              SKILL.md
            </code>{" "}
            file: YAML metadata that tells the agent when to use it, plus
            Markdown instructions for how to do the work. Minis reads the
            metadata first and only loads the full instructions when a request
            matches.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Discoverable",
              body: "The name and description are always in context, so the agent knows which skill to reach for.",
            },
            {
              icon: FileCode2,
              title: "Portable",
              body: "A skill is just a folder. Download the zip, unzip it, and the package is ready.",
            },
            {
              icon: ShieldCheck,
              title: "Local-first",
              body: "Downloads come straight from this site. No marketplace account or proxy in the middle.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon size={20} />
              </span>
              <h2 className="mt-4 text-base font-semibold text-dark dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/55">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <section id="install" className="mt-16 scroll-mt-24">
          <div className="max-w-2xl">
            <span className="eyebrow">Install guide</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
              Add a skill to Minis
            </h2>
            <p className="mt-3 text-sm leading-6 text-black/55 dark:text-white/55">
              The exact folder depends on your Minis install. The flow is the
              same everywhere: download, unzip, then ask the agent to use it.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <ol className="space-y-4">
              {[
                {
                  icon: Download,
                  title: "Download the package",
                  body: "Pick a skill and hit Download .zip. The file is served directly from this site.",
                },
                {
                  icon: FolderTree,
                  title: "Unzip it into your skills folder",
                  body: "The zip contains a single skill directory with SKILL.md at its root, plus SOURCE.md for attribution.",
                },
                {
                  icon: PackageCheck,
                  title: "Ask Minis to use it",
                  body: "Start a request that matches the skill's description. Minis loads the metadata, then the full instructions.",
                },
              ].map((step, index) => (
                <li key={step.title} className="card flex gap-4 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-dark dark:text-white">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-black/55 dark:text-white/55">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-black/5 px-5 py-3 dark:border-white/10">
                <FileCode2 size={15} className="text-primary" />
                <span className="text-xs font-semibold text-dark dark:text-white">
                  What is inside
                </span>
              </div>
              <pre className="overflow-x-auto bg-[#0d1117] p-5 text-[12px] leading-6 text-white/70">
                <code>{`web-search/
├── SKILL.md      # required
├── SOURCE.md     # attribution
├── scripts/      # optional
└── references/   # optional`}</code>
              </pre>
              <div className="p-5">
                <p className="text-xs leading-6 text-black/50 dark:text-white/50">
                  <span className="font-semibold text-dark dark:text-white">
                    SKILL.md
                  </span>{" "}
                  starts with YAML frontmatter:
                </p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-black/5 p-4 text-[11.5px] leading-6 text-dark dark:bg-white/5 dark:text-white/70">
                  <code>{`---
name: web-search
description: >
  Search the web when the user
  asks for current information.
---`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-2xl">
            <span className="eyebrow">Good to know</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
              Attribution & safety
            </h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <CheckCircle2 size={16} className="text-success" /> Original
                attribution kept
              </h3>
              <p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/55">
                Every package includes a SOURCE.md with the original source and
                license note when available. We do not strip authorship.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <ShieldCheck size={16} className="text-success" /> Review before
                you run
              </h3>
              <p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/55">
                Skills can include scripts and can ask the agent to use tools.
                Read the package first, especially anything that touches secrets
                or the shell.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-2xl">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
              Common questions
            </h2>
          </div>
          <div className="mt-6 divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/5 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-darklight">
            {FAQ.map((item) => (
              <details key={item.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-dark dark:text-white">
                  {item.q}
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-black/55 dark:text-white/55">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/skills" className="btn-primary">
            Browse skills <ArrowUpRight size={16} />
          </Link>
          <a
            href="https://github.com/KingKaonix/minis-skills"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Submit a skill on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
