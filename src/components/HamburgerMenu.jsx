import React, { useState } from 'react';
import clsx from 'clsx';

export default function HamburgerMenu({ t }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
        className="group text-white focus:outline-none relative z-50 p-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              open
                ? 'M6 18L18 6M6 6l12 12'
                : 'M4 6h16M4 12h16M4 18h16'
            }
          />
        </svg>
      </button>

      {/* Overlay con blur y transparencia */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300',
          {
            'opacity-100 pointer-events-auto': open,
            'opacity-0 pointer-events-none': !open,
          }
        )}
        onClick={() => setOpen(false)}
      />

      {/* Menú lateral con fondo blur y letras blancas */}
      <nav
  className={clsx(
    'fixed top-4 right-4 w-72 max-w-xs h-[calc(100vh-2rem)] px-6 py-3 rounded-xl backdrop-blur-md bg-white/5 shadow-lg z-50 flex flex-col gap-8 transition-transform duration-300',
    {
      'translate-x-0': open,
      'translate-x-full': !open,
    }
  )}
  onClick={(e) => e.stopPropagation()}
>
  {['home', 'skills', 'projects', 'about', 'contact'].map((section) => (
    <a
      key={section}
      href={`#${section}`}
      onClick={() => setOpen(false)}
      className="font-mono text-white hover:text-indigo-300 transition-colors duration-150"
    >
      {t ? t(`nav.${section}`) : section.charAt(0).toUpperCase() + section.slice(1)}
    </a>
  ))}
</nav>

    </div>
  );
}
