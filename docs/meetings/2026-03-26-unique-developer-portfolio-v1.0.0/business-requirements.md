# Business Requirements: Unique Developer Portfolio Website

**Date:** 2026-03-26
**Status:** APPROVED WITH CONDITIONS
**Source:** Company Perspective Review (`/smart:company`)

---

## MUST Have (v1 — Launch Blockers)

| ID | Requirement | Source | Owner | Acceptance Criteria |
|----|------------|--------|-------|-------------------|
| BR-001 | Hero section with single primary message, name, role title, and one-line differentiator visible within 3 seconds of page load | UX, End User, Sales, CS | Developer | 5-second test: 5 non-technical users can identify the developer's role and unique value proposition without scrolling |
| BR-002 | Typed data layer with TypeScript interfaces for Project, FrameworkGroup, WorkExperience, WorkflowStep | CTO, Frontend | Developer | Adding a new project requires only a data file entry, zero component changes; TypeScript compilation passes |
| BR-003 | Projects organized by framework (Laravel, Next.js, NestJS, etc.) with filterable tabs/navigation | PM, End User, Enterprise | Developer | Each framework section displays project cards with title, description, tech stack, and GitHub repo link |
| BR-004 | GitHub repository links for each project, opening in new tab | End User, Enterprise, Power User | Developer | Every project card has a visible, working GitHub link; broken-link CI check passes on every deploy |
| BR-005 | Professional info section: LinkedIn link, GitHub profile link, work history timeline, current role (Senior Full Stack Developer) | End User, Account Manager, Sales | Developer | All links resolve correctly; work history includes company name, role, duration, and key responsibilities |
| BR-006 | AI-assisted workflow showcase section: step-by-step visualization of Smart Workflows process (Plan → Execute → QA → E2E) | Sales, CEO, CS | Developer | Each step includes: step name, description of what happens, tools used, and output produced; accessible via keyboard |
| BR-007 | One-person-team efficiency narrative section highlighting breadth: architecture, version control, backend, frontend, design, CI/CD, testing | Sales, CEO, End User | Developer | Section visible without deep navigation; includes quantifiable claims (e.g., "500+ E2E test cases") with links to evidence |
| BR-008 | Architecture expertise section: microservices, AMQP/Kafka, Saga pattern, idempotency, custom packages | Enterprise, Backend, CTO | Developer | Each concept includes: plain-language explanation + technical depth expandable on click; paired with a real project example |
| BR-009 | Contact mechanism with rate-limited form — no raw email address in HTML | Security, Support | Developer | Contact form submits successfully; rate limited to max 5 submissions per IP per hour; email not visible in page source |
| BR-010 | Responsive design: fully functional at 375px (mobile), 768px (tablet), 1440px (desktop) | Mobile, UX, Frontend | Developer | Lighthouse mobile score >= 90; touch targets >= 44px; no horizontal scroll at any breakpoint |
| BR-011 | Core Web Vitals passing: LCP < 2.5s, INP < 200ms, CLS < 0.1 | Frontend, CTO, Mobile | Developer | Lighthouse performance score >= 90 on both mobile and desktop; measured on production URL |
| BR-012 | Static site generation (SSG) with Next.js App Router deployed on Vercel or Cloudflare Pages | CTO, DevOps, Frontend | Developer | Zero-downtime deploys; preview URLs per PR; production builds complete in under 2 minutes |
| BR-013 | Security headers: CSP (no unsafe-inline), HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy | Security | Developer | SecurityHeaders.com grade of A or A+ on production URL |
| BR-014 | GitHub Actions CI/CD pipeline with Lighthouse CI gate, broken-link checker, and build verification | DevOps, QA | Developer | Pipeline runs on every PR; blocks merge if Lighthouse score < 90 or any internal link is broken |
| BR-015 | Unique visual identity — no third-party UI template library (no purchased themes); custom design tokens | UX, CEO, Sales | Developer | Zero imported UI template packages in package.json; design tokens defined in a single source file |
| BR-016 | URL state management for framework filters — all filtered views are bookmarkable and shareable | Frontend, Power User | Developer | URL updates when filters change; pasting a filtered URL loads the correct filtered view; back button works |
| BR-017 | NDA/IP clearance for every displayed project | Legal | Developer | Written confirmation (email, contract clause, or explicit permission) documented for each project before launch |

## SHOULD Have (v1 — Ship if capacity allows)

