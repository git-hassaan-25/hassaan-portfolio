import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { EASE } from '@/lib/motion';
import type { PreviewProps } from './types';

const START_BID = 2400;
const STEP = 50;

/** Live auction: streaming panel plus a bid ticker that climbs in real time. */
export function ParkerAuctionPreview({ active }: PreviewProps) {
  const reduced = usePrefersReducedMotion();
  const [bids, setBids] = useState<number[]>([START_BID, START_BID - STEP, START_BID - STEP * 2]);
  const [seconds, setSeconds] = useState(48);

  useEffect(() => {
    if (!active || reduced) return;
    const bidTimer = window.setInterval(() => {
      setBids((current) => [current[0] + STEP, ...current].slice(0, 4));
    }, 1600);
    const clockTimer = window.setInterval(() => {
      setSeconds((value) => (value <= 0 ? 59 : value - 1));
    }, 1000);
    return () => {
      window.clearInterval(bidTimer);
      window.clearInterval(clockTimer);
    };
  }, [active, reduced]);

  return (
    <div className="absolute inset-0 grid grid-cols-[1.15fr_1fr] gap-2 bg-bg p-3">
      <div className="flex flex-col gap-2">
        <div className="relative flex-1 overflow-hidden rounded-lg border border-line bg-raised">
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-bg/80 px-1.5 py-0.5">
            <span
              className={`h-1.5 w-1.5 rounded-full bg-[#FF5F57] ${
                active && !reduced ? 'motion-safe:animate-pulse-dot' : ''
              }`}
            />
            <span className="font-mono text-[7px] uppercase tracking-widest text-cream">Live</span>
          </div>
          <div className="absolute inset-x-3 bottom-3 space-y-1">
            <div className="h-1.5 w-3/4 rounded-full bg-line-bright" />
            <div className="h-1.5 w-1/2 rounded-full bg-line" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-line bg-surface px-2.5 py-1.5">
          <span className="font-mono text-[8px] uppercase tracking-widest text-faint">Ends in</span>
          <span className="font-mono text-[10px] tabular-nums text-teal">
            00:{String(reduced ? 48 : seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex flex-col rounded-lg border border-line bg-surface p-2">
        <div className="mb-2 border-b border-line pb-2">
          <p className="font-mono text-[7px] uppercase tracking-widest text-faint">Current bid</p>
          <motion.p
            key={bids[0]}
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="font-display text-lg font-extrabold tabular-nums text-gold"
          >
            ${bids[0].toLocaleString()}
          </motion.p>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {bids.map((bid, index) => (
              <motion.div
                key={bid}
                layout
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: index === 0 ? 1 : 0.55 - index * 0.1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-center gap-1.5 rounded border border-line/70 bg-raised px-1.5 py-1"
              >
                <span
                  className={`h-3 w-3 shrink-0 rounded-full ${index === 0 ? 'bg-gold/80' : 'bg-line-bright'}`}
                />
                <span className="h-1 flex-1 rounded-full bg-line-bright" />
                <span className="font-mono text-[8px] tabular-nums text-muted">
                  ${bid.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
