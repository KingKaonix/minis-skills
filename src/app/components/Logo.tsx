import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
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
