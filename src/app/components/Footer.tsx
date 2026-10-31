import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import Logo from "./Logo";
import { getCategories, formatNumber } from "@/lib/skills";

export default function Footer() {
  const categories = getCategories().slice(0, 5);

  return (
    <footer className="border-t border-white/10 bg-Dark-primary text-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
            A community catalog of installable skills for your on-device Minis
            agent. Browse, download, and drop them straight into Minis.
          </p>
          <p className="mt-4 text-xs text-white/35">
            Community project. Skills keep their original attribution inside
            each package.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Browse</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/50">
            <li>
              <Link href="/skills" className="hover:text-primary">
                All skills
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-primary">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/about#install" className="hover:text-primary">
                Install a skill
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Popular categories</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/50">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={`/skills?category=${encodeURIComponent(category.name)}`}
                  className="hover:text-primary"
                >
                  {category.name}
                  <span className="ml-1.5 text-white/25">
                    {formatNumber(category.count)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Resources</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/50">
            <li>
              <a
                href="https://openminis.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary"
              >
                Open Minis <ArrowUpRight size={13} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/KingKaonix/minis-skills"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary"
              >
                GitHub repo <Github size={13} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/KingKaonix/minis-skills/issues"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary"
              >
                Report an issue <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} minisskills. Built for the Minis
            community.
          </p>
          <p>Downloads are served directly from this site.</p>
        </div>
      </div>
    </footer>
  );
}
