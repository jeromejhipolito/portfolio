'use client';

import Link from 'next/link';
import { projects } from '@/data/projects';
import type { Project } from '@/types/portfolio';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ProjectGallery } from './gallery';
import { cn } from '@/lib/utils';

import { ACCENT } from './accent';

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const [name, kind] = p.name.split(/\s[—-]\s/);
  const flip = i % 2 === 1;
  const c = ACCENT[i % ACCENT.length];
  const metrics = p.outcomeMetric.split(' · ').slice(0, 4);

  return (
    <article className={cn('grid items-center gap-10 lg:gap-16', flip ? 'lg:grid-cols-[1fr_1.35fr]' : 'lg:grid-cols-[1.35fr_1fr]')}>
      <BlurFade inView direction={flip ? 'left' : 'right'} offset={24} className={cn('min-w-0', flip && 'lg:order-2')}>
        <ProjectGallery p={p} accent={c} beamDelay={i} />
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
