import { PerformanceMonitor } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { ParticleField } from './ParticleField';

interface HeroSceneProps {
  progress: MotionValue<number>;
}

const FULL_COUNT = 6000;
const REDUCED_COUNT = 3500;

/** Weights the field toward the right so particles never wash out the headline copy. */
const MASK = 'radial-gradient(ellipse 68% 62% at 72% 45%, #000 22%, transparent 78%)';

/**
 * Lazy-loaded WebGL layer. This module is the only code-split boundary —
 * three/fiber/drei are imported nowhere else, so they land in their own chunk.
 */
export function HeroScene({ progress }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [dpr, setDpr] = useState(1.5);
  const [count, setCount] = useState(FULL_COUNT);
  const [visible, setVisible] = useState(true);

  // Idle the GPU once the hero has scrolled out of view.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        dpr={dpr}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      >
        <PerformanceMonitor
          onDecline={() => {
            setDpr(1);
            setCount(REDUCED_COUNT);
          }}
        />
        <ParticleField count={count} progress={progress} theme={theme} />
      </Canvas>
    </motion.div>
  );
}
