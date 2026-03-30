import data from './projects.json';
import type { Project } from '@/types/portfolio';

export const projects = data as Project[];

export const frameworkLabels: Record<string, string> = {
  all: 'All',
  laravel: 'Laravel',
  nextjs: 'Next.js',
  nestjs: 'NestJS',
  react: 'React',
  other: 'Other',
};
