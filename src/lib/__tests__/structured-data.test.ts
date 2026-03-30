import { describe, it, expect } from 'vitest';
import {
  generatePersonSchema,
  generateWebSiteSchema,
  generateProjectSchema,
  generateBreadcrumbSchema,
} from '../structured-data';
import type { Project } from '@/types/portfolio';

const BASE_URL = 'https://example.com';

describe('generatePersonSchema', () => {
  it('returns valid Person schema', () => {
    const schema = generatePersonSchema(BASE_URL);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBeTruthy();
    expect(schema.jobTitle).toBeTruthy();
    expect(schema.url).toBe(BASE_URL);
    expect(schema.sameAs).toBeInstanceOf(Array);
    expect(schema.sameAs.length).toBeGreaterThan(0);
    expect(schema.address.addressCountry).toBe('PH');
    expect(schema.knowsAbout).toBeInstanceOf(Array);
    expect(schema.knowsAbout.length).toBeGreaterThan(5);
  });
});

describe('generateWebSiteSchema', () => {
  it('returns valid WebSite schema', () => {
    const schema = generateWebSiteSchema(BASE_URL);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.url).toBe(BASE_URL);
    expect(schema.description).toBeTruthy();
  });
});

describe('generateProjectSchema', () => {
  const mockProject: Project = {
    slug: 'test-project',
    name: 'Test Project',
    problem: 'A test problem',
    solution: 'A test solution',
    impact: 'Test impact',
    framework: 'nextjs',
    techStack: ['Next.js', 'TypeScript'],
    githubUrl: 'https://github.com/test/test',
    screenshot: '/test.png',
    outcomeMetric: 'Test metric',
    featured: false,
    claudeAssisted: false,
    order: 1,
  };

  it('returns valid SoftwareApplication schema', () => {
    const schema = generateProjectSchema(mockProject, BASE_URL);
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema.name).toBe('Test Project');
    expect(schema.url).toBe(`${BASE_URL}/projects/test-project`);
    expect(schema.programmingLanguage).toEqual(['Next.js', 'TypeScript']);
  });
});

describe('generateBreadcrumbSchema', () => {
  it('returns valid BreadcrumbList schema', () => {
    const schema = generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Projects', url: `${BASE_URL}/projects` },
      { name: 'Test', url: `${BASE_URL}/projects/test` },
    ]);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[2].position).toBe(3);
  });
});
