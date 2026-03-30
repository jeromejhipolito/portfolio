'use client';

import { useEffect, useRef } from 'react';

const codeParticles = [
  '{', '}', '=>', '//', '()', '[]', '&&', '||',
  'fn', 'if', '++', '!=', '===', '**', '...',
  '</>', 'let', 'new', 'try', 'for', 'map',
  'async', 'await', 'const', 'return', 'export',
  'true', 'null', 'this', 'push', 'pipe',
  '0', '1', '01', '10', '11', '00',
];

interface Particle {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const POOL_SIZE = 25;

export function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    if (!mq.matches) return;
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (rmq.matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Pre-create particle pool
    const pool: Particle[] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const el = document.createElement('span');
      el.style.cssText =
        'position:fixed;pointer-events:none;z-index:9999;font-family:var(--font-mono),monospace;font-size:11px;opacity:0;transition:none;white-space:nowrap;user-select:none;';
      container.appendChild(el);
      pool.push({ el, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0 });
    }

    let poolIndex = 0;
    let lastSpawnX = 0;
    let lastSpawnY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isPointer = false;

    const CLICKABLE = 'a, button, [role="button"], [role="tab"], input, select, textarea, label';

    const spawnParticle = () => {
      const p = pool[poolIndex % POOL_SIZE];
      poolIndex++;

      const text = codeParticles[Math.floor(Math.random() * codeParticles.length)];
      const isCode = text.length > 2;

      p.el.textContent = text;
      p.el.style.color = isCode
        ? 'var(--color-syntax-green)'
        : 'var(--color-accent)';
      p.el.style.textShadow = isCode
        ? '0 0 6px rgba(61,255,154,0.3)'
        : '0 0 6px rgba(0,217,255,0.3)';
      p.el.style.fontSize = isCode ? '10px' : '12px';

      p.x = mouseX + (Math.random() - 0.5) * 8;
      p.y = mouseY + (Math.random() - 0.5) * 8;
      p.vx = (Math.random() - 0.5) * 0.6;
      p.vy = -Math.random() * 0.6 - 0.2; // gentle float upward
      p.life = 1;
      p.maxLife = 70 + Math.random() * 50; // 70-120 frames (slower fade)
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Detect pointer elements
      const target = e.target as HTMLElement;
      const clickable = target.closest(CLICKABLE);
      isPointer = clickable !== null || window.getComputedStyle(target).cursor === 'pointer';

      // Spawn particle every ~25px of movement
      const dx = mouseX - lastSpawnX;
      const dy = mouseY - lastSpawnY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 40) {
        spawnParticle();
        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
      }
    };

    let raf: number;
    const animate = () => {
      for (const p of pool) {
        if (p.life <= 0) {
          p.el.style.opacity = '0';
          continue;
        }

        p.life -= 1 / p.maxLife;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01; // slight float up acceleration

        const opacity = Math.max(0, p.life * 0.7);
        const scale = 0.5 + p.life * 0.5;

        p.el.style.opacity = String(opacity);
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) scale(${scale})`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={containerRef} aria-hidden />;
}
