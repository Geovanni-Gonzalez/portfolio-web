import { Github } from "lucide-react";
import type { CSSProperties, MouseEventHandler } from "react";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  repo: string;
  image?: string;
  demo?: string;
  problem?: string;
  solution?: string;
  role?: string;
  impact?: string;
  features?: string[];
  stack?: {
    language?: string;
    framework?: string;
    database?: string;
    frontend?: string;
    tools?: string[];
  };
}

interface ProjectCardProps extends Project {
  onOpen?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
  detailsLabel?: string;
  repoLabel?: string;
}

const initialsFromTitle = (title: string) =>
  title
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export default function ProjectCard({
  title,
  description,
  tech,
  repo,
  image,
  onOpen,
  style,
  detailsLabel = "Detalles",
  repoLabel = "GitHub",
}: ProjectCardProps) {
  return (
    <article
      className="spotlight-card group/card flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-[var(--primary)]"
      style={style}
    >
      {image ? (
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={image}
            alt={`Captura de ${title}`}
            className="absolute inset-0 h-full w-full bg-black object-cover transition-transform duration-1000 group-hover/card:scale-105"
            loading="lazy"
            width="520"
            height="176"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      ) : (
        <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--background-secondary)] via-[var(--surface)] to-[var(--secondary)]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, var(--primary-soft), transparent 30%), linear-gradient(135deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 22px 22px",
            }}
          />
          <span className="relative rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-3xl font-black tracking-tight text-white shadow-2xl backdrop-blur">
            {initialsFromTitle(title)}
          </span>
        </div>
      )}

      <div className="flex flex-grow flex-col p-5 sm:p-6">
        <h3 className="text-xl font-black tracking-tight text-[var(--text-primary)] transition-colors duration-500 group-hover/card:text-[var(--primary)]">
          {title}
        </h3>

        <p className="mt-3 line-clamp-4 flex-grow border-l-2 border-[var(--primary)] pl-4 text-pretty text-sm font-medium leading-7 text-[var(--text-secondary)] transition-all duration-500 group-hover/card:border-[var(--secondary)]">
          {description}
        </p>

        {tech?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {tech.slice(0, 4).map((item) => (
              <span
                key={item}
                className="badge-primary rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] transition-all duration-500 group-hover/card:bg-[var(--secondary-soft)] group-hover/card:text-[var(--secondary)]"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-3 pt-6">
          <button
            onClick={onOpen}
            className="btn-secondary inline-flex min-h-11 flex-1 items-center justify-center rounded-xl px-4 py-3 text-xs font-black uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]"
          >
            {detailsLabel}
          </button>
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group/btn relative inline-flex min-h-11 flex-1 items-center justify-center overflow-hidden rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] shadow-lg transition-all duration-500 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            aria-label={`${repoLabel}: ${title}`}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-1000 group-hover/btn:translate-x-full" />
            <Github className="relative z-10 mr-2 h-4 w-4" strokeWidth={2.5} />
            <span className="relative z-10">{repoLabel}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
