import { Github } from 'lucide-react';
export default function ProjectCard({ title, description, tech, repo, image }) {
  return (
    <div className="flex flex-col bg-gradient-to-br from-zinc-900/70 via-zinc-800/60 to-zinc-900/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-500 overflow-hidden w-full max-w-lg mx-auto h-full">
      {/* Imagen */}
      {image && (
        <div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden">
          <img
            src={image}
            alt={`Captura de ${title}`}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110"
            loading="lazy"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>
      )}
      
      {/* Contenido */}
      <div className="flex flex-col flex-grow p-5 sm:p-6">
        {/* Título */}
        <h3 className="text-lg sm:text-xl font-bold tracking-wide bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
          {title}
        </h3>

        {/* Descripción */}
        <p className="mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed flex-grow font-light tracking-wide">
          {description}
        </p>

        {/* Tecnologías */}
        {tech?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm">
            {tech.map((item, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-orange-500/30 to-yellow-400/30 border border-orange-400 text-orange-200 px-3 py-1 rounded-full font-medium shadow-sm hover:scale-105 hover:shadow-md transition-transform duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Botón GitHub */}
        <div className="mt-6">
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-yellow-400 hover:from-orange-500 hover:to-yellow-300 text-white text-sm sm:text-base font-semibold py-2 px-4 rounded-lg transition-transform duration-300 w-full text-center shadow-md hover:shadow-orange-400/30 hover:scale-[1.03]"
            aria-label={`Ver repositorio GitHub de ${title}`}
          >
            <Github className="mr-2 w-5 h-5" strokeWidth={1.5} />
            Github
          </a>
        </div>
      </div>
    </div>
  );
}