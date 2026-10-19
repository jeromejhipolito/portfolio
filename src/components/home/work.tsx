'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { projects } from '@/data/projects';
import type { Project } from '@/types/portfolio';
import { BlurFade } from '@/components/magicui/blur-fade';
import { BorderBeam } from '@/components/magicui/border-beam';
import { cn } from '@/lib/utils';

// Pixel sizes of the screenshots that are not 1440x900, so each stage can take the image's own shape.
const DIMS: Record<string, [number, number]> = {
  '/projects/ai-booking-agent-architecture.png': [2560, 1440],
  '/projects/ai-booking-agent-conversation.png': [2560, 2192],
  '/projects/ai-booking-agent-review.png': [2560, 1440],
  '/projects/money-management-dashboard-wide.png': [1520, 950],
  '/projects/money-management-dashboard.png': [1520, 2276],
  '/projects/money-management-scheduled.png': [1520, 948],
  '/projects/money-management-transactions.png': [1520, 1142],
  '/projects/money-management-wallet.png': [1520, 979],
};
// Floor at 4:5 so a very tall page still shows large enough to read.
const ratioOf = (src: string) => {
  const [w, h] = DIMS[src] ?? [1440, 900];
  return Math.max(w / h, 0.8);
};

const HOST: Record<string, string> = {
  'bookeasy-booking-system': 'bookit.app',
  'flowboard-task-management': 'flowboard.app',
  'money-management-app': 'trackmoney.app',
  'merchantflow-ecommerce-ops': 'merchantflow.app',
  'ai-booking-agent': 'telegram · salon agent',
};
const ACCENT = ['#00d9ff', '#8b5cf6', '#3dff9a', '#ff79c6', '#00d9ff'];

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const shots = p.gallery?.length ? p.gallery : [{ src: p.screenshot, alt: p.name }];
  const [on, setOn] = useState(0);
  const reduce = useReducedMotion();
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateX = useSpring(tx, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(ty, { stiffness: 160, damping: 20 });
  const [name, kind] = p.name.split(/\s[—-]\s/);
  const flip = i % 2 === 1;
  const c = ACCENT[i % ACCENT.length];
  const shot = shots[on];
  const metrics = p.outcomeMetric.split(' · ').slice(0, 4);

  return (
    <article className={cn('grid items-center gap-10 lg:gap-16', flip ? 'lg:grid-cols-[1fr_1.35fr]' : 'lg:grid-cols-[1.35fr_1fr]')}>
      <BlurFade inView direction={flip ? 'left' : 'right'} offset={24} className={cn('min-w-0', flip && 'lg:order-2')}>
        <div
          className="[perspective:1600px]"
          onPointerMove={(e) => {
            if (reduce || e.pointerType !== 'mouse') return;
            const r = e.currentTarget.getBoundingClientRect();
            tx.set(((e.clientY - r.top) / r.height - 0.5) * -6);
            ty.set(((e.clientX - r.left) / r.width - 0.5) * 8);
          }}
          onPointerLeave={() => {
            tx.set(0);
            ty.set(0);
          }}
        >
          <motion.div style={{ rotateX, rotateY }} className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-3xl"
              style={{ background: `radial-gradient(60% 60% at 50% 50%, ${c}40, transparent 70%)` }}
            />
            <div className="overflow-hidden rounded-xl bg-[#141a2a] shadow-[0_30px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
              <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.06] bg-[#1a2133] px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-[#8b93a7]">{HOST[p.slug] ?? 'localhost'}</span>
              </div>
              {/* The stage takes each screenshot's own shape and shows it whole (contain), never cropped. */}
              <div className="relative bg-[#0b1020]" style={{ aspectRatio: ratioOf(shot.src) }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={shot.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 1024px) 92vw, 720px" className="object-contain" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <BorderBeam size={160} duration={9} delay={i} colorFrom={c} colorTo="#8b5cf6" borderWidth={1.5} />
          </motion.div>
        </div>
        {shots.length > 1 && (
          <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1" role="tablist" aria-label={`${name} screens`}>
            {shots.map((s, k) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={k === on}
                aria-label={s.alt}
                onClick={() => setOn(k)}
                className={cn(
                  'relative h-14 w-24 shrink-0 overflow-hidden rounded-md ring-1 transition-[box-shadow,opacity,transform] duration-150 ease-out active:scale-95',
                  k === on ? 'opacity-100 ring-2' : 'opacity-55 ring-white/10 hover:opacity-90',
                )}
                style={k === on ? { boxShadow: `0 0 0 2px ${c}` } : undefined}
              >
                <Image src={s.src} alt="" fill sizes="96px" className="object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </BlurFade>

      <BlurFade inView delay={0.1} className={cn('min-w-0', flip && 'lg:order-1')}>
        <p className="font-mono text-sm" style={{ color: c }}>
          {p.testCount ? `${p.testCount} tests` : 'Full-stack'} · {p.techStack.slice(0, 2).join(' + ')}
        </p>
        <h3 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
          {name}
        </h3>
        {kind && <p className="mt-1 text-lg text-[#a9b4c8]">{kind}</p>}
        <p className="mt-5 text-[16px] leading-relaxed text-pretty text-[#c3cbdb]">{p.problem}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {metrics.map((m) => (
            <li key={m} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[13px] text-[#dfe6f3]">
              {m}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${p.slug}`}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#05070d] transition-[background-color,transform] duration-150 ease-out hover:bg-[#dff9ff] active:scale-[0.97]"
          >
            Read the case study →
          </Link>
          {p.demoUrl && (
            <a href={p.demoUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-white/[0.07] active:scale-[0.97]">
              Live demo
            </a>
          )}
          <a href={p.githubUrl} target="_blank" rel="noreferrer" className="py-3 text-sm font-medium text-[#a9b4c8] underline-offset-4 transition-colors duration-150 hover:text-white hover:underline">
            Source on GitHub
          </a>
        </div>
      </BlurFade>
    </article>
  );
}

export function Work() {
  const list = [...projects].sort((a, b) => a.order - b.order);
  return (
    <section id="work" className="relative overflow-x-clip bg-[#070a14] py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d9ff]/40 to-transparent" />
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <BlurFade inView>
          <p className="font-mono text-sm text-[#8b5cf6]">Selected work</p>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-white">
            Side projects I built to show how I work.
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-pretty text-[#a9b4c8]">
            Open source, tested, and running. Click the small screens to look around each app.
          </p>
        </BlurFade>
        <div className="mt-20 grid gap-28 sm:gap-36">
          {list.map((p, i) => (
            <ProjectRow key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
