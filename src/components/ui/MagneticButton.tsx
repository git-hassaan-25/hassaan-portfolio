import { motion, useSpring, useTransform } from 'framer-motion';
import type { MouseEventHandler, PointerEvent, ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';

type Variant = 'solid' | 'ghost';
type Size = 'md' | 'sm';

interface MagneticButtonProps {
  variant?: Variant;
  size?: Size;
  /** How strongly the button chases the pointer (0–1). */
  strength?: number;
  href?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  'aria-label'?: string;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  solid: 'bg-gold text-bg hover:bg-gold-bright',
  ghost: 'border border-line text-cream hover:border-gold/60 hover:text-gold',
};

const SIZE_CLASSES: Record<Size, string> = {
  md: 'px-7 py-3.5 text-sm',
  sm: 'px-4 py-2 text-xs',
};

const SPRING = { stiffness: 150, damping: 15, mass: 0.1 };

/**
 * Button that magnetically follows the pointer; the label counter-translates
 * for depth. Pointer-only — keyboard and touch get a normal button.
 */
export function MagneticButton({
  variant = 'solid',
  size = 'md',
  strength = 0.3,
  href,
  external = false,
  onClick,
  className,
  children,
  ...aria
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const labelX = useTransform(x, (v) => v * -0.35);
  const labelY = useTransform(y, (v) => v * -0.35);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    'relative inline-flex items-center justify-center gap-2 rounded font-display font-semibold tracking-wide transition-colors duration-300',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  const label = (
    <motion.span style={{ x: labelX, y: labelY }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={{ x, y }}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...aria}
      >
        {label}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={classes}
      {...aria}
    >
      {label}
    </motion.button>
  );
}
