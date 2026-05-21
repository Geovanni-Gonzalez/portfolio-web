import React, { useEffect, useState } from "react";
import clsx from "clsx";

export default function HamburgerMenu({ menuItems }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="relative flex items-center">
      <button
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="hamburger-menu"
        onClick={() => setOpen(!open)}
        className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      >
        <span className={clsx("block h-0.5 w-6 rounded bg-[var(--color-text)] transition-transform duration-300 ease-in-out", open && "translate-y-1.5 rotate-45")} />
        <span className={clsx("block h-0.5 w-6 rounded bg-[var(--color-text)] transition-opacity duration-300 ease-in-out", open && "opacity-0")} />
        <span className={clsx("block h-0.5 w-6 rounded bg-[var(--color-text)] transition-transform duration-300 ease-in-out", open && "-translate-y-1.5 -rotate-45")} />
      </button>

      {open && <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />}

      <div
        id="hamburger-menu"
        className={clsx(
          "absolute right-0 top-full z-40 mt-3 flex w-60 flex-col gap-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-3 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out",
          open ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        {menuItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-3 text-sm font-bold text-[var(--color-text)] transition hover:bg-orange-500/10 hover:text-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
