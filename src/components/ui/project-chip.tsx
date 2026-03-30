import { cn } from '@/lib/utils';
import { Tag } from './tag';
import type { EmployerProject } from '@/types/portfolio';

interface ProjectChipProps {
  project: EmployerProject;
}

export function ProjectChip({ project }: ProjectChipProps) {
  const content = (
    <>
      <p className="text-sm font-semibold text-text-primary line-clamp-1">
        {project.name}
      </p>
      <p className="mt-0.5 text-xs text-text-secondary line-clamp-1">
        {project.description}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {project.techStack.slice(0, 3).map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </>
  );

  const baseClasses = cn(
    'w-[160px] shrink-0 overflow-hidden rounded-sm border bg-bg-surface p-3',
  );

  if (project.linkedProjectSlug) {
    return (
      <a
        href={`/projects/${project.linkedProjectSlug}`}
        className={cn(
          baseClasses,
          'border-border-subtle',
          'motion-safe:transition-all motion-safe:duration-200',
          'hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_0_12px_var(--color-accent-glow)]',
        )}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={cn(baseClasses, 'border-border-subtle')}>
      {content}
    </div>
  );
}
