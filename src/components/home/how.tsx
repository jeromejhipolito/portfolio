'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const GAPS = [96, 132, 80, 120, 140, 88, 112];

const MOMENTS: { title: string; text: string; pic: React.ReactNode }[] = [
  {
    title: 'First, the plan',
    text: 'It reads the ticket, sharpens the acceptance criteria, and checks the second brain for mistakes made before.',
    pic: (
      <div data-ui className="stage">
        <div className="stage__title">Acceptance criteria</div>
        {[
          ['Refund over the limit needs a lead', true],
          ['Agent sees why the button is locked', true],
          ['Change is written to the activity log', true],
          ['Old tickets keep their approver', false],
        ].map(([t, done]) => (
          <div className="item" key={t as string}>
            <span className={`tick${done ? '' : ' tick--open'}`} />
            <span>{t}</span>
          </div>
        ))}
        <div className="meta" style={{ marginTop: 'auto' }}>
          <span>Brain: 3 related notes</span>
          <span className="tag tag--warn">1 past mistake</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Then the build',
    text: 'It builds in small phases inside its own git worktree. Each phase is checked before the next one starts.',
    pic: (
      <div data-ui className="stage">
        <div className="stage__title">approval.service.ts</div>
        <pre>
          <code>
            {'  const team = rule.teamFor(amount)\n'}
            <span className="del">{'- if (!team) return true\n'}</span>
            <span className="add">{'+ if (!team) throw new\n+   NoApproverError(amount)\n'}</span>
            {'  return user.inTeam(team)\n\n'}
            <span className="add">{'+ // fail closed: a gap in the\n+ // matrix must never approve\n'}</span>
          </code>
        </pre>
        <div className="meta">
          <span>Phase 2 of 4</span>
          <span>worktree 3</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Tests run',
    text: 'Unit and integration tests run on every phase. A red test sends the work back to the build.',
    pic: (
      <div data-ui className="stage">
        <div className="stage__title">vitest run</div>
        <pre>
          <code>
            {' approval matrix\n'}
            <span className="add">{'   pass  amount on the edge\n   pass  gap fails closed\n   pass  override skips team\n'}</span>
            {'\n refund flow\n'}
            <span className="add">{'   pass  partial refund\n   pass  logs the approver\n'}</span>
            {'\n Tests  48 passed (48)\n'}
          </code>
        </pre>
      </div>
    ),
  },
  {
    title: 'QA in a real browser',
    text: 'Playwright walks every acceptance criterion like a user would and records a video of the run.',
    pic: (
      <div data-ui className="stage">
        <div className="stage__title">Browser QA, criterion 2 of 4</div>
        <div className="shot">
          <Image src="/projects/merchantflow-orders.png" alt="An orders table checked during a browser QA run" width={560} height={700} sizes="280px" />
        </div>
        <div className="meta">
          <span className="tag">Passed</span>
          <span>video 0:42</span>
        </div>
      </div>
    ),
  },
  {
    title: 'A review that loops',
    text: 'An automated code review runs until it approves. Then I read the diff myself before anyone else sees it.',
    pic: (
      <div data-ui className="stage">
        <div className="stage__title">Code review</div>
        {[
          ['Round 1', '2 findings', 'tag--warn'],
          ['Round 2', '1 finding', 'tag--warn'],
          ['Round 3', 'Approved', ''],
        ].map(([r, v, c]) => (
          <div className="meta" key={r} style={{ color: '#23231f' }}>
            <span>{r}</span>
            <span className={`tag ${c}`}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop: 'auto', color: '#5c5a50' }}>
          Found: a raw query param skipped validation. Fixed in round 2.
        </div>
      </div>
    ),
  },
  {
    title: 'Hand-off to a human',
    text: 'The merge request waits for a reviewer. Nothing merges by itself, and nothing reaches production unseen.',
    pic: (
      <div data-ui className="stage">
        <div className="stage__title">Merge request</div>
        <div style={{ fontWeight: 700, fontSize: 15 }}>Refund approval follows the team matrix</div>
        <div className="meta">
          <span>Pipeline</span>
          <span className="tag">Passed</span>
        </div>
        <div className="meta">
          <span>Review bot</span>
          <span className="tag">Approved</span>
        </div>
        <div className="meta">
          <span>Status</span>
          <span className="tag tag--warn">Waiting to be merged</span>
        </div>
        <div style={{ marginTop: 'auto', color: '#5c5a50' }}>Video walkthrough and screenshots attached.</div>
      </div>
    ),
  },
  {
    title: 'And it remembers',
    text: 'Every mistake becomes a note with its fix, so the next ticket on any pipeline does not repeat it.',
    pic: (
      <div data-ui className="stage">
        <div className="stage__title">mistakes / migration-guard.md</div>
        <div>
          <strong>What went wrong:</strong> a backfill skipped a row that a later change had filled.
        </div>
        <div>
          <strong>Fix:</strong> append idempotently instead of setting only when empty.
        </div>
        <div className="meta" style={{ marginTop: 'auto' }}>
          <span>Caught again before repeating</span>
          <span className="tag">4 times</span>
        </div>
      </div>
    ),
  },
];

export function How() {
  const row = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [width, setWidth] = useState(0.3);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const on = () => {
      setP(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
      setWidth(Math.max(0.15, el.clientWidth / el.scrollWidth));
    };
    on();
    el.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      el.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);

  const go = (dir: number) => row.current?.scrollBy({ left: dir * 312, behavior: 'smooth' });

  return (
    <section className="section wrap" id="how" aria-labelledby="how-h" style={{ background: 'var(--surface)' }}>
      <div className="how__top">
        <h2 id="how-h" data-reveal>
          How a ticket ships
        </h2>
        <div className="how__nav">
          <button type="button" aria-label="Back" onClick={() => go(-1)} disabled={p <= 0.01}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="M13 3 6 10l7 7" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </button>
          <button type="button" aria-label="Forward" onClick={() => go(1)} disabled={p >= 0.99}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="m7 3 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="how__bar" aria-hidden style={{ background: 'var(--bg)' }}>
        <span style={{ width: `${width * 100}%`, left: `${p * (1 - width) * 100}%` }} />
      </div>
      <div className="how__row" ref={row} tabIndex={0} aria-label="The stages of one ticket, scroll sideways">
        {MOMENTS.map((m, i) => (
          <article className="moment" key={m.title} data-reveal style={{ '--d': i } as React.CSSProperties}>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
            <div className="moment__gap" style={{ height: GAPS[i] }} />
            <div className="moment__pic">{m.pic}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
