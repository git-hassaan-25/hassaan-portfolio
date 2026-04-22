import { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeMode } from '../types';
import { themeAccents } from '../theme/themes';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  accent: { primary: string; secondary: string; glow: string };
}

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('obsidian');
  const accent = themeAccents[mode];

  return (
    <ThemeContext.Provider value={{ mode, setMode, accent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
