import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  pages: number;
  q?: string;
  category?: string;
};

function buildHref(page: number, q?: string, category?: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/skills?${query}` : "/skills";
}

export default function Pagination({ page, pages, q, category }: PaginationProps) {
  if (pages <= 1) return null;

  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(pages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  const numbers: number[] = [];
  for (let index = start; index <= end; index += 1) numbers.push(index);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <Link
        href={buildHref(Math.max(1, page - 1), q, category)}
        aria-disabled={page === 1}
        className={`inline-flex h-10 items-center gap-1 rounded-xl border px-3 text-sm font-medium ${
          page === 1
            ? "pointer-events-none border-black/5 text-black/25 dark:border-white/10 dark:text-white/25"
            : "border-black/10 text-black/60 hover:border-primary hover:text-primary dark:border-white/15 dark:text-white/60 dark:hover:border-primary dark:hover:text-primary"
        }`}
      >
        <ChevronLeft size={15} /> Prev
      </Link>

      {numbers.map((number) => (
        <Link
          key={number}
          href={buildHref(number, q, category)}
          aria-current={number === page ? "page" : undefined}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold ${
            number === page
              ? "border-primary bg-primary text-white"
              : "border-black/10 text-black/60 hover:border-primary hover:text-primary dark:border-white/15 dark:text-white/60 dark:hover:border-primary dark:hover:text-primary"
          }`}
        >
          {number}
        </Link>
      ))}

      <Link
        href={buildHref(Math.min(pages, page + 1), q, category)}
        aria-disabled={page === pages}
        className={`inline-flex h-10 items-center gap-1 rounded-xl border px-3 text-sm font-medium ${
          page === pages
            ? "pointer-events-none border-black/5 text-black/25 dark:border-white/10 dark:text-white/25"
            : "border-black/10 text-black/60 hover:border-primary hover:text-primary dark:border-white/15 dark:text-white/60 dark:hover:border-primary dark:hover:text-primary"
        }`}
      >
        Next <ChevronRight size={15} />
      </Link>
    </nav>
  );
}
