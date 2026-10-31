import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import SearchBar from "../components/SearchBar";
import SkillCard from "../components/SkillCard";
import Pagination from "../components/Pagination";
import {
  formatNumber,
  getCategories,
  querySkills,
} from "@/lib/skills";

export const metadata: Metadata = {
  title: "Browse skills",
  description:
    "Search and filter thousands of installable skills for the Minis AI agent.",
};

type SearchParams = Promise<{
  q?: string | string[];
  category?: string | string[];
  page?: string | string[];
}>;

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = first(params.q).trim();
  const category = first(params.category).trim();
  const page = Math.max(1, Number.parseInt(first(params.page), 10) || 1);

  const result = querySkills({ q, category, page, perPage: 24 });
  const categories = getCategories();
  const topCategories = categories.slice(0, 14);

  return (
    <div className="section">
      <div className="shell">
        <div className="max-w-3xl">
          <span className="eyebrow">Skill catalog</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
            Browse every skill
          </h1>
          <p className="mt-3 text-sm leading-6 text-black/55 dark:text-white/55">
            {formatNumber(result.total)} skill
            {result.total === 1 ? "" : "s"} match your filters. Download any
            package and install it in Minis.
          </p>
        </div>

        <div className="mt-7 max-w-2xl">
          <SearchBar
            defaultValue={q}
            category={category}
            placeholder="Search by name, tool, or workflow…"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link
            href={q ? `/skills?q=${encodeURIComponent(q)}` : "/skills"}
            className={`chip ${category ? "" : "chip-active"}`}
          >
            All categories
          </Link>
          {topCategories.map((item) => (
            <Link
              key={item.name}
              href={`/skills?category=${encodeURIComponent(item.name)}${
                q ? `&q=${encodeURIComponent(q)}` : ""
              }`}
              className={`chip ${category === item.name ? "chip-active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
          {categories.length > topCategories.length ? (
            <Link href="/categories" className="chip">
              +{categories.length - topCategories.length} more
            </Link>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-5 text-sm dark:border-white/10">
          <p className="text-black/50 dark:text-white/50">
            {category ? (
              <>
                Category:{" "}
                <span className="font-semibold text-dark dark:text-white">
                  {category}
                </span>
              </>
            ) : (
              "Showing all categories"
            )}
            {q ? (
              <>
                {" "}
                · Query:{" "}
                <span className="font-semibold text-dark dark:text-white">
                  “{q}”
                </span>
              </>
            ) : null}
          </p>
          <p className="text-xs text-black/40 dark:text-white/40">
            Page {result.page} of {result.pages}
          </p>
        </div>

        {result.items.length > 0 ? (
          <>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {result.items.map((skill) => (
                <SkillCard key={skill.directory} skill={skill} />
              ))}
            </div>
            <Pagination
              page={result.page}
              pages={result.pages}
              q={q}
              category={category}
            />
          </>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 py-20 text-center dark:border-white/15">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <SearchX size={22} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-dark dark:text-white">
              No skills found
            </h2>
            <p className="mt-2 max-w-sm text-sm text-black/50 dark:text-white/50">
              Try a broader search term, or clear the category filter to see the
              full catalog.
            </p>
            <Link href="/skills" className="btn-primary mt-6">
              Clear filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
