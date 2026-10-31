import catalog from "../../public/site-skills.json";

export type Skill = {
  id: string;
  name: string;
  directory: string;
  description: string;
  categories: string[];
  downloadUrl: string;
  skillPath: string;
  size?: string;
};

export type SkillCategory = {
  name: string;
  count: number;
};

export type SkillQuery = {
  q?: string;
  category?: string;
  page?: number;
  perPage?: number;
};

export type SkillQueryResult = {
  items: Skill[];
  total: number;
  page: number;
  pages: number;
  perPage: number;
};

const skills = catalog as Skill[];

export function getAllSkills(): Skill[] {
  return skills;
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find(
    (skill) => skill.directory === slug || skill.id === slug,
  );
}

export function getCategories(): SkillCategory[] {
  const counts = new Map<string, number>();
  for (const skill of skills) {
    for (const category of skill.categories) {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getFeaturedSkills(limit = 6): Skill[] {
  const seen = new Set<string>();
  const featured: Skill[] = [];
  for (const skill of skills) {
    const category = skill.categories[0];
    if (!category || seen.has(category)) continue;
    seen.add(category);
    featured.push(skill);
    if (featured.length >= limit) break;
  }
  return featured;
}

export function querySkills({
  q = "",
  category = "",
  page = 1,
  perPage = 24,
}: SkillQuery): SkillQueryResult {
  const terms = q
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);

  const filtered = skills.filter((skill) => {
    if (category && !skill.categories.includes(category)) return false;
    if (terms.length === 0) return true;
    const haystack = [
      skill.name,
      skill.directory,
      skill.description,
      skill.categories.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * perPage;

  return {
    items: filtered.slice(start, start + perPage),
    total: filtered.length,
    page: current,
    pages,
    perPage,
  };
}

export function getRelatedSkills(skill: Skill, limit = 4): Skill[] {
  const category = skill.categories[0];
  return skills
    .filter(
      (candidate) =>
        candidate.directory !== skill.directory &&
        (!category || candidate.categories.includes(category)),
    )
    .slice(0, limit);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
