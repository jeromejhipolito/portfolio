'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const STAGES = ['Plan', 'Build', 'Test', 'QA', 'Review'] as const;

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

export function PipelineBoard() {
  const [{ lanes, shipped }, setBoard] = useState<Board>(START);
  const reduce = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCE).matches, () => false);
  const [choice, setChoice] = useState<boolean | null>(null);
  // Reduced-motion visitors start paused; anyone can press Play or Pause.
  const running = choice ?? !reduce;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setBoard(step), 700);
    return () => clearInterval(id);
  }, [running]);

  return (
    <figure data-ui className="board" style={{ margin: 0 }}>
      <div className="board__top">
        <span>Five pipelines, side by side</span>
        <button type="button" onClick={() => setChoice(!running)} aria-pressed={!running}>
          {running ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="board__stages" aria-hidden>
        <span style={{ textAlign: 'left' }}>Ticket</span>
        {STAGES.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {lanes.map((l, i) => (
          <li className="lane" key={i} aria-label={`${l.name}: ${STAGES[l.stage]}`}>
            <span className="lane__name">{l.name}</span>
            {STAGES.map((s, j) => (
              <span
                key={s}
                className="cell"
                data-done={j < l.stage ? '' : undefined}
                data-now={j === l.stage ? '' : undefined}
              />
            ))}
          </li>
        ))}
      </ol>
      <figcaption className="board__foot">
        <span>A replay of how my pipelines run</span>
        <span className="tnum">{shipped} reached review</span>
      </figcaption>
    </figure>
  );
}
