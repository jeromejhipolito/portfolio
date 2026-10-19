'use client';

import { forwardRef, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { MagicCard } from '@/components/magicui/magic-card';
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/magicui/terminal';
import { BlurFade } from '@/components/magicui/blur-fade';
import { cn } from '@/lib/utils';

const Node = forwardRef<HTMLDivElement, { label: string; sub: string; tone?: string; className?: string }>(
  ({ label, sub, tone = '#00d9ff', className }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-10 flex min-w-0 flex-col items-center gap-1 rounded-xl border bg-[#0b1020] px-2 py-2.5 text-center shadow-[0_0_24px_rgba(0,0,0,0.6)] sm:px-3',
        className,
      )}
      style={{ borderColor: `${tone}55`, boxShadow: `0 0 22px ${tone}22` }}
    >
      <span className="text-[13px] font-semibold text-white sm:text-sm">{label}</span>
      <span className="hidden font-mono text-[10.5px] text-[#7f8aa3] md:block">{sub}</span>
    </div>
  ),
);
Node.displayName = 'Node';

const FLOW = [
  ['Ticket', 'Jira', '#a9b4c8'],
  ['Plan', 'criteria', '#00d9ff'],
  ['Build', 'worktree', '#00d9ff'],
  ['Test', 'vitest', '#3dff9a'],
  ['QA', 'Playwright', '#3dff9a'],
  ['Review', 'loop', '#8b5cf6'],
  ['Merge request', 'human merges', '#ff79c6'],
] as const;

const STAGES = [
  {
    t: 'First, the plan',
    d: 'It reads the ticket, sharpens the acceptance criteria, and checks the second brain for mistakes made before.',
    tag: 'Plan',
    c: '#00d9ff',
  },
  {
    t: 'Then the build',
    d: 'It builds in small phases inside its own git worktree. Each phase is checked before the next one starts.',
    tag: 'Build',
    c: '#00d9ff',
  },
  {
    t: 'Tests on every phase',
    d: 'Unit and integration tests run after each phase. A red test sends the work straight back to the build.',
    tag: 'Test',
    c: '#3dff9a',
  },
  {
    t: 'QA in a real browser',
    d: 'Playwright walks every acceptance criterion like a user would, takes screenshots, and records a video.',
    tag: 'QA',
    c: '#3dff9a',
  },
  {
    t: 'A review that loops',
    d: 'An automated code review runs until it approves. Then I read the diff myself before anyone else sees it.',
    tag: 'Review',
    c: '#8b5cf6',
  },
  {
    t: 'It remembers',
    d: 'Every mistake becomes a note with its fix, so no pipeline repeats it. Over 7,000 notes so far.',
    tag: 'Brain',
    c: '#ff79c6',
  },
];

const LOG: [string, string][] = [
  ['#7eeeff', '$ pipeline run --ticket refund-approval'],
  ['#a9b4c8', 'brain: 3 related notes, 1 past mistake loaded'],
  ['#3dff9a', '✔ plan: 4 acceptance criteria hardened'],
  ['#3dff9a', '✔ build: phase 1/4 approval matrix'],
  ['#3dff9a', '✔ test: 48 passed (48)'],
  ['#3dff9a', '✔ build: phase 2/4 fail closed on gaps'],
  ['#3dff9a', '✔ qa: criteria 1–4 passed in browser, video saved'],
  ['#febc2e', '◐ review round 1: 2 findings'],
  ['#a9b4c8', '  fixing: raw query param skipped validation'],
  ['#3dff9a', '✔ review round 2: approved'],
  ['#ff79c6', '→ merge request opened, waiting for a human'],
  ['#7f8aa3', 'done in 41m · 4 other pipelines still running'],
];

