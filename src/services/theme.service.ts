export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'vcd_theme_preference';

export const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';

  // 1. Check manual localStorage preference
  const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }

  // 2. Check system OS preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

export const applyThemeToDom = (theme: ThemeMode) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    console.warn('Unable to persist theme to localStorage', err);
  }
};
