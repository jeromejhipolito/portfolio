import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { generateProjectSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import { Nav } from '@/components/home/hero';
import { Footer } from '@/components/home/rest';
import { ProjectGallery } from '@/components/home/gallery';
import { ACCENT } from '@/components/home/accent';
import { MotionRoot } from '@/components/home/motion-root';
import { BlurFade } from '@/components/magicui/blur-fade';
import { MagicCard } from '@/components/magicui/magic-card';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { CodeBlock } from '@/components/home/code-block';

interface Props {
  params: Promise<{ slug: string }>;
}

const ordered = () => [...projects].sort((a, b) => a.order - b.order);

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} · Jerome Hipolito`,
    description: project.problem,
    openGraph: {
      title: `${project.name} · Jerome Hipolito`,
      description: `${project.outcomeMetric}. ${project.problem}`,
      type: 'article',
    },
  };
}

const H2 =
  'text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-bold tracking-[-0.03em] text-balance text-white';

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const list = ordered();
  const i = list.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const project = list[i];
  const next = list[(i + 1) % list.length];
  const accent = ACCENT[i % ACCENT.length];
  const [name, kind] = project.name.split(/\s[—-]\s/);
  const metrics = project.outcomeMetric.split(' · ');
  // Most demo notes repeat the generic 'sample project' line; only add the ones with project-specific facts.
  const extraNote =
    project.demoNote && !/^This is a sample project/.test(project.demoNote)
      ? ` ${project.demoNote}`
      : '';

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jerome.dev';
  const projectSchema = generateProjectSchema(project, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Work', url: `${baseUrl}/#work` },
    { name: project.name, url: `${baseUrl}/projects/${project.slug}` },
  ]);

  const story = [
    { tag: 'Problem', text: project.problem, c: '#ff79c6' },
    { tag: 'Solution', text: project.solution, c: '#00d9ff' },
    { tag: 'Impact', text: project.impact, c: '#3dff9a' },
  ];

  return (
    <MotionRoot>
      <div className="min-h-screen overflow-x-clip bg-[#05070d] text-white [cursor:auto]">
        <ScrollProgress className="top-0 z-[60] h-[2px] bg-gradient-to-r from-[#00d9ff] via-[#8b5cf6] to-[#ff79c6]" />
        <Nav base="/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([projectSchema, breadcrumbSchema]) }}
        />

        <main>
          {/* Header */}
          <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-[20%] -top-[30%] bottom-0 -z-10 blur-2xl [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]"
              style={{
                background: `radial-gradient(36% 40% at 22% 30%, ${accent}2e, transparent 70%), radial-gradient(34% 34% at 82% 20%, rgba(139,92,246,0.24), transparent 70%)`,
              }}
            />
            <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
              <BlurFade>
                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center gap-2 text-sm text-[#7f8aa3]"
                >
                  <Link href="/#work" className="transition-colors duration-150 hover:text-white">
                    ← Work
                  </Link>
                  <span aria-hidden>/</span>
                  <span className="text-[#a9b4c8]">{name}</span>
                </nav>
                <p className="mt-8 font-mono text-sm" style={{ color: accent }}>
                  {project.testCount ? `${project.testCount} tests` : 'Full-stack'} ·{' '}
                  {project.techStack.slice(0, 2).join(' + ')}
                </p>
                <h1 className="mt-3 text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-white">
                  {name}
                </h1>
                {kind && <p className="mt-3 text-xl text-[#a9b4c8]">{kind}</p>}
              </BlurFade>

              <BlurFade delay={0.1}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-gradient-to-br from-[#0891b2] to-[#7c3aed] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_40px_rgba(0,217,255,0.3)] transition-[filter,transform] duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
                    >
                      Try the live demo →
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-base font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-white/[0.09] active:scale-[0.97]"
                  >
                    Source on GitHub
                  </a>
                </div>
              </BlurFade>

              {/* Honest notice: these are showcase builds */}
              <BlurFade delay={0.15}>
                <aside className="mt-10 flex max-w-3xl gap-4 rounded-2xl border border-[#febc2e]/30 bg-[#febc2e]/[0.06] p-5">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[#febc2e]/15 text-sm font-bold text-[#febc2e]"
                  >
                    i
                  </span>
                  <div className="text-[15px] leading-relaxed text-[#e9dcc0]">
                    <p className="font-semibold text-[#ffe2a1]">Showcase project</p>
                    <p className="mt-1">
                      Built to show architecture, testing and code quality, not as a finished
                      product. It runs on demo data, so you may hit rough edges.
                      {extraNote.split(/(github\.com\/[\w./-]+)/).map((part, k) =>
                        /^github\.com\//.test(part) ? (
                          <a
                            key={k}
                            href={`https://${part}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-[#ffe2a1] underline underline-offset-4 hover:text-white"
                          >
                            backend API repo ↗
                          </a>
                        ) : (
                          part
                        ),
                      )}
                    </p>
                  </div>
                </aside>
              </BlurFade>
            </div>
          </section>

          {/* Screens */}
          <section aria-labelledby="screens-h" className="pb-16">
            <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
              <h2 id="screens-h" className="sr-only">
                Screens
              </h2>
              <BlurFade delay={0.2}>
                <ProjectGallery
                  p={project}
                  accent={accent}
                  caption
                  priority
                  sizes="(max-width: 1100px) 92vw, 1040px"
                />
              </BlurFade>
            </div>
          </section>

          {/* Story */}
          <section aria-labelledby="story-h" className="bg-[#070a14] py-24">
            <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
              <BlurFade inView>
                <h2 id="story-h" className={H2}>
                  The problem, and how I solved it
                </h2>
              </BlurFade>
              <div className="mt-10 grid gap-4 lg:grid-cols-3">
                {story.map((s, k) => (
                  <BlurFade inView delay={0.06 * k} key={s.tag}>
                    <MagicCard
                      className="h-full rounded-2xl"
                      gradientFrom={s.c}
                      gradientTo="#8b5cf6"
                      gradientColor="#111a30"
                      gradientSize={240}
                    >
                      <div className="p-7">
                        <span
                          className="inline-block rounded-md px-2 py-0.5 font-mono text-xs"
                          style={{ color: s.c, background: `${s.c}18` }}
                        >
                          {s.tag}
                        </span>
                        <p className="mt-4 text-[16px] leading-relaxed text-pretty text-[#c3cbdb]">
                          {s.text}
                        </p>
                      </div>
                    </MagicCard>
                  </BlurFade>
                ))}
              </div>

              <BlurFade inView delay={0.1}>
                <ul className="mt-10 flex flex-wrap gap-2">
                  {metrics.map((m) => (
                    <li
                      key={m}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[14px] text-[#dfe6f3]"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </BlurFade>
            </div>
          </section>

          {/* Code and stack */}
          <section aria-labelledby="build-h" className="py-24">
            <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
              {project.codeDiff && (
                <BlurFade inView className="min-w-0">
                  <h2 id="build-h" className={H2}>
                    A piece of the code
                  </h2>
                  <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#070b16]">
                    <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.06] px-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <CodeBlock code={project.codeDiff} />
                  </div>
                </BlurFade>
              )}
              <BlurFade inView delay={0.08} className="min-w-0">
                <h2 id={project.codeDiff ? undefined : 'build-h'} className={H2}>
                  Built with
                </h2>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <li
                      key={t}
                      className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[15px] text-[#dfe6f3]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                {project.claudeAssisted && (
                  <p className="mt-6 text-[15px] leading-relaxed text-[#a9b4c8]">
                    Built with my AI pipelines on Claude Code: planned, tested and reviewed in
                    loops, and checked by me before it shipped.
                  </p>
                )}
              </BlurFade>
            </div>
          </section>

          {/* Next project */}
          <section className="pb-28">
            <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
              <BlurFade inView>
                <Link
                  href={`/projects/${next.slug}`}
                  className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]/80 p-8 transition-[border-color,transform] duration-200 ease-out hover:border-[#00d9ff]/40 active:scale-[0.995] sm:p-10"
                >
                  <p className="text-sm text-[#7f8aa3]">Next project</p>
                  <p className="mt-2 flex items-center justify-between gap-4 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.03em] text-white">
                    {next.name.split(/\s[—-]\s/)[0]}
                    <span
                      aria-hidden
                      className="text-[#00d9ff] transition-transform duration-200 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </Link>
              </BlurFade>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MotionRoot>
  );
}
