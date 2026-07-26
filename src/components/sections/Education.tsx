import { education } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export function Education() {
  return (
    <Section id="education" label="05 / Education" title="Academic background" className="py-12 md:py-16">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((entry, index) => (
          <Reveal key={entry.degree} delay={index * 0.08}>
            <article className="flex h-full items-center gap-5 rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-gold/40">
              <span
                aria-hidden
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-gold/40 font-display text-lg font-extrabold text-gold"
              >
                {entry.abbreviation}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold leading-snug text-cream">
                  {entry.degree}
                </h3>
                <p className="mt-1 truncate text-sm text-muted">{entry.institution}</p>
                <p className="mt-1.5 font-mono text-xs text-faint">{entry.year}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
