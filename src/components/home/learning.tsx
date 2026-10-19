'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { AnimatedList } from '@/components/magicui/animated-list';
import { BlurFade } from '@/components/magicui/blur-fade';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { OrbitingCircles } from '@/components/magicui/orbiting-circles';
import { BorderBeam } from '@/components/magicui/border-beam';

// Real counts from the second brain (brain.py stats, October 2026).
const STATS = [
  [4340, 'mistakes turned into rules'],
  [7836, 'repeats stopped before they happened'],
  [1024, 'results verified as correct'],
] as const;

// The guard's most-caught mistakes, in plain words.
const LOG = [
  { kind: 'caught', text: 'Reported a background job as done before it finished', n: 854, c: '#3dff9a' },
  { kind: 'learned', text: 'New rule: run a long review detached so a 10-minute cap cannot kill it', c: '#ff79c6' },
  { kind: 'caught', text: 'A long code review getting killed by a 10-minute timeout', n: 738, c: '#3dff9a' },
  { kind: 'caught', text: 'Read a mid-run bot event as the final review verdict', n: 464, c: '#3dff9a' },
  { kind: 'learned', text: 'New rule: a bug reported in chat goes to a ticket first', c: '#ff79c6' },
  { kind: 'caught', text: 'Started fixing a chat-reported bug without a ticket', n: 408, c: '#3dff9a' },
];

function LogItem({ item }: { item: (typeof LOG)[number] }) {
  return (
    <div className="flex w-full items-start gap-3 rounded-xl border border-white/[0.08] bg-[#0b1020]/90 p-4 backdrop-blur">
      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.c, boxShadow: `0 0 12px ${item.c}` }} />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] tracking-wide" style={{ color: item.c }}>
          {item.kind === 'caught' ? 'GUARD · repeat stopped' : 'BRAIN · rule learned'}
        </p>
        <p className="mt-1 text-[14.5px] leading-snug text-[#dfe6f3]">{item.text}</p>
      </div>
      {'n' in item && (
        <span className="shrink-0 rounded-md bg-white/[0.06] px-2 py-1 font-mono text-xs text-white tabular-nums">{item.n}×</span>
      )}
    </div>
  );
}

function GuardLog() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="relative h-[520px] overflow-hidden rounded-2xl border border-white/10 bg-[#070b16]/80 p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-xs text-[#7f8aa3]">
        <span>guard.log</span>
        <span className="flex items-center gap-2 text-[#3dff9a]">
          <span className="h-2 w-2 rounded-full bg-[#3dff9a] shadow-[0_0_10px_#3dff9a]" /> watching every prompt
        </span>
      </div>
      {reduce ? (
        <div className="flex flex-col gap-3">
          {[...LOG].reverse().map((l) => (
            <LogItem key={l.text} item={l} />
          ))}
        </div>
      ) : (
        seen && (
          <AnimatedList delay={900} initialIndex={2} className="items-stretch gap-3">
            {LOG.map((l) => (
              <LogItem key={l.text} item={l} />
            ))}
          </AnimatedList>
        )
      )}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070b16] to-transparent" />
    </div>
  );
}

function Dot({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      title={label}
      className={
        on
          ? 'grid size-full place-items-center rounded-full border border-[#00d9ff]/50 bg-[#0b1020] text-[14px] font-semibold sm:text-[11px] text-[#7eeeff] shadow-[0_0_18px_rgba(0,217,255,0.45)]'
          : 'grid size-full place-items-center rounded-full border border-dashed border-white/20 bg-[#05070d] text-sm text-[#7f8aa3]'
      }
    >
      {on ? label : '+'}
    </span>
  );
}

function Meter({ label, value, used, note }: { label: string; value: string; used: number; note: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-white">{label}</span>
        <span className="font-mono text-xs text-[#a9b4c8]">{value}</span>
      </div>
      <div className="mt-2 grid grid-cols-8 gap-1">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className={i < used ? 'h-2 rounded-sm bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6]' : 'h-2 rounded-sm bg-white/[0.07]'}
          />
        ))}
      </div>
      <p className="mt-1.5 text-[13px] text-[#7f8aa3]">{note}</p>
    </div>
  );
}

