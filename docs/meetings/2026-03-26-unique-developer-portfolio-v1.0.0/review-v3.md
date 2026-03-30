# Review: Work Experience + Resume Download (v3)

| Field | Value |
|-------|-------|
| **Date** | 2026-03-26 |
| **Review Type** | Feature Addition |
| **Version** | v3 |
| **Decision** | APPROVED WITH CHANGES |
| **Reviewers** | Legal Counsel, UX Designer, Product Manager |
| **Based On** | BRs from 2026-03-26 + review-v1 (design) + review-v2 (plan) |
| **Previous Version** | review-v2.md (plan review) |
| **Stakeholder Request** | Add work experience with employer projects, downloadable resume, Philippine legal compliance |

---

## Review Verdicts

| Role | Verdict | Key Contribution |
|------|---------|-----------------|
| Legal Counsel | APPROVED WITH CHANGES | Philippine RA 10173 + RA 8293 compliance framework: what's safe, what needs consent, what's forbidden |
| UX Designer | APPROVED WITH CHANGES | Accordion employer nodes with project chips, resume in nav + contact section (no separate page) |
| Product Manager | APPROVED WITH CHANGES | Experience→Projects linking IA, resume as static PDF MLP, 8 new BRs |

---

## Legal Compliance Framework (Philippine Law)

### Safe to Include (No Consent Needed)
- Company name (publicly known legal entity — not personal data under RA 10173)
- Your job title and role description
- Employment dates (start/end)
- General responsibilities in your own words
- Tech stack used (publicly known tools only)
- Your personal contributions framed as "I built...", "I designed..."
- Personal performance metrics ("reduced latency by ~40%") if not derived from confidential reports
- Team size you managed or mentored

### Requires Employer Written Consent
- Screenshots of internal applications
- Proprietary code (RA 8293: employer owns work-for-hire code)
- Client names or client project names
- Revenue figures, user counts, transaction volumes
- System architecture diagrams or internal specs
- Any information under NDA or post-employment confidentiality clause

### Never Include
- Actual source code from employer systems
- Real user data or personal data of others (RA 10173 violation)
- API keys, credentials, config files
- Internal communications (Slack, email)
- Colleague or manager names without consent
- Confidential business strategies or roadmaps

### Safe Employer Entry Template
```
[Company Name] — publicly known, not confidential
[Your Title] | [Start] – [End or Present]

Responsibilities: describe WHAT YOU DID + WHAT TECH YOU USED
- "Built RESTful APIs using NestJS" ✓
- "Implemented CI/CD pipeline with GitHub Actions" ✓
- "Led migration from monolith to microservices" ✓

DO NOT: name clients, show revenue, paste code, screenshot internal tools
```

---

## UX Design Decisions

### Work Experience — Accordion Employer Nodes
- Current job: expanded by default (highest recruiter interest)
- Previous jobs: collapsed by default (expand on click)
- Each employer shows: name, role, dates, outcome metric, responsibilities, "// SHIPPED" project chips
- Project chips: name + one-line description + tech badges (using existing Card + Tag components)
- Chips link to Projects section if a full project card exists
- Mobile: project chips scroll horizontally with fade gradient

### Resume Download — Two Surfaces, No Separate Page
1. **Nav bar:** "Resume ↓" secondary button after social icons → triggers PDF download
2. **Contact section:** Resume card with "Updated March 2026" freshness signal + Download button
3. **Mobile nav:** Full-width resume button in drawer below nav links

### Information Architecture
- Experience section owns employment narrative + project references
- Projects section owns project detail
- Experience links TO Projects (one-way), no duplication
- Employer projects appear in Projects filter ONLY if they meet same quality standard

---

## Consensus Points
1. No separate `/resume` page — PDF download via nav button + contact card
2. Employer names are safe to display (public legal entities, not PII)
3. Current job expanded by default, previous collapsed
4. Project chips in Experience are references, not full cards
5. Use dummy data now, real details added later
6. Static PDF in `/public/` — no auto-generation for v1

---

## New Business Requirements

### MUST Have

| ID | Requirement | Source | Acceptance Criteria |
|----|------------|--------|-------------------|
| BR-040 | Resume PDF download button in nav bar | PM, UX | "Resume ↓" button visible in nav after social icons. Click triggers PDF download. File named with developer name. Works on desktop and mobile. |
| BR-041 | Resume download card in Contact section | PM, UX | Card with download button appears between LinkedIn and Location cards. Shows "Updated [Month Year]" freshness label. |
| BR-042 | Two employer entries in Experience section | UX, PM | Each entry shows: company name, role, date range, outcome metric, responsibilities list, project chips. Current job expanded by default. |
| BR-043 | Accordion expand/collapse on employer entries | UX | Click toggles responsibilities + projects panel. Chevron rotates. Framer Motion height animation. Current job expanded, previous collapsed. |
| BR-044 | Employer project chips with tech badges | UX | Each employer entry shows "// SHIPPED" section with horizontal project chips. Each chip: name, one-line description, tech stack badges. |
| BR-045 | Project chips link to Projects section | PM | Chips that have a corresponding project card in Projects section are clickable links. Chips without a matching project are non-interactive. |
| BR-046 | Philippine legal compliance for employer data | Legal | No proprietary code, no screenshots of internal apps, no client names, no revenue figures. Only: company name, role, dates, responsibilities in own words, tech stack. |
| BR-047 | Resume PDF accessibility | PM | Download button has `aria-label`. Keyboard navigable. Focus visible. Native `<a download>` — no JS-dependent download. |

