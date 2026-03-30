# B3: Projects Section, Filters, Cards & Project Pages

**Plan:** Frontend
**Depends on:** B2-hero-section
**Verify before starting:** Hero renders, Framer Motion LazyMotion loaded
**BRs covered:** BR-002, BR-003, BR-004, BR-016, BR-026, BR-027
**Estimated tasks:** 6

---

## Tasks

### B3.1: Framework Filter Tabs with URL State

**Type:** component
**Files:**
- `src/components/sections/projects.tsx` — create: projects section
- `src/components/ui/filter-tabs.tsx` — create: filter bar
- `src/components/ui/__tests__/filter-tabs.test.tsx` — create: RTL test

**Implementation:**
Filter tabs: "All (N)", "Laravel (N)", "Next.js (N)", "NestJS (N)", "React (N)". Use `useState` + `useSearchParams` (native Next.js, no nuqs). Active filter updates URL via `router.replace()` with shallow routing. Active: accent bg + white text. Inactive: bg-surface + text-secondary. ARIA: `role="tablist"`, `role="tab"`, `aria-selected`. Staggered card re-entrance on filter via Framer Motion `AnimatePresence` + `staggerChildren: 0.08`. RTL test: filter click updates active state, correct count renders.

**AC:**
- [ ] Filter tabs show correct project counts
- [ ] URL updates on filter change (`?framework=nextjs`)
- [ ] Pasting filtered URL loads correct state
- [ ] Back button restores previous filter
- [ ] ARIA roles correct for accessibility
- [ ] Staggered card entrance on filter change (motion-safe)
- [ ] Mobile: horizontal scroll for tabs
- [ ] RTL tests pass

---

### B3.2: Project Card with Outcome Metrics

**Type:** component
**Files:**
- `src/components/ui/project-card.tsx` — create: card
- `src/components/ui/__tests__/project-card.test.tsx` — create: RTL test

**Implementation:**
Corner-cut card from B1.3. Layout: screenshot (next/image, WebP, lazy, blur placeholder), outcome metric in large text-accent font-mono (e.g., "60% faster"), project name (text-lg), problem statement (text-sm text-secondary, 2 lines max), stack tags, "Claude-assisted" badge where applicable, "View Code →" (GitHub link, target _blank) + "Demo" if available. RTL test: renders name, tags, GitHub link.

**AC:**
- [ ] Outcome metric prominently displayed in large monospace
- [ ] Screenshot lazy-loads with blur-up
- [ ] GitHub link opens in new tab
- [ ] Claude-assisted badge appears where flagged
- [ ] Mobile: full-width cards
- [ ] Loading: skeleton card matches dimensions
- [ ] RTL test passes

---

### B3.3: Code-Diff Card Flip (CSS 3D)

**Type:** interaction
**Files:**
- `src/components/ui/card-flip.tsx` — create: flip wrapper

**Implementation:**
CSS-only 3D flip on hover: `rotateY(180deg)` over 500ms ease-inout. Back face: 10-15 lines of real code diff from P0.3 data styled as git diff (green additions with syntax-green bg, red deletions). Monospace, line numbers in text-muted. "View Full Repo →" link on back. `backface-visibility: hidden`. Touch: tap toggles. Reduced-motion: crossfade (opacity swap), no 3D transform.

**AC:**
- [ ] Hover triggers smooth 3D flip on desktop
- [ ] Back shows real code diff with syntax colors
- [ ] Tap toggles on touch devices
- [ ] Reduced-motion: instant crossfade
- [ ] Flip resets on cursor leave

---

### B3.4: Featured Project Highlight

**Type:** component
**Files:**
- `src/components/sections/projects.tsx` — modify: featured logic

**Implementation:**
Projects with `featured: true` render as wider card (2-col span on desktop) at top of grid with accent border-left (4px). Expanded: larger screenshot, full description, outcome metric as hero number. Max 1-2 featured. Empty state: "No projects match this filter" with reset button when filter returns zero.

**AC:**
- [ ] Featured project spans full width with accent border
- [ ] Featured has larger screenshot + full description
- [ ] Empty state renders with filter reset CTA
- [ ] Mobile: featured has accent border only (full-width like others)

---

### B3.5: Individual Project Pages (/projects/[slug])

**Type:** page
**Files:**
- `src/app/projects/[slug]/page.tsx` — create: dynamic project page
- `src/app/projects/[slug]/layout.tsx` — create: project page layout

**Implementation:**
SSG via `generateStaticParams()` from projects data. Each page: project name as h1, full description, outcome metric, tech stack, screenshots, code sample highlight, architecture diagram (SVG from public/diagrams/ if available with alt text), link back to all projects. SEO: unique `<title>` ("Project Name — Jerome's Portfolio"), unique OG metadata per project (from A2.5), BreadcrumbList JSON-LD (Home > Projects > Project Name). Canonical URL set to production domain.

**AC:**
- [ ] `/projects/[project-slug]` renders for each project
- [ ] Unique title, meta description, OG tags per project
- [ ] BreadcrumbList JSON-LD validates
- [ ] "Back to all projects" link works
- [ ] Architecture diagram renders with alt text (where available)
- [ ] Generated statically at build time

---

### B3.6: Architecture Diagrams

**Type:** content + component
**Files:**
- `public/diagrams/` — create: SVG diagrams for featured projects
- `src/components/ui/diagram-viewer.tsx` — create: expandable viewer

**Implementation:**
Create SVG architecture diagrams for 2+ featured projects using design token colors. Viewer: inline display, click opens lightbox modal. Lightbox: keyboard-dismissible (Escape), dark overlay. Diagrams have descriptive alt text. Mobile: scale to viewport width.

**AC:**
- [ ] 2+ project diagrams in SVG format
- [ ] Diagrams use portfolio design token colors
- [ ] Lightbox opens on click, closes on Escape
- [ ] Alt text describes system architecture
- [ ] Mobile: diagrams scale to fit

---

## Phase Checklist

- [ ] All 6 tasks implemented
- [ ] Framework filter updates URL, cards re-animate
- [ ] Code-diff flip works with reduced-motion fallback
- [ ] Individual project pages generate statically
- [ ] OG metadata unique per project page
- [ ] RTL tests pass
- [ ] axe-core quick check: zero critical violations
- [ ] Ready for B4-workflow-experience
