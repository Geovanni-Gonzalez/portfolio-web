import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { languages } from '../i18n/ui';

export default function LangPicker({ currentLang }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function changeLanguage(lang) {
    setOpen(false);
    const pathParts = window.location.pathname.split('/');
    pathParts[1] = lang;
    const newPath = pathParts.join('/') || `/${lang}/`;
    window.location.href = newPath;
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      
      {/* Botón principal */}
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
        className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-xl text-white text-sm font-medium rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        {languages[currentLang]}
        <svg
          className={clsx("ml-2 h-5 w-5 transition-transform duration-300 ease-in-out", open && "rotate-180")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
<div
  className={clsx(
    'absolute right-0 mt-2 w-36 sm:w-40 md:w-48 rounded-xl shadow-2xl bg-black/70 backdrop-blur-xl ring-1 ring-orange-400 ring-opacity-20 transition-all duration-500 overflow-hidden',
    open ? 'max-h-80 opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
  )}
>
  <ul className="flex flex-col gap-1 text-white text-sm">
    {Object.entries(languages).map(([lang, label], index) => (
      <li
        key={lang}
        style={{ transitionDelay: `${index * 75}ms` }}
        className={clsx(
          'transform transition-all duration-300 ease-in-out',
          open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        )}
      >
        <button
          onClick={() => changeLanguage(lang)}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out"
          type="button"
        >
          {label}
        </button>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
}
