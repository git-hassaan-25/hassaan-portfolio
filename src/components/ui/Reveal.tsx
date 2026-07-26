import { motion, type HTMLMotionProps } from 'framer-motion';
import { DUR, EASE } from '@/lib/motion';

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Scroll-triggered fade-up wrapper. Inert under reduced motion via MotionConfig. */
export function Reveal({ delay = 0, y = 24, once = true, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: DUR.base, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
