import type { Variants } from 'framer-motion';

/** Signature ease — fast start, long luxurious settle (easeOutExpo-ish). */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DUR = {
  fast: 0.35,
  base: 0.7,
  slow: 0.9,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.base, ease: EASE } },
};

/** Line mask reveal — pair with an `overflow-hidden` parent. */
export const maskUp: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: DUR.slow, ease: EASE } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
