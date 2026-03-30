'use client';

import { useState } from 'react';
import { experience } from '@/data/experience';
import { expertiseItems } from '@/data/expertise';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { EmployerEntry } from '@/components/ui/employer-entry';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

function ExpertiseCard({ item }: { item: (typeof expertiseItems)[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card hover={false} className="p-5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
        aria-expanded={expanded}
      >
        <h4 className="mb-2 text-base font-semibold text-text-primary">{item.title}</h4>
        <p className="text-sm text-text-secondary">{item.plainDescription}</p>
        <span className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-accent">
          <span className={cn('inline-block transition-transform duration-200', expanded && 'rotate-180')}>
            &#9660;
          </span>
          Technical deep-dive
        </span>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 border-t border-border-subtle pt-3"
        >
          <p className="mb-2 text-sm text-text-secondary">{item.technicalDeepDive}</p>
          <p className="text-sm italic text-text-muted">Tradeoff: {item.tradeoff}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {item.externalLink && (
              <a
                href={item.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-xs text-syntax-green hover:text-syntax-green/80 transition-colors"
              >
                {item.externalLink.label} &rarr;
              </a>
            )}
            {item.relatedProject && (
              <a
                href={`/projects/${item.relatedProject}`}
                className="inline-block font-mono text-xs text-accent hover:text-accent-dim transition-colors"
              >
                See related project &rarr;
              </a>
            )}
          </div>
        </motion.div>
      )}
    </Card>
  );
}

export function Experience() {
  return (
    <Section id="about">
      <Heading label="ABOUT" title="Experience & Expertise" />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left: Timeline with accordion */}
        <div className="min-w-0 overflow-hidden">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-text-muted">
            // GIT LOG
          </h3>
          <div>
            {experience.map((job, i) => (
              <EmployerEntry
                key={job.company}
                job={job}
                isCurrent={i === 0}
                defaultExpanded={i === 0}
              />
            ))}
          </div>
        </div>

        {/* Right: Expertise cards */}
        <div className="min-w-0 overflow-hidden">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-text-muted">
            // EXPERTISE
          </h3>
          <div className="space-y-4">
            {expertiseItems.map((item) => (
              <ExpertiseCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
