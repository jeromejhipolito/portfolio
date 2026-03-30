'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';
import { cn } from '@/lib/utils';
import type { ContactSubject } from '@/lib/validations/contact';

type FormState = 'idle' | 'success';

interface FieldError {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const subjects: ContactSubject[] = [
  'Job Opportunity',
  'Freelance Project',
  'Collaboration',
  'Other',
];

export function Contact() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FieldError>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = (form.get('name') as string).trim();
    const email = (form.get('email') as string).trim();
    const subject = (form.get('subject') as string).trim();
    const message = (form.get('message') as string).trim();
    const website = form.get('website') as string; // honeypot

    // Honeypot check
    if (website) return;

    // Basic validation
    const newErrors: FieldError = {};
    if (!name || name.length < 2) newErrors.name = 'Name is required';
    if (!email || !email.includes('@')) newErrors.email = 'Valid email is required';
    if (!subject) newErrors.subject = 'Please select a subject';
    if (!message || message.length < 10) newErrors.message = 'Message must be at least 10 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Open their email client with pre-filled data
    const to = 'jeromehipolito14@gmail.com';
    const mailSubject = encodeURIComponent(`[Portfolio] ${subject} — from ${name}`);
    const body = encodeURIComponent(
      `Hi Jerome,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}\nSent via portfolio contact form`
    );

    window.open(`mailto:${to}?subject=${mailSubject}&body=${body}`, '_self');
    setState('success');
  }

  return (
    <Section id="contact">
      <Heading
        label="LET'S CONNECT"
        title="Start a Conversation"
        subtitle="Open to full-stack roles, consulting, and commission-based work. Can start immediately."
      />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <div className="min-w-0 overflow-hidden">
          {state === 'success' ? (
            <div className="rounded border border-syntax-green/30 bg-syntax-green/5 p-6 text-center">
              <p className="text-lg font-semibold text-syntax-green">
                Your email client should be open — just hit send!
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                If it didn&apos;t open, email me directly at{' '}
                <span className="font-mono text-accent">jeromehipolito14@gmail.com</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <Field label="Your Name" name="name" type="text" error={errors.name} required />
              <Field label="Your Email" name="email" type="email" error={errors.email} required />

              <div>
                <label className="mb-1.5 block text-sm text-text-secondary">Subject</label>
                <select
                  name="subject"
                  required
                  className="w-full rounded border border-border-default bg-bg-surface px-3 py-2.5 text-text-primary focus:border-accent focus:outline-none"
                >
                  <option value="">Select a topic</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.subject && <p className="mt-1 text-xs text-syntax-orange">{errors.subject}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-text-secondary">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  minLength={10}
                  maxLength={2000}
                  className="w-full rounded border border-border-default bg-bg-surface px-3 py-2.5 text-text-primary focus:border-accent focus:outline-none resize-y"
                />
                {errors.message && <p className="mt-1 text-xs text-syntax-orange">{errors.message}</p>}
              </div>

              <Button type="submit">
                Open Email &amp; Send →
              </Button>

              <p className="text-xs text-text-muted">
                This opens your email client with the message pre-filled.
              </p>

              {Object.keys(errors).length > 0 && !errors.name && !errors.email && !errors.subject && !errors.message && (
                <p className="text-sm text-syntax-orange">
                  Please fill in all required fields.
                </p>
              )}
            </form>
          )}
        </div>

        {/* Right side — info cards */}
        <div className="flex min-w-0 flex-col justify-center gap-6 overflow-hidden">
          {/* Social cards */}
          {siteConfig.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded border border-border-subtle bg-bg-surface p-5 transition-all hover:border-accent/30 hover:bg-bg-elevated"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-muted group-hover:text-accent transition-colors">
                <span className="font-mono text-sm uppercase">{link.platform.slice(0, 2)}</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-sm font-medium capitalize text-text-primary">
                  {link.label}
                </p>
                <p className="truncate text-xs text-text-muted">{link.url}</p>
              </div>
            </a>
          ))}

          {/* Packagist card */}
          <a
            href="https://packagist.org/users/jeromejhipolito/packages/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded border border-border-subtle bg-bg-surface p-5 transition-all hover:border-accent/30 hover:bg-bg-elevated"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-muted group-hover:text-accent transition-colors">
              <span className="font-mono text-xs font-bold">PKG</span>
            </div>
            <div className="min-w-0">
              <p className="font-mono text-sm font-medium text-text-primary">Packagist</p>
              <p className="truncate text-xs text-text-muted">Published Laravel Packages</p>
            </div>
          </a>

          {/* Resume card */}
          <a
            href={siteConfig.resumeFile}
            download
            className="group flex items-center gap-4 rounded border border-accent/30 bg-bg-surface p-5 transition-all hover:border-accent hover:bg-bg-elevated"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <span className="font-mono text-lg">↓</span>
            </div>
            <div className="flex-1">
              <p className="font-mono text-sm font-medium text-text-primary">Resume / CV</p>
              <p className="text-xs text-text-muted">PDF · Updated {siteConfig.resumeDate}</p>
            </div>
            <span className="rounded bg-accent px-3 py-1.5 text-xs font-medium text-bg-base transition-colors group-hover:bg-accent-dim">
              Download
            </span>
          </a>

          {/* Location card */}
          <div className="flex items-center gap-4 rounded border border-border-subtle bg-bg-surface p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-muted">
              <span className="font-mono text-sm">PH</span>
            </div>
            <div>
              <p className="font-mono text-sm font-medium text-text-primary">Location</p>
              <p className="text-xs text-text-muted">{siteConfig.location}</p>
            </div>
          </div>

          {/* Availability card */}
          <div className="flex items-center gap-4 rounded border border-syntax-green/20 bg-syntax-green/5 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-syntax-green/10">
              <span className="h-3 w-3 animate-pulse rounded-full bg-syntax-green" />
            </div>
            <div>
              <p className="font-mono text-sm font-medium text-syntax-green">Available Now</p>
              <p className="text-xs text-text-muted">{siteConfig.availability}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type,
  error,
  required,
}: {
  label: string;
  name: string;
  type: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-text-secondary">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className={cn(
          'w-full rounded border bg-bg-surface px-3 py-2.5 text-text-primary focus:outline-none',
          error ? 'border-syntax-orange' : 'border-border-default focus:border-accent',
        )}
      />
      {error && <p className="mt-1 text-xs text-syntax-orange">{error}</p>}
    </div>
  );
}
