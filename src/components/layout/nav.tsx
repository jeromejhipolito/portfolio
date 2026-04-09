'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/site-config';

const navLinks = [
  { label: 'Intro', href: '#video-intro' },
  { label: 'Experience', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHomePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -60% 0px' },
    );

    // Use MutationObserver to catch Suspense-wrapped sections that mount late
    const observeSections = () => {
      observer.disconnect();
      document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    };

    observeSections();

    const mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [isHomePage]);

  // On subpages, prefix anchors with / so they navigate home first
  const getHref = (hash: string) => (isHomePage ? hash : `/${hash}`);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[70] transition-all',
        scrolled
          ? 'bg-bg-base/80 backdrop-blur-md border-b border-border-subtle'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a href="/" className="font-mono text-lg font-bold text-accent">
          {siteConfig.name}
          <span className="text-text-muted">_</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={getHref(link.href)}
              className={cn(
                'text-sm transition-colors duration-150',
                isHomePage && activeSection === link.href.slice(1)
                  ? 'font-semibold text-accent'
                  : 'text-text-secondary hover:text-text-primary',
              )}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 border-l border-border-subtle pl-4">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-text-secondary transition-colors hover:text-accent"
              >
                {link.platform === 'github' ? <GithubIcon /> : <LinkedinIcon />}
              </a>
            ))}
            <a
              href={siteConfig.resumeFile}
              download
              aria-label="Download resume as PDF"
              className="rounded border border-accent px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent/10 active:scale-[0.97]"
            >
              Resume ↓
            </a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={cn('hamburger-line', mobileOpen && 'rotate-45 translate-y-[6px]')} />
          <span className={cn('hamburger-line', mobileOpen && 'opacity-0')} />
          <span className={cn('hamburger-line', mobileOpen && '-rotate-45 -translate-y-[6px]')} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-[60] bg-[#0A0E1A] md:hidden overflow-y-auto">
          <div className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={getHref(link.href)}
                onClick={() => setMobileOpen(false)}
                className="text-xl text-text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.resumeFile}
              download
              aria-label="Download resume as PDF"
              className="w-48 rounded border border-accent px-4 py-3 text-center font-mono text-sm text-accent transition-colors hover:bg-accent/10"
            >
              Resume ↓
            </a>
            <div className="flex gap-6 pt-4">
              {siteConfig.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-text-secondary hover:text-accent"
                >
                  {link.platform === 'github' ? <GithubIcon /> : <LinkedinIcon />}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
