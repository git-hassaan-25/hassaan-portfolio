import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Github, Linkedin, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { EASE, fadeUp, maskUp, staggerContainer } from '@/lib/motion';
import { Reveal } from '@/components/ui/Reveal';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-content px-6 md:px-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-gold"
          >
            06 / Contact
          </motion.p>

          <h2
            id="contact-title"
            className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight text-cream"
          >
            <span className="block overflow-hidden">
              <motion.span variants={maskUp} className="block">
                Let&apos;s build
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={maskUp} className="block">
                something <span className="text-gold">great.</span>
              </motion.span>
            </span>
          </h2>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            Open to frontend engineering roles, collaboration, and challenging projects.
          </motion.p>
        </motion.div>

        <Reveal delay={0.1} className="mt-14">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="group relative inline-block font-display text-[clamp(1.35rem,4.5vw,3rem)] font-bold tracking-tight text-cream transition-colors duration-300 hover:text-gold"
            >
              {site.email}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
              />
            </a>

            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email address ${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition-colors duration-300 hover:border-gold/60 hover:text-gold"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="flex items-center gap-2 text-teal"
                  >
                    <Check aria-hidden className="h-3.5 w-3.5" />
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="flex items-center gap-2"
                  >
                    <Copy aria-hidden className="h-3.5 w-3.5" />
                    Copy
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          <span aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </Reveal>

        <Reveal delay={0.16} className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-2.5 font-mono text-xs text-muted transition-colors duration-300 hover:border-gold/60 hover:text-cream"
          >
            <Phone aria-hidden className="h-3.5 w-3.5 text-gold" />
            {site.phone}
          </a>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-2.5 font-mono text-xs text-muted">
            <MapPin aria-hidden className="h-3.5 w-3.5 text-gold" />
            {site.location}
          </span>

          {site.socials.github && (
            <MagneticButton variant="ghost" size="sm" href={site.socials.github} external>
              <Github aria-hidden className="h-3.5 w-3.5" />
              GitHub
            </MagneticButton>
          )}
          {site.socials.linkedin && (
            <MagneticButton variant="ghost" size="sm" href={site.socials.linkedin} external>
              <Linkedin aria-hidden className="h-3.5 w-3.5" />
              LinkedIn
            </MagneticButton>
          )}
          {site.resumeUrl && (
            <MagneticButton variant="ghost" size="sm" href={site.resumeUrl} external>
              Résumé ↗
            </MagneticButton>
          )}
        </Reveal>
      </div>
    </section>
  );
}
