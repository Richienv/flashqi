'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-white/20 dark:bg-black/20 backdrop-filter backdrop-blur-md 
                 border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 
                 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-sm group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-5 h-5 text-amber-500 dark:text-amber-400 
                     transition-all duration-300 transform drop-shadow-sm
                     ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 text-blue-400 dark:text-blue-300 
                     transition-all duration-300 transform drop-shadow-sm
                     ${theme === 'light' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        />
      </div>
    </button>
  );
} 