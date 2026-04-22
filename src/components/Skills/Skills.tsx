import { Box, Typography, Chip } from '@mui/material';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useInView } from '../../hooks/useInView';
import { skillCategories } from '../../utils/data';
import { getSkillsStyles } from './componentStyles';

export default function Skills() {
  const { mode, accent } = useThemeContext();
  const { ref, inView } = useInView();
  const s = getSkillsStyles(mode, accent.primary, accent.glow);

  return (
    <Box id="skills" component="section" sx={s.section} ref={ref}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography sx={s.sectionLabel}>02 / Skills</Typography>
        <Typography variant="h2" sx={{ ...s.sectionTitle, fontSize: { xs: '2.2rem', md: '3rem' } }}>
          Technical Proficiency
        </Typography>
        <Typography sx={s.sectionSub}>
          A focused toolkit honed across years of production-grade frontend development.
        </Typography>

        <Box sx={s.grid}>
          {skillCategories.map((cat, i) => (
            <Box
              key={cat.label}
              sx={{
                ...s.card,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                '&:hover .cardGlow': { opacity: 1 },
              }}
            >
              <Box className="cardGlow" sx={s.cardGlow} />
              <Box component="span" sx={s.cardIcon}>{cat.icon}</Box>
              <Typography sx={s.cardLabel}>{cat.label}</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {cat.skills.map((skill) => (
                  <Chip key={skill} label={skill} size="small" sx={s.chip} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
