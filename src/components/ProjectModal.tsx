import { ExternalLink, Github, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "./ProjectCard";
import { ui } from "../i18n/ui";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  lang: string;
}

export default function ProjectModal({ isOpen, onClose, project, lang }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = (key: string) => {
    const translations = (ui as any)[lang] || (ui as any).en;
    return translations[key] || key;
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
      window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const detailBlocks = [
    { label: t("projects.problem"), value: project.problem },
    { label: t("projects.solution"), value: project.solution },
    { label: t("projects.role"), value: project.role },
    { label: t("projects.impact"), value: project.impact },
  ].filter((item) => item.value);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar"
      />

      <div className="modal-animate-in relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-[var(--card-border)] bg-[var(--background)] shadow-2xl md:flex-row">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/55 p-2 text-white transition-colors hover:bg-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          aria-label="Cerrar detalles del proyecto"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex min-h-56 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--background-secondary)] via-[var(--surface)] to-[var(--secondary)] md:w-2/5">
          {project.image ? (
            <img src={project.image} alt={`Captura de ${project.title}`} className="h-full w-full object-cover" />
          ) : (
            <div className="p-8 text-center">
              <p className="text-5xl font-black tracking-tight text-white">{project.title}</p>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">
                {project.tech?.slice(0, 3).join(" · ")}
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="flex w-full flex-col p-6 md:w-3/5 md:p-8">
          <h2 id="project-modal-title" className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {project.title}
          </h2>

          <p className="mt-4 text-sm font-medium leading-7 text-[var(--text-secondary)]">{project.description}</p>

          {project.tech?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={item} className="badge-primary rounded-full border px-3 py-1 text-xs font-black">
                  {item}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 grid gap-3">
            {detailBlocks.map((item) => (
              <section key={item.label} className="rounded-xl border border-[var(--card-border)] bg-[var(--surface-elevated)] p-4">
                <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">{item.label}</h3>
                <p className="mt-2 text-sm font-medium leading-7 text-[var(--text-secondary)]">{item.value}</p>
              </section>
            ))}
          </div>

          {project.features && project.features.length > 0 && (
            <section className="mt-6">
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">
                {t("projects.keyFeatures")}
              </h3>
              <ul className="mt-3 grid gap-2 text-sm font-medium text-[var(--text-secondary)] sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] px-3 py-2">
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]"
            >
              <Github className="h-5 w-5" />
              {t("projects.viewOnGitHub")}
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold shadow-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                <ExternalLink className="h-5 w-5" />
                {t("projects.demo")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
