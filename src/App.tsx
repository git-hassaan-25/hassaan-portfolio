import { MotionConfig } from 'framer-motion';
import type { CSSProperties } from 'react';
import { LenisProvider } from '@/hooks/useLenis';
import { ThemeProvider } from '@/hooks/useTheme';
import { AmbientBackground } from '@/components/layout/AmbientBackground';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';

/** Both values are theme-driven CSS variables, so they're cast once here. */
const GRAIN_STYLE = {
  opacity: 'var(--grain-opacity)',
  mixBlendMode: 'var(--grain-blend)',
} as unknown as CSSProperties;

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LenisProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-bg"
          >
            Skip to content
          </a>

          <AmbientBackground />
          <ScrollProgress />
          <Header />

          <main id="main">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
          </main>

          <Footer />

          {/* Film grain — above content, below the header and menu so nav stays crisp. */}
          <div
            aria-hidden
            style={GRAIN_STYLE}
            className="pointer-events-none fixed inset-0 z-30 bg-noise"
          />
        </LenisProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
