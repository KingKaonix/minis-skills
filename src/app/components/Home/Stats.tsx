import { Download, FolderTree, Layers, ShieldCheck } from "lucide-react";
import { formatNumber } from "@/lib/skills";

export default function Stats({
  skillCount,
  categoryCount,
}: {
  skillCount: number;
  categoryCount: number;
}) {
  const items = [
    {
      icon: Layers,
      value: formatNumber(skillCount),
      label: "installable skills",
    },
    {
      icon: FolderTree,
      value: formatNumber(categoryCount),
      label: "categories",
    },
    {
      icon: Download,
      value: "1-click",
      label: "zip downloads",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "self-hosted",
    },
  ];

  return (
    <section className="border-b border-black/5 bg-grey py-10 dark:border-white/10 dark:bg-darklight/40">
      <div className="shell grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm dark:bg-white/5">
              <item.icon size={19} />
            </span>
            <div>
              <p className="text-xl font-bold tracking-tight text-dark dark:text-white">
                {item.value}
              </p>
              <p className="text-xs text-black/45 dark:text-white/45">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
