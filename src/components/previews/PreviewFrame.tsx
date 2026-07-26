import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface PreviewFrameProps {
  /** Display-only URL shown in the chrome bar. */
  url: string;
  children: ReactNode;
  className?: string;
}

/** Browser-chrome shell shared by all generated project previews. */
export function PreviewFrame({ url, children, className }: PreviewFrameProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-line bg-surface', className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-raised/60 px-4 py-2.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-line-bright" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-line-bright" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-line-bright" />
        <span className="ml-3 flex-1 truncate rounded bg-bg/60 px-2.5 py-1 text-center font-mono text-[10px] text-faint">
          {url}
        </span>
      </div>
      {/* Decorative mock UI — hidden from assistive tech. */}
      <div aria-hidden className="relative aspect-[4/3] select-none overflow-hidden">
        {children}
      </div>
    </div>
  );
}
