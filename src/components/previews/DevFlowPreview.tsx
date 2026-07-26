import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { EASE } from '@/lib/motion';
import type { PreviewProps } from './types';

const COLUMNS = ['To Do', 'In Progress', 'Done'];

interface Card {
  id: number;
  column: number;
  lines: number;
}

const INITIAL: Card[] = [
  { id: 1, column: 0, lines: 2 },
  { id: 2, column: 0, lines: 1 },
  { id: 3, column: 1, lines: 2 },
  { id: 4, column: 1, lines: 1 },
  { id: 5, column: 2, lines: 1 },
  { id: 6, column: 2, lines: 2 },
];

/** Kanban board where a card animates between columns — the real-time story. */
export function DevFlowPreview({ active }: PreviewProps) {
  const reduced = usePrefersReducedMotion();
  const [cards, setCards] = useState(INITIAL);

  useEffect(() => {
    if (!active || reduced) {
      setCards(INITIAL);
      return;
    }
    let step = 0;
    const timer = window.setInterval(() => {
      const movingId = (step % 3) + 1;
      setCards((current) =>
        current.map((card) =>
          card.id === movingId ? { ...card, column: (card.column + 1) % 3 } : card
        )
      );
      step += 1;
    }, 1800);
    return () => window.clearInterval(timer);
  }, [active, reduced]);

  return (
    <div className="absolute inset-0 flex flex-col bg-bg p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full bg-teal ${!reduced && active ? 'motion-safe:animate-pulse-dot' : ''}`}
        />
        <span className="font-mono text-[8px] uppercase tracking-widest text-faint">Live</span>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2">
        {COLUMNS.map((column, columnIndex) => {
          const columnCards = cards.filter((card) => card.column === columnIndex);
          return (
            <div key={column} className="flex flex-col rounded-lg border border-line bg-surface/60 p-1.5">
              <div className="mb-1.5 flex items-center justify-between px-0.5">
                <span className="font-mono text-[8px] uppercase tracking-wider text-faint">
                  {column}
                </span>
                <span className="rounded bg-line px-1 font-mono text-[8px] text-muted">
                  {columnCards.length}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {columnCards.map((card) => (
                  <motion.div
                    key={card.id}
                    layout
                    layoutId={`devflow-card-${card.id}`}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="rounded border border-line bg-raised p-1.5"
                  >
                    <div className="mb-1 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-gold/70" />
                      <span className="h-1 flex-1 rounded-full bg-line-bright" />
                    </div>
                    {Array.from({ length: card.lines }).map((_, line) => (
                      <div
                        key={line}
                        className="mt-1 h-1 rounded-full bg-line"
                        style={{ width: line === 0 ? '85%' : '55%' }}
                      />
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
