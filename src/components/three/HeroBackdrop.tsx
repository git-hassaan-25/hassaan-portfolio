/**
 * Pure-CSS hero background. Doubles as the Suspense fallback for the WebGL
 * scene and as the full experience when 3D is skipped (reduced motion, touch,
 * small viewport, no WebGL) — so it has to look intentional on its own.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-grid-faint opacity-40"
        style={{
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%)',
        }}
      />
      <div className="absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-gold/[0.07] blur-[120px]" />
      <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-teal/[0.06] blur-[120px]" />
      <div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.5] motion-safe:animate-spin-slow"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, rgb(var(--c-gold) / 0.06) 25%, transparent 50%, rgb(var(--c-teal) / 0.05) 75%, transparent 100%)',
          maskImage: 'radial-gradient(circle, transparent 35%, #000 70%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 35%, #000 70%)',
        }}
      />
    </div>
  );
}
