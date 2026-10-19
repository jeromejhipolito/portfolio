'use client';

import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from 'framer-motion';
import { BlurFade } from '@/components/magicui/blur-fade';
import { BorderBeam } from '@/components/magicui/border-beam';
import { cn } from '@/lib/utils';

// One illustrative 8-hour day on a 0..1 axis. Stage colours match the pipeline section.
const STAGE = {
  plan: '#00d9ff',
  build: '#38bdf8',
  test: '#3dff9a',
  qa: '#34d399',
  review: '#8b5cf6',
};
type Seg = { at: number; to: number; c: string };
type Job = { start: number; end: number; segs: Seg[] };

// A job split into the five gated stages.
const piped = (start: number, end: number): Job => {
  const w = (end - start) / 5;
  const cs = [STAGE.plan, STAGE.build, STAGE.test, STAGE.qa, STAGE.review];
  return {
    start,
    end,
    segs: cs.map((c, i) => ({ at: start + i * w, to: start + (i + 1) * w, c })),
  };
};
// A manual job: prompt, wait, copy, test by hand, all in the same grey family.
const manual = (start: number, end: number): Job => {
  const w = (end - start) / 4;
  const cs = ['#64748b', '#475569', '#64748b', '#94a3b8'];
  return {
    start,
    end,
    segs: cs.map((c, i) => ({ at: start + i * w, to: start + (i + 1) * w, c })),
  };
};

const SOLO: Job[] = [manual(0.03, 0.4), manual(0.47, 0.84), manual(0.9, 1.25)];
const SOLO_GAPS = [
  [0.4, 0.47],
  [0.84, 0.9],
];

const LANES: { name: string; jobs: Job[] }[] = [
  {
    name: 'Agent 1',
    jobs: [piped(0.02, 0.24), piped(0.26, 0.5), piped(0.52, 0.74), piped(0.76, 0.98)],
  },
  {
    name: 'Agent 2',
    jobs: [piped(0.08, 0.32), piped(0.34, 0.56), piped(0.58, 0.82), piped(0.84, 1.06)],
  },
  {
    name: 'Agent 3',
    jobs: [
      piped(0.05, 0.2),
      piped(0.22, 0.38),
      piped(0.4, 0.56),
      piped(0.6, 0.76),
      piped(0.78, 0.94),
    ],
  },
  {
    name: 'Agent 4',
    jobs: [piped(0.12, 0.3), piped(0.33, 0.52), piped(0.55, 0.72), piped(0.75, 0.93)],
  },
  {
    name: 'Agent 5',
    jobs: [
      piped(0.0, 0.16),
      piped(0.2, 0.36),
      piped(0.4, 0.58),
      piped(0.62, 0.8),
      piped(0.82, 0.98),
    ],
  },
];

const SOLO_DONE = SOLO.map((j) => j.end).filter((e) => e <= 1);
const TEAM_DONE = LANES.flatMap((l) => l.jobs.map((j) => j.end)).filter((e) => e <= 1);

function Segment({ p, s }: { p: MotionValue<number>; s: Seg }) {
  const scaleX = useTransform(p, [s.at, s.to], [0, 1], { clamp: true });
  return (
    <span
      className="absolute inset-y-0 overflow-hidden"
      style={{ left: `${s.at * 100}%`, width: `${(Math.min(s.to, 1) - s.at) * 100}%` }}
    >
      <motion.span
        className="absolute inset-0 origin-left"
        style={{ scaleX, background: s.c, boxShadow: `0 0 10px ${s.c}66` }}
      />
    </span>
  );
}

function Lane({ p, jobs, muted }: { p: MotionValue<number>; jobs: Job[]; muted?: boolean }) {
  return (
    <div className="relative">
      <div
        className={cn(
          'relative h-3.5 overflow-hidden rounded-full',
          muted ? 'bg-white/[0.04]' : 'bg-white/[0.05]',
        )}
      >
        {jobs
          .flatMap((j) => j.segs.filter((s) => s.at < 1))
          .map((s) => (
            <Segment key={`${s.at}-${s.c}`} p={p} s={s} />
          ))}
        {/* thin separators between finished jobs */}
        {jobs
          .filter((j) => j.end < 1)
          .map((j) => (
            <span
              key={j.end}
              className="absolute inset-y-0 w-[3px] bg-[#05070d]"
              style={{ left: `${j.end * 100}%` }}
            />
          ))}
      </div>
      <Playhead p={p} />
    </div>
  );
}

// A full-width layer moved by a percentage translate, so the line tracks the bar without animating layout.
function Playhead({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, (v) => `${v * 100}%`);
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute -inset-y-1 inset-x-0 z-10"
      style={{ x }}
    >
      <span className="absolute inset-y-0 left-0 w-px bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
    </motion.span>
  );
}

