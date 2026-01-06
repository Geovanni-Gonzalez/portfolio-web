import { useEffect, useRef, useState } from "react";
import ProjectCard, { type Project } from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCarouselProps {
    projects: Project[];
    lang: string;
}

export default function ProjectCarousel({ projects, lang }: ProjectCarouselProps) {
    // Validación defensiva: asegurar que projects siempre sea un array
    const safeProjects = Array.isArray(projects) ? projects : [];
    const [current, setCurrent] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const delay = 5000; // 5 segundos

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    useEffect(() => {
        // Don't auto-slide if modal is open
        if (selectedProject) {
            resetTimeout();
            return;
        }

        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setCurrent((prevIndex) => (prevIndex + 1) % safeProjects.length);
        }, delay);
        return () => resetTimeout();
    }, [current, safeProjects.length, selectedProject]);

    // Manejo de teclado para accesibilidad
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedProject) return; // No navegar si modal abierto
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                setCurrent((prev) => (prev - 1 + safeProjects.length) % safeProjects.length);
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                setCurrent((prev) => (prev + 1) % safeProjects.length);
            } else if (e.key === "Home") {
                e.preventDefault();
                setCurrent(0);
            } else if (e.key === "End") {
                e.preventDefault();
                setCurrent(safeProjects.length - 1);
            }
        };
        const node = carouselRef.current;
        if (node) node.addEventListener("keydown", handleKeyDown);
        return () => {
            if (node) node.removeEventListener("keydown", handleKeyDown);
        };
    }, [safeProjects.length, selectedProject]);

    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + safeProjects.length) % safeProjects.length);
    const nextSlide = () =>
        setCurrent((prev) => (prev + 1) % safeProjects.length);

    return (
        <>
            <div
                className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto bg-gradient-to-br from-bg/70 via-muted/10 to-bg/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg overflow-hidden border border-text/10"
                role="region"
                aria-label="Carrusel de proyectos"
                tabIndex={0}
                ref={carouselRef}
            >
                {/* Contenedor de Proyectos */}
                <div className="relative h-[520px] sm:h-[540px] md:h-[560px] overflow-hidden">
                    <div
                        className="flex transition-transform duration-700 ease-in-out h-full"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {safeProjects.map((project, idx) => (
                            <div key={idx} className="w-full flex-shrink-0 px-2 h-full flex">
                                <ProjectCard
                                    {...project}
                                    onOpen={() => setSelectedProject(project)}
                                    tabIndex={idx === current ? 0 : -1}
                                    aria-hidden={idx !== current ? "true" : undefined}
                                    style={{}} // Empty style to satisfy hydration check or real style if needed
                                />
                            </div>
                        ))}
                    </div>

                    {/* Flecha Izquierda */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-600/80 hover:scale-110 transition-all text-white rounded-full p-3 shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        aria-label="Anterior"
                        tabIndex={0}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Flecha Derecha */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-600/80 hover:scale-110 transition-all text-white rounded-full p-3 shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        aria-label="Siguiente"
                        tabIndex={0}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center mt-6 gap-2">
                    {safeProjects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full ${idx === current ? "bg-orange-500 ring-2 ring-orange-400" : "bg-text/20"
                                } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                            aria-label={`Ir al proyecto ${idx + 1}`}
                            aria-current={idx === current ? "true" : undefined}
                            tabIndex={0}
                        />
                    ))}
                </div>
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
