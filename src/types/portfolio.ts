export type FrameworkType = 'laravel' | 'nextjs' | 'nestjs' | 'react' | 'other';

export interface Project {
  slug: string;
  name: string;
  problem: string;
  solution: string;
  impact: string;
  framework: FrameworkType;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  demoVideo?: string;
  screenshot: string;
  testCount?: number;
  lighthouseScore?: number;
  outcomeMetric: string;
  featured: boolean;
  claudeAssisted: boolean;
  order: number;
  codeDiff?: string;
  gallery?: Array<{ src: string; alt: string }>;
  demoNote?: string;
}

export interface EmployerProject {
  name: string;
  description: string;
  techStack: string[];
  linkedProjectSlug?: string;
}

export interface WorkExperience {
  company: string;
  companyContext?: string;
  role: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
  techStack: string[];
  outcomeMetric: string;
  projects?: EmployerProject[];
}

export interface WorkflowStep {
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  tools: string[];
  output: string;
  demoVideo?: string;
  quote: string;
}

export interface ExpertiseItem {
  title: string;
  plainDescription: string;
  technicalDeepDive: string;
  tradeoff: string;
  relatedProject?: string;
  externalLink?: { url: string; label: string };
  icon: string;
}

export interface ProofMetric {
  value: string;
  label: string;
}

export interface SocialLink {
  platform: 'github' | 'linkedin';
  url: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  subtitle: string;
  availability: string;
  proofMetrics: ProofMetric[];
  socialLinks: SocialLink[];
  metaDescription: string;
  metaTitle: string;
  ogImage: string;
  location: string;
  contactEmail: string;
  resumeFile: string;
  resumeDate: string;
}

export interface ChangelogEntry {
  date: string;
  description: string;
}
