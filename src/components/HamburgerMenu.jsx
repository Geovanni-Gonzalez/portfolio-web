import React, { useState } from 'react';
import clsx from 'clsx';

const MENU_TEXT = {
  en: { home: 'Home', skills: 'Skills', projects: 'Projects', about: 'About', contact: 'Contact' },
  es: { home: 'Inicio', skills: 'Habilidades', projects: 'Proyectos', about: 'Sobre mí', contact: 'Contacto' },
};

export default function HamburgerMenu({ lang = 'en' }) {
  const [open, setOpen] = useState(false);
  const labels = MENU_TEXT[lang] || MENU_TEXT.en;

  return (
    <div className="relative flex items-center">
      {/* Botón hamburguesa animado */}
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
        className="flex flex-col justify-center items-center w-10 h-10 gap-1 relative z-50 focus:outline-none"
      >
        <span className={clsx('block w-8 h-0.5 bg-white/90 rounded transition-all duration-300', open && 'rotate-45 translate-y-2')} />
        <span className={clsx('block w-8 h-0.5 bg-white/90 rounded transition-all duration-300', open && 'opacity-0')} />
        <span className={clsx('block w-8 h-0.5 bg-white/90 rounded transition-all duration-300', open && '-rotate-45 -translate-y-2')} />
      </button>

      {/* Menú desplegable dentro del navbar */}
      <div
        className={clsx(
          'absolute top-full right-0 mt-2 w-56 bg-white/10 backdrop-blur-2xl rounded-xl shadow-2xl flex flex-col p-4 gap-3 transition-all duration-500 overflow-hidden z-40',
          open ? 'max-h-[500px] opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
        )}
      >
        {Object.entries(labels).map(([key, label], index) => (
          <a
            key={key}
            href={`#${key}`}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: `${index * 75}ms` }}
            className={clsx(
              'text-white/90 font-medium hover:text-orange-400 hover:scale-105 transition-all duration-300'
            )}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