export function Learning() {
  return (
    <section id="learning" className="relative overflow-hidden bg-[#05070d] py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]"
        style={{ background: 'radial-gradient(40% 35% at 85% 30%, rgba(255,121,198,0.12), transparent 70%), radial-gradient(35% 30% at 10% 70%, rgba(61,255,154,0.08), transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <BlurFade inView>
              <p className="font-mono text-sm text-[#ff79c6]">Self-improving</p>
              <h2 className="mt-3 max-w-[16ch] text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-white">
                It learns from its own mistakes.
              </h2>
              <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-pretty text-[#c3cbdb]">
                My loops take on many jobs at once without me watching: tickets, browser QA, code review, and keeping an
                eye on Slack and Jira. When one gets something wrong, the fix becomes a rule. Before every step, a guard
                checks the work against every mistake seen so far and stops a repeat.
              </p>
              <p className="mt-4 max-w-[50ch] text-lg leading-relaxed text-pretty text-[#c3cbdb]">
                A few months in, they got accurate enough that I stopped monitoring them. Now I let them work on their
                own and step in only when a real decision is needed.
              </p>
            </BlurFade>
            <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {STATS.map(([v, l], i) => (
                <BlurFade inView delay={0.08 * i} key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="m-0 text-[2rem] font-bold tracking-tight whitespace-nowrap text-white tabular-nums">
                    <NumberTicker value={v} className="text-white" />
                  </dd>
                  <p className="mt-1 text-[13.5px] leading-snug text-[#7f8aa3]">{l}</p>
                </BlurFade>
              ))}
            </dl>
          </div>
          <BlurFade inView delay={0.1} className="min-w-0">
            <GuardLog />
          </BlurFade>
        </div>

        {/* The ceiling is hardware, not the workflow */}
        <BlurFade inView delay={0.05}>
          <div className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]/70 p-7 backdrop-blur-xl sm:p-10">
            <BorderBeam size={220} duration={11} colorFrom="#ff79c6" colorTo="#00d9ff" borderWidth={1.5} />
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <h3 className="text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-bold tracking-[-0.03em] text-balance text-white">
                  The only limit is hardware.
                </h3>
                <p className="mt-4 max-w-[52ch] text-[16.5px] leading-relaxed text-pretty text-[#a9b4c8]">
                  Every extra loop is another Claude session, so it needs memory, CPU and its own subscription. On my
                  16 GB Mac that is about five at once. The workflow itself scales: more machine and more seats means
                  more loops doing more jobs.
                </p>
                <div className="mt-8 grid gap-5 sm:max-w-md">
                  <Meter label="Memory" value="16 GB" used={7} note="Five sessions plus their browsers fill it." />
                  <Meter label="CPU" value="all cores" used={6} note="Builds and test runs take turns so nothing swaps." />
                  <Meter label="Claude subscription" value="per session" used={5} note="Each loop needs its own usage." />
                </div>
              </div>
              <div className="relative mx-auto grid aspect-square w-full max-w-[380px] scale-[0.78] place-items-center sm:scale-100">
                <div className="z-10 grid size-24 place-items-center rounded-full border border-white/15 bg-[#0b1020] text-center shadow-[0_0_40px_rgba(139,92,246,0.35)]">
                  <span className="text-sm font-semibold text-white">
                    Second
                    <br />
                    brain
                  </span>
                </div>
                <OrbitingCircles radius={92} duration={26} iconSize={52}>
                  {['QA', 'Build', 'Review', 'Plan', 'Ops'].map((l) => (
                    <Dot key={l} on label={l} />
                  ))}
                </OrbitingCircles>
                <OrbitingCircles radius={165} duration={40} iconSize={34} reverse pathDash="4 6">
                  {Array.from({ length: 8 }, (_, i) => (
                    <Dot key={i} on={false} label="Room for another loop" />
                  ))}
                </OrbitingCircles>
              </div>
            </div>
            <p className="mt-10 text-center font-mono text-xs text-[#7f8aa3] sm:mt-6 lg:text-right">
              Inner ring: loops running today · outer ring: room to add more
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
