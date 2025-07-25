import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectCarousel({ projects }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 5000; // 5 segundos

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prevIndex) => (prevIndex + 1) % projects.length);
    }, delay);
    return () => resetTimeout();
  }, [current, projects.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % projects.length);

  return (
    <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto bg-gradient-to-br from-zinc-900/70 via-zinc-800/60 to-zinc-900/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg overflow-hidden">
      
      {/* Contenedor de Proyectos */}
      <div className="relative h-[520px] sm:h-[540px] md:h-[560px] overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {projects.map((project, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-2 h-full flex">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Flecha Izquierda */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-zinc-800/70 hover:bg-orange-600/60 hover:scale-110 transition-all text-white rounded-full p-3 shadow-md"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Flecha Derecha */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-zinc-800/70 hover:bg-orange-600/60 hover:scale-110 transition-all text-white rounded-full p-3 shadow-md"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-orange-500" : "bg-yellow-400/40"
            } transition-all duration-300`}
            aria-label={`Ir al proyecto ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
