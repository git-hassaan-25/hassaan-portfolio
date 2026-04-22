import { SkillCategory, ExperienceEntry, NavItem } from '../types';

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages & Core',
    icon: '{ }',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Frontend Architecture'],
  },
  {
    label: 'Frontend Stack',
    icon: '⬡',
    skills: ['React.js', 'HTML5', 'CSS3', 'Material UI', 'Tailwind CSS'],
  },
  {
    label: 'UI Engineering',
    icon: '◈',
    skills: ['Component-Based Architecture', 'Design Systems', 'Responsive Design', 'Accessible Design'],
  },
  {
    label: 'State & Data',
    icon: '⇌',
    skills: ['REST API Integration', 'GraphQL', 'Client-Side State Management', 'Data Flow Optimization'],
  },
  {
    label: 'Performance',
    icon: '⚡',
    skills: ['Rendering Optimization', 'Bundle Size Reduction', 'Load Time Optimization', 'Vite', 'Webpack'],
  },
  {
    label: 'Quality & Tooling',
    icon: '✓',
    skills: ['Unit Testing', 'Code Reviews', 'CI/CD Workflows', 'Git', 'Jira', 'Agile'],
  },
];

export const experiences: ExperienceEntry[] = [
  {
    role: 'Senior Frontend Engineer',
    company: 'CCJK Technologies',
    location: 'Lahore, Pakistan',
    period: 'Aug 2022 – Present',
    bullets: [
      'Architected a scalable React + Tailwind design system, accelerating UI development across new features.',
      'Built and scaled high-performance web applications using React and TypeScript.',
      'Drove adoption of Vite and Webpack, streamlining build performance and local dev experience.',
      'Optimized application performance by reducing unnecessary re-renders and improving rendering efficiency.',
      'Integrated REST & GraphQL APIs, ensuring efficient data handling and seamless user experience.',
      'Maintained code quality through code reviews, testing, and CI workflows.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Invictus Hub',
    location: 'Lahore, Pakistan',
    period: 'Mar 2021 – Jul 2022',
    bullets: [
      'Improved UI responsiveness and fixed performance bottlenecks in existing features.',
      'Developed responsive user interfaces using JavaScript (ES6+) and React.js.',
      'Integrated REST APIs and handled dynamic data rendering on the client side.',
      'Built and maintained core JavaScript-based features and UI components.',
      'Worked on custom dashboards and internal tools, focusing on usability and functionality.',
      'Collaborated with team members in Agile workflows, contributing to feature development and bug fixes.',
    ],
  },
];
