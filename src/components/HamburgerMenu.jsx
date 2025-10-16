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
  <button
    aria-label="Toggle menu"
    aria-expanded={open}
    aria-controls="hamburger-menu"
    onClick={() => setOpen(!open)}
    className="flex flex-col justify-center items-center w-10 h-10 gap-1 relative z-50 focus:outline-none"
  >
    <span className={clsx('block w-8 h-0.5 bg-white rounded transition-transform duration-300 ease-in-out', open && 'rotate-45 translate-y-2 scale-110')} />
    <span className={clsx('block w-8 h-0.5 bg-white rounded transition-opacity duration-300 ease-in-out', open && 'opacity-0')} />
    <span className={clsx('block w-8 h-0.5 bg-white rounded transition-transform duration-300 ease-in-out', open && '-rotate-45 -translate-y-2 scale-110')} />
  </button>

  {open && <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />}

  <div
    id="hamburger-menu"
    className={clsx(
      'absolute top-full right-0 mt-2 w-56 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-xl rounded-xl shadow-lg flex flex-col p-4 gap-3 transition-all duration-500 ease-out overflow-hidden z-40',
      open ? 'max-h-[500px] opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
    )}
  >
    {Object.entries(labels).map(([key, label], index) => (
      <a
        key={key}
        href={`#${key}`}
        onClick={() => setOpen(false)}
        style={{ transitionDelay: `${index * 100}ms` }}
        className="text-white/90 font-medium hover:text-orange-400 hover:translate-x-1 hover:scale-105 transition-all duration-300"
      >
        {label}
      </a>
    ))}
  </div>
</div>

  );
}
