import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { SectionHeading } from './SectionHeading';

interface SectionProps {
  id: string;
  label?: string;
  title?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, label, title, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn('relative scroll-mt-24 py-16 md:py-24', className)}
    >
      <div className="mx-auto w-full max-w-content px-6 md:px-10">
        {label && title && <SectionHeading id={`${id}-title`} label={label} title={title} />}
        {children}
      </div>
    </section>
  );
}
