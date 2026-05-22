import { useState } from "react";
import ProjectCard, { type Project } from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface ProjectShowcaseProps {
  projects: Project[];
  lang: string;
  detailsLabel: string;
  repoLabel: string;
}

export default function ProjectShowcase({
  projects,
  lang,
  detailsLabel,
  repoLabel,
}: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const safeProjects = Array.isArray(projects) ? projects : [];
  const allLabel = lang === "es" ? "Todos" : "All";
  const countLabel = lang === "es" ? "proyectos visibles" : "visible projects";
  const filterLabel = lang === "es" ? "Filtrar proyectos por tecnología" : "Filter projects by technology";

  const filters = [
    "all",
    ...Array.from(new Set(safeProjects.flatMap((project) => project.tech || [])))
      .filter((tech) =>
        ["Python", "Java", "React", "TypeScript", "C++", "Haskell", "Node.js", "Socket.IO", "x86 Assembly"].includes(tech),
      )
      .slice(0, 6),
  ];

  const visibleProjects =
    activeFilter === "all"
      ? safeProjects
      : safeProjects.filter((project) => project.tech?.includes(activeFilter));

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 shadow-[var(--shadow-card)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={filterLabel}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-xl border px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] transition ${
                  isActive
                    ? "border-[var(--secondary)] bg-[var(--secondary-soft)] text-[var(--secondary)] shadow-sm"
                    : "border-[var(--card-border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {filter === "all" ? allLabel : filter}
              </button>
            );
          })}
        </div>
        <p className="px-2 font-mono text-xs font-bold text-[var(--text-secondary)]">
          {visibleProjects.length} {countLabel}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.repo}
            {...project}
            detailsLabel={detailsLabel}
            repoLabel={repoLabel}
            onOpen={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        lang={lang}
      />
    </>
  );
}
