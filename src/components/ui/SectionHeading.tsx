import { motion } from 'framer-motion';
import { fadeUp, maskUp, staggerContainer } from '@/lib/motion';

interface SectionHeadingProps {
  /** id for the h2 — referenced by the parent section's aria-labelledby. */
  id: string;
  label: string;
  title: string;
}

export function SectionHeading({ id, label, title }: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-10 md:mb-14"
    >
      <motion.p
        variants={fadeUp}
        className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-gold"
      >
        {label}
      </motion.p>
      <div className="overflow-hidden">
        <motion.h2
          variants={maskUp}
          id={id}
          className="font-display text-4xl font-bold tracking-tight text-cream md:text-5xl"
        >
          {title}
        </motion.h2>
      </div>
    </motion.div>
  );
}
