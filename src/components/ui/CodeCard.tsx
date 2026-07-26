const KEYWORD = 'text-teal';
const STRING = 'text-gold';
const PROP = 'text-cream';
const PUNCT = 'text-faint';

/** Static, hand-tokenized `profile.ts` snippet — zero runtime highlighting cost. */
export function CodeCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line bg-raised/60 px-4 py-3">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 font-mono text-[11px] text-faint">profile.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code>
          <span className={KEYWORD}>const</span> <span className={PROP}>engineer</span>{' '}
          <span className={PUNCT}>= {'{'}</span>
          {'\n  '}
          <span className={PROP}>name</span>
          <span className={PUNCT}>:</span> <span className={STRING}>'Hassaan Asim'</span>
          <span className={PUNCT}>,</span>
          {'\n  '}
          <span className={PROP}>role</span>
          <span className={PUNCT}>:</span> <span className={STRING}>'Full Stack Engineer'</span>
          <span className={PUNCT}>,</span>
          {'\n  '}
          <span className={PROP}>stack</span>
          <span className={PUNCT}>: [</span>
          <span className={STRING}>'React'</span>
          <span className={PUNCT}>,</span> <span className={STRING}>'TypeScript'</span>
          <span className={PUNCT}>,</span> <span className={STRING}>'Node.js'</span>
          <span className={PUNCT}>],</span>
          {'\n  '}
          <span className={PROP}>location</span>
          <span className={PUNCT}>:</span> <span className={STRING}>'Lahore, PK'</span>
          <span className={PUNCT}>,</span>
          {'\n  '}
          <span className={PROP}>openTo</span>
          <span className={PUNCT}>:</span> <span className={STRING}>'new opportunities'</span>
          <span className={PUNCT}>,</span>
          {'\n'}
          <span className={PUNCT}>{'}'} </span>
          <span className={KEYWORD}>as const</span>
          <span className={PUNCT}>;</span>
          <span aria-hidden className="ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-gold/80 motion-safe:animate-pulse-dot" />
        </code>
      </pre>
    </div>
  );
}
