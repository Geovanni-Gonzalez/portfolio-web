import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Briefcase,
  FileText,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  Search,
  Sun,
  Target,
  User,
} from "lucide-react";

interface Action {
  id: string;
  label: string;
  icon: ReactNode;
  perform: () => void;
  group: "navigation" | "social" | "settings";
}

interface CommandPaletteProps {
  lang: string;
}

export default function CommandPalette({ lang }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const homePath = lang === "es" ? "/" : "/en/";
  const blogPath = lang === "es" ? "/blog" : "/en/blog";

  const t = {
    placeholder: lang === "es" ? "Escribe un comando o busca..." : "Type a command or search...",
    noResults: lang === "es" ? "No hay resultados." : "No results found.",
    groups: {
      navigation: lang === "es" ? "Navegación" : "Navigation",
      social: "Social",
      settings: lang === "es" ? "Ajustes" : "Settings",
    },
    actions: {
      home: lang === "es" ? "Ir al inicio" : "Go home",
      skills: lang === "es" ? "Ver habilidades" : "View skills",
      areas: lang === "es" ? "Ver áreas de aporte" : "View focus areas",
      projects: lang === "es" ? "Ver proyectos" : "View projects",
      about: lang === "es" ? "Sobre mí" : "About me",
      blog: lang === "es" ? "Ir al blog" : "Go to blog",
      contact: lang === "es" ? "Contactar" : "Contact",
      theme: lang === "es" ? "Alternar tema" : "Toggle theme",
    },
  };

  const actions: Action[] = [
    {
      id: "home",
      label: t.actions.home,
      icon: <Home className="h-4 w-4" />,
      perform: () => (window.location.href = homePath),
      group: "navigation",
    },
    {
      id: "about",
      label: t.actions.about,
      icon: <User className="h-4 w-4" />,
      perform: () => (window.location.href = `${homePath}#about`),
      group: "navigation",
    },
    {
      id: "skills",
      label: t.actions.skills,
      icon: <GraduationCap className="h-4 w-4" />,
      perform: () => (window.location.href = `${homePath}#skills`),
      group: "navigation",
    },
    {
      id: "areas",
      label: t.actions.areas,
      icon: <Target className="h-4 w-4" />,
      perform: () => (window.location.href = `${homePath}#areas`),
      group: "navigation",
    },
    {
      id: "projects",
      label: t.actions.projects,
      icon: <Briefcase className="h-4 w-4" />,
      perform: () => (window.location.href = `${homePath}#projects`),
      group: "navigation",
    },
    {
      id: "contact",
      label: t.actions.contact,
      icon: <Mail className="h-4 w-4" />,
      perform: () => (window.location.href = `${homePath}#contact`),
      group: "navigation",
    },
    {
      id: "blog",
      label: t.actions.blog,
      icon: <FileText className="h-4 w-4" />,
      perform: () => (window.location.href = blogPath),
      group: "navigation",
    },
    {
      id: "theme",
      label: t.actions.theme,
      icon: <Sun className="h-4 w-4" />,
      perform: () => document.getElementById("theme-toggle")?.click(),
      group: "settings",
    },
    {
      id: "github",
      label: "GitHub",
      icon: <Github className="h-4 w-4" />,
      perform: () => window.open("https://github.com/Geovanni-Gonzalez", "_blank", "noopener,noreferrer"),
      group: "social",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      perform: () => window.open("https://www.linkedin.com/in/geovanni-gonzález-aguilar", "_blank", "noopener,noreferrer"),
      group: "social",
    },
  ];

  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase()),
  );

  const groupedActions = filteredActions.reduce(
    (acc, action) => {
      if (!acc[action.group]) acc[action.group] = [];
      acc[action.group].push(action);
      return acc;
    },
    {} as Record<string, Action[]>,
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
      } else if (event.key === "ArrowDown" && filteredActions.length > 0) {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
      } else if (event.key === "ArrowUp" && filteredActions.length > 0) {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].perform();
          setIsOpen(false);
          setQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[20vh]">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-label={lang === "es" ? "Cerrar paleta de comandos" : "Close command palette"}
      />

      <div className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900/90 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center border-b border-white/5 px-4 py-4">
          <Search className="mr-3 h-5 w-5 text-zinc-400" aria-hidden="true" />
          <input
            type="text"
            placeholder={t.placeholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="flex-grow border-none bg-transparent text-lg text-zinc-100 outline-none placeholder-zinc-500"
            autoFocus
          />
          <kbd className="hidden rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-semibold text-zinc-500 sm:block">
            Esc
          </kbd>
        </div>

        <div className="custom-scrollbar max-h-[60vh] overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-500">{t.noResults}</div>
          ) : (
            Object.entries(groupedActions).map(([group, groupActions]) => (
              <div key={group} className="mb-2">
                <h4 className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {t.groups[group as keyof typeof t.groups]}
                </h4>
                {groupActions.map((action) => {
                  const absoluteIndex = filteredActions.indexOf(action);
                  const isSelected = absoluteIndex === selectedIndex;

                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => {
                        action.perform();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 ${
                        isSelected
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`rounded-lg p-2 ${isSelected ? "bg-white/20" : "bg-white/5 text-zinc-400"}`}>
                          {action.icon}
                        </span>
                        <span className={`font-medium ${isSelected ? "text-white" : "text-zinc-200"}`}>
                          {action.label}
                        </span>
                      </span>
                      {isSelected && <ArrowRight className="h-4 w-4 opacity-80" />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-4 py-2 text-[10px] text-zinc-500">
          <div className="flex gap-2">
            <span>
              <strong className="text-zinc-400">↑↓</strong> navigate
            </span>
            <span>
              <strong className="text-zinc-400">Enter</strong> select
            </span>
          </div>
          <div>Portfolio Command v1.0</div>
        </div>
      </div>
    </div>
  );
}
