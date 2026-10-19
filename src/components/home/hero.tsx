'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { siteConfig } from '@/data/site-config';
import { AuroraText } from '@/components/magicui/aurora-text';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { Particles } from '@/components/magicui/particles';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BorderBeam } from '@/components/magicui/border-beam';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { Safari } from '@/components/magicui/safari';
import { PipelineBoard } from './pipeline-board';

const EASE = [0.23, 1, 0.32, 1] as const;
const rise = (i: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.09 },
});

const WINDOWS = [
  { src: '/projects/bookeasy-homepage.png', url: 'bookit.app', z: -140, top: '0%', left: '22%' },
  { src: '/projects/flowboard-analytics.png', url: 'flowboard.app/analytics', z: -40, top: '17%', left: '10%' },
  { src: '/projects/merchantflow-orders.png', url: 'merchantflow.app/orders', z: 60, top: '34%', left: '-2%' },
];

const LINKS = [
  ['Compare', '#compare'],
  ['Pipelines', '#pipelines'],
  ['Learning', '#learning'],
  ['Work', '#work'],
  ['About', '#about'],
  ['Contact', '#contact'],
] as const;

// Fades a background layer out towards the bottom so it never ends on a hard line.
const FADE = '[mask-image:linear-gradient(to_bottom,#000_70%,transparent)]';

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#05070d]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-[15px] font-semibold tracking-tight text-white">
          Jerome Hipolito<span className="text-[#00d9ff]">.</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm text-[#a9b4c8] sm:gap-2">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} className="hidden rounded-md px-3 py-2 transition-colors duration-150 hover:text-white md:block">
              {l}
            </a>
          ))}
          <a
            href={siteConfig.resumeFile}
            download
            className="rounded-lg border border-[#00d9ff]/40 bg-[#00d9ff]/10 px-3.5 py-2 font-medium text-[#7eeeff] transition-[background-color,transform] duration-150 ease-out hover:bg-[#00d9ff]/20 active:scale-[0.97]"
          >
            Resume
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="ml-1 grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white transition-[background-color,transform] duration-150 active:scale-95 md:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path
                d={open ? 'M4 4l10 10M14 4L4 14' : 'M2 5h14M2 9h14M2 13h14'}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="border-t border-white/[0.06] px-5 pb-4 md:hidden"
          >
            {LINKS.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-white/[0.05] py-3.5 text-base text-white">
                {l}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Decorative tilt follows the pointer through a spring, so it has weight instead of snapping.
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-26, -10]), { stiffness: 90, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, 2]), { stiffness: 90, damping: 18 });
  const boardX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 20 });
  const boardY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 20 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate overflow-hidden bg-[#05070d] pt-24 pb-24 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-20 lg:pb-16"
    >
      {/* Depth: flickering grid, aurora light, drifting particles. All fade out before the section edge. */}
      {!reduce && (
        <FlickeringGrid
          className="absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_35%,#000,transparent)]"
          squareSize={3}
          gridGap={7}
          color="#00d9ff"
          maxOpacity={0.18}
          flickerChance={0.08}
        />
      )}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-x-[20%] -top-[20%] bottom-0 -z-10 blur-2xl ${FADE}`}
        style={{
          background:
            'radial-gradient(38% 32% at 24% 30%, rgba(0,217,255,0.22), transparent 70%), radial-gradient(34% 34% at 82% 18%, rgba(139,92,246,0.28), transparent 70%), radial-gradient(36% 26% at 62% 70%, rgba(61,255,154,0.10), transparent 70%)',
        }}
      />
      {!reduce && <Particles className={`absolute inset-0 -z-10 ${FADE}`} quantity={70} color="#7eeeff" size={0.5} staticity={60} />}

      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-[#3dff9a]/35 bg-[#3dff9a]/10 px-3.5 py-1.5 text-sm text-[#8dffc4]"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#3dff9a] shadow-[0_0_12px_#3dff9a]" />
            Open to remote roles · Can start immediately
          </motion.span>

          <motion.h1
            {...rise(1)}
            className="mt-6 text-[clamp(2.6rem,5.6vw,5rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-white"
          >
            I run{' '}
            <AuroraText colors={['#00d9ff', '#8b5cf6', '#ff79c6', '#8b5cf6']} speed={0.8}>
              five AI pipelines
            </AuroraText>{' '}
            at once.
          </motion.h1>

          <motion.p {...rise(2)} className="mt-6 max-w-[38ch] text-lg leading-relaxed text-pretty text-[#a9b4c8] sm:text-xl">
            I&apos;m <span className="font-semibold text-white">Jerome Hipolito</span>, a full-stack developer in the
            Philippines. My AI loops plan, build, test, QA and review in parallel on their own, they learn from their
            mistakes, and I sign off on what ships.
          </motion.p>

          <motion.div {...rise(3)} className="mt-9 flex flex-wrap gap-3">
            <ShimmerButton
              type="button"
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })}
              background="linear-gradient(135deg,#0891b2,#7c3aed)"
              shimmerColor="#bff6ff"
              borderRadius="12px"
              className="px-6 py-3.5 text-base font-semibold shadow-[0_10px_40px_rgba(0,217,255,0.3)] transition-transform duration-150 active:scale-[0.97]"
            >
              See the work →
            </ShimmerButton>
            <a
              href="#pipelines"
              className="rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-base font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-white/[0.09] active:scale-[0.97]"
            >
              How I build
            </a>
          </motion.div>

          <motion.dl {...rise(4)} className="mt-10 grid max-w-md grid-cols-3 gap-5 sm:gap-6">
            {[
              [580, 'tickets shipped'],
              [1000, 'MRs merged'],
              [7000, 'brain notes'],
            ].map(([v, l]) => (
              <div key={l as string}>
                <dt className="sr-only">{l}</dt>
                <dd className="m-0 text-2xl font-bold tracking-tight whitespace-nowrap text-white tabular-nums sm:text-[2rem]">
                  <NumberTicker value={v as number} className="text-white" delay={0.6} />+
                </dd>
                <p className="mt-1 text-[13px] whitespace-nowrap text-[#7f8aa3]">{l}</p>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* 3D stack of real project windows; the live board floats in front on wide screens */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="relative min-w-0"
        >
          <div className="relative h-[300px] [perspective:1700px] sm:h-[520px] lg:h-[600px]">
            <motion.div
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={reduce ? { rotateY: -18, rotateX: 7 } : { rotateY: rotY, rotateX: rotX }}
            >
              {WINDOWS.map((w) => (
                <div
                  key={w.src}
                  className="absolute w-[86%] [transform-style:preserve-3d]"
                  style={{ top: w.top, left: w.left, transform: `translateZ(${w.z}px)` }}
                >
                  <Safari url={w.url} imageSrc={w.src} className="w-full rounded-xl shadow-[0_40px_90px_rgba(0,0,0,0.6)]" />
                </div>
              ))}
            </motion.div>

            <motion.div
              className="absolute -right-4 -bottom-[6%] z-10 hidden w-[360px] sm:block"
              style={reduce ? undefined : { x: boardX, y: boardY }}
            >
              <div className="relative rounded-2xl">
                <PipelineBoard compact className="p-4" />
                <BorderBeam size={120} duration={7} colorFrom="#00d9ff" colorTo="#8b5cf6" borderWidth={1.5} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE, delay: 1.1 }}
              className="absolute top-[3%] right-[2%] z-10 rounded-xl border border-white/10 bg-[#0b1020]/85 px-4 py-3 text-sm shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              <div className="font-semibold text-white">331 tests passing</div>
              <div className="font-mono text-xs text-[#3dff9a]">MerchantFlow · CI green</div>
            </motion.div>
          </div>

          {/* On phones the board gets its own full-width row instead of covering the windows */}
          <div className="relative mt-6 sm:hidden">
            <PipelineBoard compact className="p-4" />
            <BorderBeam size={100} duration={7} colorFrom="#00d9ff" colorTo="#8b5cf6" borderWidth={1.5} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
