import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { navItems } from '@/data/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLenisContext } from '@/hooks/useLenis';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

// 'home' is observed but has no nav link, so nothing highlights while in the hero.
const SECTION_IDS = ['home', ...navItems.map((item) => item.href.slice(1))];

export function Header() {
  const { scrollY } = useScroll();
  const { scrollTo, stop, start } = useLenisContext();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // The overlay and its trigger are both md:hidden — without this, resizing or
  // rotating to desktop while it's open leaves the page scroll-locked with no
  // way to close it.
  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > previous && latest > 240 && !menuOpen);
  });

  useEffect(() => {
    if (!menuOpen) return;
    stop();
    // Lenis is absent under reduced motion, so lock the body directly too.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      start();
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, stop, start]);

  const navigate = useCallback(
    (href: string) => {
      setMenuOpen(false);
      scrollTo(href);
      history.replaceState(null, '', href);
    },
    [scrollTo]
  );

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
          scrolled && 'border-b border-line bg-bg/70 backdrop-blur-xl'
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-content items-center justify-between px-6 md:px-10">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              scrollTo(0);
              history.replaceState(null, '', ' ');
            }}
            aria-label="Back to top"
          >
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(item.href);
                  }}
                  className={cn(
                    'relative rounded px-3.5 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-300',
                    isActive ? 'text-cream' : 'text-muted hover:text-cream'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute inset-x-2.5 -bottom-0.5 h-px bg-gold"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <MagneticButton
              variant="ghost"
              size="sm"
              href="#contact"
              className="hidden md:inline-flex"
              onClick={(event) => {
                event.preventDefault();
                navigate('#contact');
              }}
            >
              Get in touch
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="rounded p-2 text-cream transition-colors hover:text-gold md:hidden"
            >
              <Menu aria-hidden className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={navigate} />
    </>
  );
}
