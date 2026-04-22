import { Box, Typography, Button } from '@mui/material';
import { useThemeContext } from '../../hooks/useThemeContext';
import { getHeroStyles } from './componentStyles';

export default function Hero() {
  const { mode, accent } = useThemeContext();
  const s = getHeroStyles(mode, accent.primary, accent.glow);

  return (
    <Box id="about" component="section" sx={s.section}>
      {/* Ambient orbs */}
      <Box sx={{ ...s.backgroundOrb, width: 500, height: 500, top: -100, left: -120 }} />
      <Box sx={{ ...s.backgroundOrb, width: 300, height: 300, bottom: 80, right: 100, background: accent.glow }} />

      {/* Decorative grid */}
      <Box sx={s.decorGrid} />

      <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <Typography sx={s.eyebrow}>Frontend Engineer · React & TypeScript</Typography>

        <Typography variant="h1" sx={{ ...s.headline, fontSize: { xs: '3.5rem', md: '6rem', lg: '7.5rem' } }}>
          Hassaan
          <br />
          <Box component="span" sx={{ color: accent.primary }}>Asim.</Box>
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={s.subline}>
          4+ years building scalable, high-performance web applications. Specialized in React
          architecture, rendering optimization, and seamless API integration.
        </Typography>

        <Box sx={s.ctaRow}>
          <Button component="a" href="#experience" variant="contained" disableElevation sx={s.primaryCta}>
            View Experience
          </Button>
          <Button component="a" href="#contact" variant="outlined" sx={s.secondaryCta}>
            Get in Touch
          </Button>
        </Box>

        <Box sx={{ mt: 5, ...s.badge }}>
          <Box component="span" sx={s.dot} />
          Available for new opportunities
        </Box>
      </Box>
    </Box>
  );
}
