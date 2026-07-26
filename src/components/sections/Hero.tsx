import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import { useLenisContext } from '@/hooks/useLenis';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { yearsOfExperience } from '@/lib/derived';
import { DUR, EASE, fadeUp, maskUp, staggerContainer } from '@/lib/motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBackdrop } from '@/components/three/HeroBackdrop';

const HeroScene = lazy(() =>
  import('@/components/three/HeroScene').then((module) => ({ default: module.HeroScene }))
);

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useLenisContext();
  const reduced = usePrefersReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');
  const wideEnough = useMediaQuery('(min-width: 768px)');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // useTransform bypasses MotionConfig's reduced-motion handling, so gate it here.
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], reduced ? [1, 1] : [1, 0]);

  // Defer the WebGL chunk past first paint so it never blocks LCP.
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const schedule = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = schedule(() => setIdle(true));
    return () => cancel(handle as never);
  }, []);

  const saveData =
    typeof navigator !== 'undefined' &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

  const show3D = idle && !reduced && finePointer && wideEnough && !saveData && hasWebGL();

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      <HeroBackdrop />

      {show3D && (
        <Suspense fallback={null}>
          <HeroScene progress={scrollYProgress} />
        </Suspense>
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-content px-6 md:px-10"
      >
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="visible">
          <motion.p
            variants={fadeUp}
            className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-teal"
          >
            {site.role} · {site.tagline}
          </motion.p>

          <h1 className="font-display font-extrabold leading-[0.92] tracking-[-0.04em] text-cream">
            <span className="block overflow-hidden">
              <motion.span
                variants={maskUp}
                className="block text-[clamp(3.25rem,11vw,7.5rem)]"
              >
                {site.firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={maskUp}
                className="block text-[clamp(3.25rem,11vw,7.5rem)]"
              >
                {site.lastName}
                <span className="text-gold">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {yearsOfExperience}+ years building scalable, high-performance web applications.
            Full-stack expertise in React, TypeScript, Node.js, and the MERN stack. Specialized in
            designing performant UIs, RESTful APIs, and seamless API integration with a focus on
            delivering production-ready solutions.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#projects"
              onClick={(event) => {
                event.preventDefault();
                scrollTo('#projects');
              }}
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollTo('#contact');
              }}
            >
              Get in Touch
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-teal motion-safe:animate-pulse-dot"
            />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {site.availability}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: DUR.base, ease: EASE }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}
