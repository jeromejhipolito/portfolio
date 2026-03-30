import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from './card';
import { Tag } from './tag';
import { Badge } from './badge';
import type { Project } from '@/types/portfolio';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured }: ProjectCardProps) {
  return (
    <Card className={featured ? 'col-span-full border-l-4 border-l-accent' : ''}>
      <div className={featured ? 'flex flex-col gap-6 p-6 md:flex-row' : 'p-5'}>
        {/* Screenshot */}
        <div
          className={cn(
            'relative overflow-hidden rounded bg-bg-elevated',
            featured ? 'md:w-1/2 h-48 md:h-auto min-h-[200px]' : 'h-44 mb-4',
          )}
        >
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            fill
            className="object-cover object-top"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 45vw'}
          />
        </div>

        <div className={featured ? 'md:w-1/2' : ''}>
          {/* Outcome metric */}
          {project.outcomeMetric && (
            <p className="mb-2 font-mono text-lg font-bold text-accent">
              {project.outcomeMetric.split('·')[0]?.trim()}
            </p>
          )}

          {/* Name */}
          <h3 className="mb-1 text-lg font-semibold text-text-primary">
            <a
              href={`/projects/${project.slug}`}
              className="hover:text-accent transition-colors"
            >
              {project.name}
            </a>
          </h3>

          {/* Problem statement */}
          <p className={cn('mb-3 text-sm text-text-secondary', !featured && 'line-clamp-2')}>
            {project.problem}
          </p>

          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, featured ? 8 : 5).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.testCount && (
              <Badge variant="status">{project.testCount} tests</Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded bg-accent px-3 py-1 font-mono text-xs font-medium text-bg-base transition-colors hover:bg-accent-dim"
              >
                Live Demo &rarr;
              </a>
            )}
            <a
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:text-accent-dim transition-colors"
            >
              View Details &rarr;
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
