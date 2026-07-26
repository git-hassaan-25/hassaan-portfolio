import { animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts up when scrolled into view; writes via ref so no re-render per frame. */
export function AnimatedCounter({ to, suffix = '', duration = 1.4, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduced) {
      el.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (value) => {
        el.textContent = `${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
