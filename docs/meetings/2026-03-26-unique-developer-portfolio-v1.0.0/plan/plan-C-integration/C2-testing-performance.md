# C2: Testing, Performance & Cross-Browser

**Plan:** Integration
**Depends on:** C1-api-wiring
**Verify before starting:** Contact form end-to-end works, structured data validates
**BRs covered:** BR-011, BR-014, BR-020, BR-025
**Estimated tasks:** 6

---

## Tasks

### C2.1: Lighthouse CI Gate

**Type:** CI/CD
**Files:**
- `.github/workflows/ci.yml` — modify: add Lighthouse step
- `lighthouserc.js` — create: config

**Implementation:**
Install @lhci/cli. Config: assert performance >= 90, accessibility >= 90, best-practices >= 90, SEO >= 90 for both mobile and desktop. Run against production build. Fail pipeline if ANY score drops below 90. Store reports as artifacts. Document: Three.js chunk exemption is N/A (removed). Add explicit CWV budget assertions: LCP < 2.5s, CLS <= 0.05, INP <= 200ms.

**AC:**
- [ ] Lighthouse CI runs in GitHub Actions
- [ ] Pipeline fails if any score < 90
- [ ] Reports stored as downloadable artifacts
- [ ] Mobile and desktop both checked
- [ ] CWV budgets enforced (LCP, CLS, INP)

---

### C2.2: Broken Link Checker

**Type:** CI/CD
**Files:**
- `.github/workflows/ci.yml` — modify: add link checker
- `scripts/check-links.ts` — create: link validator

**Implementation:**
Build site, crawl all internal links + anchor fragments (#projects, #workflow, etc.) + external URLs (GitHub repos, LinkedIn). Validate HTTP status. Internal anchors: verify target element exists in generated HTML. Fail CI on any broken link. Skip rate-limited URLs via allow-list.

**AC:**
- [ ] Internal anchor links (#section) all resolve
- [ ] External links return valid HTTP status
- [ ] Broken links fail the pipeline
- [ ] Fragment targets validated (not just hrefs)

---

### C2.3: Lighthouse Badge in Footer

**Type:** build script
**Files:**
- `scripts/generate-badge.ts` — create: badge generator
- `src/components/layout/footer.tsx` — modify: display live score

**Implementation:**
After Lighthouse CI, extract scores from JSON report. Write to `public/metrics.json`. Footer reads at build time: "Lighthouse: 97/100" in syntax-green. Auto-updates on each deploy.

**AC:**
- [ ] metrics.json generated at build time
- [ ] Footer shows real Lighthouse score
- [ ] Score updates on each deploy

---

### C2.4: Core Web Vitals Optimization Pass

**Type:** performance
**Files:**
- Multiple — optimize as needed

**Implementation:**
Audit: (1) LCP — verify h1 is LCP element, preload hero font. (2) CLS — all images have explicit width/height via next/image, font-display: swap with fallback metrics, `.will-animate` CSS prevents hydration CLS. (3) INP — verify filter clicks respond < 200ms, no long tasks. (4) Bundle — run `@next/bundle-analyzer`, verify Framer Motion LazyMotion is ~18KB not 31KB, no unexpected large dependencies. Target: initial JS < 150KB gzipped.

**AC:**
- [ ] LCP < 2.5s on mobile (4G throttled)
- [ ] CLS < 0.05 (no layout shifts)
- [ ] INP < 200ms for all interactions
- [ ] Initial JS < 150KB gzipped
- [ ] Framer Motion uses LazyMotion (~18KB)

---

### C2.5: E2E Tests (Playwright)

**Type:** testing
**Files:**
- `tests/e2e/` — create: E2E test suite
- `playwright.config.ts` — create: config with 3 browsers

**Implementation:**
Playwright with chromium + firefox + webkit. Tests: (1) Contact form happy path (fill → submit → success). (2) Contact form validation (empty submit → errors). (3) URL filter state (apply filter → navigate → back → filter restored). (4) prefers-reduced-motion (set reduce → verify no animations). (5) Keyboard navigation (tab through entire page). (6) Project page renders (/projects/[slug] → loads with correct title). Cross-browser: all 6 tests run in all 3 engines.

**AC:**
- [ ] 6 E2E tests pass across Chrome, Firefox, Safari
- [ ] Contact form tested end-to-end
- [ ] URL state filter + back button tested
- [ ] Reduced-motion verified programmatically
- [ ] Keyboard navigation verified
- [ ] Project pages load correctly

---

### C2.6: Accessibility E2E Tests

**Type:** testing
**Files:**
- `tests/a11y/` — create: axe-core integration tests

**Implementation:**
Playwright + @axe-core/playwright. Test each page section: run `axe.run()`, assert zero critical/serious violations. Test homepage and 2+ project pages. Verify ARIA labels on icon buttons. Verify contrast ratios programmatically.

**AC:**
- [ ] axe-core: zero critical/serious violations on all pages
- [ ] Homepage + 2 project pages tested
- [ ] ARIA labels verified on icon buttons

---

## Phase Checklist

- [ ] All 6 tasks implemented
- [ ] Lighthouse >= 90 all categories, gated in CI
- [ ] Zero broken links, gated in CI
- [ ] CWV targets met (LCP < 2.5s, CLS < 0.05, INP < 200ms)
- [ ] E2E tests pass across 3 browsers
- [ ] Accessibility E2E passes
- [ ] Ready for C3-deployment
