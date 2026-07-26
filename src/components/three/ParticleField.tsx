import { useFrame, useThree } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Theme } from '@/hooks/useTheme';
import { fragmentShader, vertexShader } from './shaders';

interface ParticleFieldProps {
  count: number;
  /** Hero scroll progress (0 → 1) drives the formation morph. */
  progress: MotionValue<number>;
  theme: Theme;
}

/**
 * Light mode needs its own palette and blending: additive blending on a pale
 * background sums toward white, which would make every particle invisible.
 */
const PALETTES: Record<Theme, { gold: string; goldBright: string; teal: string; alpha: number }> = {
  dark: { gold: '#E8C547', goldBright: '#F2DA7E', teal: '#4ECDC4', alpha: 0.85 },
  light: { gold: '#7A6210', goldBright: '#A8871A', teal: '#12746D', alpha: 0.6 },
};

/**
 * Builds two formations the shader blends between:
 *  - aHome: rows of glyph-like points, reading as columns of code
 *  - aAlt:  a loose helix the field disperses into as you scroll away
 */
function buildAttributes(count: number) {
  const home = new Float32Array(count * 3);
  const alt = new Float32Array(count * 3);
  const seed = new Float32Array(count);

  const rows = 40;
  const rowHeight = 0.42;

  for (let i = 0; i < count; i += 1) {
    const row = i % rows;
    // Each row is a "line of code" of random length, left-aligned with an indent.
    const lineLength = 3 + Math.random() * 9;
    const indent = Math.random() < 0.35 ? 0.6 : 0;
    const x = -7 + indent + Math.random() * lineLength;
    const y = (row - rows / 2) * rowHeight + (Math.random() - 0.5) * 0.12;
    const z = (Math.random() - 0.5) * 2.5;

    home[i * 3] = x;
    home[i * 3 + 1] = y;
    home[i * 3 + 2] = z;

    const angle = (i / count) * Math.PI * 14;
    const radius = 5 + Math.random() * 3.5;
    alt[i * 3] = Math.cos(angle) * radius;
    alt[i * 3 + 1] = (i / count - 0.5) * 16;
    alt[i * 3 + 2] = Math.sin(angle) * radius - 2;

    seed[i] = Math.random();
  }

  return { home, alt, seed };
}

export function ParticleField({ count, progress, theme }: ParticleFieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointerTarget = useRef(new THREE.Vector3(0, 0, 0));
  /** Normalized device coords, tracked manually — see the listener below. */
  const ndc = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const { home, alt, seed } = useMemo(() => buildAttributes(count), [count]);

  // The canvas is pointer-events-none so the hero CTAs stay clickable, which
  // means R3F's own pointer never updates. Track it on the window instead.
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      ndc.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      ndc.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uPointer: { value: new THREE.Vector3(0, 0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
      uGold: { value: new THREE.Color(PALETTES.dark.gold) },
      uGoldBright: { value: new THREE.Color(PALETTES.dark.goldBright) },
      uTeal: { value: new THREE.Color(PALETTES.dark.teal) },
      uAlpha: { value: PALETTES.dark.alpha },
    }),
    []
  );

  // Recolor in place on theme change — cheaper than remounting the geometry.
  useEffect(() => {
    const palette = PALETTES[theme];
    uniforms.uGold.value.set(palette.gold);
    uniforms.uGoldBright.value.set(palette.goldBright);
    uniforms.uTeal.value.set(palette.teal);
    uniforms.uAlpha.value = palette.alpha;
  }, [theme, uniforms]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    // Track DPR live — PerformanceMonitor can lower it after the uniform was seeded.
    material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    material.uniforms.uTime.value += delta;
    // Read the MotionValue directly — no React re-render per frame.
    material.uniforms.uMorph.value = progress.get();

    // Map normalized pointer to world space on the z=0 plane.
    pointerTarget.current.set(
      (ndc.current.x * viewport.width) / 2,
      (ndc.current.y * viewport.height) / 2,
      0
    );
    const current = material.uniforms.uPointer.value as THREE.Vector3;
    current.x = THREE.MathUtils.damp(current.x, pointerTarget.current.x, 4, delta);
    current.y = THREE.MathUtils.damp(current.y, pointerTarget.current.y, 4, delta);
  });

  return (
    // Keyed on count so a PerformanceMonitor downgrade rebuilds the geometry
    // cleanly instead of leaving mismatched attribute buffers behind.
    <points key={count} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[home, 3]} />
        <bufferAttribute attach="attributes-aHome" args={[home, 3]} />
        <bufferAttribute attach="attributes-aAlt" args={[alt, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seed, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}