// Both read straight from p, so they can never disagree with the bars (reduced motion included).
const clockLabel = (v: number) => {
  const mins = Math.round(v * 8 * 60);
  const h = 9 + Math.floor(mins / 60);
  const m = mins % 60;
  return `${((h - 1) % 12) + 1}:${String(m - (m % 10)).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

function Clock({ p }: { p: MotionValue<number> }) {
  const label = useTransform(p, clockLabel);
  return <motion.span className="tabular-nums">{label}</motion.span>;
}

function Done({ p, ends }: { p: MotionValue<number>; ends: number[] }) {
  const n = useTransform(p, (v) => ends.filter((e) => e <= v).length);
  return <motion.span className="tabular-nums">{n}</motion.span>;
}

const ROWS = [
  ['Sessions', 'One chat at a time', 'Five agents running in parallel'],
  [
    'Who drives each step',
    'You prompt, wait, then prompt again',
    'The loop runs plan to review on its own',
  ],
  ['Testing', 'By hand, after the code looks right', 'Unit tests and browser QA on every phase'],
  ['Memory', 'Starts fresh in every chat', '7,000+ notes and a guard on past mistakes'],
  ['When you step away', 'The work stops', 'The loops keep going'],
  ['Your role', 'Operator, typing every request', 'Reviewer, signing off on what ships'],
];

export function Compare() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();
  const p = useMotionValue(reduce ? 1 : 0);
  const fade = useMotionValue(1);

  // Play the day while it is on screen: run to 5 PM, hold, fade out, rewind, fade in, repeat.
  // Reduced motion holds the finished day.
  useEffect(() => {
    if (reduce) {
      p.set(1);
      fade.set(1);
      return;
    }
    if (!seen) return;
    let live = true;
    let current: AnimationPlaybackControls | null = null;
    const run = (c: AnimationPlaybackControls) => ((current = c), c);
    const hold = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (live) {
        await run(animate(p, 1, { duration: 9 * (1 - p.get()), ease: 'linear' }));
        if (!live) break;
        await hold(2000);
        if (!live) break;
        await run(animate(fade, 0, { duration: 0.25, ease: [0.23, 1, 0.32, 1] }));
        p.set(0);
        await run(animate(fade, 1, { duration: 0.25, ease: [0.23, 1, 0.32, 1] }));
      }
    })();
    return () => {
      live = false;
      current?.stop();
      fade.set(1);
    };
  }, [seen, reduce, p, fade]);

  return (
    <section id="compare" className="relative overflow-hidden bg-[#070a14] py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/40 to-transparent"
      />
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <BlurFade inView>
          <p className="font-mono text-sm text-[#00d9ff]">Same Claude, used differently</p>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-white">
            Most developers chat with Claude. I run it as a team.
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-pretty text-[#a9b4c8]">
            The tool is the same. The difference is how it is used: one conversation at a time, or
            loops that each take a job from start to finish while the others keep working.
          </p>
        </BlurFade>

        <div ref={ref} className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
          {/* Their side */}
          <BlurFade inView delay={0.05} className="min-w-0">
            <div className="flex h-full flex-col rounded-3xl border border-white/[0.08] bg-[#0b1020]/60 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[#94a3b8]">A typical setup</p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#dfe6f3]">
                    Claude as an assistant
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 font-mono text-xs whitespace-nowrap text-[#94a3b8]">
                  1 session
                </span>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-[#cbd5e1]">
                  Dev
                </span>
                <div className="min-w-0 flex-1">
                  <p className="mb-2 text-[13px] text-[#94a3b8]">One chat, one task at a time</p>
                  <motion.div className="relative" style={{ opacity: fade }}>
                    <Lane p={p} jobs={SOLO} muted />
                    {SOLO_GAPS.map(([a, b]) => (
                      <span
                        key={a}
                        className="absolute -bottom-5 font-mono text-[10px] whitespace-nowrap text-[#64748b]"
                        style={{ left: `${a * 100}%`, width: `${(b - a) * 100}%` }}
                      >
                        switch
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>

              <ul className="mt-12 grid gap-2.5 text-[15px] text-[#a9b4c8]">
                {[
                  'Prompt, wait, copy, paste',
                  'Test by hand once it looks right',
                  'Context is lost between chats',
                  'Stops when the developer stops',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#64748b]" />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <div className="flex items-end justify-between border-t border-white/[0.06] pt-6">
                  <div>
                    <p className="text-[13px] text-[#94a3b8]">Jobs finished</p>
                    <p className="text-4xl font-bold text-[#cbd5e1]">
                      <Done p={p} ends={SOLO_DONE} />
                    </p>
                  </div>
                  <p className="text-right text-[13px] text-[#94a3b8]">
                    Running at once
                    <span className="block text-2xl font-semibold text-[#cbd5e1]">1</span>
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* My side */}
          <BlurFade inView delay={0.12} className="min-w-0">
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#00d9ff]/25 bg-[#0b1020]/85 p-6 shadow-[0_0_60px_rgba(0,217,255,0.08)] sm:p-8">
              <BorderBeam
                size={200}
                duration={9}
                colorFrom="#00d9ff"
                colorTo="#8b5cf6"
                borderWidth={1.5}
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[#7eeeff]">How I use it</p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                    Claude as a team of loops
                  </h3>
                  <p className="mt-1.5 flex flex-wrap gap-x-1.5 font-mono text-xs text-[#8dffc4]">
                    <span className="whitespace-nowrap">16 GB RAM ·</span>
                    <span className="whitespace-nowrap">1 Claude subscription</span>
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-[#3dff9a]/35 bg-[#3dff9a]/10 px-3 py-1 font-mono text-xs whitespace-nowrap text-[#8dffc4]">
                  5 agents
                </span>
              </div>

              <div className="mt-8 flex gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#00d9ff]/40 bg-[#00d9ff]/10 text-sm font-semibold text-[#7eeeff] shadow-[0_0_18px_rgba(0,217,255,0.3)]">
                  Me
                </span>
                <motion.div className="min-w-0 flex-1" style={{ opacity: fade }}>
                  <div className="grid gap-3 sm:gap-4">
                    {LANES.map((l) => (
                      <div
                        key={l.name}
                        className="sm:grid sm:grid-cols-[72px_minmax(0,1fr)] sm:items-center sm:gap-4"
                      >
                        <p className="mb-1.5 text-[13px] text-[#a9b4c8] sm:mb-0">{l.name}</p>
                        <Lane p={p} jobs={l.jobs} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 pl-[52px] font-mono text-[11px] text-[#7f8aa3] sm:pl-[140px]">
                {Object.entries(STAGE).map(([k, c]) => (
                  <span key={k} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm" style={{ background: c }} />
                    {k === 'qa' ? 'QA' : k}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-end justify-between border-t border-white/[0.08] pt-6">
                <div>
                  <p className="text-[13px] text-[#a9b4c8]">Jobs finished</p>
                  <p className="bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] bg-clip-text text-4xl font-bold text-transparent">
                    <Done p={p} ends={TEAM_DONE} />
                  </p>
                </div>
                <p className="text-right text-[13px] text-[#a9b4c8]">
                  Running at once
                  <span className="block text-2xl font-semibold text-white">5</span>
                </p>
              </div>
            </div>
          </BlurFade>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#7f8aa3]">
          <span>
            An illustration of one 8-hour day · <Clock p={p} /> · the second brain checks every step
          </span>
          <span>Real total since April 2026: 580+ tickets, 1,000+ merge requests</span>
        </div>

        {/* The difference, row by row */}
        <BlurFade inView delay={0.05}>
          <dl className="mt-14 grid gap-3 sm:hidden">
            {ROWS.map(([k, a, b]) => (
              <div key={k} className="rounded-2xl border border-white/[0.08] bg-[#0b1020]/60 p-5">
                <dt className="font-mono text-xs text-[#7f8aa3]">{k}</dt>
                <dd className="m-0 mt-3 text-[15px] text-[#a9b4c8]">
                  <span className="block text-[12px] text-[#64748b]">As an assistant</span>
                  {a}
                </dd>
                <dd className="m-0 mt-3 text-[15px] text-white">
                  <span className="block text-[12px] text-[#7eeeff]">As a team of loops</span>
                  <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[#3dff9a] shadow-[0_0_8px_#3dff9a]" />
                  {b}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-14 hidden overflow-hidden rounded-2xl border border-white/[0.08] sm:block">
            <table className="w-full border-collapse text-left text-[15px]">
              <caption className="sr-only">
                Claude as an assistant compared with Claude as a team of loops
              </caption>
              <thead>
                <tr className="bg-white/[0.03] text-[13px]">
                  <th scope="col" className="w-[24%] px-5 py-3.5 font-medium text-[#7f8aa3]"></th>
                  <th scope="col" className="px-5 py-3.5 font-medium text-[#94a3b8]">
                    As an assistant
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-medium text-[#7eeeff]">
                    As a team of loops
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([k, a, b]) => (
                  <tr key={k} className="border-t border-white/[0.06]">
                    <th
                      scope="row"
                      className="px-5 py-4 align-top text-[14px] font-medium text-[#7f8aa3]"
                    >
                      {k}
                    </th>
                    <td className="px-5 py-4 align-top text-[#a9b4c8]">{a}</td>
                    <td className="px-5 py-4 align-top text-white">
                      <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[#3dff9a] shadow-[0_0_8px_#3dff9a]" />
                      {b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
