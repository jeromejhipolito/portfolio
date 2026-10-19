'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { Project } from '@/types/portfolio';
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

export const HOST: Record<string, string> = {
  'bookeasy-booking-system': 'bookit.app',
  'flowboard-task-management': 'flowboard.app',
  'money-management-app': 'trackmoney.app',
  'merchantflow-ecommerce-ops': 'merchantflow.app',
  'ai-booking-agent': 'telegram · salon agent',
};

// A browser window that shows each screenshot whole at its own shape, with thumbnails to switch screens.
export function ProjectGallery({
  p,
  accent,
  sizes = '(max-width: 1024px) 92vw, 720px',
  beamDelay = 0,
  caption = false,
  priority = false,
}: {
  p: Project;
  accent: string;
  sizes?: string;
  beamDelay?: number;
  caption?: boolean;
  priority?: boolean;
}) {
  const shots = p.gallery?.length ? p.gallery : [{ src: p.screenshot, alt: p.name }];
  const [on, setOn] = useState(0);
  const reduce = useReducedMotion();
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateX = useSpring(tx, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(ty, { stiffness: 160, damping: 20 });
  const name = p.name.split(/\s[—-]\s/)[0];
  const shot = shots[on];

  return (
    <div>
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
            style={{ background: `radial-gradient(60% 60% at 50% 50%, ${accent}40, transparent 70%)` }}
          />
          <div className="overflow-hidden rounded-xl bg-[#141a2a] shadow-[0_30px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.06] bg-[#1a2133] px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-[#8b93a7]">
                {HOST[p.slug] ?? 'localhost'}
              </span>
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
                  <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-contain" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <BorderBeam size={160} duration={9} delay={beamDelay} colorFrom={accent} colorTo="#8b5cf6" borderWidth={1.5} />
        </motion.div>
      </div>
      {caption && <p className="mt-4 min-h-[3em] text-[15px] leading-relaxed text-[#a9b4c8]">{shot.alt}</p>}
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
              style={k === on ? { boxShadow: `0 0 0 2px ${accent}` } : undefined}
            >
              <Image src={s.src} alt="" fill sizes="96px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
