import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { Tag } from '@/components/ui/tag';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import {
  generateProjectSchema,
  generateBreadcrumbSchema,
} from '@/lib/structured-data';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} — Jerome Hipolito's Portfolio`,
    description: project.problem,
    openGraph: {
      title: `${project.name} — Jerome Hipolito's Portfolio`,
      description: `${project.outcomeMetric}. ${project.problem}`,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jerome.dev';
  const projectSchema = generateProjectSchema(project, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Projects', url: `${baseUrl}/#projects` },
    { name: project.name, url: `${baseUrl}/projects/${project.slug}` },
  ]);

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([projectSchema, breadcrumbSchema]),
        }}
      />

      <main className="mx-auto max-w-[1200px] px-6 pb-24 pt-32">
        {/* Breadcrumb */}
        <nav className="mb-8 font-mono text-sm text-text-muted">
          <a href="/" className="hover:text-accent transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href="/#projects" className="hover:text-accent transition-colors">Projects</a>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">{project.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          {project.outcomeMetric && (
            <p className="mb-3 font-mono text-2xl font-bold text-accent">
              {project.outcomeMetric}
            </p>
          )}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary">
            {project.name}
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="framework">{project.framework}</Badge>
            {project.testCount && (
              <Badge variant="status">{project.testCount} tests</Badge>
            )}
          </div>
        </div>

        {/* Problem / Solution / Impact */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              // PROBLEM
            </h2>
            <p className="text-text-secondary">{project.problem}</p>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              // SOLUTION
            </h2>
            <p className="text-text-secondary">{project.solution}</p>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              // IMPACT
            </h2>
            <p className="text-text-secondary">{project.impact}</p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-12">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
            // TECH STACK
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>

        {/* Demo note */}
        {project.demoNote && (
          <div className="mb-12 rounded border border-accent/20 bg-accent/5 p-4">
            <p className="font-mono text-sm text-accent">{project.demoNote}</p>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
              // GALLERY
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded border border-border-subtle">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={450}
                    className="w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <p className="bg-bg-surface px-3 py-2 text-xs text-text-muted">{img.alt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code sample */}
        {project.codeDiff && (
          <div className="mb-12">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
              // CODE SAMPLE
            </h2>
            <pre className="overflow-x-auto rounded border border-border-subtle bg-bg-surface p-4 font-mono text-sm leading-relaxed text-text-secondary">
              <code>{project.codeDiff}</code>
            </pre>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          {project.demoUrl && (
            <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Try Live Demo &rarr;
            </Button>
          )}
          <Button href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant={project.demoUrl ? 'secondary' : 'primary'}>
            View Code on GitHub &rarr;
          </Button>
          <Button href="/#projects" variant="ghost">
            &larr; All Projects
          </Button>
        </div>
      </main>

      <Footer />
    </>
  );
}
