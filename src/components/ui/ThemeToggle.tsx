import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useUIStore } from '@/stores/ui.store';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      className={`p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-slate-700 flex items-center justify-center ${className}`}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
      ) : (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      )}
    </button>
  );
};
