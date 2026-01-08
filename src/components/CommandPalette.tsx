import { useState, useEffect } from 'react';
import { Search, Command, Home, User, Briefcase, GraduationCap, Mail, Github, Linkedin, Moon, Sun, ArrowRight, FileText } from 'lucide-react';

interface Action {
    id: string;
    label: string;
    icon: React.ReactNode;
    perform: () => void;
    group: 'navigation' | 'social' | 'settings';
}

interface CommandPaletteProps {
    lang: string;
}

export default function CommandPalette({ lang }: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const t = {
        placeholder: lang === 'es' ? 'Escribe un comando o busca...' : 'Type a command or search...',
        groups: {
            navigation: lang === 'es' ? 'Navegación' : 'Navigation',
            social: 'Social',
            settings: lang === 'es' ? 'Ajustes' : 'Settings',
        },
        actions: {
            home: lang === 'es' ? 'Ir al Inicio' : 'Go Home',
            skills: lang === 'es' ? 'Ver Habilidades' : 'View Skills',
            projects: lang === 'es' ? 'Ver Proyectos' : 'View Projects',
            about: lang === 'es' ? 'Sobre Mí' : 'About Me',
            blog: lang === 'es' ? 'Ir al Blog' : 'Go to Blog',
            contact: lang === 'es' ? 'Contactar' : 'Contact',
            github: 'GitHub',
            linkedin: 'LinkedIn',
            theme: lang === 'es' ? 'Alternar Tema' : 'Toggle Theme',
        }
    };

    const actions: Action[] = [
        {
            id: 'home',
            label: t.actions.home,
            icon: <Home className="w-4 h-4" />,
            perform: () => window.location.href = lang === 'es' ? '/' : '/en/',
            group: 'navigation'
        },
        {
            id: 'skills',
            label: t.actions.skills,
            icon: <GraduationCap className="w-4 h-4" />,
            perform: () => window.location.href = lang === 'es' ? '/#skills' : '/en/#skills',
            group: 'navigation'
        },
        {
            id: 'projects',
            label: t.actions.projects,
            icon: <Briefcase className="w-4 h-4" />,
            perform: () => window.location.href = lang === 'es' ? '/#projects' : '/en/#projects',
            group: 'navigation'
        },
        {
            id: 'about',
            label: t.actions.about,
            icon: <User className="w-4 h-4" />,
            perform: () => window.location.href = lang === 'es' ? '/#about' : '/en/#about',
            group: 'navigation'
        },
        {
            id: 'contact',
            label: t.actions.contact,
            icon: <Mail className="w-4 h-4" />,
            perform: () => window.location.href = lang === 'es' ? '/#contact' : '/en/#contact',
            group: 'navigation'
        },
        {
            id: 'blog',
            label: t.actions.blog,
            icon: <FileText className="w-4 h-4" />,
            perform: () => window.location.href = lang === 'es' ? '/blog' : '/en/blog',
            group: 'navigation'
        },
        {
            id: 'theme',
            label: t.actions.theme,
            icon: <Sun className="w-4 h-4 dark:hidden" />,
            perform: () => document.getElementById('theme-toggle')?.click(),
            group: 'settings'
        },
        {
            id: 'github',
            label: 'GitHub',
            icon: <Github className="w-4 h-4" />,
            perform: () => window.open('https://github.com/Geovanni09', '_blank'),
            group: 'social'
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            icon: <Linkedin className="w-4 h-4" />,
            perform: () => window.open('https://www.linkedin.com/in/geovanni-gonzalez-1b1b3b1b3/', '_blank'),
            group: 'social'
        }
    ];

    const filteredActions = actions.filter(action =>
        action.label.toLowerCase().includes(query.toLowerCase())
    );

    // Group actions
    const groupedActions = filteredActions.reduce((acc, action) => {
        if (!acc[action.group]) acc[action.group] = [];
        acc[action.group].push(action);
        return acc;
    }, {} as Record<string, Action[]>);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }

            if (isOpen) {
                if (e.key === 'Escape') {
                    setIsOpen(false);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % filteredActions.length);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (filteredActions[selectedIndex]) {
                        filteredActions[selectedIndex].perform();
                        setIsOpen(false);
                        setQuery('');
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredActions, selectedIndex]);

    // Reset index when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-zinc-900/90 border border-zinc-700/50 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Search Input */}
                <div className="flex items-center px-4 py-4 border-b border-white/5">
                    <Search className="w-5 h-5 text-zinc-400 mr-3" />
                    <input
                        type="text"
                        placeholder={t.placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-grow bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500 text-lg"
                        autoFocus
                    />
                    <div className="hidden sm:flex items-center gap-1">
                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-500 bg-white/5 rounded-md border border-white/10">Esc</kbd>
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                    {filteredActions.length === 0 ? (
                        <div className="py-8 text-center text-zinc-500 text-sm">
                            No results found.
                        </div>
                    ) : (
                        Object.entries(groupedActions).map(([group, groupActions]) => (
                            <div key={group} className="mb-2">
                                <h4 className="px-2 py-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                    {t.groups[group as keyof typeof t.groups]}
                                </h4>
                                {groupActions.map((action, idx) => {
                                    // Calculate absolute index for highlighting
                                    const absoluteIndex = filteredActions.indexOf(action);
                                    const isSelected = absoluteIndex === selectedIndex;

                                    return (
                                        <button
                                            key={action.id}
                                            onClick={() => {
                                                action.perform();
                                                setIsOpen(false);
                                            }}
                                            onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                                            className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group ${isSelected
                                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                                : 'text-zinc-300 hover:bg-white/5'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-white/5 text-zinc-400'}`}>
                                                    {action.icon}
                                                </div>
                                                <span className={`font-medium ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                                                    {action.label}
                                                </span>
                                            </div>
                                            {isSelected && <ArrowRight className="w-4 h-4 opacity-80" />}
                                        </button>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] text-zinc-500">
                    <div className="flex gap-2">
                        <span><strong className="text-zinc-400">↑↓</strong> to navigate</span>
                        <span><strong className="text-zinc-400">↵</strong> to select</span>
                    </div>
                    <div>
                        Portfolio Command v1.0
                    </div>
                </div>
            </div>
        </div>
    );
}
