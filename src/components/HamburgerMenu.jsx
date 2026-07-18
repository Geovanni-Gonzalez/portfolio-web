import React, { useEffect, useState } from "react";
import clsx from "clsx";

export default function HamburgerMenu({ menuItems, lang = "es" }) {
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
        aria-label={
          open
            ? lang === "es" ? "Cerrar menú" : "Close menu"
            : lang === "es" ? "Abrir menú" : "Open menu"
        }
        aria-expanded={open}
        aria-controls="hamburger-menu"
        onClick={() => setOpen(!open)}
        className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      >
        <span className={clsx("block h-0.5 w-6 rounded bg-[var(--text-primary)] transition-transform duration-300 ease-in-out", open && "translate-y-1.5 rotate-45")} />
        <span className={clsx("block h-0.5 w-6 rounded bg-[var(--text-primary)] transition-opacity duration-300 ease-in-out", open && "opacity-0")} />
        <span className={clsx("block h-0.5 w-6 rounded bg-[var(--text-primary)] transition-transform duration-300 ease-in-out", open && "-translate-y-1.5 -rotate-45")} />
      </button>

      {open && <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />}

      <div
        id="hamburger-menu"
        className={clsx(
          "absolute right-0 top-full z-40 mt-3 flex w-60 flex-col gap-2 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out",
          open ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        {menuItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
