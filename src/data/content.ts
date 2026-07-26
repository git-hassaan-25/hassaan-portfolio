import type { EducationEntry, ExperienceEntry, NavItem, ProjectEntry, SkillCategory } from '@/types';

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages & Core',
    icon: '{ }',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'SQL', 'Frontend Architecture'],
  },
  {
    label: 'Frontend',
    icon: '⬡',
    skills: ['React.js', 'HTML5', 'CSS3', 'Material UI', 'Vite', 'Webpack'],
  },
  {
    label: 'Backend',
    icon: '⚙',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL'],
  },
  {
    label: 'Databases',
    icon: '⬢',
    skills: ['MongoDB (Mongoose)', 'SQL (schema design, queries, optimization)'],
  },
  {
    label: 'Architecture',
    icon: '◈',
    skills: ['MVC', 'Component-Based Architecture', 'MERN Stack'],
  },
  {
    label: 'Testing & Quality',
    icon: '✓',
    skills: ['Unit Testing', 'Code Reviews', 'Clean Code', 'ESLint'],
  },
  {
    label: 'Tools & Workflow',
    icon: '⌘',
    skills: ['Git', 'Jira', 'Agile Development', 'CI/CD', 'GitHub', 'Copilot', 'Claude AI'],
  },
  {
    label: 'Cloud & Infrastructure',
    icon: '☁',
    skills: ['AWS/Azure concepts', 'Docker basics', 'Environment configurations'],
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
      'Leveraged AI-assisted development tools to accelerate feature delivery and improve code quality.',
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

export const projects: ProjectEntry[] = [
  {
    id: 'josoor',
    title: 'Josoor',
    description: 'B2B marketplace platform with client storefront and admin console',
    technologies: ['React 19', 'TypeScript', 'TanStack Router/Query', 'Tailwind CSS', 'Redux Toolkit'],
    highlight:
      'npm-workspaces monorepo with shared UI, core & token packages — full i18n/RTL for English and Arabic',
    bullets: [
      'Architected npm-workspaces monorepo separating client marketplace app, admin console, and shared UI/core/token packages',
      'Built file-based routing with TanStack Router and data fetching with TanStack Query, including centralized error handling and query-key factories',
      'Delivered full i18n/RTL support for English and Arabic with a custom i18n system and logical CSS properties',
      'Developed a shadcn-style component library with Radix UI and cva variants, plus real-time features via SignalR and Firebase push notifications',
    ],
  },
  {
    id: 'mars-editor',
    title: 'Mars Editor',
    description: 'Web-based CAT tool for translation management',
    technologies: ['React', 'TypeScript', 'GraphQL', 'Material-UI'],
    highlight:
      'Virtualized segment tables keep a heavy translation workspace fast — three years of continuous ownership',
    bullets: [
      'Built and maintained frontend and API integration over 3 years',
      'Delivered high-performance translation workspace with virtualized segment tables',
      'Implemented rich-text editing, track changes, and drag-and-drop tag insertion',
      'Integrated end-to-end with GraphQL API for segment confirmation, TM/TB lookups, machine translation, and verification',
    ],
  },
  {
    id: 'devflow',
    title: 'DevFlow',
    description: 'Full-stack MERN project management and collaboration platform',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    highlight: 'Real-time Kanban collaboration over Socket.IO with JWT auth and role-based authorization',
    bullets: [
      'Designed MongoDB schema and developed RESTful Express API with JWT authentication',
      'Built React frontend featuring drag-and-drop Kanban boards and paginated project management',
      'Implemented real-time updates using Socket.IO for enhanced collaboration and live state synchronization',
      'Applied production-grade practices: role-based authorization, protected routes, structured error handling, and secure data handling',
    ],
  },
  {
    id: 'trueleads',
    title: 'TrueLeads',
    description: 'Lead generation platform with visual workflow builder',
    technologies: ['React', 'React Flow', 'Formik', 'Socket.IO', 'Zapier API'],
    highlight: 'Visual workflow builder on React Flow with customizable, editable nodes and workflow persistence',
    bullets: [
      'Developed and maintained scalable SPA with full API integration and complex state management',
      'Built visual workflow builder using React Flow with customizable, editable nodes and workflow persistence',
      'Implemented multi-user system with Zapier-based integrations',
      'Developed real-time chat, notification modules, dynamic form handling, and comprehensive settings module',
    ],
  },
  {
    id: 'parker-auction',
    title: 'Parker Auction',
    description: 'Online bidding platform with live auction system',
    technologies: ['React', 'TypeScript', 'WebRTC', 'Socket.IO'],
    highlight: 'WebRTC live streaming plus Socket.IO bidding and chat for real-time auctions',
    bullets: [
      'Developed scalable, modular frontend architecture with React and TypeScript',
      'Implemented auction and lot management with multi-step forms and detailed pages',
      'Built live auction system using WebRTC for streaming and Socket.io for real-time bidding/chat',
      'Delivered dashboards, inventory management, secure authentication, and favorites system',
    ],
  },
];

export const education: EducationEntry[] = [
  {
    degree: 'BS Computer Science (BSCS)',
    institution: 'Superior University, Lahore',
    year: '2023',
    abbreviation: 'CS',
  },
  {
    degree: 'Intermediate in Computer Science (ICS)',
    institution: 'Pak-Turk International College',
    year: '2019',
    abbreviation: 'ICS',
  },
];
