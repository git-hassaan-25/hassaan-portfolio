import { useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { useRef, useState } from 'react';
import { projects } from '@/data/content';
import type { ProjectEntry } from '@/types';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Chip } from '@/components/ui/Chip';
import { TiltCard } from '@/components/ui/TiltCard';
import { ExpandableList } from '@/components/ui/ExpandableList';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PreviewFrame } from '@/components/previews/PreviewFrame';
import { previewRegistry } from '@/components/previews';

function ProjectRow({ project, index }: { project: ProjectEntry; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-30% 0px -30% 0px' });
  const [hovered, setHovered] = useState(false);
  const { Component: Preview, url } = previewRegistry[project.id];
  const reversed = index % 2 === 1;
  const links = project.links;

  return (
    <article
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={cn(
        'flex flex-col gap-10 lg:items-center lg:gap-16',
        reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      )}
    >
      <Reveal className="lg:w-1/2">
        <TiltCard>
          <PreviewFrame url={url}>
            {/* Loops on hover (desktop) or while centered in view (touch). */}
            <Preview active={hovered || inView} />
          </PreviewFrame>
        </TiltCard>
      </Reveal>

      <Reveal delay={0.1} className="lg:w-1/2">
        <p className="mb-4 font-mono text-xs tracking-widest text-gold">
          {String(index + 1).padStart(2, '0')}
        </p>

        <h3 className="font-display text-3xl font-bold tracking-tight text-cream md:text-4xl">
          {project.title}
        </h3>

        <p className="mt-3 text-base leading-relaxed text-muted">{project.description}</p>

        <p className="mt-5 border-l-2 border-teal/60 pl-4 text-sm leading-relaxed text-cream/90">
          {project.highlight}
        </p>

        <ExpandableList
          items={project.bullets}
          initial={2}
          id={`project-bullets-${project.id}`}
          className="mt-6"
        />

        <ul className="mt-7 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>

        {(links?.live || links?.github) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {links.live && (
              <MagneticButton variant="ghost" size="sm" href={links.live} external>
                Live
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </MagneticButton>
            )}
            {links.github && (
              <MagneticButton variant="ghost" size="sm" href={links.github} external>
                <Github aria-hidden className="h-3.5 w-3.5" />
                GitHub
              </MagneticButton>
            )}
          </div>
        )}
      </Reveal>
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" label="04 / Projects" title="Featured work">
      <div className="space-y-20 md:space-y-24">
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
