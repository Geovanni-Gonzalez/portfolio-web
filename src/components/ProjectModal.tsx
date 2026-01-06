import { X, Github, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import type { Project } from './ProjectCard';

import { ui } from '../i18n/ui';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    lang: string;
}

export default function ProjectModal({ isOpen, onClose, project, lang }: ProjectModalProps) {
    const t = (key: string) => {
        const translations = (ui as any)[lang] || (ui as any)['en'];
        return translations[key] || key;
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg border border-text/10 rounded-3xl shadow-2xl flex flex-col md:flex-row modal-animate-in">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-orange-500 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image Section (Left/Top) */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted">
                            No image available
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent md:bg-gradient-to-r"></div>
                </div>

                {/* Content Section (Right/Bottom) */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{project.title}</h2>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech && project.tech.map((t, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full border shadow-sm transition-colors duration-300 bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-300 dark:hover:bg-orange-500/20">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-invert prose-sm max-w-none text-muted mb-8 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                        <p>{project.description}</p>

                        {project.features && project.features.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-zinc-100 mb-2">{t('projects.keyFeatures')}</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {project.features.map((feature, idx) => (
                                        <li key={idx} className="text-zinc-300">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.stack && (
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-zinc-100 mb-2">{t('projects.techStack')}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {Object.entries(project.stack).map(([key, value]) => (
                                        <div key={key} className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50">
                                            <span className="block text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
                                                {key.replace(/_/g, ' ')}
                                            </span>
                                            <span className="text-sm text-zinc-300">
                                                {Array.isArray(value) ? value.join(', ') : value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.repo && (
                            <p className="text-xs text-muted/80 mt-6 break-all font-mono">
                                <span className="font-semibold text-orange-500/80">Repo:</span> {project.repo}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-4 mt-auto pt-6 border-t border-text/10">
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-text/5 hover:bg-text/10 text-text font-semibold transition-colors border border-text/10"
                        >
                            <Github className="w-5 h-5" />
                            GitHub
                        </a>
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow-lg shadow-orange-500/20"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