| ID | Requirement | Source | Owner | Acceptance Criteria |
|----|------------|--------|-------|-------------------|
| BR-018 | Service worker for offline caching of static assets and shell | Mobile | Developer | Return visit loads cached content within 500ms; works offline after first visit |
| BR-019 | Recorded demo walkthroughs (video/GIF) for top 3 projects | Sales, CS, COO | Developer | Each walkthrough is < 60 seconds, < 5MB, lazy-loaded below fold; fallback screenshot if video fails |
| BR-020 | Public CI badge or linked test report validating the 500+ test case claim | QA, Enterprise | Developer | CI badge on portfolio links to a live GitHub Actions run showing passing test count |
| BR-021 | Visible CI/CD pipeline diagram or annotated workflow file on the portfolio | DevOps | Developer | `.github/workflows/` content is showcased as a dedicated section or linked artifact |
| BR-022 | Analytics layer (Plausible or Fathom) tracking section engagement and bounce rate | PM, CEO, CS | Developer | Dashboard accessible to developer showing page views, section scroll depth, and CTA clicks |
| BR-023 | Schema.org/Person + SoftwareApplication structured data (JSON-LD) for ATS/search engine ingestion | Power User, PM | Developer | Google Rich Results Test validates structured data; schema includes name, role, skills, and project list |
| BR-024 | Uptime monitoring with alerting (UptimeRobot or Better Uptime) | Support, DevOps | Developer | Alert fires within 5 minutes of downtime; developer receives notification via email or Slack |
| BR-025 | Accessibility: WCAG 2.1 AA compliance for all interactive elements | UX, Frontend, End User | Developer | axe-core CI check passes with zero critical/serious violations; workflow visualization is keyboard-navigable |
| BR-026 | Architecture diagrams per project showing system design (rendered, not just described) | Backend, Enterprise, CTO | Developer | Each featured project includes a visual architecture diagram (SVG/image); diagram has alt text describing the system |
| BR-027 | Plain-language outcome paired with every technical term for non-technical recruiter audience | Sales, End User | Developer | Each architecture keyword (Saga, idempotency, AMQP) has a one-line tooltip or parenthetical explaining the business benefit |
| BR-028 | `prefers-reduced-motion` respect for all animations and transitions | Mobile, UX, Frontend | Developer | With reduced motion enabled, all animations are replaced with instant transitions; no motion sickness triggers |

## COULD Have (v1.1 — Next iteration)

| ID | Requirement | Source | Owner | Acceptance Criteria |
|----|------------|--------|-------|-------------------|
| BR-029 | Headless NestJS API layer (`/api/projects`) exposing portfolio data with OpenAPI spec | Backend | Developer | OpenAPI spec accessible at `/api/docs`; demonstrates REST conventions, versioning, and idempotency keys |
| BR-030 | Keyboard shortcut system with command palette (Cmd+K) for power-user navigation | Power User | Developer | Cmd+K opens a searchable command palette; all major sections navigable via shortcut |
| BR-031 | Advanced compound filtering: stack + project type + date range with AND/OR operators | Power User | Developer | Recruiter can filter to "Next.js AND PostgreSQL" and share the filtered URL |
| BR-032 | Downloadable resume in PDF format generated from the same data layer | End User, Enterprise | Developer | PDF matches portfolio data; updates automatically when data files change |
| BR-033 | Multi-language support (English primary, Filipino secondary) | Legal, Enterprise | Developer | Language toggle persists in URL; all static content translated |
| BR-034 | Dark mode toggle with system preference detection | Frontend, UX | Developer | Respects `prefers-color-scheme`; manual toggle persists across sessions; design tokens support both themes |
| BR-035 | Blog/case study section for long-form project write-ups | PM, Sales | Developer | Each case study uses the same data layer pattern; SEO-optimized with meta tags |
| BR-036 | Client testimonials or social proof section | Sales, Account Manager | Developer | At least 3 testimonials with attribution (name, company, role); client permission obtained |
| BR-037 | Engagement/service tier section for freelance/consulting positioning | Account Manager | Developer | Clear pricing tiers or engagement model (project, retainer, advisory) with CTA per tier |

## WON'T Have (Explicitly deferred)

