import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useInView } from '../../hooks/useInView';
import { education } from '../../utils/data';
import { getEducationStyles } from './componentStyles';

export default function Education() {
  const { mode, accent } = useThemeContext();
  const { ref, inView } = useInView();
  const s = getEducationStyles(mode, accent.primary, accent.glow);

  return (
    <Box id="education" component="section" sx={s.section} ref={ref}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography sx={s.sectionLabel}>05 / Education</Typography>
        <Typography variant="h2" sx={{ ...s.sectionTitle, fontSize: { xs: '2.2rem', md: '3rem' } }}>
          Academic Background
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
          {education.map((edu, index) => (
            <Box
              key={index}
              sx={{
                ...s.card,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.3s ease, box-shadow 0.3s ease`,
              }}
            >
              <Box sx={s.bgText}>{edu.abbreviation}</Box>

              <Box>
                <Typography sx={s.degreeLabel}>Degree</Typography>
                <Typography sx={s.degree}>{edu.degree}</Typography>
                <Typography sx={s.institution}>{edu.institution}</Typography>
              </Box>

              <Box sx={s.yearBadge}>{edu.year}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
