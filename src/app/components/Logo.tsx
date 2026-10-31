import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/25 transition-transform group-hover:-rotate-6">
        <Sparkles size={18} strokeWidth={2.4} />
      </span>
      <span
        className={`text-xl font-bold tracking-tight ${
          light ? "text-white" : "text-dark dark:text-white"
        }`}
      >
        minis<span className="text-primary">skills</span>
      </span>
    </Link>
  );
}