| ID | Requirement | Reason Deferred | Revisit When |
|----|------------|-----------------|-------------|
| BR-038 | Real-time live demo environments running full applications | Operational maintenance burden too high for one-person team; reliability risk (COO, Support, DevOps) | When dedicated hosting budget and monitoring exists |
| BR-039 | User authentication / admin panel for content management | Static data files are simpler and more reliable for a solo operator (CTO) | If content update frequency exceeds weekly |
| BR-040 | Native mobile app (PWA installable) | Web portfolio is sufficient for recruiter use case (Mobile) | If analytics show > 40% mobile traffic |
| BR-041 | AI chatbot for recruiter Q&A | Scope creep; adds complexity without proportional recruiter value (PM, COO) | v2 if recruiter engagement data warrants |

---

## Screen Designs

ASCII wireframe designs for each screen identified in the requirements above.
These wireframes serve as the visual specification for frontend implementation.

### Screen 1: Homepage / Hero Section
**Purpose:** First impression — communicate identity, role, and unique value in under 5 seconds
**Route:** `/`
**BRs covered:** BR-001, BR-005, BR-007, BR-015

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌─ nav ──────────────────────────────────────────────────────────┐  │
│  │  [Logo/Monogram]    About  Projects  Workflow  Contact   [☀/🌙]│  │
│  │                                          [GitHub] [LinkedIn]   │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ hero ─────────────────────────────────────────────────────────┐  │
│  │                                                                │  │
│  │     [Subtle animated geometric background - GPU-light]         │  │
│  │                                                                │  │
│  │     Jerome [Last Name]                                         │  │
│  │     ─────────────────────                                      │  │
│  │     Senior Full Stack Developer                                │  │
│  │                                                                │  │
│  │     One engineer. Every layer. Architecture to E2E.            │  │
│  │     500+ automated test cases. Zero compromises.               │  │
│  │                                                                │  │
│  │     ┌──────────────────┐  ┌──────────────────┐                │  │
│  │     │  View Projects → │  │  See My Workflow  │                │  │
│  │     └──────────────────┘  └──────────────────┘                │  │
│  │                                                                │  │
│  │     ┌─ tech badges (scrolling marquee) ─────────────────────┐ │  │
│  │     │ Laravel  Next.js  NestJS  React  TypeScript  Docker   │ │  │
│  │     │ PostgreSQL  Redis  Kafka  RabbitMQ  GitHub Actions    │ │  │
│  │     └───────────────────────────────────────────────────────┘ │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ proof bar ────────────────────────────────────────────────────┐  │
│  │  [6+] Years Experience  │  [500+] E2E Tests  │  [N] Projects  │  │
│  │  [CI ✓] All Tests Pass  │  [A+] Security     │  [90+] LH Score│  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Fields:**
| Field | Type | Required | Validation | Notes |
|-------|------|----------|-----------|-------|
| Name | Static text | Yes | N/A | From data layer |
| Title | Static text | Yes | N/A | "Senior Full Stack Developer" |
| Tagline | Static text | Yes | N/A | One-line differentiator |
| Tech badges | Dynamic list | Yes | N/A | From FrameworkGroup data |
| Proof metrics | Dynamic counters | Yes | N/A | Animated count-up on scroll into view |

**States:** Loading (skeleton with name placeholder) | Loaded | Reduced-motion (no animation)
**Mobile (375px):** Single column; nav collapses to hamburger; CTA buttons stack vertically; tech badges wrap to 2 rows; proof bar becomes 2x3 grid

**Interactivity spec:**
| Element | Behavior | Active/Selected State | Loading State |
|---------|----------|----------------------|---------------|
| Nav links | Smooth scroll to section | Bold + accent underline on current section | N/A |
| GitHub/LinkedIn icons | Open in new tab | Hover: scale 1.1 + accent color | N/A |
| View Projects CTA | Smooth scroll to projects section | Hover: fill background transition | N/A |
| See My Workflow CTA | Smooth scroll to workflow section | Hover: outline → filled transition | N/A |
| Tech badges marquee | Auto-scroll; pauses on hover | Hover: pause scrolling | Skeleton badges |
| Proof bar counters | Count-up animation on scroll into view | N/A (static after animation) | Skeleton numbers |
| Dark mode toggle | Switches theme; persists to localStorage | Sun/moon icon swap | N/A |
| Hamburger menu (mobile) | Opens slide-in nav overlay | X icon when open | N/A |

---

