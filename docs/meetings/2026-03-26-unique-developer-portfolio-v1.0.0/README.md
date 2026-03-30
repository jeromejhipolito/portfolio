# Meeting Minutes: Unique Developer Portfolio Website

| Field | Value |
|-------|-------|
| **Date** | 2026-03-26 |
| **Subject** | Build a unique, recruiter-optimized developer portfolio showcasing AI-assisted full-stack development workflow |
| **Type** | Company Perspective Review |
| **Decision** | APPROVED WITH CONDITIONS |
| **Attendees** | **Leadership:** CEO, CTO, COO, Legal Counsel | **Engineering:** Frontend, Backend, QA, DevOps, Security, Mobile | **Product:** Product Manager, UX Designer | **Client-Facing:** Sales, Account Manager, Customer Success, Customer Support | **Client:** End User, Enterprise Client, Power User |

## Verdict Board

| Role | Group | Verdict | Key Insight |
|------|-------|---------|-------------|
| CEO | Leadership | YES | Portfolio is a sales funnel; market timing for AI-workflow differentiation is excellent |
| CTO | Leadership | YES | Content-data separation is the critical architecture decision; enforce it from day one |
| COO | Leadership | YES | Low-risk self-contained project; live demo scope needs definition before build |
| Legal Counsel | Leadership | YES | Low regulatory risk; IP clearance for all displayed projects is the top legal concern |
| Product Manager | Product | YES | Differentiation is correct; needs measurable success metric and adoption plan |
| UX Designer | Product | YES | Must resolve primary hero message and information architecture before visual design |
| Frontend Engineer | Engineering | YES | Next.js RSC + typed data layer first; animations behind dynamic imports |
| Backend Engineer | Engineering | CONCERNS | No backend demonstration surface — claims of idempotency/Saga mastery are unverifiable |
| QA Engineer | Engineering | YES | 500+ E2E claim needs public evidence; portfolio itself needs a test strategy |
| DevOps Engineer | Engineering | STRONG YES | Static CDN deployment is correct; CI/CD pipeline is portfolio content |
| Security Engineer | Engineering | YES | Contact form rate limiting + A+ security headers are visible proof of competence |
| Mobile Engineer | Engineering | CONCERNS | No offline strategy; workflow visualization is a mobile performance risk |
| Sales | Client-Facing | STRONG YES | "One-person AI-workflow team" is an unreplicable differentiator; champion ammo is exceptional |
| Account Manager | Client-Facing | YES | Strong for initial engagement; needs availability/continuity messaging for enterprise |
| Customer Success | Client-Facing | STRONG YES | Engineered to match recruiter evaluation workflow; TTFV under 60 seconds |
| Customer Support | Client-Facing | CONCERNS | Silent failure risk — broken demos are invisible rejections with zero monitoring |
| End User (Recruiter) | Client | YES | Strong credibility signals; first 3 seconds above-the-fold decides everything |
| Enterprise Client | Client | YES | Kafka/AMQP/Saga expertise is rare and enterprise-relevant; add security language |
| Power User | Client | CONCERNS | No URL state management, keyboard navigation, or machine-readable layer |

## Discussion Summary

### Leadership
- **CEO:** Market timing is ideal — AI-workflow-as-differentiator has a 12-month window before it becomes table stakes. Portfolio should be treated as a product launch with analytics and a 60-day review gate.
- **CTO:** Architecture must enforce separation between content data and presentation. Live demos need defined fallback behavior. Core Web Vitals must be a hard acceptance criterion.
- **COO:** Single-owner eliminates coordination risk. "Unique design" acceptance criteria needs objective definition. Live demo = infrastructure or content? Must decide before build.
- **Legal:** Audit every project for NDA/IP clearance. Review Anthropic ToS for Claude Code output display. If contact form collects data, privacy notice required.

