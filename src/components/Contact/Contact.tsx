import { Box, Typography } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useInView } from '../../hooks/useInView';
import { getContactStyles } from './componentStyles';

export default function Contact() {
  const { mode, accent } = useThemeContext();
  const { ref, inView } = useInView();
  const s = getContactStyles(mode, accent.primary, accent.secondary, accent.glow);

  return (
    <Box id="contact" component="section" sx={s.section} ref={ref}>
      <Box sx={s.innerGlow} />

      <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 1 }}>
        <Typography sx={s.sectionLabel}>06 / Contact</Typography>
        <Typography
          variant="h2"
          sx={{
            ...s.headline,
            fontSize: { xs: '2.5rem', md: '4rem' },
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Let's build
          <br />
          <Box component="span" sx={{ color: accent.primary }}>something great.</Box>
        </Typography>

        <Typography
          sx={{
            ...s.sub,
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.6s ease 0.15s',
          }}
        >
          Open to frontend engineering roles, collaboration, and challenging projects.
        </Typography>

        <Box
          sx={{
            ...s.contactRow,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s',
          }}
        >
          <Box component="a" href="mailto:hassaanasim25@gmail.com" sx={s.contactCard}>
            <Email sx={{ color: accent.secondary, fontSize: 20 }} />
            <Box>
              <Typography component="span" sx={s.contactLabel}>Email</Typography>
              <Typography sx={s.contactValue}>hassaanasim25@gmail.com</Typography>
            </Box>
          </Box>

          <Box component="a" href="tel:+923174949079" sx={s.contactCard}>
            <Phone sx={{ color: accent.secondary, fontSize: 20 }} />
            <Box>
              <Typography component="span" sx={s.contactLabel}>Phone</Typography>
              <Typography sx={s.contactValue}>+92 317-494-9079</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={s.footer}>
          <Typography sx={s.footerLogo}>HA.</Typography>
          <Typography sx={s.footerNote}>
            © {new Date().getFullYear()} Hassaan Asim · Full Stack Engineer
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
