export type ProjectId = 'josoor' | 'mars-editor' | 'devflow' | 'trueleads' | 'parker-auction';

export interface SkillCategory {
  label: string;
  icon: string;
  skills: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  abbreviation?: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface ProjectEntry {
  id: ProjectId;
  title: string;
  description: string;
  technologies: string[];
  bullets: string[];
  /** One-line architecture hook shown as a pull-quote on the project card. */
  highlight: string;
  /** Optional — link buttons render only when a URL is present. */
  links?: ProjectLinks;
}

export interface NavItem {
  label: string;
  href: string;
}
