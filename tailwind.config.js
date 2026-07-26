/**
 * Colors resolve to CSS variables so a single `data-theme` swap on <html>
 * re-skins every component. Channels are stored space-separated ("10 10 10")
 * so Tailwind's /opacity modifiers keep working.
 */
const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: withAlpha('--c-bg'),
        surface: withAlpha('--c-surface'),
        raised: withAlpha('--c-raised'),
        line: {
          DEFAULT: withAlpha('--c-line'),
          bright: withAlpha('--c-line-bright'),
        },
        gold: {
          DEFAULT: withAlpha('--c-gold'),
          bright: withAlpha('--c-gold-bright'),
          dim: withAlpha('--c-gold-dim'),
        },
        teal: {
          DEFAULT: withAlpha('--c-teal'),
          dim: withAlpha('--c-teal-dim'),
        },
        cream: withAlpha('--c-text'),
        muted: withAlpha('--c-muted'),
        faint: withAlpha('--c-faint'),
      },
      fontFamily: {
        display: ['"Syne Variable"', 'Syne', 'sans-serif'],
        body: ['"DM Sans Variable"', '"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
      },
      boxShadow: {
        'glow-gold': '0 0 60px -12px rgb(var(--c-gold) / 0.28)',
        'glow-teal': '0 0 60px -12px rgb(var(--c-teal) / 0.22)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgb(var(--c-line)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--c-line)) 1px, transparent 1px)',
        noise: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'pulse-dot': 'pulseDot 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 40s linear infinite',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
    },
  },
  plugins: [],
}
