# B1: Design System & Base Components

**Plan:** Frontend
**Depends on:** A1-setup-data-layer (tokens and types must exist)
**Verify before starting:** `npm run dev` works, Tailwind tokens configured, Vitest running
**BRs covered:** BR-010, BR-015, BR-025, BR-028
**Estimated tasks:** 6

---

## Tasks

### B1.1: Base Layout, Nav & Footer

**Type:** layout
**Files:**
- `src/app/layout.tsx` — modify: fonts, metadata, canonical, JSON-LD, OG tags
- `src/app/page.tsx` — modify: home shell with section anchors
- `src/components/layout/nav.tsx` — create: sticky navigation
- `src/components/layout/footer.tsx` — create: footer

**Implementation:**
Root layout: Geist + Geist Mono via next/font, `<html className="dark">`, canonical URL, JSON-LD Person schema from A2.5, OG metadata from A2.5, geo-modified meta description. Page.tsx: single-page with section IDs. Nav: sticky, bg-base/80 + backdrop-blur, monogram left, section links + GitHub/LinkedIn icons right. Active section via IntersectionObserver. Mobile: hamburger → slide-in overlay with bottom nav. Footer: "Built with Next.js · Deployed on Vercel" + Lighthouse badge placeholder.

**AC:**
- [ ] Fonts load (Geist body, Geist Mono code)
- [ ] Nav is sticky with backdrop-blur, active section highlighted
- [ ] Mobile hamburger works, bottom nav is thumb-reachable
- [ ] Smooth scroll to section anchors
- [ ] JSON-LD and OG tags in page source
- [ ] Works at 375px, 768px, 1440px

---

### B1.2: Button, Badge & Tag Components

**Type:** components
**Files:**
- `src/components/ui/button.tsx` — create: 3 variants
- `src/components/ui/badge.tsx` — create: status/framework/claude-assisted variants
- `src/components/ui/tag.tsx` — create: tech stack tag
- `src/components/ui/__tests__/button.test.tsx` — create: RTL tests

**Implementation:**
Button: primary (accent fill), secondary (outline), ghost. Hover: scale(0.97), focus: 2px accent ring, disabled state. All use `<button>` or `<a>`. Badge: pill-shaped with syntax-palette colors. "Claude-assisted" badge in syntax-pink. Tag: compact for stack lists. RTL test: renders all variants, click fires handler, disabled prevents click.

**AC:**
- [ ] 3 button variants with hover/focus/disabled states
- [ ] Touch targets >= 44px on mobile
- [ ] All use semantic HTML elements
- [ ] RTL tests pass for button component

---

### B1.3: Card Component with Corner-Cut Aesthetic

**Type:** components
**Files:**
- `src/components/ui/card.tsx` — create: base card
- `src/components/ui/skeleton.tsx` — create: skeleton loaders
- `src/components/ui/__tests__/card.test.tsx` — create: RTL tests

**Implementation:**
Card: bg-surface, border-subtle, CSS `clip-path` for 8px diagonal cut at top-right. Hover: border glow + translateY(-4px) + shadow. Use `motion-safe:` for transitions. Skeleton: shimmer variants (card, text, image). RTL test: renders children, applies correct classes.

**AC:**
- [ ] Corner-cut aesthetic via clip-path
- [ ] Hover lift with glow (motion-safe only)
- [ ] Skeleton shimmer works
- [ ] Reduced-motion: no shimmer, instant states
- [ ] RTL tests pass

---

### B1.4: Section Container, Heading & CodeText

**Type:** components
**Files:**
- `src/components/ui/section.tsx` — create: section wrapper
- `src/components/ui/heading.tsx` — create: `// LABEL` style heading
- `src/components/ui/code-text.tsx` — create: inline monospace accent

**Implementation:**
Section: max-w-[1200px], centered, py-24 desktop / py-16 mobile. Heading: label in uppercase tracking-widest text-secondary with `//` prefix, then main heading. CodeText: `<code>` with font-mono, text-accent, bg-elevated/50 padding.

**AC:**
- [ ] Sections have consistent max-width and padding
- [ ] `// PROJECTS` label style renders correctly
- [ ] CodeText inline accent works

---

### B1.5: Grid Background & Custom Cursor

**Type:** effects
**Files:**
- `src/components/effects/grid-background.tsx` — create: CSS grid overlay
- `src/components/effects/custom-cursor.tsx` — create: cursor follower (desktop)

**Implementation:**
Grid: CSS `background-image: linear-gradient()` creating 1px lines at 3% white opacity, 64px spacing. z-index 0, pointer-events none. Cursor: client component, `next/dynamic` ssr:false. 8px dot + 32px ring (border-accent 30% opacity). CSS transform driven by mousemove. Only on `@media (hover: hover)`. Spring: ring follows with 100ms CSS transition.

**AC:**
- [ ] Grid visible on dark background, doesn't interfere with text
- [ ] Custom cursor on desktop hover devices only
- [ ] No cursor on mobile/touch
- [ ] Zero layout shift (position: fixed, pointer-events: none)

---

### B1.6: Scroll Reveal Wrapper

**Type:** animation
**Files:**
- `src/components/effects/scroll-reveal.tsx` — create: reusable entrance wrapper

**Implementation:**
Framer Motion wrapper using LazyMotion + domAnimation feature bundle (~18KB). `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `duration: 0.4`, `ease: "easeOut"`. Trigger at 80% viewport via `useInView({ once: true })`. Applied to non-hero sections. Reduced-motion: opacity fade only, no y movement. CSS `.will-animate { opacity: 0; transform: translateY(20px) }` class pre-applied to prevent CLS on hydration.

**AC:**
- [ ] Elements fade-slide on first scroll into view
- [ ] Fires once, not re-triggered
- [ ] Reduced-motion: opacity only, no movement
- [ ] `.will-animate` CSS prevents CLS before JS hydrates
- [ ] LazyMotion bundle is ~18KB (not full 31KB)

---

## Phase Checklist

- [ ] All 6 tasks implemented
- [ ] Design system tokens applied consistently
- [ ] All components responsive at 375/768/1440
- [ ] Keyboard nav works for interactive elements
- [ ] prefers-reduced-motion respected
- [ ] RTL component tests pass
- [ ] axe-core quick check: zero critical violations
- [ ] Ready for B2-hero
