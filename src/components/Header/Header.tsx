import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              background: mode === 'chalk' ? 'rgba(250,250,248,0.95)' : 'rgba(10,10,10,0.95)',
              backdropFilter: 'blur(16px)',
              borderLeft: `1px solid ${mode === 'chalk' ? '#E0DDD6' : '#1E1E1E'}`,
            },
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ ...s.logo, color: accent.primary }}>
              HA.
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'text.primary' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ px: 2 }}>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{
                    borderRadius: mode === 'aurora' ? '12px' : '4px',
                    mb: 1,
                    '&:hover': {
                      backgroundColor: accent.primary + '20',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        ...s.navLink,
                        color: 'text.primary',
                        fontSize: '1rem',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {THEMES.map((t) => (
                <Button
                  key={t.key}
                  onClick={() => setMode(t.key)}
                  sx={{
                    ...s.themeButton,
                    color: mode === t.key ? accent.primary : 'text.secondary',
                    borderColor: mode === t.key ? accent.primary : 'transparent',
                    opacity: mode === t.key ? 1 : 0.45,
                    minWidth: 'auto',
                    flex: 1,
                  }}
                >
                  {t.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Drawer>

        {/* Desktop Theme Buttons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
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
