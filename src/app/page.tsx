import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import Hero from "./components/Home/Hero";
import Stats from "./components/Home/Stats";
import HowItWorks from "./components/Home/HowItWorks";
import CategoryGrid from "./components/CategoryGrid";
import SkillCard from "./components/SkillCard";
import {
  getAllSkills,
  getCategories,
  getFeaturedSkills,
  formatNumber,
} from "@/lib/skills";

export default function HomePage() {
  const skills = getAllSkills();
  const categories = getCategories();
  const featured = getFeaturedSkills(6);

  return (
    <>
      <Hero skillCount={skills.length} categoryCount={categories.length} />
      <Stats skillCount={skills.length} categoryCount={categories.length} />

      <section className="section">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Browse by category</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
                Find the right tool for the job
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-black/55 dark:text-white/55">
                From coding agents and browser automation to smart home and
                health, there is a skill for almost everything.
              </p>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-orange-600"
            >
              All {formatNumber(categories.length)} categories{" "}
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8">
            <CategoryGrid categories={categories} limit={8} />
          </div>
        </div>
      </section>

      <section className="section border-y border-black/5 bg-grey dark:border-white/10 dark:bg-darklight/40">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Featured skills</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
                Popular starting points
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-black/55 dark:text-white/55">
                A hand-picked slice of the catalog. Open any skill to read the
                full instructions before you install it.
              </p>
            </div>
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-orange-600"
            >
              Browse all skills <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((skill) => (
              <SkillCard key={skill.directory} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="pb-20">
        <div className="shell">
          <div className="relative overflow-hidden rounded-3xl bg-Dark-primary px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
              <Sparkles size={13} className="text-primary" /> Free and open
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Extend your agent with the skills you actually need
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/55">
              No sign-up, no marketplace lock-in. Search the catalog, download a
              package, and keep working locally.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                <Download size={16} /> Start browsing
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary"
              >
                Learn about skills
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
