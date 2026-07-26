import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 hover:border-gold/60 hover:text-cream',
        className
      )}
    >
      {children}
    </span>
  );
}
