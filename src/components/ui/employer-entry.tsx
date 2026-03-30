'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectChip } from './project-chip';
import type { WorkExperience } from '@/types/portfolio';

interface EmployerEntryProps {
  job: WorkExperience;
  isCurrent: boolean;
  defaultExpanded?: boolean;
}

export function EmployerEntry({ job, isCurrent, defaultExpanded = false }: EmployerEntryProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="flex gap-4">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'mt-2 h-3 w-3 shrink-0 rounded-full',
            isCurrent
              ? 'bg-accent shadow-[0_0_8px_var(--color-accent-glow)]'
              : 'bg-text-muted',
          )}
        />
        <div className="mt-1 w-px flex-1 bg-border-subtle" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-8">
        {/* Header — click to toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="group w-full text-left"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs text-text-muted">
                {job.startDate}–{job.endDate || 'present'}
              </p>
              <p className="text-base font-semibold text-text-primary">{job.role}</p>
              <p className="font-mono text-sm text-syntax-purple">{job.company}</p>
              {job.companyContext && (
                <p className="text-xs italic text-text-muted">{job.companyContext}</p>
              )}
              <p className="mt-1 text-sm font-bold text-accent">{job.outcomeMetric}</p>
            </div>
            <span
              className={cn(
                'mt-1 inline-block text-text-muted transition-transform duration-200',
                expanded && 'rotate-180',
              )}
            >
              &#9660;
            </span>
          </div>
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={defaultExpanded}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              {/* Responsibilities */}
              <div className="mt-4 border-t border-border-subtle pt-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
                  Responsibilities
                </p>
                <ul className="space-y-1.5">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm text-text-secondary">
                      <span className="mt-1 text-text-muted">·</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipped projects */}
              {job.projects && job.projects.length > 0 && (
                <div className="mt-4 border-t border-border-subtle pt-4">
                  <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
                    // Shipped
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {job.projects.map((project) => (
                      <ProjectChip key={project.name} project={project} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