### Engineering
- **Frontend:** Next.js App Router with RSC by default. Typed data layer (`projects.ts`, `experience.ts`) as first deliverable. URL state via `nuqs` for filter shareability. Animations behind `next/dynamic` with SSR disabled.
- **Backend:** CONCERNS — the portfolio has no backend layer, making backend expertise claims unverifiable. Recommends a headless API with OpenAPI spec to demonstrate API design discipline.
- **QA:** 500+ E2E claim should be backed by public CI badge or test report. Portfolio needs its own Lighthouse CI gate, broken-link checker, and visual regression tests.
- **DevOps:** STRONG YES — Cloudflare Pages/Vercel with GitHub Actions pipeline. Pipeline itself is showcase content. Zero infrastructure cost on free tier.
- **Security:** Contact form is the only attack surface — needs rate limiting and email obfuscation. SecurityHeaders.com A+ grade is a visible competence signal.
- **Mobile:** CONCERNS — workflow visualization and live demos are performance landmines on mobile. Needs service worker for offline caching, lazy loading for below-fold content, 44px touch targets.

### Product
- **Product Manager:** Differentiation strategy is correct but no measurable success metric exists. Recommends defining conversion metric before building, trimming v1 to highest-signal elements, and running recruiter feedback on mockup.
- **UX Designer:** Information architecture must be resolved before visual design. Eight content areas competing without hierarchy violates Hick's Law. Must define the single primary hero message.

### Client-Facing
- **Sales:** STRONG YES — the one-person-team + AI-workflow narrative is a "champion repeatable" statement. Every technical term needs a plain-language business outcome paired with it for non-technical recruiters.
- **Account Manager:** Portfolio communicates technical credibility well but lacks client-engagement messaging (availability, SLA, continuity plan) for enterprise prospects.
- **Customer Success:** STRONG YES — hero section + live demos are the two highest-leverage elements. Expandable structure ensures the portfolio stays current rather than going stale.
- **Customer Support:** CONCERNS — zero monitoring means broken links/demos create invisible rejections. Needs uptime monitoring, fallback states, and a contact path on every section.

### Client Perspectives
- **End User (Recruiter):** Strong credibility signals but 9 content areas in a 30-second window is dense. Hero must answer "what, what level, why care" in under 5 seconds.
- **Enterprise Client:** Kafka/AMQP/Saga combination is rare and directly applicable to regulated systems. Recommends leading with compliance-adjacent language for enterprise procurement.
- **Power User:** No URL state, no keyboard navigation, no structured data (JSON-LD). Hiring managers can't filter, bookmark filtered views, or share specific sections.

## Decisions Made

| # | Decision | Raised By | Agreed By | Status |
|---|----------|-----------|-----------|--------|
| D-1 | Use Next.js App Router with static/SSG deployment on Vercel or Cloudflare Pages | CTO, Frontend, DevOps | Consensus | DECIDED |
| D-2 | Typed data layer (TypeScript interfaces + data files) is the first deliverable before any UI | CTO, Frontend | Consensus | DECIDED |
| D-3 | Hero section must resolve to one primary message with measurable 5-second comprehension test | UX, End User, Sales | Consensus | DECIDED |
| D-4 | Live demos should be recorded walkthroughs or static screenshots for v1 (not running environments) | COO, DevOps, Support | Majority | DECIDED |
| D-5 | All projects must pass IP/NDA clearance audit before display | Legal | Consensus | DECIDED |
| D-6 | CI/CD pipeline (GitHub Actions) is a visible portfolio artifact | DevOps, QA | Consensus | DECIDED |
| D-7 | URL state management for filters via nuqs — all views bookmarkable/shareable | Frontend, Power User | Consensus | DECIDED |
| D-8 | Contact form with rate limiting + email obfuscation; no raw email in HTML | Security | Consensus | DECIDED |
| D-9 | Security headers targeting A+ on SecurityHeaders.com | Security | Consensus | DECIDED |
| D-10 | Service worker for offline caching of static assets | Mobile | Majority | DECIDED |

## Consensus Points

