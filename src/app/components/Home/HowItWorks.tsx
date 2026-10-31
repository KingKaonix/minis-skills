import { Download, FolderSearch, PackageCheck } from "lucide-react";

const STEPS = [
  {
    icon: FolderSearch,
    title: "Find a skill",
    body: "Search by name, tool, or category. Every listing explains what the skill does and when the agent should use it.",
  },
  {
    icon: Download,
    title: "Download the package",
    body: "Grab the .zip directly from this site. Each package contains a validated SKILL.md plus any bundled references.",
  },
  {
    icon: PackageCheck,
    title: "Add it to Minis",
    body: "Unzip into your Minis skills folder or import the package from the app. No accounts, keys, or middlemen.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl dark:text-white">
            From catalog to agent in three steps
          </h2>
          <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/55">
            Skills are just folders with a SKILL.md file. Minis loads the
            metadata first, then pulls in the full instructions only when a
            request matches.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="card relative p-6">
              <span className="absolute right-5 top-5 text-4xl font-bold text-black/[0.04] dark:text-white/[0.06]">
                0{index + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-dark dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/55">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
