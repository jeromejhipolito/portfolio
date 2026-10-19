'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site-config';

const EMAIL = 'jeromehipolito14@gmail.com';
const SHOTS = projects.flatMap((p) => p.gallery ?? []).slice(0, 12);

export function Contact() {
  const [error, setError] = useState('');

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    if (!name) return setError('Please add your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please add an email I can reply to.');
    setError('');
    const subject = encodeURIComponent(`Work for Jerome, from ${name}`);
    const body = encodeURIComponent(`Hi Jerome,\n\n\n\n${name}\n${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-h">
      <div className="marquee" aria-hidden>
        {[...SHOTS, ...SHOTS].map((s, i) => (
          <Image key={i} src={s.src} alt="" width={240} height={150} sizes="240px" loading="lazy" />
        ))}
      </div>
      <div className="wrap">
        <h2 id="contact-h" data-reveal>
          Let&apos;s work together
        </h2>
        <p className="contact__lede" data-reveal style={{ '--d': 1 } as React.CSSProperties}>
          {siteConfig.availability.replace(/ · /g, '. ')}. Leave your name and email and your mail app opens with a
          note to me, ready to send.
        </p>
        <form className="cells" onSubmit={send} noValidate data-reveal style={{ '--d': 2 } as React.CSSProperties}>
          <label className="sr-only" htmlFor="c-name">
            Your name
          </label>
          <input id="c-name" name="name" placeholder="Your name" autoComplete="name" />
          <label className="sr-only" htmlFor="c-email">
            Your email
          </label>
          <input id="c-email" name="email" type="email" placeholder="Your email" autoComplete="email" />
          <button type="submit">Write to me</button>
        </form>
        <div className="cells__notes">
          <p className={error ? 'cells__err' : ''} role={error ? 'alert' : undefined}>
            {error || 'Nothing is stored. It only opens your mail app.'}
          </p>
          <span />
          <p>
            Or write directly to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const f = () =>
      setNow(new Date().toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' }));
    f();
    const id = setInterval(f, 30_000);
    return () => clearInterval(id);
  }, []);
  return <p className="clock tnum">{now ?? 'PHT'}</p>;
}

export function Footer() {
  return (
    <footer className="tiles">
      <div className="tile tile--statement">
        <p>Built by hand first, now shipped by pipelines I watch over.</p>
        <p className="small muted">© {new Date().getFullYear()} Jerome Hipolito</p>
      </div>
      <div className="tile tile--nav">
        <ul>
          <li><a href="#work">Work</a></li>
          <li><a href="#how">How I build</a></li>
          <li><a href="#about">About</a></li>
          <li><a href={siteConfig.resumeFile} download>Resume (PDF)</a></li>
          {siteConfig.socialLinks.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
            </li>
          ))}
          <li><a href="https://packagist.org/users/jeromejhipolito" target="_blank" rel="noreferrer">Packagist</a></li>
        </ul>
      </div>
      <div className="tile tile--time">
        <p className="small muted">Local time in Bulacan</p>
        <Clock />
      </div>
      <div className="tile tile--email">
        <p className="small muted">Email</p>
        <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
      <div className="tile tile--mark" aria-hidden>
        <span className="display">Jerome Hipolito</span>
      </div>
      <a className="tile tile--cta" href="#contact">
        <span>Start a project</span>
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden>
          <path d="M12 44 44 12M20 12h24v24" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      </a>
    </footer>
  );
}
