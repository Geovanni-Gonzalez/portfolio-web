import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

type Skill = {
  name: string;
  level: string;
  icon: string;
};

type SkillCategory = {
  category: string;
  summary: string;
  items: Skill[];
};

type SkillsExplorerProps = {
  skills: SkillCategory[];
  lang: string;
};

const levelRank = (level: string) => {
  if (level === "Avanzado" || level === "Advanced") return 3;
  if (level === "Intermedio" || level === "Intermediate") return 2;
  return 1;
};

const levelWidth = (level: string) => `${levelRank(level) * 33}%`;

export default function SkillsExplorer({ skills, lang }: SkillsExplorerProps) {
  const safeSkills = Array.isArray(skills) ? skills : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = safeSkills[activeIndex] ?? safeSkills[0];

  const totals = useMemo(() => {
    const allItems = safeSkills.flatMap((category) => category.items ?? []);
    return {
      total: allItems.length,
      advanced: allItems.filter((skill) => levelRank(skill.level) === 3).length,
      categories: safeSkills.length,
    };
  }, [safeSkills]);

  if (!activeCategory) return null;

  const labels =
    lang === "es"
      ? {
          tabLabel: "Categorías de habilidades",
          total: "habilidades",
          advanced: "avanzadas",
          categories: "categorías",
        }
      : {
          tabLabel: "Skill categories",
          total: "skills",
          advanced: "advanced",
          categories: "categories",
        };

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
      <aside className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl transition hover:border-[var(--primary)] hover:shadow-[var(--shadow-card-hover)]">
        <div className="grid grid-cols-3 gap-2 border-b border-[var(--card-border)] pb-4 text-center">
          <div className="rounded-xl bg-[var(--surface-elevated)] p-3">
            <p className="font-mono text-xl font-black text-[var(--text-primary)]">{totals.total}</p>
            <p className="text-xs font-semibold text-[var(--text-secondary)]">
              {labels.total}
            </p>
          </div>
          <div className="rounded-xl bg-[var(--surface-elevated)] p-3">
            <p className="font-mono text-xl font-black text-[var(--primary)]">{totals.advanced}</p>
            <p className="text-xs font-semibold text-[var(--text-secondary)]">
              {labels.advanced}
            </p>
          </div>
          <div className="rounded-xl bg-[var(--surface-elevated)] p-3">
            <p className="font-mono text-xl font-black text-[var(--secondary)]">{totals.categories}</p>
            <p className="text-xs font-semibold text-[var(--text-secondary)]">
              {labels.categories}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col" role="tablist" aria-label={labels.tabLabel}>
          {safeSkills.map((category, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={category.category}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`skill-panel-${index}`}
                id={`skill-tab-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`min-w-[14rem] rounded-xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] lg:min-w-0 ${
                  active
                    ? "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--text-primary)]"
                    : "border-[var(--card-border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className="block text-sm font-black leading-tight">{category.category}</span>
                <span className="mt-1 block font-mono text-xs font-semibold">
                  {(category.items ?? []).length} {labels.total}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <section
        id={`skill-panel-${activeIndex}`}
        role="tabpanel"
        aria-labelledby={`skill-tab-${activeIndex}`}
        className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl transition hover:border-[var(--primary)] hover:shadow-[var(--shadow-card-hover)]"
      >
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--secondary-soft)] blur-3xl" />
        <div className="relative z-10 mb-5">
          <p className="font-mono text-xs font-semibold text-[var(--secondary)]">
            {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-primary)]">
            {activeCategory.category}
          </h3>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[var(--text-secondary)]">
            {activeCategory.summary}
          </p>
        </div>

        <ul className="relative z-10 grid gap-3 sm:grid-cols-2" role="list">
          {(activeCategory.items ?? []).map((skill) => (
            <li
              key={skill.name}
              className="group rounded-xl border border-[var(--card-border)] bg-[var(--surface-elevated)] p-3 transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--surface)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] transition group-hover:bg-[var(--secondary-soft)] group-hover:text-[var(--secondary)]">
                  <Icon icon={skill.icon} className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[var(--text-primary)]">{skill.name}</p>
                  <p className="text-xs font-semibold text-[var(--secondary)]">
                    {skill.level}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/20 dark:bg-white/20" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transition-[width]"
                  style={{ width: levelWidth(skill.level) }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
