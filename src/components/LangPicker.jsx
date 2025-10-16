import React, { useState, useEffect, useRef } from 'react';
import { languages } from '../i18n/ui';
import clsx from 'clsx';

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
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-xl text-white text-sm font-medium rounded-full shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        {languages[currentLang]}
        <svg className={clsx("ml-2 h-5 w-5 transition-transform duration-300", open && "rotate-180")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={clsx(
          'absolute right-0 mt-2 w-36 rounded-xl shadow-2xl bg-white/10 backdrop-blur-2xl ring-1 ring-gray-600 ring-opacity-30 transition-all duration-500 overflow-hidden',
          open ? 'max-h-80 opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
        )}
      >
        <ul className="flex flex-col gap-1 text-white text-sm">
          {Object.entries(languages).map(([lang, label], index) => (
            <li
              key={lang}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={clsx('transform transition-all duration-300', open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0')}
            >
              <button
                onClick={() => changeLanguage(lang)}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-white transition-all duration-200"
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