### Screen 2: Projects Section
**Purpose:** Showcase all projects organized by framework, filterable, with repo links
**Route:** `/#projects` (anchor) or `/projects?framework=nextjs` (filtered URL)
**BRs covered:** BR-002, BR-003, BR-004, BR-016, BR-026, BR-027

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌─ section header ───────────────────────────────────────────────┐  │
│  │  PROJECTS                                                      │  │
│  │  Real-world applications built and shipped as a one-person     │  │
│  │  team — from database design to production deployment.         │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ framework filter tabs ────────────────────────────────────────┐  │
│  │  ● All ({N})  ○ Laravel ({N})  ○ Next.js ({N})  ○ NestJS ({N})│  │
│  │  ○ React ({N})  ○ Other ({N})                                  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ project card ─────────────────┐  ┌─ project card ─────────────┐ │
│  │  [Project Screenshot/Preview]  │  │  [Project Screenshot]      │ │
│  │                                │  │                             │ │
│  │  Project Name                  │  │  Project Name               │ │
│  │  ─────────────                 │  │  ─────────────              │ │
│  │  Brief description of what     │  │  Brief description...       │ │
│  │  the project does and the      │  │                             │ │
│  │  problem it solves.            │  │  ┌─ stack tags ──────────┐  │ │
│  │                                │  │  │ NestJS  PostgreSQL    │  │ │
│  │  ┌─ stack tags ─────────────┐  │  │  │ Redis  Docker         │  │ │
│  │  │ Laravel  Vue  MySQL      │  │  │  └──────────────────────┘  │ │
│  │  │ Redis  Docker            │  │  │                             │ │
│  │  └──────────────────────────┘  │  │  ┌─ metrics ────────────┐  │ │
│  │                                │  │  │ ✓ 120 E2E Tests      │  │ │
│  │  ┌─ metrics ────────────────┐  │  │  │ ★ 98 LH Score        │  │ │
│  │  │ ✓ 200 E2E Tests         │  │  │  └──────────────────────┘  │ │
│  │  │ ★ 95 Lighthouse Score    │  │  │                             │ │
│  │  └──────────────────────────┘  │  │  [View Code →] [Demo 📹]   │ │
│  │                                │  │                             │ │
│  │  [View Code →]  [Demo 📹]     │  └─────────────────────────────┘ │
│  └────────────────────────────────┘                                  │
│                                                                      │
│  ┌─ project card ─────────────────┐  ┌─ project card ─────────────┐ │
│  │  [Project Screenshot]          │  │  [Project Screenshot]      │ │
│  │  ...                           │  │  ...                       │ │
│  └────────────────────────────────┘  └─────────────────────────────┘ │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Fields:**
| Field | Type | Required | Validation | Notes |
|-------|------|----------|-----------|-------|
| Project name | Text | Yes | Max 60 chars | From Project data |
| Description | Text | Yes | Max 200 chars | Problem + solution framing |
| Screenshot | Image | Yes | WebP, max 200KB | next/image with dimensions |
| Stack tags | Tag list | Yes | From predefined set | Framework + key tech |
| E2E test count | Number | No | Positive integer | From CI data if available |
| Lighthouse score | Number | No | 0-100 | From CI data if available |
| GitHub link | URL | Yes | Valid URL, 200 status | CI broken-link check |
| Demo link | URL | No | Valid URL or video file | Fallback to screenshot |

**States:** Loading (skeleton cards) | Empty (no projects in filter) | Loaded | Filter active
**Mobile (375px):** Single column; cards stack vertically; filter tabs become horizontal scroll; screenshots scale to full width

**Interactivity spec:**
| Element | Behavior | Active/Selected State | Loading State |
|---------|----------|----------------------|---------------|
| Framework filter tabs | Filter project grid; update URL params | Accent bg + white text on selected tab | Skeleton tabs |
| Project card | Hover reveals elevated shadow | Elevated shadow + subtle border accent | Skeleton card |
| View Code button | Opens GitHub repo in new tab | Hover: arrow shifts right | N/A |
| Demo button | Opens recorded walkthrough modal or link | Hover: play icon pulse | Video loading spinner |
| Stack tags | Static display (no click action) | N/A | Skeleton tags |
| Screenshot | Lazy loaded below fold | N/A | Blur-up placeholder |

---

