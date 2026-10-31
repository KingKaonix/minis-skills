import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Download,
  FileCode2,
  FolderDown,
  Package,
  ShieldCheck,
} from "lucide-react";
import { getRelatedSkills, getSkillBySlug } from "@/lib/skills";
import SkillCard from "../../components/SkillCard";
import SkillMarkdown from "../../components/SkillMarkdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return { title: "Skill not found" };

  return {
    title: skill.name,
    description: skill.description,
    openGraph: {
      title: `${skill.name} — minisskills`,
      description: skill.description,
    },
  };
}

export default async function SkillDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) notFound();

  const size = skill.size ?? null;
  const related = getRelatedSkills(skill, 4);

  return (
    <div className="section">
      <div className="shell">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-black/40 dark:text-white/40">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/skills" className="hover:text-primary">
            Skills
          </Link>
          <span>/</span>
          <span className="text-black/60 dark:text-white/60">{skill.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {skill.categories.map((category) => (
                <Link
                  key={category}
                  href={`/skills?category=${encodeURIComponent(category)}`}
                  className="chip"
                >
                  {category}
                </Link>
              ))}
            </div>

            <h1 className="mt-4 flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
              {skill.name}
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                ready to install
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-black/55 dark:text-white/55">
              {skill.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={skill.downloadUrl} download className="btn-primary">
                <Download size={16} /> Download .zip
                {size ? (
                  <span className="text-white/70">· {size}</span>
                ) : null}
              </a>
              <a
                href={skill.skillPath}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <FileCode2 size={16} /> View SKILL.md
              </a>
            </div>

            <div className="mt-10 card p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2 border-b border-black/5 pb-4 dark:border-white/10">
                <FileCode2 size={16} className="text-primary" />
                <h2 className="text-sm font-semibold text-dark dark:text-white">
                  SKILL.md
                </h2>
                <span className="ml-auto text-[11px] text-black/35 dark:text-white/35">
                  from the package
                </span>
              </div>

              <SkillMarkdown src={skill.skillPath} />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="card p-6">
              <h2 className="text-sm font-semibold text-dark dark:text-white">
                Package details
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="inline-flex items-center gap-2 text-black/45 dark:text-white/45">
                    <Package size={14} /> Format
                  </dt>
                  <dd className="font-medium text-dark dark:text-white">
                    .zip
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="inline-flex items-center gap-2 text-black/45 dark:text-white/45">
                    <FolderDown size={14} /> Size
                  </dt>
                  <dd className="font-medium text-dark dark:text-white">
                    {size ?? "pending"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="inline-flex items-center gap-2 text-black/45 dark:text-white/45">
                    <ShieldCheck size={14} /> Hosting
                  </dt>
                  <dd className="font-medium text-dark dark:text-white">
                    self-hosted
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="inline-flex items-center gap-2 text-black/45 dark:text-white/45">
                    <CheckCircle2 size={14} /> License
                  </dt>
                  <dd className="font-medium text-dark dark:text-white">
                    see SOURCE.md
                  </dd>
                </div>
              </dl>
            </div>

            <div id="install" className="card p-6">
              <h2 className="text-sm font-semibold text-dark dark:text-white">
                Install in Minis
              </h2>
              <ol className="mt-4 space-y-4 text-sm text-black/55 dark:text-white/55">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    1
                  </span>
                  Download the .zip package from this page.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    2
                  </span>
                  Unzip it into your Minis skills directory.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    3
                  </span>
                  Ask Minis to use the skill — it will load SKILL.md when
                  relevant.
                </li>
              </ol>
              <Link
                href="/about#install"
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-orange-600"
              >
                Read the install guide <ArrowUpRight size={13} />
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 border-t border-black/5 pt-10 dark:border-white/10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold tracking-tight text-dark dark:text-white">
                Related skills
              </h2>
              <Link
                href={`/skills?category=${encodeURIComponent(
                  skill.categories[0] ?? "",
                )}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-orange-600"
              >
                More in {skill.categories[0] ?? "this category"}{" "}
                <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <SkillCard key={item.directory} skill={item} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10">
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-black/50 hover:text-primary dark:text-white/50 dark:hover:text-primary"
          >
            <ArrowLeft size={15} /> Back to all skills
          </Link>
        </div>
      </div>
    </div>
  );
}
