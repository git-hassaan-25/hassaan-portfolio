/**
 * Page-wide ambient field. Fixed behind all content so the site keeps a sense
 * of depth below the hero instead of dropping to flat black once the WebGL
 * particle field ends.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* No grid here — the hero draws its own; a second one would double up. */}
      <div className="absolute -left-40 top-[12%] h-[34rem] w-[34rem] rounded-full bg-gold/[0.045] blur-[150px]" />
      <div className="absolute -right-40 top-[45%] h-[32rem] w-[32rem] rounded-full bg-teal/[0.04] blur-[150px]" />
      <div className="absolute -left-32 bottom-[6%] h-[30rem] w-[30rem] rounded-full bg-gold/[0.035] blur-[150px]" />
    </div>
  );
}
