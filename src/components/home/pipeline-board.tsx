'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const STAGES = ['Plan', 'Build', 'Test', 'QA', 'Review'] as const;
const DETAIL = ['4 criteria', 'phase 2 of 4', '48 passed', 'browser run', 'round 2'];
const GRADS = [
  'from-[#00d9ff] to-[#8b5cf6]',
  'from-[#3dff9a] to-[#00d9ff]',
  'from-[#8b5cf6] to-[#ff79c6]',
  'from-[#00d9ff] to-[#3dff9a]',
  'from-[#ff79c6] to-[#8b5cf6]',
];

// The kinds of tickets the pipelines really handle on the marketplace and its support desk.
const QUEUE = [
  'Seller claim email',
  'Refund approval rules',
  'Escalation SLA timer',
  'Masked customer data',
  'Idle session logout',
  'Return evidence photos',
  'Email reply threading',
  'Shipping voucher split',
  'Reopen permissions',
  'Queue columns per category',
  'Child case context',
  'Cost center on refunds',
];

type Lane = { name: string; stage: number };
type Board = { lanes: Lane[]; shipped: number; next: number; tick: number };

const START: Board = {
  lanes: [0, 1, 2, 3, 4].map((i) => ({ name: QUEUE[i], stage: (i * 2) % 5 })),
  shipped: 0,
  next: 5,
  tick: 0,
};

// One lane moves per tick, so the five never move in lockstep.
export function step(b: Board): Board {
  const tick = b.tick + 1;
  const i = tick % b.lanes.length;
  const lane = b.lanes[i];
  const lanes = [...b.lanes];
  if (lane.stage < STAGES.length - 1) {
    lanes[i] = { ...lane, stage: lane.stage + 1 };
    return { ...b, lanes, tick };
  }
  lanes[i] = { name: QUEUE[b.next % QUEUE.length], stage: 0 };
  return { lanes, shipped: b.shipped + 1, next: b.next + 1, tick };
}

const REDUCE = '(prefers-reduced-motion: reduce)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

export function PipelineBoard({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [{ lanes, shipped }, setBoard] = useState<Board>(START);
  const reduce = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCE).matches, () => false);
  const [choice, setChoice] = useState<boolean | null>(null);
  // Reduced-motion visitors start paused; anyone can press Play or Pause.
  const running = choice ?? !reduce;
  const ref = useRef<HTMLElement>(null);
  // Only tick while someone can see it.
  const visible = useInView(ref, { margin: '120px' });

  useEffect(() => {
    if (!running || !visible) return;
    const id = setInterval(() => setBoard(step), 900);
    return () => clearInterval(id);
  }, [running, visible]);

  return (
    <figure
      ref={ref}
      className={cn(
        'relative m-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/80 p-5 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl',
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[15px] font-semibold text-white">Pipelines running</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-xs text-[#3dff9a]">
            <span className={cn('h-2 w-2 rounded-full bg-[#3dff9a] shadow-[0_0_10px_#3dff9a]', running && 'animate-pulse')} />
            <span className="hidden sm:inline">{running ? 'live replay' : 'paused'}</span>
          </span>
          <button
            type="button"
            onClick={() => setChoice(!running)}
            aria-pressed={!running}
            className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-white transition-[background-color,transform] duration-150 ease-out hover:bg-white/10 active:scale-95"
          >
            {running ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      <ol className="m-0 list-none p-0">
        {lanes.map((l, i) => (
          <li
            key={i}
            className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-4 border-t border-white/[0.06] py-3"
            aria-label={`${l.name}: ${STAGES[l.stage]}`}
          >
            <div className="min-w-0">
              <div className="truncate text-sm text-[#dfe6f3]">{l.name}</div>
              {!compact && (
                <div className="mt-0.5 font-mono text-[11px] text-[#7f8aa3]">
                  {STAGES[l.stage]} · {DETAIL[l.stage]}
                </div>
              )}
            </div>
            <div className="relative h-2.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className={cn(
                  'absolute inset-0 origin-left rounded-full bg-gradient-to-r shadow-[0_0_14px_rgba(0,217,255,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  GRADS[i],
                )}
                style={{ transform: `scaleX(${(l.stage + 1) / STAGES.length})` }}
              />
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-2 border-t border-white/[0.06] pt-3 font-mono text-[10.5px] whitespace-nowrap text-[#7f8aa3] tabular-nums">
        Plan → Build → Test → QA → Review · {shipped} shipped
      </figcaption>
    </figure>
  );
}
