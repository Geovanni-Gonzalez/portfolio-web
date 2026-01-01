import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
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
        ${theme === 'dark'
          ? 'bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-orange-500/50'
          : 'bg-white/80 hover:bg-orange-50 border border-zinc-200 hover:border-orange-300'
        }
        ${isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'}
        backdrop-blur-sm shadow-lg
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className={`transition-all duration-300 ${isAnimating ? 'rotate-180' : 'rotate-0'}`}>
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-zinc-700 group-hover:text-orange-600 transition-colors" />
        )}
      </div>

      {/* Glow effect on hover */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
        ${theme === 'dark'
          ? 'bg-orange-500/20 blur-md'
          : 'bg-orange-300/30 blur-md'
        }
      `} />
    </button>
  );
}
