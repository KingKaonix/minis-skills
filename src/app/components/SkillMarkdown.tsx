"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileCode2, Loader2, Sparkles } from "lucide-react";

type Status = "loading" | "ready" | "missing";

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith("---")) return raw;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\s+/, "");
}

export default function SkillMarkdown({ src }: { src: string }) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    fetch(src)
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        if (cancelled) return;
        setContent(stripFrontmatter(text));
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (status === "loading") {
    return (
      <div className="space-y-3 py-4" aria-label="Loading SKILL.md">
        <div className="flex items-center gap-2 text-xs text-black/35 dark:text-white/35">
          <Loader2 size={14} className="animate-spin" /> Loading SKILL.md…
        </div>
        {[92, 78, 85, 64, 88].map((width, index) => (
          <div
            key={index}
            className="h-3 animate-pulse rounded bg-black/5 dark:bg-white/10"
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
    );
  }

  if (status === "missing") {
    return (
      <div className="py-10 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles size={22} />
        </span>
        <h3 className="mt-4 text-base font-semibold text-dark dark:text-white">
          Full instructions coming soon
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-black/50 dark:text-white/50">
          The downloadable package is being prepared. In the meantime, the
          description above explains what this skill does.
        </p>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-orange-600"
        >
          <FileCode2 size={13} /> Try the raw file
        </a>
      </div>
    );
  }

  return (
    <div className="skill-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
