import { Github } from 'lucide-react';
import type { MouseEventHandler } from 'react';

export interface Project {
    title: string;
    description: string;
    tech: string[];
    repo: string;
    image: string;
    demo?: string;
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
    tabIndex?: number;
    "aria-hidden"?: boolean | "true" | "false";
    style?: React.CSSProperties; // Add style prop
    detailsLabel?: string;
}

export default function ProjectCard({ title, description, tech, repo, image, onOpen, style, detailsLabel = "Detalles" }: ProjectCardProps) {
    return (
        <div
            className="spotlight-card flex flex-col bg-[var(--color-card-bg)] backdrop-blur-2xl border border-[var(--color-border)] rounded-[2rem] shadow-2xl transition-all duration-500 overflow-hidden w-full max-w-lg mx-auto h-full group/card hover:border-orange-500/30 hover:shadow-orange-500/10"
            style={style}
        >
            {/* Imagen */}
            {image ? (
                <div className="relative w-full h-48 sm:h-52 overflow-hidden">
                    <img
                        src={image}
                        alt={`Captura de ${title}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110 bg-black"
                        loading="lazy"
                        width="400"
                        height="208"
                        decoding="async"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/images/profile.webp';
                        }}
                    />
                    {/* Overlay refined */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                </div>
            ) : (
                <div className="relative w-full h-48 sm:h-52 flex items-center justify-center bg-zinc-900 text-white/50 text-xs font-black uppercase tracking-widest">
                    Sin imagen
                </div>
            )}
            {/* Contenido */}
            <div className="flex flex-col flex-grow p-6 sm:p-8">
                {/* Título */}
                <h3 className="text-2xl font-black tracking-tighter text-text/90 group-hover/card:text-orange-500 transition-colors duration-500 dark:text-text/90 light:text-orange-800">
                    {title}
                </h3>

                {/* Descripción */}
                <p className="mt-4 text-[var(--color-muted)] text-sm sm:text-base leading-relaxed flex-grow font-light tracking-tight border-l-2 border-orange-500/30 pl-4 group-hover/card:border-orange-500/60 transition-all duration-500 dark:text-[var(--color-muted)] light:text-orange-950/80">
                    {description}
                </p>

                {/* Tecnologías */}
                {tech?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 text-xs">
                        {tech.map((item, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-orange-500/20 bg-orange-500/5 text-orange-500/90 group-hover/card:bg-orange-500/10 group-hover/card:text-orange-400 transition-all duration-500"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}

                {/* Botones */}
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={onOpen}
                        className="flex-1 inline-flex items-center justify-center bg-transparent hover:bg-zinc-100/5 dark:hover:bg-zinc-800/50 text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-xl transition-all duration-300"
                    >
                        {detailsLabel}
                    </button>
                    <a
                        href={repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative flex-1 inline-flex items-center justify-center bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-xl transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[var(--color-accent)]/30 hover:-translate-y-0.5"
                        aria-label={`Ver repositorio GitHub de ${title}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                        <Github className="mr-2 w-4 h-4 relative z-10" strokeWidth={2.5} />
                        <span className="relative z-10">Github</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
