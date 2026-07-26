import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState, type KeyboardEvent } from 'react';
import { skillCategories } from '@/data/content';
import { techFrequency, totalProjects } from '@/lib/derived';
import { cn } from '@/lib/cn';
import { EASE, staggerContainer } from '@/lib/motion';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const usage = techFrequency(8);

export function Skills() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const category = skillCategories[active];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = skillCategories.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="skills" label="02 / Skills" title="Technical proficiency">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        <div
          role="tablist"
          aria-label="Skill categories"
          aria-orientation="vertical"
          className="flex snap-x gap-2 overflow-x-auto pb-2 lg:sticky lg:top-32 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
        >
          {skillCategories.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.label}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                role="tab"
                id={`skill-tab-${index}`}
                aria-selected={isActive}
                aria-controls="skill-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onKeyDown}
                className={cn(
                  'relative shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2.5 text-left font-mono text-xs transition-colors duration-300 lg:w-full lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-4 lg:py-4 lg:text-sm',
                  isActive
                    ? 'border-gold/60 text-cream'
                    : 'border-line text-muted hover:text-cream'
                )}
              >
                <span className="mr-3 text-[10px] text-faint lg:text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
                <span className="ml-2 text-[10px] text-faint">{item.skills.length}</span>
                {isActive && (
                  <motion.span
                    layoutId="skill-indicator"
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute bottom-0 left-0 hidden h-full w-0.5 bg-gold lg:block"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="skill-panel"
          aria-labelledby={`skill-tab-${active}`}
          className="relative min-h-[16rem] overflow-hidden rounded-2xl border border-line bg-surface p-8 md:p-10"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[10rem] leading-none text-line-bright/40"
          >
            {category.icon}
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={category.label}
              variants={staggerContainer(0.045)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="relative"
            >
              <motion.h3
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="mb-6 font-display text-2xl font-bold text-cream"
              >
                {category.label}
              </motion.h3>
              <ul className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition-colors duration-300 hover:border-gold/60 hover:text-cream"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-16">
        <Reveal>
          <h3 className="mb-2 font-display text-xl font-bold text-cream">Most used in production</h3>
          <p className="mb-8 font-mono text-xs text-faint">
            Across the {totalProjects} projects featured below
          </p>
        </Reveal>

        <ul className="space-y-4">
          {usage.map((tech, index) => (
            <motion.li
              key={tech.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 }}
              className="flex items-center gap-4"
            >
              <span className="w-32 shrink-0 truncate font-mono text-xs text-muted md:w-40 md:text-sm">
                {tech.name}
              </span>
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: tech.count / totalProjects }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, ease: EASE, delay: index * 0.05 }}
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-gold-dim to-gold"
                />
              </span>
              <span className="w-20 shrink-0 text-right font-mono text-[11px] text-faint">
                {tech.count}/{totalProjects}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