export function Pipelines() {
  const box = useRef<HTMLDivElement>(null);
  const t = useRef<HTMLDivElement>(null);
  const plan = useRef<HTMLDivElement>(null);
  const build = useRef<HTMLDivElement>(null);
  const test = useRef<HTMLDivElement>(null);
  const qa = useRef<HTMLDivElement>(null);
  const review = useRef<HTMLDivElement>(null);
  const mr = useRef<HTMLDivElement>(null);
  const brain = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const beam = {
    containerRef: box,
    duration: 3,
    pathColor: '#ffffff',
    pathOpacity: 0.08,
    gradientStartColor: '#00d9ff',
    gradientStopColor: '#8b5cf6',
  };

  return (
    <section id="pipelines" className="relative bg-[#05070d] py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <BlurFade inView>
          <p className="font-mono text-sm text-[#00d9ff]">How a ticket ships</p>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-white">
            From ticket to merge request, five at a time.
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-pretty text-[#a9b4c8]">
            Each pipeline runs the same gated steps in its own workspace. Nothing moves forward until the step before it
            passes, and nothing merges without a person.
          </p>
        </BlurFade>

        {/* Phones: the same flow as a vertical track */}
        <BlurFade inView delay={0.1} className="sm:hidden">
          <ol className="relative mt-12 ml-3 list-none border-l border-white/10 p-0 pl-6">
            {FLOW.map(([l, sub, c]) => (
              <li key={l} className="relative py-2.5">
                <span className="absolute top-1/2 -left-[31px] h-2.5 w-2.5 -translate-y-1/2 rounded-full" style={{ background: c, boxShadow: `0 0 12px ${c}` }} />
                <span className="text-[15px] font-semibold text-white">{l}</span>
                <span className="ml-2 font-mono text-xs text-[#7f8aa3]">{sub}</span>
              </li>
            ))}
            <li className="relative mt-2 rounded-xl border border-[#ff79c6]/30 bg-[#ff79c6]/[0.06] px-4 py-3 text-sm text-[#f6c6e4]">
              The second brain (7,000+ notes) feeds the plan and learns from every review.
            </li>
          </ol>
        </BlurFade>

        {/* Wider screens: the flow, drawn as live beams */}
        <BlurFade inView delay={0.1} className="hidden sm:block">
          <div
            ref={box}
            className="relative mt-14 rounded-3xl border border-white/[0.07] bg-[#0a0f1d]/70 px-3 pt-10 pb-24 sm:px-8 sm:pb-28"
          >
            <div className="grid grid-cols-7 gap-1.5 sm:gap-4">
              <Node ref={t} label={FLOW[0][0]} sub={FLOW[0][1]} tone={FLOW[0][2]} />
              <Node ref={plan} label={FLOW[1][0]} sub={FLOW[1][1]} tone={FLOW[1][2]} />
              <Node ref={build} label={FLOW[2][0]} sub={FLOW[2][1]} tone={FLOW[2][2]} />
              <Node ref={test} label={FLOW[3][0]} sub={FLOW[3][1]} tone={FLOW[3][2]} />
              <Node ref={qa} label={FLOW[4][0]} sub={FLOW[4][1]} tone={FLOW[4][2]} />
              <Node ref={review} label={FLOW[5][0]} sub={FLOW[5][1]} tone={FLOW[5][2]} />
              <Node ref={mr} label="Merge" sub={FLOW[6][1]} tone={FLOW[6][2]} />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <Node ref={brain} label="Second brain" sub="7,000+ notes" tone="#ff79c6" className="px-5" />
            </div>
            {!reduce && (
              <>
            <AnimatedBeam {...beam} fromRef={t} toRef={plan} delay={0} />
            <AnimatedBeam {...beam} fromRef={plan} toRef={build} delay={0.35} />
            <AnimatedBeam {...beam} fromRef={build} toRef={test} delay={0.7} />
            <AnimatedBeam {...beam} fromRef={test} toRef={qa} delay={1.05} />
            <AnimatedBeam {...beam} fromRef={qa} toRef={review} delay={1.4} />
            <AnimatedBeam {...beam} fromRef={review} toRef={mr} delay={1.75} />
            <AnimatedBeam containerRef={box} fromRef={brain} toRef={plan} curvature={-60} duration={4} gradientStartColor="#ff79c6" gradientStopColor="#00d9ff" pathOpacity={0.06} />
            <AnimatedBeam containerRef={box} fromRef={review} toRef={brain} curvature={-60} duration={4} delay={1.5} gradientStartColor="#8b5cf6" gradientStopColor="#ff79c6" pathOpacity={0.06} />
              </>
            )}
          </div>
        </BlurFade>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {STAGES.map((s, i) => (
              <BlurFade key={s.t} inView delay={0.05 * i}>
                <MagicCard
                  className="h-full rounded-2xl"
                  gradientFrom={s.c}
                  gradientTo="#8b5cf6"
                  gradientColor="#111a30"
                  gradientSize={240}
                >
                  <div className="p-6">
                    <span
                      className="inline-block rounded-md px-2 py-0.5 font-mono text-xs"
                      style={{ color: s.c, background: `${s.c}18` }}
                    >
                      {s.tag}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-white">{s.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#a9b4c8]">{s.d}</p>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>

          <BlurFade inView delay={0.15} className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            {reduce ? (
              <div className="min-h-[420px] rounded-xl border border-white/10 bg-[#070b16] p-5 font-mono text-[13px] leading-7">
                {LOG.map(([c, line]) => (
                  <div key={line} style={{ color: c }}>{line}</div>
                ))}
              </div>
            ) : (
              <Terminal className="h-auto min-h-[420px] max-h-none w-full max-w-none border-white/10 bg-[#070b16] text-[13px]" startOnView>
                <TypingAnimation duration={22} className="text-[#7eeeff]">{LOG[0][1]}</TypingAnimation>
                {LOG.slice(1, -1).map(([c, line]) => (
                  <AnimatedSpan key={line} transition={{ duration: 0.15 }} className="text-[13px]" style={{ color: c }}>
                    {line}
                  </AnimatedSpan>
                ))}
                <TypingAnimation duration={22} className="text-[#7f8aa3]">{LOG[LOG.length - 1][1]}</TypingAnimation>
              </Terminal>
            )}
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
