import { motion, useSpring } from 'framer-motion';
import { useRef, type PointerEvent, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';

interface TiltCardProps {
  children: ReactNode;
  /** Max tilt in degrees. */
  max?: number;
  className?: string;
}

const SPRING = { stiffness: 120, damping: 14 };

/**
 * Pointer-tracked 3D tilt with a spotlight that follows the cursor via
 * --mx/--my CSS variables. Disabled for touch and reduced motion.
 */
export function TiltCard({ children, max = 6, className }: TiltCardProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * max);
    rotateX.set(-(py - 0.5) * 2 * max);
    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn('group relative', className)}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--c-gold) / 0.1), transparent 65%)',
        }}
      />
    </motion.div>
  );
}
