import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useInView } from '../../hooks/useInView';
import { experiences } from '../../utils/data';
import { getExperienceStyles } from './componentStyles';

export default function Experience() {
  const { mode, accent } = useThemeContext();
  const { ref, inView } = useInView(0.1);
  const s = getExperienceStyles(mode, accent.primary, accent.secondary, accent.glow);

  return (
    <Box id="experience" component="section" sx={s.section} ref={ref}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography sx={s.sectionLabel}>03 / Experience</Typography>
        <Typography variant="h2" sx={{ ...s.sectionTitle, fontSize: { xs: '2.2rem', md: '3rem' } }}>
          Work History
        </Typography>

        <Box sx={{ ...s.timeline, pl: { xs: 2, md: 8 }, pt: 2 }}>
          <Box sx={s.timelineLine} />

          {experiences.map((exp, i) => (
            <Box
              key={exp.company}
              sx={{
                ...s.entry,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              <Box sx={s.dot} />

              <Box sx={s.periodBlock}>
                <Typography component="span" sx={s.period}>{exp.period}</Typography>
                <Typography sx={s.location}>{exp.location}</Typography>
              </Box>

              <Box>
                <Typography sx={s.role}>{exp.role}</Typography>
                <Typography sx={s.company}>{exp.company}</Typography>
                <Box>
                  {exp.bullets.map((b) => (
                    <Box key={b} sx={s.bullet}>
                      <Box sx={s.bulletDot} />
                      <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}>
                        {b}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
