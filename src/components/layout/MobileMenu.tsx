import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { navItems } from '@/data/content';
import { site } from '@/data/site';
import { EASE } from '@/lib/motion';
import { ThemeToggle } from './ThemeToggle';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ opacity: 0, y: '-4%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-4%' }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-0 z-50 flex flex-col bg-bg/98 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-end px-6 py-5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded p-2 text-cream transition-colors hover:text-gold"
            >
              <X aria-hidden className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.06, duration: 0.5, ease: EASE }}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.href);
                }}
                className="group flex items-baseline gap-4 py-3 font-display text-4xl font-bold text-cream transition-colors hover:text-gold"
              >
                <span className="font-mono text-xs text-faint">
                  0{index + 1}
                </span>
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-4 border-t border-line px-8 py-6">
            <a
              href={`mailto:${site.email}`}
              className="truncate font-mono text-sm text-muted transition-colors hover:text-gold"
            >
              {site.email}
            </a>
            <ThemeToggle className="shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
