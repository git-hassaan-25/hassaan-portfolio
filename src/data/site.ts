/**
 * Site-wide identity and external links.
 * Empty strings are intentional placeholders — components render those
 * entries only when a value is present, so filling one in here is all
 * it takes to surface it in the UI.
 */
export const site = {
  name: 'Hassaan Asim',
  firstName: 'Hassaan',
  lastName: 'Asim',
  monogram: 'HA',
  role: 'Full Stack Engineer',
  tagline: 'React • TypeScript • Node.js',
  email: 'hassaanasim25@gmail.com',
  phone: '+92 317-494-9079',
  phoneHref: 'tel:+923174949079',
  location: 'Lahore, Pakistan',
  availability: 'Available for new opportunities',
  url: 'https://hassaanasim.dev',
  socials: {
    github: '',
    linkedin: '',
  },
  resumeUrl: '',
} as const;
