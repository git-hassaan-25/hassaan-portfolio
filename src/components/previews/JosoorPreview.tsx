import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { EASE } from '@/lib/motion';
import type { PreviewProps } from './types';

const CARDS = [0, 1, 2, 3, 4, 5];

/** Marketplace storefront that mirrors between LTR and RTL — the i18n story. */
export function JosoorPreview({ active }: PreviewProps) {
  const reduced = usePrefersReducedMotion();
  const [rtl, setRtl] = useState(false);

  useEffect(() => {
    if (!active || reduced) return;
    const timer = window.setInterval(() => setRtl((value) => !value), 3600);
    return () => window.clearInterval(timer);
  }, [active, reduced]);

  const isRtl = reduced ? false : rtl;

  return (
    <div className="absolute inset-0 flex flex-col bg-bg p-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="mb-3 flex items-center gap-3">
        <motion.div layout transition={{ duration: 0.6, ease: EASE }} className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-gold" />
          <motion.span
            key={isRtl ? 'ar' : 'en'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-[11px] font-bold text-cream"
          >
            {isRtl ? 'جسور' : 'Josoor'}
          </motion.span>
        </motion.div>

        <motion.div layout transition={{ duration: 0.6, ease: EASE }} className="h-5 flex-1 rounded-full bg-surface" />

        <motion.div
          layout
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-1 rounded-full border border-line px-2 py-0.5"
        >
          <span className={`font-mono text-[8px] ${isRtl ? 'text-faint' : 'text-gold'}`}>EN</span>
          <span className="font-mono text-[8px] text-faint">⇄</span>
          <span className={`font-mono text-[8px] ${isRtl ? 'text-gold' : 'text-faint'}`}>ع</span>
        </motion.div>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2.5">
        {CARDS.map((index) => (
          <motion.div
            key={index}
            layout
            transition={{ duration: 0.6, ease: EASE, delay: index * 0.03 }}
            className="flex flex-col gap-1.5 rounded-lg border border-line bg-surface p-2"
          >
            <div className="flex-1 rounded bg-raised" />
            <div className="h-1.5 w-4/5 rounded-full bg-line-bright" />
            <div className="h-1.5 w-3/5 rounded-full bg-line" />
            <div className="mt-0.5 h-2 w-2/5 rounded-sm bg-gold/70" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
