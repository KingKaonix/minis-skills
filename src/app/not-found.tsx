import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="section">
      <div className="shell flex flex-col items-center justify-center py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SearchX size={28} />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
          This page slipped out of the package
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-black/55 dark:text-white/55">
          The page or skill you are looking for does not exist. Try browsing the
          catalog instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/skills" className="btn-primary">
            Browse skills
          </Link>
          <Link href="/" className="btn-secondary">
            <ArrowLeft size={16} /> Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
