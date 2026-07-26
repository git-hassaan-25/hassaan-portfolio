import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { CodeCard } from '@/components/ui/CodeCard';
import { totalProjects, yearsOfExperience } from '@/lib/derived';
import { skillCategories } from '@/data/content';

const STATEMENT = [
  'I build fast, scalable web products.',
  'From design systems to real-time platforms.',
  'Shipped and maintained in production.',
].join(' ');

const WORDS = STATEMENT.split(' ');

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
  /** Reduced motion keeps every word fully legible instead of dimming it. */
  reduced: boolean;
}

function Word({ children, range, progress, reduced }: WordProps) {
  const opacity = useTransform(progress, range, reduced ? [1, 1] : [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

const stats = [
  { label: 'Years experience', value: yearsOfExperience, suffix: '+' },
  { label: 'Products shipped', value: totalProjects, suffix: '' },
  { label: 'Skill domains', value: skillCategories.length, suffix: '' },
  { label: 'Years on one product', value: 3, suffix: '' },
];

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  });

  return (
    <Section id="about" label="01 / About" title="Engineering, end to end">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p
            ref={ref}
            className="flex flex-wrap font-display text-2xl font-semibold leading-snug tracking-tight text-cream md:text-[2rem]"
          >
            {WORDS.map((word, index) => {
              const start = index / WORDS.length;
              const end = (index + 1) / WORDS.length;
              return (
                <Word
                  key={`${word}-${index}`}
                  range={[start, end]}
                  progress={scrollYProgress}
                  reduced={reduced}
                >
                  {word}
                </Word>
              );
            })}
          </p>

          <Reveal delay={0.1} className="mt-10 space-y-5 text-base leading-relaxed text-muted">
            <p>
              I&apos;m a full stack engineer based in Lahore, working mostly at the front of the
              stack — React and TypeScript — with enough Node.js, Express and MongoDB behind it to
              own a feature end to end. Most of my time goes to the parts users feel: render
              performance, state that stays predictable as an app grows, and interfaces that hold up
              under real data.
            </p>
            <p>
              At CCJK Technologies I architected a React + Tailwind design system that sped up UI
              work across new features, drove the move to Vite and Webpack, and integrated REST and
              GraphQL APIs across products. Before that, at Invictus Hub, I built responsive
              interfaces, dashboards and internal tools in Agile teams.
            </p>
          </Reveal>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <dl className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-surface p-6">
                  <dt className="mb-2 font-mono text-[11px] uppercase tracking-widest text-faint">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-4xl font-extrabold text-gold">
                    <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.12}>
            <CodeCard />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
