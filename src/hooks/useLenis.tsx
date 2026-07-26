import Lenis from 'lenis';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface LenisContextValue {
  lenis: Lenis | null;
  /** Smooth-scrolls to a hash ('#projects') or pixel offset; instant under reduced motion. */
  scrollTo: (target: string | number) => void;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    const instance = new Lenis({ lerp: 0.1 });
    lenisRef.current = instance;
    setLenis(instance);

    let raf = requestAnimationFrame(function loop(time) {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduced]);

  const scrollTo = useCallback((target: string | number) => {
    const instance = lenisRef.current;
    if (instance) {
      // `force` is required: the mobile menu stops Lenis before navigating, and a
      // stopped instance silently drops scrollTo requests.
      instance.scrollTo(target, {
        offset: typeof target === 'string' ? -80 : 0,
        duration: 1.1,
        force: true,
      });
      return;
    }
    // Reduced motion / no Lenis: jump instantly. Sections carry scroll-mt for offset.
    if (typeof target === 'number') {
      window.scrollTo(0, target);
    } else {
      document.querySelector(target)?.scrollIntoView();
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);
  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, scrollTo, stop, start }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenisContext() {
  return useContext(LenisContext);
}