### Screen 3: Workflow Showcase Section
**Purpose:** Step-by-step visualization of the Smart Workflows AI-assisted development process
**Route:** `/#workflow`
**BRs covered:** BR-006, BR-007, BR-019, BR-020, BR-021

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌─ section header ───────────────────────────────────────────────┐  │
│  │  HOW I BUILD                                                   │  │
│  │  From idea to production — my AI-assisted development          │  │
│  │  workflow using Claude Code + Smart Workflows                  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ workflow timeline ────────────────────────────────────────────┐  │
│  │                                                                │  │
│  │  ┌──────┐     ┌──────┐     ┌──────┐     ┌──────┐             │  │
│  │  │  01  │────▶│  02  │────▶│  03  │────▶│  04  │             │  │
│  │  │ PLAN │     │BUILD │     │  QA  │     │SHIP  │             │  │
│  │  └──┬───┘     └──┬───┘     └──┬───┘     └──┬───┘             │  │
│  │     │            │            │            │                   │  │
│  │  ┌──▼────────────────────────────────────────────────────────┐ │  │
│  │  │  STEP 1: PLAN — /smart:company Meeting Simulation         │ │  │
│  │  │  ─────────────────────────────────────────────────────     │ │  │
│  │  │                                                           │ │  │
│  │  │  19 expert roles evaluate the feature from every angle:   │ │  │
│  │  │  CEO, CTO, UX Designer, Security Engineer, QA Lead...     │ │  │
│  │  │                                                           │ │  │
│  │  │  Output: Business requirements, screen wireframes,        │ │  │
│  │  │  technical specs, and acceptance criteria.                 │ │  │
│  │  │                                                           │ │  │
│  │  │  ┌─────────────────────────────────────────────────────┐  │ │  │
│  │  │  │  [📹 See it in action — 45s walkthrough]            │  │ │  │
│  │  │  └─────────────────────────────────────────────────────┘  │ │  │
│  │  │                                                           │ │  │
│  │  │  "What normally takes a team of 5 people two weeks,       │ │  │
│  │  │   I complete in under 2 hours with complete BRs,          │ │  │
│  │  │   wireframes, and acceptance criteria."                   │ │  │
│  │  │                                                           │ │  │
│  │  └───────────────────────────────────────────────────────────┘ │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ tools used ───────────────────────────────────────────────────┐  │
│  │  [Claude Code logo]  [Smart Workflows]  [GitHub Actions]      │  │
│  │  [Playwright]  [Lighthouse CI]  [Vercel]                      │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ CI evidence link ─────────────────────────────────────────────┐  │
│  │  ✓ Latest CI Run: All 523 tests passing  [View on GitHub →]   │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Fields:**
| Field | Type | Required | Validation | Notes |
|-------|------|----------|-----------|-------|
| Step number | Number | Yes | 1-4 | Fixed set |
| Step title | Text | Yes | Max 20 chars | PLAN, BUILD, QA, SHIP |
| Step description | Rich text | Yes | Max 300 chars | From WorkflowStep data |
| Demo video | Video/GIF | No | < 5MB, lazy-loaded | Recorded walkthrough |
| Pull quote | Text | Yes | Max 200 chars | Personal impact statement |
| CI badge | Dynamic | No | GitHub Actions API | Live test count |
| Tool logos | Image list | Yes | SVG preferred | From Tool data |

**States:** Loading (skeleton timeline) | Step expanded (show detail) | Step collapsed | Reduced-motion (no animation)
**Mobile (375px):** Timeline becomes vertical; steps stack; video thumbnails scale to full width; detail cards fill screen width

**Interactivity spec:**
| Element | Behavior | Active/Selected State | Loading State |
|---------|----------|----------------------|---------------|
| Step circle (01-04) | Click expands step detail panel | Filled accent bg + scale 1.1 | Skeleton circle |
| Step connector arrows | Animate draw-on when scrolled into view | Static after animation | N/A |
| Demo video button | Opens video in lightbox modal | Hover: play icon pulse | Video loading skeleton |
| CI evidence link | Opens GitHub Actions run in new tab | Hover: arrow shifts right | Skeleton text |
| Tool logos | Tooltip on hover with tool name | Hover: scale 1.05 + tooltip | Skeleton icons |
| Timeline (overall) | Steps reveal sequentially on scroll | Current step highlighted | Skeleton timeline |

---

