import React, { useState, useEffect, useRef } from 'react';
import { languages } from '../i18n/ui';

export default function LangPicker({ currentLang }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierra dropdown si clic afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  function changeLanguage(lang) {
    setOpen(false);
    // Cambia ruta manteniendo el path, solo modificando el idioma al principio
    const pathParts = window.location.pathname.split('/');
    pathParts[1] = lang; // asumiendo ruta tipo /en/...
    const newPath = pathParts.join('/') || `/${lang}/`;
    window.location.href = newPath;
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center px-4 py-2 border border-white/30 bg-transparent text-white text-sm font-medium rounded-md hover:bg-white/10 hover:border-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        {languages[currentLang]}
        <svg
          className="ml-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow bg-zinc-900/70 bg-opacity-75 ring-1 ring-gray-600 ring-opacity-80 backdrop-blur-sm z-50">
            <ul className="py-1 text-sm text-gray-100">
            {Object.entries(languages).map(([lang, label]) => (
                <li key={lang}>
                <button
                    onClick={() => changeLanguage(lang)}
                    className="w-full text-left block px-4 py-2 hover:bg-orange-700 hover:text-white transition"
                    type="button"
                >
                    {label}
                </button>
                </li>
            ))}
            </ul>
        </div>
            )}
    </div>
  );
}
