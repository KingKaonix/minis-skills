import Link from "next/link";
import { ArrowUpRight, Download, Folder } from "lucide-react";
import type { Skill } from "@/lib/skills";

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className="card group flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Folder size={18} />
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {skill.categories.slice(0, 2).map((category) => (
            <Link
              key={category}
              href={`/skills?category=${encodeURIComponent(category)}`}
              className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-black/50 transition-colors hover:bg-primary/10 hover:text-primary dark:bg-white/5 dark:text-white/50 dark:hover:bg-primary/10 dark:hover:text-primary"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <h3 className="mt-4 text-base font-semibold tracking-tight text-dark dark:text-white">
        <Link href={`/skills/${skill.directory}`} className="hover:text-primary">
          {skill.name}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-black/55 dark:text-white/55">
        {skill.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/5 pt-4 dark:border-white/10">
        <Link
          href={`/skills/${skill.directory}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-orange-600"
        >
          View skill <ArrowUpRight size={13} />
        </Link>
        <a
          href={skill.downloadUrl}
          download
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-2.5 py-1.5 text-xs font-semibold text-black/60 transition-colors hover:border-primary hover:text-primary dark:border-white/15 dark:text-white/60 dark:hover:border-primary dark:hover:text-primary"
        >
          <Download size={13} /> .zip
        </a>
      </div>
    </article>
  );
}