### Screen 4: Experience / About Section
**Purpose:** Work history, professional background, and architecture expertise
**Route:** `/#about`
**BRs covered:** BR-005, BR-008, BR-027

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌─ section header ───────────────────────────────────────────────┐  │
│  │  ABOUT ME                                                      │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ two-column layout ────────────────────────────────────────────┐  │
│  │                                                                │  │
│  │  ┌─ left: timeline ──────┐  ┌─ right: expertise ────────────┐ │  │
│  │  │                       │  │                                │ │  │
│  │  │  ● 2024–Present       │  │  ARCHITECTURE EXPERTISE       │ │  │
│  │  │  │ Senior Full Stack  │  │                                │ │  │
│  │  │  │ Developer          │  │  ┌─ expertise card ──────────┐ │ │  │
│  │  │  │ Company Name       │  │  │ Microservices             │ │ │  │
│  │  │  │ Architectural      │  │  │ "Breaking monoliths into  │ │ │  │
│  │  │  │ design, full-stack │  │  │  independent services     │ │ │  │
│  │  │  │ development,       │  │  │  that deploy and scale    │ │ │  │
│  │  │  │ CI/CD, testing     │  │  │  separately"              │ │ │  │
│  │  │  │                    │  │  │  [▼ Technical deep-dive]   │ │ │  │
│  │  │  ● 2022–2024         │  │  └───────────────────────────┘ │ │  │
│  │  │  │ Full Stack Dev     │  │                                │ │  │
│  │  │  │ Company Name       │  │  ┌─ expertise card ──────────┐ │ │  │
│  │  │  │ Backend APIs,      │  │  │ Event Streaming           │ │ │  │
│  │  │  │ frontend, testing  │  │  │ (AMQP / Kafka)            │ │ │  │
│  │  │  │                    │  │  │ "Reliable message         │ │ │  │
│  │  │  ● 2020–2022         │  │  │  delivery between          │ │ │  │
│  │  │  │ ...                │  │  │  services — even when      │ │ │  │
│  │  │  │                    │  │  │  things fail"              │ │ │  │
│  │  │                       │  │  │  [▼ Technical deep-dive]   │ │ │  │
│  │  │  ┌─────────────────┐  │  │  └───────────────────────────┘ │ │  │
│  │  │  │ [LinkedIn →]    │  │  │                                │ │  │
│  │  │  │ [Download CV]   │  │  │  ┌─ expertise card ──────────┐ │ │  │
│  │  │  └─────────────────┘  │  │  │ Saga Pattern              │ │ │  │
│  │  └───────────────────────┘  │  │ "Managing multi-step       │ │ │  │
│  │                             │  │  transactions across        │ │ │  │
│  │                             │  │  services with automatic    │ │ │  │
│  │                             │  │  rollback on failure"       │ │ │  │
│  │                             │  │  [▼ Technical deep-dive]    │ │ │  │
│  │                             │  └───────────────────────────┘  │ │  │
│  │                             │                                │ │  │
│  │                             │  ┌─ expertise card ──────────┐ │ │  │
│  │                             │  │ Idempotency               │ │ │  │
│  │                             │  │ "Safe to retry — same      │ │ │  │
│  │                             │  │  request never creates     │ │ │  │
│  │                             │  │  duplicate side effects"   │ │ │  │
│  │                             │  │  [▼ Technical deep-dive]   │ │ │  │
│  │                             │  └───────────────────────────┘ │ │  │
│  │                             └────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Fields:**
| Field | Type | Required | Validation | Notes |
|-------|------|----------|-----------|-------|
| Company name | Text | Yes | N/A | From WorkExperience data |
| Role title | Text | Yes | N/A | From WorkExperience data |
| Duration | Date range | Yes | Valid dates | "2024–Present" format |
| Responsibilities | Text | Yes | Max 200 chars | Key deliverables |
| Expertise title | Text | Yes | N/A | e.g., "Saga Pattern" |
| Plain-language desc | Text | Yes | Max 150 chars | For non-technical recruiters (BR-027) |
| Technical deep-dive | Rich text | No | Max 500 chars | Expanded on click; includes code examples |

**States:** Loading | Expertise collapsed (default) | Expertise expanded (deep-dive visible)
**Mobile (375px):** Single column; timeline and expertise stack vertically; expertise cards are full-width accordions

