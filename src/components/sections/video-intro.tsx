'use client';

import { useState, useRef, useEffect } from 'react';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';

export function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  // Lazy load + pause when off-screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          video.preload = 'metadata';
        } else if (isPlaying) {
          video.pause();
        }
      },
      { rootMargin: '200px', threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isPlaying]);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      setShowPlayButton(true);
    });
    setIsPlaying(true);
    setShowPlayButton(false);
    setShowOverlay(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    setIsPlaying(true);
    setShowOverlay(false);
    setShowPlayButton(false);
  };

  const handleScrollToWorkflow = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('workflow')?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <Section id="video-intro" className="py-16 md:py-24">
      <Heading label="INTRODUCTION" title="Meet Jerome" />

      <div className="grid items-center gap-8 lg:grid-cols-[1fr_360px_1fr]">
        {/* Left flank — pull quote */}
        <div className="hidden lg:block">
          <blockquote className="border-l-2 border-accent pl-4 italic text-text-secondary">
            &ldquo;I built a workflow that turns a one-person team into the output of five
            — with full test coverage and zero compromises.&rdquo;
          </blockquote>
        </div>

        {/* Center — video player or coming soon */}
        <div className="relative mx-auto w-full max-w-[360px]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-lg border border-border-subtle bg-bg-surface">
            {/* Coming Soon state — swap with video player when recorded */}
            <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-accent/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent/50">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <p className="font-mono text-sm font-medium text-text-primary">Video Coming Soon</p>
              <p className="text-xs text-text-muted">
                A short introduction video is being prepared. In the meantime, scroll down to see how I build.
              </p>
              <button
                onClick={handleScrollToWorkflow}
                className="mt-2 scroll-arrow text-accent"
                aria-label="Scroll to how I work section"
              >
                <p className="mb-2 font-mono text-xs text-accent">See how I build</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-3 text-center font-mono text-xs text-text-muted">
            Coming soon · 45 second intro
          </p>
        </div>

        {/* Right flank — what you'll learn */}
        <div className="hidden lg:block">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
            What you&apos;ll learn
          </p>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex gap-2">
              <span className="text-accent">›</span> How I approach quality
            </li>
            <li className="flex gap-2">
              <span className="text-accent">›</span> My actual development process
            </li>
            <li className="flex gap-2">
              <span className="text-accent">›</span> What AI-assisted means in practice
            </li>
            <li className="flex gap-2">
              <span className="text-accent">›</span> Why 500+ tests on every project
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
