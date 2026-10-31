import Link from "next/link";
import {
  Bot,
  Brain,
  Briefcase,
  Calendar,
  Cloud,
  Code2,
  Cpu,
  FileText,
  Film,
  Gamepad2,
  Globe,
  HeartPulse,
  Home,
  Image,
  Layers,
  Lock,
  Megaphone,
  MessageSquare,
  Music,
  Notebook,
  Search,
  ShoppingBag,
  Smartphone,
  Terminal,
  Truck,
  Wrench,
} from "lucide-react";
import type { SkillCategory } from "@/lib/skills";
import { formatNumber } from "@/lib/skills";

const ICONS: Record<string, typeof Layers> = {
  "Coding Agents & IDEs": Code2,
  "Web & Frontend Development": Globe,
  "DevOps & Cloud": Cloud,
  "Search & Research": Search,
  "Browser & Automation": Bot,
  "Productivity & Tasks": Briefcase,
  "CLI Utilities": Terminal,
  "Image & Video Generation": Image,
  "AI & LLMs": Brain,
  "Git & GitHub": Code2,
  Communication: MessageSquare,
  Transportation: Truck,
  "PDF & Documents": FileText,
  "Marketing & Sales": Megaphone,
  "Media & Streaming": Film,
  "Health & Fitness": HeartPulse,
  "Notes & PKM": Notebook,
  "Calendar & Scheduling": Calendar,
  "Security & Passwords": Lock,
  "Personal Development": Brain,
  "Shopping & E-commerce": ShoppingBag,
  "Apple Apps & Services": Smartphone,
  "Speech & Transcription": Music,
  "Smart Home & IoT": Home,
  "Data & Analytics": Cpu,
  "Clawbot Tools": Wrench,
  Moltbook: Layers,
  "Self-hosted & Automation": Wrench,
  "iOS & macOS Development": Smartphone,
  Gaming: Gamepad2,
  Uncategorized: Layers,
};

export default function CategoryGrid({
  categories,
  limit,
}: {
  categories: SkillCategory[];
  limit?: number;
}) {
  const shown = typeof limit === "number" ? categories.slice(0, limit) : categories;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {shown.map((category) => {
        const Icon = ICONS[category.name] ?? Layers;
        return (
          <Link
            key={category.name}
            href={`/skills?category=${encodeURIComponent(category.name)}`}
            className="card group flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Icon size={18} />
            </span>
            <span className="text-sm font-semibold leading-5 text-dark dark:text-white">
              {category.name}
            </span>
            <span className="text-xs text-black/40 dark:text-white/40">
              {formatNumber(category.count)} skills
            </span>
          </Link>
        );
      })}
    </div>
  );
}
