import { projects } from '@/data/content';

/**
 * Everything in this file is derived from real data in `data/content.ts` —
 * no invented metrics. If the data changes, the numbers follow.
 */

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseMonthYear(input: string): Date | null {
  const match = input.trim().match(/^([A-Za-z]{3,})\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTHS[match[1].slice(0, 3).toLowerCase()];
  if (month === undefined) return null;
  return new Date(Number(match[2]), month, 1);
}

export function yearsSince(isoDate: string): number {
  const ms = Date.now() - new Date(isoDate).getTime();
  return Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000));
}

/** First professional role started Mar 2021 (Invictus Hub). */
export const yearsOfExperience = yearsSince('2021-03-01');

/** 'Aug 2022 – Present' → '3 yrs 11 mos' (rounded to whole months, inclusive). */
export function formatDuration(period: string): string {
  const [rawStart, rawEnd = ''] = period.split(/[–—]/).map((part) => part.trim());
  const start = parseMonthYear(rawStart);
  const end = /present/i.test(rawEnd) ? new Date() : parseMonthYear(rawEnd);
  if (!start || !end) return '';
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  const yrs = Math.floor(totalMonths / 12);
  const mos = totalMonths % 12;
  const parts: string[] = [];
  if (yrs > 0) parts.push(`${yrs} yr${yrs > 1 ? 's' : ''}`);
  if (mos > 0) parts.push(`${mos} mo${mos > 1 ? 's' : ''}`);
  return parts.join(' ');
}

export interface TechUsage {
  name: string;
  count: number;
}

export const totalProjects = projects.length;

function normalizeTech(tech: string): string {
  const lower = tech.toLowerCase();
  if (lower === 'react' || lower === 'react.js' || /^react \d/.test(lower)) return 'React';
  if (lower.includes('typescript')) return 'TypeScript';
  if (lower.includes('socket.io')) return 'Socket.IO';
  if (lower.includes('tanstack')) return 'TanStack';
  if (lower.includes('tailwind')) return 'Tailwind CSS';
  if (lower.includes('node')) return 'Node.js';
  if (lower.includes('mongo')) return 'MongoDB';
  return tech;
}

/** Tie-break order for technologies that appear in the same number of projects. */
const TIE_PREFERENCE = [
  'GraphQL', 'Node.js', 'MongoDB', 'Tailwind CSS', 'WebRTC', 'TanStack', 'React Flow', 'Express',
];

function tieRank(name: string): number {
  const index = TIE_PREFERENCE.indexOf(name);
  return index === -1 ? TIE_PREFERENCE.length : index;
}

/** How many of the portfolio projects each technology appears in, most-used first. */
export function techFrequency(limit = 8): TechUsage[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const name of new Set(project.technologies.map(normalizeTech))) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || tieRank(a.name) - tieRank(b.name) || a.name.localeCompare(b.name))
    .slice(0, limit);
}
