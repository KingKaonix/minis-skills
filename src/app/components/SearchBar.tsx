import Link from "next/link";
import { Search } from "lucide-react";

type SearchBarProps = {
  defaultValue?: string;
  category?: string;
  placeholder?: string;
  large?: boolean;
};

export default function SearchBar({
  defaultValue = "",
  category = "",
  placeholder = "Search 5,000+ skills…",
  large = false,
}: SearchBarProps) {
  return (
    <form
      action="/skills"
      method="get"
      className={`flex w-full items-center gap-2 rounded-2xl border border-black/10 bg-white p-2 shadow-card-shadow dark:border-white/15 dark:bg-darklight ${
        large ? "sm:p-2.5" : ""
      }`}
    >
      {category ? <input type="hidden" name="category" value={category} /> : null}
      <div className="flex flex-1 items-center gap-2 pl-2">
        <Search size={18} className="shrink-0 text-black/35 dark:text-white/35" />
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-label="Search skills"
          className={`w-full bg-transparent text-dark outline-none placeholder:text-black/35 dark:text-white dark:placeholder:text-white/35 ${
            large ? "py-2 text-base" : "py-1.5 text-sm"
          }`}
        />
      </div>
      <button
        type="submit"
        className={`shrink-0 rounded-xl bg-primary font-semibold text-white transition-colors hover:bg-orange-600 ${
          large ? "px-5 py-2.5 text-sm" : "px-3.5 py-2 text-xs"
        }`}
      >
        Search
      </button>
    </form>
  );
}
