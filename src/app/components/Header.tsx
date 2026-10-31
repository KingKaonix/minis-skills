"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Github, Menu, Search, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";

const NAV = [
  { label: "Skills", href: "/skills" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-black/5 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-darkmode/85"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-black/60 hover:bg-black/5 hover:text-dark dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/skills"
            className="hidden h-10 items-center gap-2 rounded-xl border border-black/10 bg-white px-3.5 text-sm font-medium text-black/50 transition-colors hover:border-primary hover:text-primary sm:flex dark:border-white/15 dark:bg-white/5 dark:text-white/50 dark:hover:border-primary dark:hover:text-primary"
          >
            <Search size={15} />
            <span className="hidden lg:inline">Search skills</span>
          </Link>
          <a
            href="https://github.com/KingKaonix/minis-skills"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-black/60 transition-colors hover:border-primary hover:text-primary sm:flex dark:border-white/15 dark:bg-white/5 dark:text-white/60 dark:hover:border-primary dark:hover:text-primary"
          >
            <Github size={17} />
          </a>
          <ThemeToggler />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-dark md:hidden dark:border-white/15 dark:bg-white/5 dark:text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 pb-6 pt-4 md:hidden dark:border-white/10 dark:bg-darkmode">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/KingKaonix/minis-skills"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
            >
              <Github size={16} /> GitHub repository
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
