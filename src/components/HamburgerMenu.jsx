// HamburgerMenu.jsx
import React, { useState } from 'react';

export default function HamburgerMenu({ t }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="text-white focus:outline-none"
        aria-label="Open menu"
        onClick={() => setOpen(!open)}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      {open && (
        <ul className="absolute top-16 right-6 bg-white/90 rounded-lg shadow-lg p-6 flex flex-col gap-4 text-gray-900 font-medium z-50">
          <li><a href="#home" onClick={() => setOpen(false)}>{t('nav.home')}</a></li>
          <li><a href="#skills" onClick={() => setOpen(false)}>{t('nav.skills')}</a></li>
          <li><a href="#projects" onClick={() => setOpen(false)}>{t('nav.projects')}</a></li>
          <li><a href="#about" onClick={() => setOpen(false)}>{t('nav.aboutMe')}</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>{t('nav.contact')}</a></li>
        </ul>
      )}
    </div>
  );
}
