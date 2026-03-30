'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workflowSteps } from '@/data/workflow';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Section id="workflow">
      <Heading
        label="HOW I BUILD"
        title="My Development Workflow"
        subtitle="From idea to production — my AI-assisted development workflow using Claude Code + Smart Workflows."
      />

      {/* Steps row — circle + label aligned together per step */}
      <div className="mb-10 flex items-start justify-between">
        {workflowSteps.map((step, i) => (
          <div key={step.number} className="flex flex-1 flex-col items-center">
            {/* Circle + connector row */}
            <div className="flex w-full items-center">
              {/* Left connector */}
              {i > 0 && (
                <div className="h-px flex-1 bg-border-default" />
              )}
              {i === 0 && <div className="flex-1" />}

              {/* Circle */}
              <button
                role="tab"
                aria-selected={i === activeStep}
                onClick={() => setActiveStep(i)}
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold transition-all duration-300',
                  i === activeStep
                    ? 'bg-accent text-bg-base scale-110 shadow-[0_0_20px_var(--color-accent-glow)]'
                    : 'border border-border-default text-text-muted hover:border-accent hover:text-accent',
                )}
              >
                {String(step.number).padStart(2, '0')}
              </button>

              {/* Right connector */}
              {i < workflowSteps.length - 1 && (
                <div className="h-px flex-1 bg-border-default" />
              )}
              {i === workflowSteps.length - 1 && <div className="flex-1" />}
            </div>

            {/* Label — directly under circle, always centered */}
            <button
              onClick={() => setActiveStep(i)}
              className={cn(
                'mt-3 font-mono text-xs uppercase tracking-widest transition-colors',
                i === activeStep ? 'text-accent' : 'text-text-muted',
              )}
            >
              {step.shortTitle}
            </button>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          role="tabpanel"
          className="rounded border border-border-subtle bg-bg-surface p-6 md:p-8"
        >
          <h3 className="mb-3 text-xl font-semibold text-text-primary">
            Step {workflowSteps[activeStep].number}: {workflowSteps[activeStep].title}
          </h3>

          <p className="mb-4 text-text-secondary">
            {workflowSteps[activeStep].description}
          </p>

          {/* Tools */}
          <div className="mb-4 flex flex-wrap gap-2">
            {workflowSteps[activeStep].tools.map((tool) => (
              <Badge key={tool} variant="framework">
                {tool}
              </Badge>
            ))}
          </div>

          {/* Output */}
          <p className="mb-4 font-mono text-sm text-text-muted">
            Output: {workflowSteps[activeStep].output}
          </p>

          {/* Quote */}
          <blockquote className="border-l-2 border-accent pl-4 italic text-text-secondary">
            &ldquo;{workflowSteps[activeStep].quote}&rdquo;
          </blockquote>
        </motion.div>
      </AnimatePresence>

      {/* Honest disclaimer — builds credibility */}
      <div className="mt-12 rounded border border-border-subtle bg-bg-surface p-6 md:p-8">
        <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
          // A NOTE ON AI-ASSISTED DEVELOPMENT
        </h3>
        <div className="space-y-3 text-sm text-text-secondary">
          <p>
            I&apos;m a developer who coded before AI existed. I know Laravel, NestJS, Next.js, and distributed systems
            because I built them by hand first. AI didn&apos;t teach me to code — it made me faster at what I already know.
          </p>
          <p>
            This workflow isn&apos;t just &ldquo;prompting AI and hoping for the best.&rdquo;{' '}
            <span className="font-semibold text-accent">Smart Workflows is a plugin I created</span>
            {' '}— a custom agentic workflow system built on Claude Code using MCPs, born from a year of encountering AI&apos;s real problems:
            hallucinations, context drift, and compounding errors on large-scale projects. Every fix I made became a rule
            in the plugin — so the same mistake never happens twice.
          </p>
          <p>
            For legacy codebases not built by AI, I&apos;ve solved the context problem too — AI understands the existing
            code before suggesting changes, never touching production data recklessly.
          </p>
          <p className="font-medium text-text-primary">
            This workflow isn&apos;t perfect — I know that. But it gets better with every project, and the results speak
            for themselves.
          </p>
        </div>
      </div>
    </Section>
  );
}
