# B5: Contact Section, Glitch Effect & Final Polish

**Plan:** Frontend
**Depends on:** B4-workflow-experience
**Verify before starting:** All 4 content sections render correctly
**BRs covered:** BR-009, BR-018, BR-025, BR-028
**Estimated tasks:** 5

---

## Tasks

### B5.1: Contact Form with Inline Validation

**Type:** page section
**Files:**
- `src/components/sections/contact.tsx` — create: contact section
- `src/components/ui/form-field.tsx` — create: validated input
- `src/components/sections/__tests__/contact.test.tsx` — create: RTL test

**Implementation:**
Two-column: left=form, right=social links + location. Fields: Name (text), Email (email), Subject (select: 4 options from A2.1), Message (textarea 10-2000 chars). Hidden honeypot field. Inline validation on blur: green border valid, red + error text invalid. Submit: "Start a Conversation →" (outcome-oriented CTA from Growth review). States: default, validating, submitting (spinner), success ("Got it — I'll reply within 48 hours"), error (retry), rate-limited (cooldown + LinkedIn fallback). Social: GitHub, LinkedIn icons. Location: "Philippines". Header: "// LET'S CONNECT" + availability. RTL test: validates empty submit shows errors, valid submit calls handler.

**AC:**
- [ ] All fields validate on blur with inline messages
- [ ] Honeypot field hidden from visual users
- [ ] Success: personalized confirmation message
- [ ] Rate limit: cooldown timer + LinkedIn fallback URL
- [ ] Mobile: single column, socials below form
- [ ] RTL test: empty submit → errors, valid submit → handler called

---

### B5.2: Name Glitch Effect (CSS-Only)

**Type:** animation
**Files:**
- `src/components/effects/glitch-effect.tsx` — create: periodic glitch

**Implementation:**
CSS pseudo-elements (`::before`, `::after`) with `clip-path` slicing + offset in accent-cyan and syntax-pink. 3-frame effect, 150ms total. Triggered by CSS class toggle via `setInterval` every 8-12s (randomized). Reduced-motion: disabled entirely. No layout shift (transform only).

**AC:**
- [ ] Glitch fires every 8-12s (randomized)
- [ ] 150ms duration, 3-frame effect
- [ ] Uses accent + syntax-pink layers
- [ ] Reduced-motion: no glitch
- [ ] No layout shift

---

### B5.3: Service Worker for Offline Caching

**Type:** PWA
**Files:**
- `public/sw.js` — create: service worker
- `src/app/layout.tsx` — modify: register SW

**Implementation:**
Cache-first for static assets (CSS, JS, fonts, images), network-first for API. Cache name includes build hash. Precache app shell on install. Register in layout via `useEffect`. Offline: cached content for return visits.

**AC:**
- [ ] SW registers on first visit
- [ ] Return visit loads from cache < 500ms
- [ ] Cache updates on new deploy
- [ ] Static assets served offline

---

### B5.4: Accessibility Final Audit

**Type:** audit
**Files:**
- Multiple — fix issues across all sections

**Implementation:**
Full-page axe-core audit (building on per-phase quick checks). Verify: logical tab order (nav → hero CTAs → projects → workflow → experience → contact), focus visible (2px accent ring) on all interactive elements, ARIA labels on icon buttons (GitHub, LinkedIn, hamburger), alt text on all images, aria-expanded on accordions, role="tablist/tab/tabpanel" on workflow + filter tabs, skip-to-content link. Color contrast: all combinations meet WCAG AA (4.5:1 normal, 3:1 large).

**AC:**
- [ ] axe-core: zero critical/serious violations
- [ ] Tab order correct through entire page
- [ ] Skip-to-content link works
- [ ] All images have descriptive alt text
- [ ] All icon buttons have ARIA labels
- [ ] Contrast verified for all text combinations

---

### B5.5: "Last Updated" Signal & Changelog

**Type:** component
**Files:**
- `src/components/layout/footer.tsx` — modify: add last-updated
- `src/data/changelog.ts` — create: recent updates list

**Implementation:**
Footer addition: "Last updated: March 2026" (from build-time git date or manual data). Optional mini-changelog above fold on return visits: "New: Added ML pipeline project, March 2026". Signals to bookmarking recruiters that the portfolio is actively maintained. Data from changelog.ts.

**AC:**
- [ ] "Last updated" visible in footer
- [ ] Date auto-updates on deploy (or manually maintained)
- [ ] Changelog entries render if present

---

## Phase Checklist

- [ ] All 5 tasks implemented
- [ ] Contact form validates and shows all states
- [ ] Glitch effect fires periodically (motion-safe)
- [ ] Service worker caches for offline
- [ ] Accessibility audit passes (axe-core zero critical)
- [ ] Last-updated signal visible
- [ ] RTL tests pass
- [ ] Ready for C1 integration
