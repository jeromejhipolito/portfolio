'use client';

import { useEffect, useState } from 'react';
import { experience } from '@/data/experience';
import { siteConfig } from '@/data/site-config';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Marquee } from '@/components/magicui/marquee';
import { MagicCard } from '@/components/magicui/magic-card';
import { BorderBeam } from '@/components/magicui/border-beam';
import { ShimmerButton } from '@/components/magicui/shimmer-button';

const EMAIL = 'jeromehipolito14@gmail.com';
const H2 = 'mt-3 text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-white';

const roleLabel = (r: string) => r.replace(/\s*\(.*\)/, '').replace(/Full[- ]Stack/i, 'Full-stack');
const span = (e: { startDate: string; endDate?: string }) => `${e.startDate} – ${e.endDate ?? 'Present'}`;

export function About() {
  const handBuilt = experience
    .filter((e) => e.endDate)
    .flatMap((e) => (e.projects ?? []).map((p) => ({ ...p, at: e.company })))
    .filter((p) => !/testing suite/i.test(p.name));

  return (
    <section id="about" className="relative bg-[#05070d] py-28 sm:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <BlurFade inView>
            <p className="font-mono text-sm text-[#3dff9a]">Before AI</p>
            <h2 className={H2}>I coded by hand first.</h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-[#c3cbdb]">
              Before AI tools, I built Kafka microservices, saga rollbacks, an e-wallet API and a casino cage system
              myself, and I led a team of five as tech lead. That is how I can tell when a pipeline gets something wrong,
              and why I still read every change it makes.
            </p>
          </BlurFade>

          <ol className="relative mt-12 ml-2 list-none space-y-10 border-l border-white/10 p-0 pl-8">
            {experience.map((e, i) => (
              <li key={e.company} className="relative">
                <BlurFade inView delay={0.08 * i}>
                  <span
                    className="absolute top-1.5 -left-[39px] h-3.5 w-3.5 rounded-full border-2 border-[#05070d]"
                    style={{ background: ['#00d9ff', '#8b5cf6', '#3dff9a'][i % 3], boxShadow: `0 0 14px ${['#00d9ff', '#8b5cf6', '#3dff9a'][i % 3]}` }}
                  />
                  <p className="font-mono text-xs text-[#7f8aa3]">{span(e)}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {roleLabel(e.role)} <span className="font-normal text-[#a9b4c8]">at {e.company}</span>
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#a9b4c8]">{e.outcomeMetric}</p>
                </BlurFade>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <BlurFade inView delay={0.1}>
            <p className="text-sm text-[#a9b4c8]">Built before AI, by hand</p>
          </BlurFade>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {handBuilt.map((p, i) => (
              <BlurFade inView delay={0.04 * i} key={p.name}>
                <MagicCard className="h-full rounded-xl" gradientFrom="#3dff9a" gradientTo="#00d9ff" gradientColor="#0f1a2c" gradientSize={180}>
                  <div className="p-5">
                    <h3 className="text-[15px] font-semibold text-white">{p.name}</h3>
                    <p className="mt-1.5 line-clamp-3 text-[13.5px] leading-relaxed text-[#a9b4c8]">{p.description}</p>
                    <p className="mt-3 font-mono text-[11px] text-[#7f8aa3]">{p.at}</p>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TECH = [
  'Claude Code', 'n8n', 'Playwright', 'TypeScript', 'Node.js', 'Medusa', 'NestJS', 'Laravel', 'Vue', 'Nuxt',
  'React', 'Next.js', 'PostgreSQL', 'MySQL', 'Redis', 'Kafka', 'RabbitMQ', 'Docker', 'GitLab CI', 'Vitest',
];
const PACKAGES = [
  ['laravel-api-versioning', 'Header-based API versioning with feature flags', '120+ installs'],
  ['laravel-saga', 'Distributed transactions with automatic rollback', 'Laravel'],
  ['laravel-amqp-toolkit', 'AMQP messaging with retry and dead letter queues', 'Laravel'],
  ['laravel-eloquent-atomic', 'Atomic upserts that respect soft deletes', 'Laravel'],
  ['laravel-global-error-formatter', 'One JSON shape for every API error', 'Laravel'],
  ['laravel-timezone-middleware', 'Store in UTC, show in the user’s time', 'Laravel'],
] as const;

export function Toolbox() {
  return (
    <section className="relative overflow-hidden bg-[#070a14] py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <BlurFade inView>
          <p className="font-mono text-sm text-[#ff79c6]">Toolbox</p>
          <h2 className={H2}>What I build with.</h2>
        </BlurFade>
      </div>
      <div className="relative mt-12 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        {[false, true].map((rev) => (
          <Marquee key={String(rev)} reverse={rev} pauseOnHover className="[--duration:42s] [--gap:0.75rem] py-1.5">
            {(rev ? [...TECH].reverse() : TECH).map((t) => (
              <span key={t} className="rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-[15px] font-medium whitespace-nowrap text-[#dfe6f3]">
                {t}
              </span>
            ))}
          </Marquee>
        ))}
      </div>
      <div className="mx-auto mt-16 max-w-[1280px] px-5 sm:px-8">
        <BlurFade inView>
          <h3 className="text-xl font-semibold text-white">Open-source packages on Packagist</h3>
        </BlurFade>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map(([name, what, v], i) => (
            <BlurFade inView delay={0.05 * i} key={name}>
              <a href={`https://packagist.org/packages/jeromejhipolito/${name}`} target="_blank" rel="noreferrer" className="block h-full">
                <MagicCard className="h-full rounded-xl" gradientFrom="#ff79c6" gradientTo="#8b5cf6" gradientColor="#151a2e" gradientSize={180}>
                  <div className="p-5">
                    <p className="font-mono text-[13px] text-[#7eeeff]">{name}</p>
                    <p className="mt-2 text-[15px] leading-snug text-[#dfe6f3]">{what}</p>
                    <p className="mt-3 text-xs text-[#7f8aa3]">{v}</p>
                  </div>
                </MagicCard>
              </a>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const f = () => setNow(new Date().toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' }));
    f();
    const id = setInterval(f, 30_000);
    return () => clearInterval(id);
  }, []);
  return <>{now ?? '--:--'}</>;
}

export function Contact() {
  const [error, setError] = useState('');

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const msg = String(form.get('message') ?? '').trim();
    if (!name) return setError('Please add your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please add an email I can reply to.');
    setError('');
    const subject = encodeURIComponent(`Work for Jerome, from ${name}`);
    const body = encodeURIComponent(`Hi Jerome,\n\n${msg}\n\n${name}\n${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  const input =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-[#7f8aa3] transition-[border-color,background-color] duration-150 outline-none focus:border-[#00d9ff]/60 focus:bg-white/[0.07]';

  return (
    <section id="contact" className="relative overflow-hidden bg-[#05070d] py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{ background: 'radial-gradient(50% 45% at 50% 60%, rgba(139,92,246,0.18), transparent 70%), radial-gradient(35% 35% at 20% 30%, rgba(0,217,255,0.12), transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-[1080px] px-5 sm:px-8">
        <BlurFade inView>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]/80 p-7 backdrop-blur-xl sm:p-12">
            <BorderBeam size={260} duration={10} colorFrom="#00d9ff" colorTo="#8b5cf6" borderWidth={2} />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="font-mono text-sm text-[#00d9ff]">Contact</p>
                <h2 className={H2}>Let&apos;s build something.</h2>
                <p className="mt-5 text-lg leading-relaxed text-[#a9b4c8]">
                  {siteConfig.availability.replace(/ · /g, '. ')}. Remote full-stack and AI workflow work.
                </p>
                <dl className="mt-8 grid gap-4 text-[15px]">
                  <div>
                    <dt className="text-[#7f8aa3]">Email</dt>
                    <dd className="m-0"><a className="text-white underline-offset-4 hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
                  </div>
                  <div>
                    <dt className="text-[#7f8aa3]">Local time in Bulacan, Philippines</dt>
                    <dd className="m-0 text-white tabular-nums"><Clock /></dd>
                  </div>
                </dl>
              </div>
              <form onSubmit={send} noValidate className="grid gap-3">
                <label className="sr-only" htmlFor="c-name">Your name</label>
                <input id="c-name" name="name" placeholder="Your name" autoComplete="name" className={input} />
                <label className="sr-only" htmlFor="c-email">Your email</label>
                <input id="c-email" name="email" type="email" placeholder="Your email" autoComplete="email" className={input} />
                <label className="sr-only" htmlFor="c-msg">What are you building?</label>
                <textarea id="c-msg" name="message" rows={4} placeholder="What are you building?" className={`${input} resize-none`} />
                <ShimmerButton type="submit" background="linear-gradient(135deg,#0891b2,#7c3aed)" shimmerColor="#bff6ff" borderRadius="12px" className="mt-1 w-full py-3.5 text-base font-semibold active:scale-[0.98]">
                  Write to me →
                </ShimmerButton>
                <p className={error ? 'text-sm text-[#ffb86c]' : 'text-sm text-[#7f8aa3]'} role={error ? 'alert' : undefined}>
                  {error || 'Opens your mail app with the note ready. Nothing is stored.'}
                </p>
              </form>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#05070d]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-10 text-sm text-[#7f8aa3] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Jerome Hipolito · Built by hand first, now shipped by pipelines I watch over.</p>
        <div className="flex flex-wrap gap-5">
          {siteConfig.socialLinks.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="transition-colors duration-150 hover:text-white">{s.label}</a>
          ))}
          <a href="https://packagist.org/users/jeromejhipolito" target="_blank" rel="noreferrer" className="transition-colors duration-150 hover:text-white">Packagist</a>
          <a href={siteConfig.resumeFile} download className="transition-colors duration-150 hover:text-white">Resume</a>
        </div>
      </div>
    </footer>
  );
}