1. Proceed with the build — 14/19 roles YES or STRONG YES, zero STRONG NO
2. Next.js static/SSG on CDN is the correct architecture
3. Content-data separation is non-negotiable
4. Hero section determines success — first 3-5 seconds above the fold
5. "One-person team + AI-assisted workflow" is the killer differentiator
6. Live demos are high-risk/high-reward — use recorded walkthroughs for v1
7. The portfolio must demonstrate the skills it claims (Core Web Vitals, security headers, CI/CD)
8. Expandable structure by framework is the correct content model

## Tensions & Trade-offs

| Tension | Side A (Roles) | Side B (Roles) | Core Trade-off |
|---------|---------------|---------------|----------------|
| Static site vs. backend demo layer | DevOps, Frontend | Backend | Infrastructure cost vs. backend credibility |
| Visual uniqueness vs. mobile performance | UX, Sales | Mobile, Frontend | Aesthetic differentiation vs. device performance |
| Comprehensive detail vs. cognitive overload | Enterprise, Power User | End User, UX, CS | Information density vs. first-impression clarity |
| Self-demonstrating portfolio vs. scope creep | Backend, QA | COO, PM | Build time vs. authenticity of claims |
| Live interactive demos vs. static showcases | Sales, CS | Support, Mobile, DevOps | Engagement impact vs. long-term reliability |

## Overall Score

| Dimension | Score (1-5) | Contributing Roles |
|-----------|-------------|-------------------|
| Business Viability | 4.4 | CEO, Sales, Account Manager |
| Technical Soundness | 3.7 | CTO, Backend, Frontend, DevOps, Security |
| User Experience | 3.4 | UX Designer, End User, Power User, Support |
| Operational Feasibility | 4.0 | COO, QA, DevOps, Customer Success |
| Market Readiness | 4.3 | Sales, Product Manager, CEO |

**Overall: 3.96/5**

## Action Items

| # | Action | Owner | Deadline | Depends On |
|---|--------|-------|----------|-----------|
| A-1 | Define single primary hero message and information architecture map | Developer + UX | Before build starts | — |
| A-2 | Build typed data layer (Project, FrameworkGroup, WorkExperience, WorkflowStep interfaces) | Developer | Sprint 1 | — |
| A-3 | Audit all projects for NDA/IP/contractual clearance | Developer | Before launch | — |
| A-4 | Review Anthropic ToS for Claude Code output display permissions | Developer | Before build | — |
| A-5 | Define measurable success metric and 60-day review gate | Developer | Before build | — |
| A-6 | Set up GitHub Actions CI/CD with Lighthouse CI gate (score >= 90) and broken-link checker | Developer | Sprint 1 | A-2 |
| A-7 | Configure security headers for A+ SecurityHeaders.com grade | Developer | Sprint 2 | A-6 |
| A-8 | Implement service worker for offline caching | Developer | Sprint 2 | A-2 |
| A-9 | Add analytics layer (Plausible/Fathom) for section engagement tracking | Developer | Sprint 2 | A-6 |
| A-10 | Create recorded demo walkthroughs as static video/GIF assets | Developer | Sprint 3 | A-1 |

## Open Questions

| # | Question | Raised By | Assigned To | Due |
|---|----------|-----------|-------------|-----|
| Q-1 | Should the portfolio include a headless API layer to demonstrate backend prowess? | Backend | Developer | Before Sprint 2 |
| Q-2 | What is the target recruiter persona — technical hiring manager or non-technical recruiter? | Sales, End User | Developer | Before A-1 |
| Q-3 | What specific projects have NDA clearance for public display? | Legal | Developer | Before launch |
| Q-4 | Should structured data (JSON-LD, schema.org) be included for ATS ingestion? | Power User | Developer | Sprint 2 |
| Q-5 | What is the 60-day kill/pivot metric if the portfolio doesn't generate recruiter engagement? | PM, CEO | Developer | Before build |

## Next Steps

- **Next review:** After information architecture is defined and data layer is built (estimated: 1 week)
- **Convert to plan:** Run `/smart:company --to-plan` to generate phased implementation plan
