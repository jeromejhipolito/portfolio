import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { experience } from '@/data/experience';
import { PipelineBoard } from './pipeline-board';

const d = (n: number) => ({ '--d': n }) as React.CSSProperties;

const STATS = [
  ['580+', 'tickets handled at Fincom since April 2026, on a multi-vendor marketplace in the Philippines.'],
  ['540+', 'of them done or live in production.'],
  ['1,000+', 'merge requests merged. Small and scoped, and I review every diff.'],
  ['7,000+', 'notes in the second brain my pipelines read before they act.'],
  ['5', 'pipelines running at once, each in its own git worktree.'],
] as const;

export function Stats() {
  return (
    <section className="section wrap" aria-labelledby="stats-h">
      <div className="grid12 stats">
        <div className="stats__list">
          <h2 id="stats-h" className="stats__head" data-reveal>
            Since April 2026
          </h2>
          <dl style={{ margin: 0 }}>
            {STATS.map(([fig, text], i) => (
              <div className="stats__row" key={fig} data-reveal style={d(i + 1)}>
                <dt className="tnum">{fig}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="stats__board" data-reveal style={d(3)}>
          <PipelineBoard />
        </div>
      </div>
    </section>
  );
}

const years = (e: { startDate: string; endDate?: string }) => {
  const y = (s?: string) => (s ? s.slice(-4) : 'now');
  return `${y(e.startDate)}–${e.endDate ? y(e.endDate).slice(-2) : 'now'}`;
};

export function About() {
  const handBuilt = experience
    .filter((e) => e.endDate)
    .flatMap((e) => (e.projects ?? []).map((p) => ({ name: p.name, at: e.company.split(' ')[0] })))
    .filter((p) => !/testing suite/i.test(p.name));

  return (
    <section className="section wrap" id="about" aria-labelledby="about-h">
      <div className="about__row">
        <dl className="facts" data-reveal>
          <div>
            <dt>Based in</dt>
            <dd>Bulacan, Philippines</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>4+ years, full-stack</dd>
          </div>
          <div>
            <dt>Degree</dt>
            <dd>BS Information Technology, Bulacan State University</dd>
          </div>
        </dl>
        <div className="about__body">
          <h2 id="about-h" data-reveal>
            I coded by hand first
          </h2>
          <p data-reveal style={d(1)}>
            Before AI tools, I built Kafka microservices, saga rollbacks, an e-wallet API and a casino cage system
            myself, and I led a team of five as tech lead. That is how I can tell when a pipeline gets something wrong,
            and why I still read every change it makes.
          </p>
        </div>
      </div>

      <div className="about__row">
        <p className="record__word" data-reveal>
          The record
        </p>
        <div className="records">
          <div className="record" data-reveal style={d(1)}>
            <h3>Roles</h3>
            <ul>
              {experience.map((e) => (
                <li key={e.company}>
                  <span>
                    {e.company}, {e.role.replace(/\s*\(.*\)/, '').replace('Full Stack', 'full-stack').toLowerCase().replace(/^./, (c) => c.toUpperCase())}
                  </span>
                  <span className="tnum">{years(e)}</span>
                </li>
              ))}
              <li>
                <span>Tech lead, mentored 5 developers</span>
                <span>Betrnk</span>
              </li>
              <li>
                <span>Technical interviews run</span>
                <span className="tnum">15+</span>
              </li>
            </ul>
          </div>
          <div className="record" data-reveal style={d(2)}>
            <h3>Built before AI</h3>
            <ul>
              {handBuilt.map((p) => (
                <li key={p.name}>
                  <span>{p.name}</span>
                  <span>{p.at}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const list = [...projects].sort((a, b) => a.order - b.order);
  return (
    <section className="section" id="work" aria-labelledby="work-h">
      <h2 id="work-h" className="work__head wrap" data-reveal>
        Selected work
      </h2>
      {list.map((p) => {
        const [name, kind] = p.name.split(/\s[—-]\s/);
        const shots = p.gallery?.length ? p.gallery : [{ src: p.screenshot, alt: p.name }];
        return (
          <article className="project" key={p.slug} aria-labelledby={`p-${p.slug}`}>
            <div className="strip" tabIndex={0} aria-label={`${name} screenshots, scroll sideways`} data-reveal>
              {shots.map((s, i) => (
                <div className="slide" key={s.src}>
                  <Image src={s.src} alt={s.alt} width={1440} height={900} sizes="(max-width: 860px) 78vw, 73vw" loading={i ? 'lazy' : undefined} />
                </div>
              ))}
            </div>
            <div className="grid12 wrap project__facts" data-reveal style={d(1)}>
              <div className="project__name">
                <h3 id={`p-${p.slug}`} style={{ font: 'inherit', letterSpacing: 0, lineHeight: 'inherit' }}>
                  <Link href={`/projects/${p.slug}`}>{name}</Link> <span className="muted">{kind ?? ''}</span>
                </h3>
                <div className="project__links">
                  <Link className="link" href={`/projects/${p.slug}`}>
                    Read the case &rarr;
                  </Link>
                  {p.demoUrl && (
                    <a className="link" href={p.demoUrl} target="_blank" rel="noreferrer">
                      Live demo
                    </a>
                  )}
                </div>
              </div>
              <p>{p.testCount ? `${p.testCount} tests` : p.outcomeMetric.split(' · ')[0]}</p>
              <p className="muted">{p.techStack.slice(0, 3).join(', ')}</p>
              <p>
                <a className="link" href={p.githubUrl} target="_blank" rel="noreferrer">
                  Source on GitHub
                </a>
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

const PACKAGES = [
  ['laravel-api-versioning', 'Header-based API versioning', '120+ installs'],
  ['laravel-saga', 'Distributed transactions with rollback', 'Laravel'],
  ['laravel-amqp-toolkit', 'AMQP with retry and dead letters', 'Laravel'],
  ['laravel-eloquent-atomic', 'Atomic upserts', 'Laravel'],
  ['laravel-global-error-formatter', 'One JSON error shape', 'Laravel'],
  ['laravel-timezone-middleware', 'UTC storage, local display', 'Laravel'],
  ['laravel-translation-middleware', 'Locale detection', 'Laravel'],
] as const;

const TOOLS = [
  ['Claude Code', 'AI pipelines'],
  ['n8n', 'Automation'],
  ['Playwright', 'Browser QA'],
  ['Node.js and TypeScript', 'Backend'],
  ['Medusa and NestJS', 'Backend'],
  ['Laravel', 'Backend'],
  ['Vue, Nuxt, React, Next.js', 'Frontend'],
  ['PostgreSQL, MySQL, Redis', 'Data'],
  ['Kafka and RabbitMQ', 'Events'],
  ['Docker and GitLab CI', 'Delivery'],
] as const;

export function Toolbox() {
  return (
    <section className="section" aria-labelledby="tools-h">
      <div className="list">
        <h2 id="tools-h" data-reveal>
          Packages and tools
        </h2>
        <div className="list__group" data-reveal style={d(1)}>
          <p className="list__word">Published on Packagist</p>
          <ul>
            {PACKAGES.map(([name, what, value]) => (
              <li key={name}>
                <span>
                  <i className="dot" aria-hidden />
                  <a href={`https://packagist.org/packages/jeromejhipolito/${name}`} target="_blank" rel="noreferrer">
                    {what}
                  </a>
                </span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="list__group" data-reveal style={d(2)}>
          <p className="list__word">What I build with</p>
          <ul>
            {TOOLS.map(([name, value]) => (
              <li key={name}>
                <span>
                  <i className="dot dot--ink" aria-hidden />
                  {name}
                </span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
