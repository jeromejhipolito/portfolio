'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site-config';

type Frame = { src: string; alt: string; slug: string; name: string; note: string };

// Interleave the galleries so neighbouring frames come from different projects.
function framesFromProjects(): Frame[] {
  const runs = [...projects]
    .sort((a, b) => a.order - b.order)
    .map((p) =>
      (p.gallery ?? [{ src: p.screenshot, alt: p.name }]).map((g) => ({
        ...g,
        slug: p.slug,
        name: p.name.split(/\s[—-]\s/)[0],
        note: p.outcomeMetric.split(' · ').slice(0, 2).join(', '),
      })),
    );
  const out: Frame[] = [];
  for (let i = 0; out.length < 22 && i < 8; i++) for (const run of runs) if (run[i] && out.length < 22) out.push(run[i]);
  return out;
}

const FRAMES = framesFromProjects();
const n = FRAMES.length;
const deg = (r: number) => (r * 180) / Math.PI;
const clampTilt = (a: number) => Math.max(-30, Math.min(30, a));

// Desktop: ellipse 560 x 310 around a 1440 x 900 screen, frames grow towards the viewer.
// Phone: the first twelve sit on a circle 132vw across, so the ring reads as two arcs.
function place(k: number) {
  const t = -Math.PI / 2 + (k / n) * Math.PI * 2;
  const sin = Math.sin(t);
  const cos = Math.cos(t);
  const w = sin < 0 ? 150 + 50 * sin : 150;
  let tilt = deg(Math.atan2(310 * cos, -560 * sin));
  if (tilt > 90) tilt -= 180;
  if (tilt < -90) tilt += 180;

  const m = 12;
  const tm = -Math.PI / 2 + (k / m) * Math.PI * 2;
  let mtilt = deg(Math.atan2(Math.cos(tm), -Math.sin(tm)));
  if (mtilt > 90) mtilt -= 180;
  if (mtilt < -90) mtilt += 180;

  return {
    '--k': k,
    '--x': `${50 + (560 / 1440) * 100 * cos}%`,
    '--y': `${50 + (310 / 900) * 100 * sin}%`,
    '--w': `${(w / 14.4).toFixed(2)}vw`,
    '--r': `${clampTilt(tilt).toFixed(1)}deg`,
    '--ar': k % 2 ? '3 / 4' : '4 / 3',
    '--mx': `calc(50% + ${(66 * Math.cos(tm)).toFixed(2)}vw)`,
    '--my': `calc(50% + ${(66 * Math.sin(tm)).toFixed(2)}vw)`,
    '--mw': `${Math.round(76 + 12 * Math.sin(tm))}px`,
    '--mr': `${clampTilt(mtilt).toFixed(1)}deg`,
  } as React.CSSProperties;
}

export function Hero() {
  const [active, setActive] = useState<number | null>(null);
  const on = active === null ? null : FRAMES[active];

  return (
    <header className="hero" id="top">
      <div className="bar">
        <a href="#top" className="display" style={{ letterSpacing: '-0.02em' }}>
          {siteConfig.name}
        </a>
        <nav aria-label="Main">
          <span className="bar__links">
            <a href="#work">Work</a>
            <a href="#how">How I build</a>
          </span>
          <a href="#contact">Contact</a>
          <a href={siteConfig.resumeFile} download>
            Resume
          </a>
        </nav>
      </div>

      <div className="orbit" data-active={active === null ? undefined : ''} onMouseLeave={() => setActive(null)}>
        {FRAMES.map((f, k) => (
          <Link
            key={f.src}
            href={`/projects/${f.slug}`}
            className={`frame${k >= 12 ? ' frame--wide' : ''}`}
            style={place(k)}
            data-on={active === k ? '' : undefined}
            onMouseEnter={() => setActive(k)}
            onFocus={() => setActive(k)}
            onBlur={() => setActive(null)}
          >
            <Image src={f.src} alt={f.alt} width={300} height={300} sizes="(max-width: 860px) 90px, 12vw" priority={k < 6} />
          </Link>
        ))}
      </div>

      <div className="core">
        <h1 className="lines">
          <span className="line">
            <span data-line style={{ '--i': 0 } as React.CSSProperties}>Five pipelines,</span>
          </span>
          <span className="line">
            <span data-line style={{ '--i': 1 } as React.CSSProperties}>one developer.</span>
          </span>
        </h1>
        <p className="lede after-lines" aria-live="polite">
          {on ? (
            <>
              <strong>{on.name}</strong>
              <br />
              {on.note}. Open the project to see how it was built.
            </>
          ) : (
            <>
              I&apos;m <strong>Jerome Hipolito</strong>, a full-stack developer in the Philippines. I run five AI
              coding pipelines at once and review every change they ship.
            </>
          )}
        </p>
        <a className="btn btn--light after-lines" href="#work">
          See the work
        </a>
      </div>
    </header>
  );
}
