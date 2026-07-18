import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
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
  const [query, setQuery] = useState("");
  const safeProjects = Array.isArray(projects) ? projects : [];

  const allLabel = lang === "es" ? "Todos" : "All";
  const countLabel = lang === "es" ? "proyectos visibles" : "visible projects";
  const filterLabel = lang === "es" ? "Filtrar proyectos por tecnología" : "Filter projects by technology";
  const searchLabel = lang === "es" ? "Buscar proyectos" : "Search projects";
  const searchPlaceholder =
    lang === "es" ? "Buscar por nombre, tecnología o problema..." : "Search by name, technology, or problem...";
  const emptyTitle = lang === "es" ? "No hay proyectos con ese filtro" : "No projects match this filter";
  const emptyHint = lang === "es" ? "Prueba otra tecnología o limpia la búsqueda." : "Try another technology or clear the search.";

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    safeProjects.forEach((project) => {
      (project.tech || []).forEach((tech) => counts.set(tech, (counts.get(tech) || 0) + 1));
    });

    return [
      "all",
      ...Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([tech]) => tech)
        .slice(0, 10),
    ];
  }, [safeProjects]);

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return safeProjects.filter((project) => {
      const matchesFilter = activeFilter === "all" || project.tech?.includes(activeFilter);
      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      const searchable = [
        project.title,
        project.description,
        project.problem,
        project.solution,
        project.role,
        project.impact,
        ...(project.tech || []),
        ...(project.features || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [activeFilter, query, safeProjects]);

  const clearFilters = () => {
    setActiveFilter("all");
    setQuery("");
  };

  return (
    <>
      <div className="mb-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 shadow-[var(--shadow-card)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block min-w-0 flex-1" aria-label={searchLabel}>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="min-h-11 w-full rounded-xl border border-[var(--card-border)] bg-[var(--surface-elevated)] py-3 pl-11 pr-10 text-sm font-semibold text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-secondary)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                aria-label={lang === "es" ? "Limpiar búsqueda" : "Clear search"}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </label>

          <p className="shrink-0 px-2 font-mono text-xs font-bold text-[var(--text-secondary)]" aria-live="polite">
            {visibleProjects.length} {countLabel}
          </p>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={filterLabel}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
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
      </div>

      {visibleProjects.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.repo}
              {...project}
              lang={lang}
              detailsLabel={detailsLabel}
              repoLabel={repoLabel}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center shadow-[var(--shadow-card)]">
          <h3 className="text-xl font-black text-[var(--text-primary)]">{emptyTitle}</h3>
          <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">{emptyHint}</p>
          <button
            type="button"
            onClick={clearFilters}
            className="btn-secondary mt-5 inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
          >
            {lang === "es" ? "Limpiar filtros" : "Clear filters"}
          </button>
        </div>
      )}

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        lang={lang}
      />
    </>
  );
}
