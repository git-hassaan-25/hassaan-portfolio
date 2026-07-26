import { site } from '@/data/site';
import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('font-display text-xl font-extrabold tracking-tight text-cream', className)}>
      {site.monogram}
      <span className="text-gold">.</span>
    </span>
  );
}
