import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { experiences } from '@/data/content';
import type { ExperienceEntry } from '@/types';
import { formatDuration } from '@/lib/derived';
import { EASE } from '@/lib/motion';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ExpandableList } from '@/components/ui/ExpandableList';

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number;
  total: number;
  /** Draw progress of the timeline spine — lights this entry's node as it passes. */
  lineProgress: MotionValue<number>;
}

function TimelineEntry({ entry, index, total, lineProgress }: TimelineEntryProps) {
  const isCurrent = /present/i.test(entry.period);
  const duration = formatDuration(entry.period);
  const nodeLit = useTransform(lineProgress, [index / total, (index + 0.35) / total], [0, 1]);

  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute -left-8 top-1.5 h-2.5 w-2.5 rounded-full bg-line-bright md:-left-12"
      />
      <motion.span
        aria-hidden
        style={{ opacity: nodeLit, scale: nodeLit }}
        className="absolute -left-8 top-1.5 h-2.5 w-2.5 rounded-full bg-gold shadow-glow-gold md:-left-12"
      />

      <Reveal>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-teal">
            {entry.period}
          </span>
          {duration && <span className="font-mono text-xs text-faint">· {duration}</span>}
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-gold">
              <span
                aria-hidden
                className="h-1 w-1 rounded-full bg-gold motion-safe:animate-pulse-dot"
              />
              Present
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl font-bold text-cream md:text-3xl">{entry.role}</h3>
        <p className="mt-1.5 font-mono text-sm text-muted">
          {entry.company} · {entry.location}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          <ExpandableList
            items={entry.bullets}
            id={`experience-bullets-${index}`}
            className="mt-6"
          />
        </motion.div>
      </Reveal>
    </div>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end 0.6'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <Section id="experience" label="03 / Experience" title="Work history">
      <div ref={ref} className="relative pl-8 md:pl-12">
        <span aria-hidden className="absolute bottom-0 left-0 top-2 w-px bg-line" />
        <motion.span
          aria-hidden
          style={{ scaleY: lineScale }}
          className="absolute bottom-0 left-0 top-2 w-px origin-top bg-gradient-to-b from-gold to-teal"
        />

        <div className="space-y-12">
          {experiences.map((entry, index) => (
            <TimelineEntry
              key={`${entry.company}-${entry.period}`}
              entry={entry}
              index={index}
              total={experiences.length}
              lineProgress={lineScale}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
