import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('bg-gradient-to-r from-gold to-teal bg-clip-text text-transparent', className)}>
      {children}
    </span>
  );
}
