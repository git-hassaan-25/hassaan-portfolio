import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useInView } from '../../hooks/useInView';
import { projects } from '../../utils/data';
import { getProjectsStyles } from './componentStyles';

export default function Projects() {
  const { mode, accent } = useThemeContext();
  const { ref, inView } = useInView(0.15);
  const s = getProjectsStyles(mode, accent.primary, accent.glow);

  return (
    <Box id="projects" component="section" sx={s.section} ref={ref}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography sx={s.sectionLabel}>04 / Projects</Typography>
        <Typography variant="h2" sx={{ ...s.sectionTitle, fontSize: { xs: '2.2rem', md: '3rem' } }}>
          Featured Work
        </Typography>
        <Typography sx={s.sectionSub}>
          A selection of projects showcasing full-stack capabilities and technical expertise.
        </Typography>

        <Box sx={s.grid}>
          {projects.map((project, i) => (
            <Box
              key={project.title}
              sx={{
                ...s.card,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, all 0.3s ease`,
                '&:hover .cardGlow': { opacity: 1 },
              }}
            >
              <Box className="cardGlow" sx={s.cardGlow} />

              <Box>
                <Typography sx={s.title}>{project.title}</Typography>
                <Typography sx={s.description}>{project.description}</Typography>
              </Box>

              <Box>
                <Typography sx={s.technologiesLabel}>Tech Stack</Typography>
                <Box sx={s.tagContainer}>
                  {project.technologies.map((tech) => (
                    <Box key={tech} sx={s.tag}>
                      {tech}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography sx={s.bulletsLabel}>Key Features</Typography>
                {project.bullets.map((bullet) => (
                  <Box key={bullet} sx={s.bullet}>
                    <Box sx={s.bulletDot} />
                    <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}>
                      {bullet}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
