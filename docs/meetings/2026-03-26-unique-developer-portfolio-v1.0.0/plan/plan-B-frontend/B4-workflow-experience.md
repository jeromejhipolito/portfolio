# B4: Workflow Showcase & Experience Sections

**Plan:** Frontend
**Depends on:** B3-projects-section
**Verify before starting:** Projects section renders with filters and project pages
**BRs covered:** BR-005, BR-006, BR-007, BR-008, BR-019, BR-020, BR-021, BR-027
**Estimated tasks:** 6

---

## Tasks

### B4.1: Workflow Timeline Layout

**Type:** page section
**Files:**
- `src/components/sections/workflow.tsx` — create: workflow section
- `src/components/ui/workflow-step.tsx` — create: step component

**Implementation:**
Section: "// HOW I BUILD" heading. 4 steps: horizontal on desktop (circles connected by SVG line), vertical on mobile. Each: numbered circle (01-04), short title ("PLAN","BUILD","QA","SHIP"), expandable detail. Click step → expand/collapse detail panel. Default: step 1 expanded. Data from workflow.ts. ARIA: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`. Keyboard: arrow keys navigate steps.

**AC:**
- [ ] 4 steps render with circles and titles
- [ ] Click expands detail, collapses others
- [ ] Desktop: horizontal, Mobile: vertical
- [ ] ARIA roles correct, keyboard navigable
- [ ] Default: step 1 expanded

---

### B4.2: SVG Pipeline Animation (CSS + IntersectionObserver)

**Type:** animation
**Files:**
- `src/components/effects/pipeline-line.tsx` — create: animated SVG

**Implementation:**
CSS-only SVG line animation (NO GSAP). Technique: SVG `<path>` with `stroke-dasharray` and `stroke-dashoffset` equal to path length. On scroll-enter (IntersectionObserver), add CSS class that transitions `stroke-dashoffset` to 0 over 3s with `ease-out`. Each step node scales from 0→1 via CSS `@keyframes` with staggered `animation-delay` matching line progress. "Re-run" button: removes and re-adds the animation class. Reduced-motion: line and nodes appear instantly.

**AC:**
- [ ] SVG line draws itself on scroll (CSS only)
- [ ] Step nodes appear sequentially as line reaches them
- [ ] Re-run button replays animation
- [ ] Zero external dependencies (no GSAP)
- [ ] Reduced-motion: instant appearance
- [ ] Mobile: vertical line draws downward

---

### B4.3: Workflow Step Detail Panels

**Type:** component
**Files:**
- `src/components/ui/step-detail.tsx` — create: expandable content

**Implementation:**
Each step: description from P0.4 (2 sentences max), tools list with icons, output description, optional video thumbnail (lazy-loaded, opens lightbox), pull quote in italic with accent-left border. Framer Motion `AnimatePresence` for panel open/close (height: 0→auto, opacity). Step 4 (Ship): include CI pipeline SVG diagram from C3.5 and link to `.github/workflows/` on GitHub.

**AC:**
- [ ] Panels expand/collapse smoothly
- [ ] Copy matches P0.4 exactly (non-technical recruiter test passes)
- [ ] Video thumbnails lazy-load with play overlay
- [ ] Reduced-motion: instant expand/collapse
- [ ] Step 4 links to actual CI workflow file

---

### B4.4: CI Evidence Badge

**Type:** component
**Files:**
- `src/components/ui/ci-badge.tsx` — create: test count badge

**Implementation:**
"✓ All {N} tests passing [View on GitHub →]" in syntax-green. Links to GitHub Actions page. Test count from data layer. Monospace for count. Below workflow timeline. Fallback: static text if no CI URL.

**AC:**
- [ ] Badge shows test count in monospace accent
- [ ] Link opens GitHub Actions in new tab
- [ ] Graceful fallback without CI URL

---

### B4.5: Experience Timeline (Git-Log Style)

**Type:** page section
**Files:**
- `src/components/sections/experience.tsx` — create: section
- `src/components/ui/timeline-entry.tsx` — create: git-log entry
- `src/components/sections/__tests__/experience.test.tsx` — create: RTL test

**Implementation:**
Two-column desktop: left=timeline, right=expertise. Timeline as `git log --oneline`: colored dot (accent for current, muted for past), monospace date ("2024-present"), role as commit message, company in syntax-purple as branch name. One bold outcome metric per role. LinkedIn + "Download CV" links at bottom. Framer Motion: entries slide in from left on scroll. RTL test: renders entries, shows outcome metrics.

**AC:**
- [ ] Git-log style with monospace dates
- [ ] Current role: accent dot, past: muted
- [ ] One outcome metric per role (bold)
- [ ] Scroll animation (motion-safe)
- [ ] LinkedIn + CV links work
- [ ] Mobile: single column
- [ ] RTL test passes

---

### B4.6: Expertise Cards with Deep-Dive

**Type:** component
**Files:**
- `src/components/ui/expertise-card.tsx` — create: accordion card
- `src/components/ui/__tests__/expertise-card.test.tsx` — create: RTL test

**Implementation:**
4 cards: Microservices, Event Streaming, Saga, Idempotency. Each: title, plain-language description from P0.4 (visible default), "▼ Technical deep-dive" accordion with detailed explanation + honest tradeoff. Chevron rotates 180deg. Related project link if applicable. Corner-cut card aesthetic. RTL test: renders plain text, toggle expands detail.

**AC:**
- [ ] Plain-language visible by default (BR-027)
- [ ] Technical deep-dive expands on click
- [ ] Chevron rotates
- [ ] Includes one honest tradeoff per card
- [ ] Related project links correctly
- [ ] Keyboard: Enter/Space toggles
- [ ] RTL test passes

---

## Phase Checklist

- [ ] All 6 tasks implemented
- [ ] Pipeline animation plays on scroll (CSS only, no GSAP)
- [ ] Experience timeline renders git-log style
- [ ] Expertise cards expand/collapse correctly
- [ ] All copy from P0.4 (non-technical recruiter approved)
- [ ] All animations respect prefers-reduced-motion
- [ ] RTL tests pass
- [ ] axe-core quick check: zero critical violations
- [ ] Ready for B5-contact-polish
