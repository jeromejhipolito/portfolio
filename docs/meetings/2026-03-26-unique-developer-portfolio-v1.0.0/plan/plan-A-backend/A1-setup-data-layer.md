# A1: Project Setup & Data Layer

**Plan:** Backend / Data Layer
**Depends on:** P0-content-and-metrics (all copy must be written)
**Verify before starting:** `docs/content/` folder has all copy files reviewed
**BRs covered:** BR-002, BR-012, BR-014, BR-015
**Estimated tasks:** 6

---

## Tasks

### A1.1: Scaffold Next.js Project on Vercel

**Type:** scaffolding
**Files:**
- `portfolio/` — create: Next.js 14+ App Router project
- `portfolio/package.json` — create: dependencies
- `portfolio/vercel.json` — create: Vercel config

**Implementation:**
`npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`. Set `"engines": { "node": ">=20" }`. Initialize git, connect to GitHub, connect to Vercel. Add `<link rel="canonical" href="https://[production-domain]">` in root layout. Configure vercel.json: `X-Robots-Tag: noindex` on preview deployments. Lock Vercel as deployment target (not Cloudflare).

**AC:**
- [ ] `npm run dev` starts without errors
- [ ] GitHub repo connected to Vercel
- [ ] Preview deploys have `X-Robots-Tag: noindex`
- [ ] Canonical URL set to production domain

---

### A1.2: Define TypeScript Data Interfaces

**Type:** types
**Files:**
- `src/types/portfolio.ts` — create: all data interfaces

**Implementation:**
Define from BR-002: `Project` (slug, name, problem, solution, impact, framework: FrameworkType, techStack, githubUrl, demoUrl?, demoVideo?, screenshot, testCount?, lighthouseScore?, outcomeMetric, featured, order, claudeAssisted), `FrameworkType` union ('laravel'|'nextjs'|'nestjs'|'react'|'other'), `WorkExperience` (company, role, startDate, endDate?, responsibilities, techStack, outcomeMetric), `WorkflowStep` (number, title, shortTitle, description, tools, output, demoVideo?, quote), `ExpertiseItem` (title, plainDescription, technicalDeepDive, relatedProject?, icon), `SiteConfig` (name, title, tagline, subtitle, proofMetrics, socialLinks, availability, metaDescription).

**AC:**
- [ ] All 6 interfaces/types defined and exported
- [ ] TypeScript strict compilation passes
- [ ] No `any` types used

---

### A1.3: Populate Data Files from P0 Content

**Type:** data
**Files:**
- `src/data/projects.ts` — create: project entries from P0.3
- `src/data/experience.ts` — create: work history
- `src/data/workflow.ts` — create: 4 workflow steps from P0.4
- `src/data/expertise.ts` — create: expertise items from P0.4
- `src/data/site-config.ts` — create: global config from P0.2
- `src/data/code-diffs.ts` — create: code diff content from P0.3

**Implementation:**
Copy content from `docs/content/` into typed data files. Each file exports typed arrays/objects matching A1.2 interfaces. This is a transcription task — all creative writing was done in P0.

**AC:**
- [ ] All data files import and use correct types
- [ ] Content matches P0 documents exactly
- [ ] TypeScript compilation passes
- [ ] At least 6 projects across 3+ frameworks

---

### A1.4: Configure Tailwind with Design Tokens

**Type:** config
**Files:**
- `tailwind.config.ts` — modify: custom theme tokens
- `src/styles/globals.css` — modify: CSS custom properties + font imports

**Implementation:**
Colors from review-v1: bg-base (#0A0E1A), bg-surface (#0F1524), bg-elevated (#161D30), accent (#00D9FF), syntax-green (#3DFF9A), syntax-purple (#BD93F9), syntax-orange (#FFB86C), syntax-pink (#FF79C6). Typography: Geist + Geist Mono via `next/font/google`. Spacing: 4px base. Motion tokens: instant (50ms), fast (150ms), normal (300ms), slow (500ms). Add `motion-safe:` variant. Add `font-display: swap` with fallback metrics to prevent CLS.

**AC:**
- [ ] `bg-base`, `text-accent`, `font-mono` Tailwind classes work
- [ ] CSS custom properties accessible via `var(--color-accent)`
- [ ] Geist fonts load with swap and system fallback
- [ ] `motion-safe:` variant works correctly

---

### A1.5: ESLint + Prettier + Vitest Setup

**Type:** config
**Files:**
- `tsconfig.json` — modify: strict mode
- `.eslintrc.json` — modify: strict rules
- `.prettierrc` — create: formatting config
- `vitest.config.ts` — create: test runner config
- `src/lib/utils.ts` — create: cn() utility
- `src/lib/__tests__/utils.test.ts` — create: first unit test

**Implementation:**
Enable `"strict": true`. ESLint: no-unused-vars (error), no-explicit-any (error). Prettier: singleQuote, trailingComma all. Install Vitest + @testing-library/react. Create cn() utility using clsx + tailwind-merge. Write first unit test for cn() to verify test pipeline works.

**AC:**
- [ ] `npm run lint` passes with zero warnings
- [ ] `npx tsc --noEmit` passes in strict mode
- [ ] `npm run test` runs Vitest and passes
- [ ] cn() utility works and is tested

---

### A1.6: GitHub Actions CI Pipeline

**Type:** CI/CD
**Files:**
- `.github/workflows/ci.yml` — create: CI pipeline

**Implementation:**
Pipeline on push/PR: checkout → cache → install → lint → typecheck → test (Vitest) → build. Add placeholders for Lighthouse CI and broken-link-checker (configured in C2). Cache node_modules. Add CI status badge to README.

**AC:**
- [ ] Pipeline runs on push and PR
- [ ] All 5 steps (lint, typecheck, test, build) pass
- [ ] Completes in under 3 minutes
- [ ] Status badge visible in README

---

## Phase Checklist

- [ ] All 6 tasks implemented
- [ ] `npm run dev` serves the app
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] Design tokens work in Tailwind and CSS variables
- [ ] Data files populated from P0 content
- [ ] CI pipeline runs and passes
- [ ] Ready for A2 and B1
