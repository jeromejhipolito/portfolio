# B2: Hero Section & Landing Experience

**Plan:** Frontend
**Depends on:** B1-design-system
**Verify before starting:** Nav renders, design tokens work, scroll-reveal works
**BRs covered:** BR-001, BR-005, BR-007, BR-011, BR-015
**Estimated tasks:** 5

---

## Tasks

### B2.1: Terminal Typing Effect (CSS-Only)

**Type:** animation
**Files:**
- `src/components/effects/typing-effect.tsx` — create: CSS typing animation

**Implementation:**
Pure CSS typing for hero text. `overflow: hidden`, `white-space: nowrap`, `border-right: 2px solid var(--color-accent)` (cursor), `@keyframes typing { from { width: 0 } to { width: 100% } }`, `@keyframes blink { 50% { border-color: transparent } }`. Multi-line stagger: line 1 at 0s, line 2 at 0.8s, line 3 at 1.6s via `animation-delay`. The `<h1>` contains static text for SSR/LCP — animation is enhancement. Reduced-motion: text visible immediately, no typing.

**AC:**
- [ ] Text types character-by-character with cursor blink
- [ ] Multi-line stagger works
- [ ] `<h1>` is server-rendered static text (LCP element)
- [ ] prefers-reduced-motion: instant appearance
- [ ] Total animation < 2.5 seconds
- [ ] Zero JS cost (CSS only)

---

### B2.2: Hero Section Layout with P0 Copy

**Type:** page section
**Files:**
- `src/components/sections/hero.tsx` — create: hero section
- `src/components/sections/__tests__/hero.test.tsx` — create: RTL test

**Implementation:**
Full-viewport hero with grid-background. z-index 1 content above background. Name (text-5xl/6xl, font-display, tracking-tight) from site-config. Title "Senior Full Stack Developer · Philippines" (text-xl, text-secondary). Tagline from P0.2 with CodeText spans on technical terms. Two CTAs: "See what I've shipped →" (primary, scrolls to #projects), "How I build" (secondary, scrolls to #workflow). Availability badge: pulsing green dot + "Open to senior roles" (text-sm). Background: CSS radial gradient using accent + syntax-green at very low opacity (5-8%) — clean, performant, no Three.js.

**AC:**
- [ ] Name is largest element, server-rendered h1
- [ ] Tagline uses CodeText for technical terms
- [ ] Copy matches P0.2 exactly
- [ ] CTAs smooth-scroll to correct sections
- [ ] CSS gradient background uses token colors
- [ ] Mobile: text-3xl, CTAs stack vertically
- [ ] RTL test: renders name, title, CTAs

---

### B2.3: Proof Bar with Count-Up

**Type:** component
**Files:**
- `src/components/sections/proof-bar.tsx` — create: metrics bar

**Implementation:**
Horizontal bar below hero (bg-surface, border-subtle top/bottom). 6 metrics from P0.2 in grid: large number in font-mono text-accent, label in text-xs text-secondary. Count-up on scroll into view via Framer Motion `useMotionValue` + `useTransform` (reuses LazyMotion from B1.6). Mobile: 2x3 grid. Reduced-motion: numbers appear at final value instantly.

**AC:**
- [ ] 6 metrics in monospace accent
- [ ] Count-up triggers once on scroll
- [ ] Reduced-motion: instant final values
- [ ] Mobile: 2-column grid, readable at 375px

---

### B2.4: Tech Badges Marquee (CSS-Only)

**Type:** component
**Files:**
- `src/components/sections/tech-marquee.tsx` — create: scrolling badges

**Implementation:**
CSS-only marquee: duplicate list, `@keyframes scroll { to { transform: translateX(-50%) } }`, `animation: scroll 30s linear infinite`. Pause on hover. Edge gradient masks. Badges: tier system from End User feedback — Primary (expert, 4 max), Secondary (proficient, 4 max), Tooling (familiar, 4 max). Group labels visible. Reduced-motion: static wrap.

**AC:**
- [ ] Badges scroll smoothly, loop seamlessly
- [ ] Pauses on hover
- [ ] Grouped by proficiency tier (Primary/Secondary/Tooling)
- [ ] Reduced-motion: static display
- [ ] CSS-only, zero JS

---

### B2.5: Ambient Build-Log Background (CSS-Only)

**Type:** effect
**Files:**
- `src/components/effects/build-log.tsx` — create: scrolling text overlay

**Implementation:**
CSS scrolling monospace text at 5-8% opacity behind hero. Content: real git commit messages, CLI commands (pre-populated strings). CSS `overflow: hidden`, `@keyframes scroll-up`, masked top/bottom with CSS gradient. z-index between grid and content. pointer-events: none. Reduced-motion: static, no scroll.

**AC:**
- [ ] Text scrolls upward at barely-visible opacity
- [ ] Content is semantically authentic (real git messages)
- [ ] Edges fade via CSS mask
- [ ] Reduced-motion: static snapshot
- [ ] Does not interfere with hero text readability
- [ ] CSS-only, zero JS

---

## Phase Checklist

- [ ] All 5 tasks implemented
- [ ] Hero LCP < 2.5s (h1 is server-rendered, no JS blocking)
- [ ] All effects are CSS-only (typing, marquee, build-log, gradient)
- [ ] Only JS: Framer Motion for proof bar count-up (already loaded)
- [ ] All effects degrade under reduced-motion
- [ ] Mobile hero is clean and performant
- [ ] RTL test passes
- [ ] axe-core quick check: zero critical violations
- [ ] Ready for B3-projects
