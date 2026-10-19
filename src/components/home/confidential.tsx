'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { BlurFade } from '@/components/magicui/blur-fade';
import { cn } from '@/lib/utils';

const TONE: Record<string, string> = {
  'Fincom Technologies': '#00d9ff',
  'Betrnk Tours': '#8b5cf6',
  'Halcyon Agile': '#3dff9a',
};

type Kind = 'dashboard' | 'table' | 'chat' | 'flow' | 'notes' | 'page';

// Pick a generic, made-up layout for the redacted preview. It never shows the real product.
function kindOf(name: string): Kind {
  const n = name.toLowerCase();
  if (/ticket|line|marketing/.test(n)) return 'chat';
  if (/integration|workflow|automation|microservice|n8n/.test(n)) return 'flow';
  if (/brain|testing|suite/.test(n)) return 'notes';
  if (/wallet|cage|casino/.test(n)) return 'table';
  if (/coupon|saas|marketplace/.test(n)) return 'dashboard';
  return 'page';
}

function Redacted({ kind, c }: { kind: Kind; c: string }) {
  const bar = 'rounded-sm bg-white/[0.12]';
  return (
    <div
      aria-hidden
      className="relative h-40 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0a0f1d]"
    >
      <div className="absolute inset-0 p-4 blur-[2px]">
        {kind === 'dashboard' && (
          <div className="grid h-full grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md bg-white/[0.06] p-2">
                <div className={cn(bar, 'h-1.5 w-1/2')} />
                <div className="mt-2 h-3 w-3/4 rounded-sm" style={{ background: `${c}66` }} />
              </div>
            ))}
            <div className="col-span-3 flex items-end gap-1.5 rounded-md bg-white/[0.04] p-2">
              {[40, 65, 50, 80, 58, 90, 70, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ height: `${h}%`, background: `${c}55` }}
                />
              ))}
            </div>
          </div>
        )}
        {kind === 'table' && (
          <div className="grid gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-2">
                <div className={cn(bar, 'h-2')} />
                <div className={cn(bar, 'h-2')} />
                <div
                  className="h-2 rounded-sm"
                  style={{ background: i % 2 ? `${c}55` : 'rgba(255,255,255,0.12)' }}
                />
                <div className={cn(bar, 'h-2')} />
              </div>
            ))}
          </div>
        )}
        {kind === 'chat' && (
          <div className="grid gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn('h-5 rounded-lg', i % 2 ? 'ml-auto w-1/2' : 'w-2/3 bg-white/[0.1]')}
                style={i % 2 ? { background: `${c}55` } : undefined}
              />
            ))}
          </div>
        )}
        {kind === 'flow' && (
          <div className="flex h-full items-center justify-between gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-1 items-center gap-2">
                <div
                  className="size-9 shrink-0 rounded-lg border"
                  style={{ borderColor: `${c}88`, background: `${c}22` }}
                />
                {i < 3 && <div className="h-px flex-1" style={{ background: `${c}66` }} />}
              </div>
            ))}
          </div>
        )}
        {kind === 'notes' && (
          <div className="grid gap-2.5">
            {[90, 70, 82, 55, 76].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="size-2.5 rounded-full"
                  style={{ background: i === 3 ? '#febc2e88' : `${c}88` }}
                />
                <div className={cn(bar, 'h-2')} style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        )}
        {kind === 'page' && (
          <div className="grid h-full grid-rows-[auto_1fr] gap-2">
            <div className="h-10 rounded-md" style={{ background: `${c}33` }} />
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-md bg-white/[0.07]" />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Redaction stripes and lock */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(5,7,13,0.55)_0_10px,transparent_10px_20px)]" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="flex items-center gap-2 rounded-full border border-white/15 bg-[#05070d]/85 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <rect
              x="2"
              y="5.5"
              width="8"
              height="5.5"
              rx="1.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M4 5.5V4a2 2 0 0 1 4 0v1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
          Private codebase
        </span>
      </div>
    </div>
  );
}

const roleLabel = (r: string) => r.replace(/\s*\(.*\)/, '').replace(/Full[- ]Stack/i, 'Full-stack');

const SHORT: Record<string, string> = {
  'Fincom Technologies': 'Fincom',
  'Betrnk Tours': 'Betrnk',
  'Halcyon Agile': 'Halcyon',
};

export function Confidential() {
  const [tab, setTab] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // Tabs pattern: arrows (wrapping), Home and End move both the selection and the focus.
  function onKey(e: React.KeyboardEvent) {
    const n = experience.length;
    const to =
      e.key === 'ArrowRight'
        ? (tab + 1) % n
        : e.key === 'ArrowLeft'
          ? (tab - 1 + n) % n
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? n - 1
              : -1;
    if (to < 0) return;
    e.preventDefault();
    setTab(to);
    tabs.current[to]?.focus();
  }
  const e = experience[tab];
  const c = TONE[e.company] ?? '#00d9ff';

  return (
    <section id="company-work" className="relative overflow-hidden bg-[#05070d] py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3dff9a]/35 to-transparent"
      />
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <BlurFade inView>
          <p className="font-mono text-sm text-[#3dff9a]">Company work</p>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-white">
            The work I can describe, but not show.
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-pretty text-[#a9b4c8]">
            These systems belong to the companies I built them for, so their privacy policies keep
            the screens and code private. Here is what each one does and what I built. I am happy to
            go deeper in an interview where policy allows.
          </p>
        </BlurFade>

        <BlurFade inView delay={0.05}>
          <div
            role="tablist"
            aria-label="Companies"
            onKeyDown={onKey}
            className="mt-12 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap"
          >
            {experience.map((x, k) => (
              <button
                key={x.company}
                ref={(el) => {
                  tabs.current[k] = el;
                }}
                type="button"
                tabIndex={k === tab ? 0 : -1}
                role="tab"
                id={`co-tab-${k}`}
                aria-selected={k === tab}
                aria-controls="co-panel"
                onClick={() => setTab(k)}
                className={cn(
                  'relative rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#00d9ff]/50 active:scale-[0.97] sm:px-4',
                  k === tab ? 'text-white' : 'text-[#7f8aa3] hover:text-white',
                )}
              >
                {k === tab && (
                  <motion.span
                    layoutId="co-tab"
                    className="absolute inset-0 -z-0 rounded-xl border bg-white/[0.05]"
                    style={{ borderColor: `${TONE[x.company]}55` }}
                    transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
                  />
                )}
                <span className="relative sm:hidden">{SHORT[x.company] ?? x.company}</span>
                <span className="relative hidden sm:inline">{x.company}</span>
                <span className="relative ml-2 font-mono text-xs text-[#7f8aa3]">
                  {x.projects?.length ?? 0}
                </span>
              </button>
            ))}
          </div>
        </BlurFade>

        <div id="co-panel" role="tabpanel" aria-labelledby={`co-tab-${tab}`} className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={e.company}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
              }}
              exit={{ opacity: 0, transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] } }}
            >
              <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0b1020]/70 p-6">
                <div>
                  <p className="font-mono text-xs" style={{ color: c }}>
                    {e.startDate} – {e.endDate ?? 'Present'}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                    {roleLabel(e.role)}{' '}
                    <span className="font-normal text-[#a9b4c8]">at {e.company}</span>
                  </h3>
                  {e.companyContext && (
                    <p className="mt-1.5 text-[15px] text-[#a9b4c8]">
                      {e.companyContext.replace(/ — /g, ', ')}
                    </p>
                  )}
                </div>
                <p className="max-w-sm text-[14px] text-balance text-[#dfe6f3] sm:text-right">
                  {e.outcomeMetric}
                </p>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(e.projects ?? []).map((p) => (
                  <article
                    key={p.name}
                    className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0b1020]/80 p-4"
                  >
                    <Redacted kind={kindOf(p.name)} c={c} />
                    <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
                      <h4 className="text-[17px] font-semibold text-white">{p.name}</h4>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-pretty text-[#a9b4c8]">
                        {p.description}
                      </p>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {p.techStack.slice(0, 5).map((t) => (
                          <li
                            key={t}
                            className="rounded-md bg-white/[0.05] px-2 py-1 text-[12px] text-[#c3cbdb]"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
