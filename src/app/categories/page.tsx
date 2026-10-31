import type { Metadata } from "next";
import { Layers } from "lucide-react";
import CategoryGrid from "../components/CategoryGrid";
import { formatNumber, getCategories } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse Minis skills by category.",
};

export default function CategoriesPage() {
  const categories = getCategories();
  const total = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <div className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow inline-flex items-center gap-2">
            <Layers size={13} /> Collections
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
            Browse by category
          </h1>
          <p className="mt-3 text-sm leading-6 text-black/55 dark:text-white/55">
            {formatNumber(categories.length)} categories,{" "}
            {formatNumber(total)} skill listings. Pick a collection to narrow
            the catalog.
          </p>
        </div>

        <div className="mt-10">
          <CategoryGrid categories={categories} />
        </div>
      </div>
    </div>
  );
}
