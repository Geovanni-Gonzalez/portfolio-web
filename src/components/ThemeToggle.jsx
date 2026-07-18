import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // El script inline de BaseLayout ya aplicó el tema antes del primer paint;
    // aquí sincronizamos el estado del botón y observamos cambios externos
    // (command palette u otra instancia del toggle).
    const syncTheme = () => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    };
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2.5 rounded-xl transition-all duration-300 group
        bg-[var(--card-bg)] hover:bg-[var(--surface-elevated)] border border-[var(--card-border)] hover:border-[var(--primary)]
        ${isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'}
        backdrop-blur-sm shadow-lg
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className={`transition-all duration-300 ${isAnimating ? 'rotate-180' : 'rotate-0'}`}>
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-[var(--primary)] group-hover:text-[var(--primary-hover)] transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors" />
        )}
      </div>

      {/* Glow effect on hover */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
        bg-[var(--primary-soft)] blur-md
      `} />
    </button>
  );
}
