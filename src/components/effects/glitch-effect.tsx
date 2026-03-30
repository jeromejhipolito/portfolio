'use client';

import { useEffect, useRef } from 'react';

interface GlitchEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchEffect({ children, className }: GlitchEffectProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const trigger = () => {
      const el = ref.current;
      if (!el) return;
      el.classList.add('glitch-active');
      setTimeout(() => el.classList.remove('glitch-active'), 150);
    };

    const schedule = () => {
      const delay = 8000 + Math.random() * 4000; // 8-12s
      return setTimeout(() => {
        trigger();
        timerId = schedule();
      }, delay);
    };

    let timerId = schedule();
    return () => clearTimeout(timerId);
  }, []);

  return (
    <span ref={ref} className={`glitch-wrapper ${className || ''}`}>
      {children}
    </span>
  );
}
