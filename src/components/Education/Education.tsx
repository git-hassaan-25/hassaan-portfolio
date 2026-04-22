import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useInView } from '../../hooks/useInView';
import { getEducationStyles } from './componentStyles';

export default function Education() {
  const { mode, accent } = useThemeContext();
  const { ref, inView } = useInView();
  const s = getEducationStyles(mode, accent.primary, accent.glow);

  return (
    <Box id="education" component="section" sx={s.section} ref={ref}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography sx={s.sectionLabel}>04 / Education</Typography>
        <Typography variant="h2" sx={{ ...s.sectionTitle, fontSize: { xs: '2.2rem', md: '3rem' } }}>
          Academic Background
        </Typography>

        <Box
          sx={{
            ...s.card,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <Box sx={s.bgText}>CS</Box>

          <Box>
            <Typography sx={s.degreeLabel}>Degree</Typography>
            <Typography sx={s.degree}>BS Computer Science</Typography>
            <Typography sx={s.institution}>Superior University, Lahore</Typography>
          </Box>

          <Box sx={s.yearBadge}>2023</Box>
        </Box>
      </Box>
    </Box>
  );
}
