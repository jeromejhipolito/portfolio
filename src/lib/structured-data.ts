import { siteConfig } from '@/data/site-config';
import type { Project } from '@/types/portfolio';

export function generatePersonSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: baseUrl,
    sameAs: siteConfig.socialLinks.map((l) => l.url),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PH',
    },
    knowsAbout: [
      'Full Stack Development',
      'Microservices Architecture',
      'Event-Driven Architecture',
      'AMQP',
      'Apache Kafka',
      'Saga Pattern',
      'Idempotency',
      'Laravel',
      'NestJS',
      'Next.js',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'Docker',
      'CI/CD',
    ],
  };
}

export function generateWebSiteSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.name} — ${siteConfig.title}`,
    url: baseUrl,
    description: siteConfig.metaDescription,
  };
}

export function generateProjectSchema(project: Project, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.problem,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    url: `${baseUrl}/projects/${project.slug}`,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    programmingLanguage: project.techStack,
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