**Interactivity spec:**
| Element | Behavior | Active/Selected State | Loading State |
|---------|----------|----------------------|---------------|
| Timeline dot | Visual marker only | Current role has accent pulse | Skeleton dot |
| LinkedIn link | Opens in new tab | Hover: arrow shifts right | N/A |
| Download CV | Downloads PDF | Hover: download icon animation | N/A |
| Expertise card | Click expands technical deep-dive | Accordion open with rotate chevron | Skeleton text |
| Technical deep-dive toggle | Reveals/hides detailed explanation | Chevron rotates 180deg | Slide-down content |

---

### Screen 5: Contact Section
**Purpose:** Rate-limited contact form with obfuscated email
**Route:** `/#contact`
**BRs covered:** BR-009, BR-013

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌─ section header ───────────────────────────────────────────────┐  │
│  │  LET'S CONNECT                                                 │  │
│  │  Available for senior/lead full-stack roles and consulting.    │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ two-column ───────────────────────────────────────────────────┐  │
│  │                                                                │  │
│  │  ┌─ left: form ─────────────┐  ┌─ right: links ────────────┐ │  │
│  │  │                          │  │                            │ │  │
│  │  │  Your Name               │  │  ┌─────────────────────┐  │ │  │
│  │  │  [________________]      │  │  │  [GitHub icon]       │  │ │  │
│  │  │                          │  │  │  github.com/jerom... │  │ │  │
│  │  │  Your Email              │  │  └─────────────────────┘  │ │  │
│  │  │  [________________]      │  │                            │ │  │
│  │  │                          │  │  ┌─────────────────────┐  │ │  │
│  │  │  Subject                 │  │  │  [LinkedIn icon]     │  │ │  │
│  │  │  [Select topic    ▼]    │  │  │  linkedin.com/in/... │  │ │  │
│  │  │                          │  │  └─────────────────────┘  │ │  │
│  │  │  Message                 │  │                            │ │  │
│  │  │  [________________]      │  │  ┌─────────────────────┐  │ │  │
│  │  │  [________________]      │  │  │  [Location icon]     │  │ │  │
│  │  │  [________________]      │  │  │  Philippines         │  │ │  │
│  │  │                          │  │  └─────────────────────┘  │ │  │
│  │  │  [Send Message →]        │  │                            │ │  │
│  │  │                          │  └────────────────────────────┘ │  │
│  │  └──────────────────────────┘                                 │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ footer ───────────────────────────────────────────────────────┐  │
│  │  Built with Next.js · Deployed on Vercel · CI/CD via GitHub   │  │
│  │  Actions · Lighthouse Score: 97 · Security Headers: A+        │  │
│  │                                                                │  │
│  │  © 2026 Jerome [Last Name]. All rights reserved.              │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Fields:**
| Field | Type | Required | Validation | Notes |
|-------|------|----------|-----------|-------|
| Name | Text input | Yes | 2-100 chars, alphanumeric + spaces | Server-side validation |
| Email | Email input | Yes | Valid email format | Server-side + client-side |
| Subject | Dropdown | Yes | Predefined options | "Job Opportunity", "Freelance Project", "Collaboration", "Other" |
| Message | Textarea | Yes | 10-2000 chars | Sanitized server-side |

**States:** Default | Validating | Submitting (button spinner) | Success (green confirmation) | Error (inline messages) | Rate-limited (cooldown message)
**Mobile (375px):** Single column; form fields full width; social links below form; footer stacks

**Interactivity spec:**
| Element | Behavior | Active/Selected State | Loading State |
|---------|----------|----------------------|---------------|
| Name input | Inline validation on blur | Green border on valid; red + error text on invalid | N/A |
| Email input | Inline validation on blur | Green border on valid; red + error text on invalid | N/A |
| Subject dropdown | Opens native select on mobile | Accent border when focused | N/A |
| Message textarea | Auto-resize on input | Accent border when focused | N/A |
| Send Message button | Validates → submits → shows result | Loading: spinner in button, disabled | Spinner replacing arrow |
| Social links | Open in new tab | Hover: icon scale + accent color | N/A |
| Footer tech badges | Static display of live metrics | N/A | Skeleton text |

---

### Component Legend

```
[________________]     Text input
[Select option  ▼]     Dropdown / select
[Button Label →]       Primary action button
[← Button Label]       Secondary/back button
● Active tab           Active/selected filter
○ Inactive tab         Inactive filter
├───────────────┤      Section divider
{N} items              Count indicator
[▼ Label]              Expandable accordion
──▶                    Flow/connection arrow
✓                      Checkmark / passing status
★                      Score/rating indicator
[📹 Label]             Video/demo indicator
```