### SHOULD Have

| ID | Requirement | Source | Acceptance Criteria |
|----|------------|--------|-------------------|
| BR-048 | "Built at [Company]" tag on project cards | PM | Projects built during employment show a subtle employer label on their card in the Projects section. |
| BR-049 | Resume date in site-config.ts | UX | Resume "Updated" date is stored in `site-config.ts` and rendered dynamically, not hardcoded in the component. |
| BR-050 | Plausible custom event for resume download | PM | `resume_download_clicked` event with `location` property (nav/contact). Track adoption rate. |
| BR-051 | Horizontal scroll for project chips on mobile | UX | Project chips overflow horizontally on mobile with right-edge fade gradient. Touch-scrollable. No visible scrollbar. |

---

## Screen Designs

### Experience Section — Employer Entry (Expanded)

```
┌─────────────────────────────────────────────────────────────┐
│  ● 2024–present                                             │
│    Senior Full Stack Developer                              │
│    TechCorp Solutions                          [▲ collapse] │
│    Sole engineer · 3 frameworks                [cyan mono]  │
│  ├──────────────────────────────────────────────────────────┤
│  │  RESPONSIBILITIES                                        │
│  │  · Architectural design for distributed applications     │
│  │  · Full-stack development: APIs to frontend              │
│  │  · CI/CD pipeline design and automation                  │
│  │  · Testing strategy: 500+ automated test cases           │
│  ├──────────────────────────────────────────────────────────┤
│  │  // SHIPPED                                              │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  │ Project Name │  │ Project Name │  │ Project Name │   │
│  │  │ Brief desc   │  │ Brief desc   │  │ Brief desc   │   │
│  │  │ [NestJS]     │  │ [Laravel]    │  │ [Next.js]    │   │
│  │  │ [PostgreSQL] │  │ [MySQL]      │  │ [React]      │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │
│  └──────────────────────────────────────────────────────────┘
│  │
│  ┃  (connector line)
│  │
│  ○ 2022–2024
│    Full Stack Developer
│    Digital Ventures PH                         [▼ expand]
│    Monolith→SOA · 60% faster deploys           [cyan mono]
└─────────────────────────────────────────────────────────────┘
```

### Nav Bar — Resume Button

```
┌──────────────────────────────────────────────────────────────┐
│  Jerome_    About  Projects  Workflow  Contact  [GH][LI] │Resume ↓│ │
└──────────────────────────────────────────────────────────────┘
                                                    ↑
                                         secondary variant button
                                         triggers PDF download
```

### Contact Section — Resume Card

```
┌────────────────────────────────────────┐
│  [GH]  GitHub                          │
│        github.com/jerom               │
├────────────────────────────────────────┤
│  [LI]  LinkedIn                        │
│        linkedin.com/in/jerom          │
├────────────────────────────────────────┤
│  [↓]   Resume / CV                     │  ← NEW
│        PDF · Updated March 2026        │
│                         [Download →]   │
├────────────────────────────────────────┤
│  [PH]  Location                        │
│        Philippines                    │
├────────────────────────────────────────┤
│  [●]   Available Now                   │
│        Open to senior/lead roles      │
└────────────────────────────────────────┘
```

---

## Action Items

| # | Action | Owner | Priority |
|---|--------|-------|----------|
| 1 | Update Experience section with accordion employer entries + project chips | Developer | Must |
| 2 | Add "Resume ↓" button to nav (desktop + mobile drawer) | Developer | Must |
| 3 | Add resume download card to Contact section | Developer | Must |
| 4 | Create placeholder resume PDF in /public/ | Developer | Must |
| 5 | Update WorkExperience type with optional `projects` field | Developer | Must |
| 6 | Update experience data with dummy employer projects | Developer | Must |
| 7 | Add `resumeDate` to site-config.ts | Developer | Should |
| 8 | Add Plausible `resume_download_clicked` event | Developer | Should |

---

## Next Steps

- Run `/smart:company --to-plan` to generate implementation phases for these changes
- Use dummy data for employer names and projects — real details added later
- Review employer contracts before adding real company names (Legal requirement)
