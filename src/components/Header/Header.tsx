import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { useThemeContext } from '../../hooks/useThemeContext';
import { ThemeMode } from '../../types';
import { navItems } from '../../utils/data';
import { getHeaderStyles } from './componentStyles';

const THEMES: { key: ThemeMode; label: string }[] = [
  { key: 'obsidian', label: 'obsidian' },
  { key: 'aurora', label: 'aurora' },
  { key: 'chalk', label: 'chalk' },
];

export default function Header() {
  const { mode, setMode, accent } = useThemeContext();
  const [scrolled, setScrolled] = useState(false);
  const s = getHeaderStyles(mode, scrolled);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AppBar position="fixed" sx={s.appBar}>
      <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, md: 4 }, gap: 4 }}>
        <Typography component="a" href="#about" sx={{ ...s.logo, color: accent.primary, flexGrow: 0 }}>
          HA.
        </Typography>

        <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flexGrow: 1, justifyContent: 'center' }}>
          {navItems.map((item) => (
            <Typography
              key={item.label}
              component="a"
              href={item.href}
              sx={{ ...s.navLink, color: 'text.primary' }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {THEMES.map((t) => (
            <Button
              key={t.key}
              onClick={() => setMode(t.key)}
              sx={{
                ...s.themeButton,
                color: mode === t.key ? accent.primary : 'text.secondary',
                borderColor: mode === t.key ? accent.primary : 'transparent',
                opacity: mode === t.key ? 1 : 0.45,
              }}
            >
              {t.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
