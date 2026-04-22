import { createTheme, Theme } from '@mui/material/styles';

// --- OBSIDIAN: Dark, refined, editorial ---
const obsidianTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#E8C547', contrastText: '#0A0A0A' },
    secondary: { main: '#4ECDC4' },
    background: { default: '#0A0A0A', paper: '#111111' },
    text: { primary: '#F0EDE8', secondary: '#8A8680' },
    divider: '#1E1E1E',
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Syne", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 500 },
  },
  shape: { borderRadius: 2 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontFamily: '"Syne", sans-serif', fontWeight: 600, letterSpacing: '0.02em' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem' },
      },
    },
  },
});

// --- AURORA: Vibrant, bold gradient-rich ---
const auroraTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#A78BFA', contrastText: '#0D0D1A' },
    secondary: { main: '#34D399' },
    background: { default: '#0D0D1A', paper: '#13132A' },
    text: { primary: '#EEF2FF', secondary: '#7C7CA8' },
    divider: '#1E1E3A',
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Syne", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontFamily: '"Syne", sans-serif', fontWeight: 600 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem' },
      },
    },
  },
});

// --- CHALK: Light, editorial, minimal ---
const chalkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1A1A2E', contrastText: '#FAFAF8' },
    secondary: { main: '#E63946' },
    background: { default: '#FAFAF8', paper: '#F2F0EB' },
    text: { primary: '#1A1A2E', secondary: '#6B6B7A' },
    divider: '#E0DDD6',
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Syne", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 500 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontFamily: '"Syne", sans-serif', fontWeight: 600 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem' },
      },
    },
  },
});

export const themes: Record<string, Theme> = {
  obsidian: obsidianTheme,
  aurora: auroraTheme,
  chalk: chalkTheme,
};

export const themeAccents: Record<string, { primary: string; secondary: string; glow: string }> = {
  obsidian: { primary: '#E8C547', secondary: '#4ECDC4', glow: 'rgba(232,197,71,0.15)' },
  aurora: { primary: '#A78BFA', secondary: '#34D399', glow: 'rgba(167,139,250,0.15)' },
  chalk: { primary: '#1A1A2E', secondary: '#E63946', glow: 'rgba(230,57,70,0.08)' },
};
