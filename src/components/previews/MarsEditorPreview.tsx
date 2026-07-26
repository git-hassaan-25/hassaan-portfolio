import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { EASE } from '@/lib/motion';
import type { PreviewProps } from './types';

const ROWS = [0, 1, 2, 3, 4];
const SOURCE_WIDTHS = ['92%', '74%', '85%', '66%', '80%'];
const STEPS = 14;

/** CAT-tool segment table: the active target cell "types", confirms, advances. */
export function MarsEditorPreview({ active }: PreviewProps) {
  const reduced = usePrefersReducedMotion();
  // One monotonic tick derives both row and fill, so the updater stays pure.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 110);
    return () => window.clearInterval(timer);
  }, [active, reduced]);

  const cycle = STEPS + 1;
  const activeRow = reduced ? 2 : Math.floor(tick / cycle) % ROWS.length;
  const fill = reduced ? 1 : (tick % cycle) / STEPS;

  return (
    <div className="absolute inset-0 flex flex-col bg-bg">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-3 w-3 rounded-sm bg-gold/70" />
        <span className="h-1.5 w-16 rounded-full bg-line-bright" />
        <span className="ml-auto rounded border border-line px-1.5 py-0.5 font-mono text-[8px] text-faint">
          {'{1}'}
        </span>
      </div>

      <div className="grid grid-cols-[1.5rem_1fr_1fr] border-b border-line px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest text-faint">
        <span>#</span>
        <span>Source</span>
        <span>Target</span>
      </div>

      <div className="flex-1">
        {ROWS.map((index) => {
          const isActive = index === activeRow;
          const isDone = index < activeRow;
          return (
            <div
              key={index}
              className={`grid grid-cols-[1.5rem_1fr_1fr] items-center gap-2 border-b border-line/60 px-3 py-2.5 transition-colors duration-300 ${
                isActive ? 'bg-surface' : ''
              }`}
            >
              <span className="font-mono text-[8px] text-faint">{index + 1}</span>
              <span
                className="h-1.5 rounded-full bg-line-bright"
                style={{ width: SOURCE_WIDTHS[index] }}
              />
              <div className="flex items-center gap-1.5">
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line/60">
                  <motion.span
                    animate={{ scaleX: isActive ? fill : isDone ? 1 : 0 }}
                    transition={{ duration: 0.12, ease: 'linear' }}
                    className="absolute inset-0 origin-left rounded-full bg-teal/60"
                  />
                </span>
                {isActive && !reduced && (
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="h-2.5 w-px bg-gold"
                  />
                )}
                {(isDone || (isActive && fill >= 1)) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="font-mono text-[9px] leading-none text-teal"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 border-t border-line px-3 py-1.5 font-mono text-[8px] text-faint">
        <span className="text-teal">TM 98%</span>
        <span>MT</span>
        <span className="ml-auto">QA ✓</span>
      </div>
    </div>
  );
}