---

## User Flow

**Happy Path:**
1. Recruiter lands on homepage → sees name, title, tagline in under 3 seconds
2. Proof bar catches eye with quantifiable metrics (500+ tests, A+ security)
3. Scrolls to Projects → clicks "Next.js" filter tab → URL updates to `/?framework=nextjs`
4. Clicks a project card "View Code →" → GitHub repo opens in new tab
5. Clicks "Demo" → recorded walkthrough opens in lightbox
6. Scrolls to Workflow → clicks Step 1 (Plan) → sees Smart Workflows explanation
7. Clicks "See it in action" → watches 45-second recorded walkthrough
8. Scrolls to About → reads timeline → expands "Saga Pattern" deep-dive
9. Scrolls to Contact → fills form → submits → sees success confirmation
10. Total time: 2-5 minutes for a thorough review

**Quick Scan Path (30 seconds):**
1. Lands → reads tagline "One engineer. Every layer." → sees proof bar
2. Scrolls to Projects → scans card thumbnails and tech stacks
3. Opens one GitHub link → verified
4. Scrolls to Contact → bookmarks URL for later

**Error Paths:**
- Broken GitHub link: CI/CD catches before deploy; if missed at runtime, card shows "Repository unavailable" with graceful fallback
- Contact form rate limit hit: "You've sent a message recently. Please try again in [X] minutes."
- Video fails to load: Falls back to static screenshot with "View on GitHub" link
- JavaScript disabled: RSC renders full content; only interactive timeline and filter require JS

---

## Technical Notes

### API Endpoints (from Backend/CTO)

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/` | SSG homepage — all sections server-rendered | None (public) |
| GET | `/projects.json` | Machine-readable project list (v1.1, BR-029) | None (public) |
| POST | `/api/contact` | Contact form submission (serverless function) | Rate-limited by IP |
| GET | `/api/health` | Uptime monitoring endpoint | None (public) |

### Data Model (from CTO/Frontend)

```typescript
interface Project {
  slug: string;
  name: string;
  description: string;
  framework: FrameworkType;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  demoVideo?: string;
  screenshot: string;
  testCount?: number;
  lighthouseScore?: number;
  featured: boolean;
  order: number;
}

type FrameworkType = 'laravel' | 'nextjs' | 'nestjs' | 'react' | 'other';

interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string; // undefined = "Present"
  responsibilities: string[];
  techStack: string[];
}

interface WorkflowStep {
  number: number;
  title: string;
  shortTitle: string; // "PLAN", "BUILD", "QA", "SHIP"
  description: string;
  tools: string[];
  output: string;
  demoVideo?: string;
  quote?: string;
}

interface ExpertiseItem {
  title: string;
  plainDescription: string;  // For non-technical recruiters
  technicalDeepDive: string;  // Expandable detail
  relatedProject?: string;    // Slug linking to a Project
  icon: string;
}
```

### Security (from Security Engineer)

- No authentication required (public site)
- Contact form: server-side input validation, rate limiting (5/IP/hour), honeypot field for bot detection
- Email obfuscation: no `mailto:` links in HTML; form-only contact
- Security headers via Vercel/Cloudflare config: strict CSP, HSTS, X-Frame-Options DENY
- No API keys in client bundle; build-time environment variables only
- CI pipeline includes secrets scan (gitleaks) before deploy
- SRI hashes for any CDN-hosted resources

### Infrastructure (from DevOps)

- **Hosting:** Vercel or Cloudflare Pages (free tier, CDN edge delivery)
- **CI/CD:** GitHub Actions — lint → build → Lighthouse CI (>= 90) → broken-link check → deploy
- **Monitoring:** UptimeRobot (free tier) with 5-minute checks + email alerts
- **Analytics:** Plausible (privacy-respecting, no cookie consent needed)
- **Contact form backend:** Vercel serverless function or Cloudflare Workers
- **Domain:** Custom domain with automatic HTTPS
- **DR:** Git repository is the single source of truth; rebuild from scratch in < 2 minutes

---

## Summary

- **Total requirements:** 41
- **MUST:** 17 | **SHOULD:** 11 | **COULD:** 9 | **WON'T:** 4
- **Screens designed:** 5
- **API endpoints:** 4
