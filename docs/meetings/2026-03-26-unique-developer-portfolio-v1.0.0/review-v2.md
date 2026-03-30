# Plan Review: Unique Developer Portfolio (v2)

| Field | Value |
|-------|-------|
| **Date** | 2026-03-26 |
| **Review Type** | Plan Review |
| **Version** | v2 (revision) |
| **Decision** | APPROVED WITH CHANGES |
| **Reviewers** | **Leadership:** CTO, COO | **Engineering:** QA, Performance Engineer | **Product:** PM, SEO Specialist, Technical Writer | **Client-Facing:** Growth Marketer |
| **Based On** | BRs from 2026-03-26 + review-v1 design specs |
| **Previous Version** | review-v1.md (design review) |
| **Feedback Addressed** | User added 6 new roles (SEO, Performance, Growth, Technical Writer, Data Analyst, AI/ML) to plugin for enhanced planning |

---

## Review Verdicts

| Role | Verdict | Key Issue | Key Contribution |
|------|---------|-----------|-----------------|
| CTO | APPROVED WITH CHANGES | nuqs is premature; lock Vercel as target; Three.js needs justification | ADR for content update workflow; explicit animation tier escalation criteria |
| PM | APPROVED WITH CHANGES | No kill criteria or success threshold defined; 5 animations is unvalidated scope | Define MLP cut line; cut to 2 signature animations for v1 |
| COO | APPROVED WITH CHANGES | Parallel path is fiction for solo dev; 3 animation libs is maintenance debt | Remove Three.js + GSAP; extract content as pre-work; 10-12 week realistic timeline |
| QA | APPROVED WITH CHANGES | Test pyramid inverted (0% unit, 0% component, 100% E2E); contact form untested | Add unit + RTL component tests; test prefers-reduced-motion; cross-browser strategy |
| SEO Specialist | APPROVED WITH CHANGES | Single-page architecture kills long-tail keyword capture entirely | Add `/projects/[slug]` pages; geo-modified keywords; canonical URL strategy |
| Performance Engineer | APPROVED WITH CHANGES | Three.js 140KB budget will be exceeded (real: 160-200KB); no CLS budget for scroll animations | Performance budget table with enforcement; VRAM ceiling; INP budget |
| Growth Marketer | APPROVED WITH CHANGES | No Open Graph metadata; no conversion event tracking beyond page views | OG tags for social sharing; Plausible custom events; UTM discipline |
| Technical Writer | APPROVED WITH CHANGES | No one assigned to write hero tagline; project descriptions have no template | Hero tagline draft + constraints; project description template; voice/tone reference |

---

## Critical Issues (Must Fix Before Execution)

| # | Issue | Severity | Source | Resolution |
|---|-------|----------|--------|------------|
| 1 | **Remove Three.js from v1 — promote CSS fallback to primary** | Critical | CTO, COO, PM, Perf Eng | The CSS radial gradient fallback is already the experience for mobile, reduced-motion, and WebGL-failure users. Make it the default. Saves 8+ hours, eliminates 140-200KB bundle, removes `unsafe-eval` from CSP. Revisit for v1.1 if analytics show desktop dwell time warrants it. |
| 2 | **Remove GSAP — use CSS `stroke-dashoffset` + IntersectionObserver** | High | COO | GSAP is used for ONE task (B4.2 SVG line-draw). CSS can do this natively. Eliminates a 23KB dependency and a third animation mental model. |
| 3 | **Add `/projects/[slug]` individual pages** | Critical | SEO | Single-page architecture means one URL for everything — zero long-tail keyword capture. Add dynamic project pages from the same data layer. This is `generateStaticParams()` + a template page — an afternoon of work with outsized SEO return. |
| 4 | **Define success metric + kill criteria before A1** | Critical | PM, Growth | Before writing code: current baseline (estimated), target (e.g., +20% recruiter response in 60 days), measurement method, and what triggers a pivot. |
| 5 | **Extract content writing as pre-work before A1.3** | Critical | Tech Writer, COO | Write ALL copy (hero tagline, project descriptions, workflow steps, expertise cards, pull quotes) as a plain-text content document BEFORE any code. Content is an input to development, not a subtask. |
| 6 | **Add Open Graph + Twitter Card metadata** | Critical | Growth | `og:title`, `og:description`, `og:image` (1200x630). Dynamic per project page. Without this, every Slack/LinkedIn share renders as a naked URL — kills viral coefficient. |
| 7 | **Fix test pyramid — add unit + component tests** | Critical | QA | Current: 0% unit / 0% component / 100% E2E. Target: 60% unit / 25% RTL component / 15% E2E. Add Vitest for utilities, RTL for components, in each B phase — not deferred to C2. |
| 8 | **Move security config to A2 (not C1)** | High | CTO | CORS, input validation (Zod), rate limiting design belong in A2 when the API is built. C1 should be wiring only, not security remediation. |
| 9 | **Add canonical URLs + noindex on preview deploys** | High | SEO | `<link rel="canonical">` on every page pointing to production domain. `X-Robots-Tag: noindex` on Vercel preview deployments. Prevents duplicate content indexing. |
| 10 | **Lock Vercel as deployment target (not "Vercel/Cloudflare")** | High | CTO | Next.js App Router on Vercel is zero-config. Cloudflare requires adapter with known compatibility gaps. Decide now, not in C3. |

---

