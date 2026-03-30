import { siteConfig } from '@/data/site-config';
import { GridBackground } from '@/components/effects/grid-background';
import { BuildLog } from '@/components/effects/build-log';
import { CodeText } from '@/components/ui/code-text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background layers */}
      <GridBackground />
      <BuildLog />

      {/* Radial gradient accent (replaces Three.js — CSS only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,217,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 70% 60%, rgba(61,255,154,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-32">
        {/* Availability badge */}
        <Badge variant="status" className="mb-6">
          <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-syntax-green" />
          {siteConfig.availability}
        </Badge>

        {/* Name — h1 is LCP element, server-rendered */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          {siteConfig.name}
        </h1>

        {/* Title */}
        <p className="mb-4 font-mono text-lg text-text-secondary sm:text-xl">
          {siteConfig.subtitle}
        </p>

        {/* Headline metric — visible above fold */}
        <p className="mb-3 font-mono text-sm text-accent sm:text-base">
          10 production systems shipped · 20+ developers mentored
        </p>

        {/* Tagline with CodeText */}
        <p className="mb-8 max-w-xl text-lg text-text-secondary">
          I build <CodeText>systems</CodeText> that scale, break{' '}
          <CodeText>gracefully</CodeText>, and ship <CodeText>fully tested</CodeText>.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Button href="#projects">See what I&apos;ve shipped &rarr;</Button>
          <Button href="#workflow" variant="secondary">
            How I build
          </Button>
        </div>

        {/* Tech badges */}
        <div className="mt-12 flex flex-wrap gap-3">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              Primary
            </p>
            <div className="flex flex-wrap gap-2">
              {['Laravel', 'Next.js', 'NestJS', 'TypeScript'].map((t) => (
                <Badge key={t} variant="framework">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <div className="ml-4">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              Secondary
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'PostgreSQL', 'Docker'].map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
