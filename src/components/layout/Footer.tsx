import { ArrowUp } from 'lucide-react';
import { navItems } from '@/data/content';
import { site } from '@/data/site';
import { useLenisContext } from '@/hooks/useLenis';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Logo } from './Logo';

export function Footer() {
  const { scrollTo } = useLenisContext();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-content flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} {site.name} — Built with React, Three.js &amp; Tailwind
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                scrollTo(item.href);
                history.replaceState(null, '', item.href);
              }}
              className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <MagneticButton
          variant="ghost"
          size="sm"
          aria-label="Back to top"
          onClick={() => scrollTo(0)}
          className="self-start md:self-auto"
        >
          <ArrowUp aria-hidden className="h-3.5 w-3.5" />
          Top
        </MagneticButton>
      </div>
    </footer>
  );
}
