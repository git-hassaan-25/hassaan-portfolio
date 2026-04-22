import { ThemeMode } from '../../types';

export const getHeaderStyles = (mode: ThemeMode, scrolled: boolean) => ({
  appBar: {
    background: scrolled
      ? mode === 'chalk'
        ? 'rgba(250,250,248,0.9)'
        : 'rgba(10,10,10,0.85)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    boxShadow: 'none',
    borderBottom: scrolled ? `1px solid ${mode === 'chalk' ? '#E0DDD6' : '#1E1E1E'}` : '1px solid transparent',
    transition: 'all 0.35s ease',
  },
  logo: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 800,
    fontSize: '1.25rem',
    letterSpacing: '-0.02em',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  navLink: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    textDecoration: 'none',
    opacity: 0.75,
    transition: 'opacity 0.2s ease',
    '&:hover': { opacity: 1 },
  },
  themeButton: {
    minWidth: 0,
    padding: '6px 12px',
    borderRadius: mode === 'aurora' ? '999px' : '2px',
    fontSize: '0.7rem',
    fontFamily: '"JetBrains Mono", monospace',
    border: '1px solid currentColor',
    opacity: 0.5,
    transition: 'all 0.2s ease',
    '&.active': { opacity: 1 },
  },
});
