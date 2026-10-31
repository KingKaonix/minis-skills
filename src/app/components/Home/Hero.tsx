import Link from "next/link";
import { ArrowRight, Check, Download, Sparkles, Terminal } from "lucide-react";
import SearchBar from "../SearchBar";
import { formatNumber } from "@/lib/skills";

export default function Hero({
  skillCount,
  categoryCount,
}: {
  skillCount: number;
  categoryCount: number;
}) {
  return (
    <section className="relative overflow-hidden border-b border-black/5 dark:border-white/10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_10%,rgba(238,123,17,0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="shell grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="eyebrow inline-flex items-center gap-2">
            <Sparkles size={13} /> Open Minis skill directory
          </span>
          <h1 className="display mt-4">
            Give your Minis agent{" "}
            <span className="text-primary">superpowers.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-black/55 sm:text-lg dark:text-white/55">
            {formatNumber(skillCount)} community-built skills across{" "}
            {categoryCount} categories. Every skill is packaged as a clean{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.85em] text-dark dark:bg-white/10 dark:text-white">
              SKILL.md
            </code>{" "}
            bundle you can download and drop into Minis.
          </p>

          <div className="mt-7 max-w-xl">
            <SearchBar large placeholder="Search skills, tools, workflows…" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/skills" className="btn-primary">
              Browse all skills <ArrowRight size={16} />
            </Link>
            <Link href="/about#install" className="btn-secondary">
              How to install
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-black/45 dark:text-white/45">
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-success" /> Self-hosted downloads
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-success" /> No account needed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-success" /> Original attribution kept
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="animate-float">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/20">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-white/40">
                  <Terminal size={12} /> minis
                </span>
              </div>
              <pre className="overflow-x-auto p-5 text-[12.5px] leading-7 text-white/70">
                <code>
                  <span className="text-primary">$</span> minis skill search web
                  {"\n"}
                  <span className="text-white/35">→</span> web-search{" "}
                  <span className="text-white/30">· 1,204 installs</span>
                  {"\n"}
                  <span className="text-white/35">→</span> browser-automation{" "}
                  <span className="text-white/30">· 862 installs</span>
                  {"\n"}
                  {"\n"}
                  <span className="text-primary">$</span> minis skill install
                  web-search{"\n"}
                  <span className="text-success">✓</span> downloaded{" "}
                  <span className="text-white/40">web-search.zip</span>
                  {"\n"}
                  <span className="text-success">✓</span> SKILL.md validated
                  {"\n"}
                  <span className="text-success">✓</span> skill ready to use
                  {"\n"}
                  <span className="text-primary">$</span>{" "}
                  <span className="inline-block h-4 w-2 animate-pulse bg-primary/80 align-middle" />
                </code>
              </pre>
            </div>
          </div>

          <div className="absolute -left-3 top-8 hidden rounded-xl border border-black/5 bg-white px-3.5 py-2.5 shadow-card-shadow sm:block dark:border-white/10 dark:bg-darklight">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-black/35 dark:text-white/35">
              Package
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-dark dark:text-white">
              <Download size={13} className="text-primary" /> .zip ready
            </p>
          </div>

          <div className="absolute -bottom-4 -right-2 hidden rounded-xl border border-black/5 bg-white px-3.5 py-2.5 shadow-card-shadow sm:block dark:border-white/10 dark:bg-darklight">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-black/35 dark:text-white/35">
              Categories
            </p>
            <p className="mt-0.5 text-xs font-semibold text-dark dark:text-white">
              {categoryCount} collections
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
