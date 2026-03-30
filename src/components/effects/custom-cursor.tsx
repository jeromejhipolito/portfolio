'use client';

import { useEffect, useRef } from 'react';

const codeSnippets = [
  'async',
  'await',
  'return',
  'const',
  'deploy',
  '=> {}',
  'true',
  'test()',
  'build',
  'ship()',
  '.then',
  'push',
  'merge',
  'commit',
  'export',
  'import',
  'fetch()',
  'pipe()',
  'next()',
  'run()',
];

const CLICKABLE = 'a, button, [role="button"], [role="tab"], input, select, textarea, label';

export function CustomCursor() {
  const openRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const execRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    if (!mq.matches) return;
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (rmq.matches) return;

    const open = openRef.current;
    const close = closeRef.current;
    const code = codeRef.current;
    const exec = execRef.current;
    if (!open || !close || !code || !exec) return;

    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let isPointer = false;
    let idleTimer: ReturnType<typeof setTimeout>;
    let snippetIndex = 0;
    let charIndex = 0;
    let currentSnippet = '';
    let typeTimer: ReturnType<typeof setTimeout> | undefined;
    let moveDistance = 0;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      moveDistance += Math.sqrt(dx * dx + dy * dy);

      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;

      // Detect if hovering over a clickable element
      const target = e.target as HTMLElement;
      const clickable = target.closest(CLICKABLE);
      const hasPointer = clickable !== null || window.getComputedStyle(target).cursor === 'pointer';

      if (hasPointer !== isPointer) {
        isPointer = hasPointer;
        if (isPointer) {
          // Switch to execute mode
          open.style.opacity = '0';
          close.style.opacity = '0';
          code.style.opacity = '0';
          exec.style.opacity = '1';
        } else {
          // Switch back to code mode
          exec.style.opacity = '0';
          open.style.opacity = '1';
          close.style.opacity = '1';
        }
      }

      if (!isPointer) {
        open.style.opacity = '1';
        close.style.opacity = '1';
        code.style.opacity = '1';

        // Type a new character every ~60px of mouse movement
        if (moveDistance > 60) {
          moveDistance = 0;
          charIndex++;

          if (charIndex > currentSnippet.length) {
            snippetIndex = (snippetIndex + 1) % codeSnippets.length;
            currentSnippet = codeSnippets[snippetIndex];
            charIndex = 0;
          }

          code.textContent = currentSnippet.slice(0, charIndex);
        }
      }

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMoving = false;
        setTimeout(() => {
          code.style.opacity = '0';
          charIndex = 0;
          code.textContent = '';
        }, 500);
      }, 200);
    };

    let fastX = 0;
    let fastY = 0;
    let slowX = 0;
    let slowY = 0;

    let raf: number;
    const animate = () => {
      fastX += (mouseX - fastX) * 0.12;
      fastY += (mouseY - fastY) * 0.12;
      slowX += (mouseX - slowX) * 0.035;
      slowY += (mouseY - slowY) * 0.035;

      // Execute cursor always follows mouse directly
      exec.style.transform = `translate(${mouseX - 12}px, ${mouseY - 12}px)`;

      if (isPointer) {
        // Hide braces when in pointer mode — exec cursor handles it
        raf = requestAnimationFrame(animate);
        return;
      }

      const leftX = Math.min(fastX, slowX);
      const leftY = fastX < slowX ? fastY : slowY;
      const rightX = Math.max(fastX, slowX);
      const rightY = fastX > slowX ? fastY : slowY;

      const midX = (leftX + rightX) / 2;
      const midY = (leftY + rightY) / 2;
      const codeWidth = (code.textContent?.length || 0) * 3.5;

      if (isMoving) {
        open.style.transform = `translate(${leftX - 10}px, ${leftY - 12}px)`;
        code.style.transform = `translate(${midX - codeWidth}px, ${midY - 10}px)`;
        close.style.transform = `translate(${rightX + 4}px, ${rightY - 12}px)`;
      } else {
        open.style.transform = `translate(${mouseX - 6}px, ${mouseY - 12}px)`;
        code.style.transform = `translate(${mouseX + 4}px, ${mouseY - 10}px)`;
        close.style.transform = `translate(${mouseX + 10}px, ${mouseY - 12}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    currentSnippet = codeSnippets[0];

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      clearTimeout(typeTimer);
    };
  }, []);

  return (
    <>
      {/* Opening brace */}
      <div
        ref={openRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] select-none font-mono text-lg font-bold text-accent opacity-0"
        aria-hidden
        style={{ textShadow: '0 0 8px rgba(0,217,255,0.4)' }}
      >
        {'{'}
      </div>
      {/* Code typing between braces */}
      <div
        ref={codeRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] select-none font-mono text-xs text-syntax-green opacity-0 transition-opacity duration-200"
        aria-hidden
        style={{ textShadow: '0 0 6px rgba(61,255,154,0.3)' }}
      />
      {/* Closing brace */}
      <div
        ref={closeRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] select-none font-mono text-lg font-bold text-accent/60 opacity-0"
        aria-hidden
        style={{ textShadow: '0 0 8px rgba(0,217,255,0.3)' }}
      >
        {'}'}
      </div>
      {/* Execute cursor — shows on clickable elements */}
      <div
        ref={execRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] select-none font-mono text-sm font-bold text-syntax-green opacity-0 transition-opacity duration-150"
        aria-hidden
        style={{ textShadow: '0 0 10px rgba(61,255,154,0.5)' }}
      >
        &gt;_
      </div>
    </>
  );
}
