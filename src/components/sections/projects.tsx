'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { FilterTabs } from '@/components/ui/filter-tabs';
import { ProjectCard } from '@/components/ui/project-card';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';

// Key technologies to show as filter tabs (order matters)
const FILTER_TAGS = ['Next.js', 'NestJS', 'Fastify', 'Laravel', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'BullMQ', 'Prisma'];

export function Projects() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = searchParams.get('tag') || 'all';

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('tag');
    } else {
      params.set('tag', value);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Build filter options from actual project tech stacks
  const filterOptions = useMemo(() => {
    const tagCounts: Record<string, number> = {};

    for (const p of projects) {
      for (const tech of p.techStack) {
        // Match against filter tags (case-insensitive partial match)
        for (const filterTag of FILTER_TAGS) {
          if (tech.toLowerCase().includes(filterTag.toLowerCase())) {
            tagCounts[filterTag] = (tagCounts[filterTag] || 0) + 1;
          }
        }
      }
    }

    const options = [{ value: 'all', label: 'All', count: projects.length }];

    for (const tag of FILTER_TAGS) {
      if (tagCounts[tag] && tagCounts[tag] > 0) {
        options.push({ value: tag, label: tag, count: tagCounts[tag] });
      }
    }

    return options;
  }, []);

  // Filter projects by checking if any tech stack item matches the tag
  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((p) =>
            p.techStack.some((tech) =>
              tech.toLowerCase().includes(activeFilter.toLowerCase()),
            ),
          ),
    [activeFilter],
  );

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <Heading
        label="PROJECTS"
        title="What I've Built"
        subtitle="Personal projects built to showcase code quality and architecture patterns. Click any tag to filter."
      />

      <div className="mb-6 rounded border border-border-subtle bg-bg-surface/50 px-4 py-3">
        <p className="text-xs text-text-muted">
          <span className="font-mono text-text-secondary">Note:</span> These are personal sample projects — not production-polished products. You may encounter minor bugs or incomplete features. The purpose is to showcase <span className="text-text-secondary">skill, architecture patterns, and code quality</span>, not a finished product. Feel free to explore the source code on GitHub.
        </p>
      </div>

      <FilterTabs options={filterOptions} active={activeFilter} onChange={setFilter} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-text-muted">No projects match this tag.</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-2 font-mono text-sm text-accent hover:text-accent-dim"
              >
                Show all projects
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="col-span-full"
                >
                  <ProjectCard project={project} featured />
                </motion.div>
              ))}
              {regular.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (featured.length + i) * 0.08 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
