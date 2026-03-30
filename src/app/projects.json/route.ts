import { NextResponse } from 'next/server';
import { projects } from '@/data/projects';

export async function GET() {
  const publicProjects = projects.map(({ slug, name, problem, framework, techStack, githubUrl, outcomeMetric }) => ({
    slug,
    name,
    description: problem,
    framework,
    techStack,
    githubUrl,
    outcomeMetric,
  }));

  return NextResponse.json(publicProjects, {
    headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
  });
}
