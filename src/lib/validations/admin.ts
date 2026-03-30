import { z } from 'zod';

export const employerProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  techStack: z.array(z.string().min(1)).min(1),
  linkedProjectSlug: z.string().optional(),
});

export const projectSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(100),
  problem: z.string().min(1),
  solution: z.string().min(1),
  impact: z.string().min(1),
  framework: z.enum(['laravel', 'nextjs', 'nestjs', 'react', 'other']),
  techStack: z.array(z.string().min(1)).min(1),
  githubUrl: z.string().url(),
  demoUrl: z.string().url().optional(),
  demoVideo: z.string().optional(),
  screenshot: z.string().startsWith('/'),
  testCount: z.number().int().positive().optional(),
  lighthouseScore: z.number().int().min(0).max(100).optional(),
  outcomeMetric: z.string().min(1),
  featured: z.boolean(),
  claudeAssisted: z.boolean(),
  order: z.number().int().positive(),
  codeDiff: z.string().optional(),
});

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  responsibilities: z.array(z.string().min(1)).min(1),
  techStack: z.array(z.string().min(1)).min(1),
  outcomeMetric: z.string().min(1),
  projects: z.array(employerProjectSchema).optional(),
});

export const workflowStepSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
  shortTitle: z.string().min(1).max(10),
  description: z.string().min(1),
  tools: z.array(z.string().min(1)).min(1),
  output: z.string().min(1),
  demoVideo: z.string().optional(),
  quote: z.string().min(1),
});

export const expertiseSchema = z.object({
  title: z.string().min(1),
  plainDescription: z.string().min(1),
  technicalDeepDive: z.string().min(1),
  tradeoff: z.string().min(1),
  relatedProject: z.string().optional(),
  icon: z.string().min(1),
});

export const siteConfigSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  subtitle: z.string().min(1),
  availability: z.string().min(1),
  location: z.string().min(1),
  contactEmail: z.string(),
  resumeFile: z.string(),
  resumeDate: z.string(),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  ogImage: z.string(),
  proofMetrics: z.array(z.object({ value: z.string(), label: z.string() })),
  socialLinks: z.array(
    z.object({
      platform: z.enum(['github', 'linkedin']),
      url: z.string().url(),
      label: z.string(),
    }),
  ),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type WorkflowStepFormData = z.infer<typeof workflowStepSchema>;
export type ExpertiseFormData = z.infer<typeof expertiseSchema>;
export type SiteConfigFormData = z.infer<typeof siteConfigSchema>;
