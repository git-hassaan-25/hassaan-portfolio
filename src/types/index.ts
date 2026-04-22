export type ThemeMode = 'obsidian' | 'aurora' | 'chalk';

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

export interface NavItem {
  label: string;
  href: string;
}