## Plan Assessment

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| Completeness | 4.0 | 28 BRs covered (100%). SEO gap (project pages) is the main addition needed. |
| Sequencing | 4.5 | Dependency chain is correct. Security timing (A2 not C1) is the one fix. |
| Estimation | 3.0 | Parallel path is fiction for solo dev. Realistic: 10-12 weeks. 3 animation libs is over-scoped. |
| Risk | 3.0 | Three.js is highest risk/lowest value. Content writing is under-estimated. No cut list defined. |
| Testability | 2.5 | Test pyramid inverted. No unit or component tests. Contact form untested. Needs restructuring. |

---

## Agreed Changes to Plan

### Scope Cuts (save ~20 hours)
| Cut | Phase | Rationale | Replacement |
|-----|-------|-----------|-------------|
| Three.js WebGL particles | B2.5 | 8+ hours, 140-200KB, requires `unsafe-eval` in CSP | CSS radial gradient with design token colors (already the fallback) |
| GSAP ScrollTrigger | B4.2 | 23KB for one animation | CSS `stroke-dashoffset` + IntersectionObserver (zero dependencies) |
| Visual regression tests | C2.4 | Negative ROI for solo dev with no PR review | Manual screenshot baselines; add to v1.1 backlog |
| Konami code easter egg | B5.6 | Fun but zero recruiter conversion value | Defer to v1.1 |
| `nuqs` library | B3.1 | Premature for a single filter dimension | `useState` + `useSearchParams` native |

### Scope Additions
| Addition | Phase | Rationale |
|----------|-------|-----------|
| Pre-work content document (all copy) | Before A1 | Content is input to development, not a subtask |
| `/projects/[slug]` dynamic pages | B3 (new B3.5) | SEO long-tail keyword capture; uses same data layer |
| Open Graph + Twitter Card metadata | A2 or B1 | Social sharing is critical conversion channel |
| Unit tests (Vitest) per phase | Each A/B phase | Fix inverted test pyramid |
| RTL component tests per phase | Each B phase | Middle layer of test pyramid |
| Canonical URLs + noindex on previews | A1 (config) | Prevent duplicate content indexing |
| Plausible custom events | C3.4 (expand) | Contact submit, LinkedIn click, GitHub click tracking |
| Content review checkpoint | End of each B phase | Enforce BR-027 (plain-language pairing) |
| Geo-modified keywords in meta | B2.2 (hero) | "Senior Full Stack Developer Philippines" in title tag |

### Revised Animation Stack (2 tiers, not 4)
| Tier | Technology | Use |
|------|-----------|-----|
| Tier 1 | CSS only | All entrances, hovers, transitions, typing effect, glitch, marquee, SVG line-draw |
| Tier 2 | Framer Motion (~18KB with LazyMotion) | Scroll-reveal, staggered cards, AnimatePresence for filter changes |

### Revised Dependency Graph
```
[Pre-work: Content document] → A1 → A2 ──────────────────────╮
                               A1 → B1 → B2 → B3 → B4 → B5 ─╯→ C1 → C2 → C3 (LAUNCH)

Sequential for solo developer. Estimated: 10-12 weeks at 4h/day focused.
```

### Revised Delivery Tiers (Cut List)
| Tier | Phases | Description | Ship? |
|------|--------|-------------|-------|
| **MLP (Minimum Lovable Product)** | A1, B1, B2, B3.1-B3.2, B5.1, C1.1, C1.3, C3.1 | Hero + Projects + Contact on production domain with security headers | Ship if time runs out |
| **v1 Full** | All phases with cuts applied | Complete 5-section portfolio with 2-tier animations, testing, analytics | Target |
| **v1.1** | Three.js, GSAP, visual regression, easter egg, advanced filtering, blog | Enhancement layer based on analytics data | Post-launch, data-driven |

---

## Tensions Resolved

| Tension | Side A | Side B | Resolution |
|---------|--------|--------|------------|
| Wow-factor animations vs. solo dev scope | PM/UX want 5 signature animations | COO says 3 animation libs is maintenance debt | **2-tier stack (CSS + Framer Motion only). 3 of 5 signature animations stay (typing, glitch, code-diff flip). Pipeline line-draw moves to CSS. Particle field deferred.** |
| Single-page elegance vs. SEO discoverability | Frontend/UX prefer single-scroll | SEO says one URL = zero long-tail capture | **Keep single-page as homepage AND add `/projects/[slug]` pages. Both experiences coexist.** |
| Polish everything vs. ship fast | Technical Writer wants copy review gates | COO wants a cut list and realistic timeline | **Content pre-work document solves both — copy is reviewed before code starts, no delays during implementation.** |
| Comprehensive testing vs. solo dev ROI | QA wants full pyramid | COO says visual regression has negative ROI | **Unit + component tests YES (cheap, fast feedback). Visual regression NO for v1 (expensive, low signal for solo dev).** |

---

## Recommended Next Steps

1. **Write the content document first** — hero tagline, all project descriptions (using Tech Writer's template), workflow step copy, expertise card texts. This is the highest-leverage pre-work.
2. **Define success metric** — baseline, target, measurement method, 60-day review gate.
3. **Apply the scope cuts** — remove Three.js, GSAP, visual regression, Konami code, nuqs from phase files. Add project pages, OG metadata, unit/component tests, canonical URLs.
4. **Begin execution at A1** — with content document complete and success metric defined.

---

File written:
  `docs/meetings/2026-03-26-unique-developer-portfolio/review-v2.md`

Version history:
  v1: APPROVED WITH CHANGES — 2026-03-26 (design refinement)
  v2: APPROVED WITH CHANGES — 2026-03-26 (plan review) ← current
