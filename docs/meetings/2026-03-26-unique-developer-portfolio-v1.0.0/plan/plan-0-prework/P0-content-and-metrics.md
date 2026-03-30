# P0: Content Pre-Work & Success Metrics

**Plan:** Pre-Work (before any code)
**Depends on:** none
**Verify before starting:** Decision to proceed with portfolio build
**BRs covered:** BR-001, BR-002, BR-005, BR-006, BR-007, BR-008, BR-017, BR-027
**Estimated tasks:** 5

---

## Tasks

### P0.1: Define Success Metric & Kill Criteria

**Type:** strategy
**Files:**
- `docs/success-metrics.md` — create: success definition document

**Implementation:**
Define: (1) Current baseline — estimate current recruiter response rate from applications/outreach. (2) Target — e.g., +20% recruiter response within 60 days of launch. (3) Measurement method — track via Plausible custom events (contact form submits, LinkedIn clicks, GitHub clicks) + manual tracking of interview invitations. (4) Kill criteria — if after 60 days with >200 unique visitors, contact form submissions < 3, pivot strategy (content change, channel change, or structure change). (5) Proxy metrics — time-on-page > 90s, section scroll depth > 60%.

**AC:**
- [ ] Baseline documented (even if estimated)
- [ ] Target delta defined with timeframe
- [ ] Measurement method specified
- [ ] Kill/pivot criteria defined
- [ ] Proxy leading indicators identified

---

### P0.2: Write Hero Copy & Tagline

**Type:** content
**Files:**
- `docs/content/hero-copy.md` — create: hero section copy

**Implementation:**
Write: (1) Hero tagline — 12 words max, one concrete claim, no unverifiable adjectives. Working draft: "I build distributed systems that hold together under pressure." (2) Subtitle — role + location: "Senior Full Stack Developer · Philippines · Open to remote roles". (3) Proof bar metrics — 6 specific, verifiable numbers (years, test count, projects, etc.). (4) CTA copy — outcome-oriented, not action-oriented: "See what I've shipped →" / "How I build →". Constraints: no "passionate", no "innovative", no starting with "I am a".

**AC:**
- [ ] Tagline is 12 words or fewer with one concrete claim
- [ ] Subtitle includes role, location, availability
- [ ] 6 proof metrics defined with real numbers
- [ ] CTA copy is outcome-oriented
- [ ] Non-technical recruiter can understand in 5 seconds

---

### P0.3: Write Project Descriptions (All Projects)

**Type:** content
**Files:**
- `docs/content/projects.md` — create: all project copy

**Implementation:**
For each project (minimum 6 across 3+ frameworks), use this mandatory template:
```
Name:        [plain text, no taglines]
Problem:     [1 sentence — what breaks without this? who feels it?]
Solution:    [1 sentence — what does this project do about it?]
Impact:      [1 sentence — what changed? use numbers if honest]
Stack:       [comma-separated technologies]
My Role:     [what YOU specifically built]
Complexity:  [1 technical detail signaling depth, for engineering audience]
Outcome Metric: [large display number — e.g., "Reduced load time by 60%"]
```
Also prepare 10-15 lines of real code diff per featured project for the code-diff flip animation.

**AC:**
- [ ] 6+ projects documented with all template fields
- [ ] At least 2 projects per framework (Laravel, Next.js, NestJS)
- [ ] Every project has a problem/solution/impact structure
- [ ] Code diff content prepared for 2+ featured projects
- [ ] NDA/IP clearance confirmed for each project (BR-017)

---

### P0.4: Write Workflow & Expertise Copy

**Type:** content
**Files:**
- `docs/content/workflow.md` — create: 4 workflow step descriptions
- `docs/content/expertise.md` — create: expertise card texts

**Implementation:**
Workflow steps (2 sentences max each, non-technical recruiter test):
- Step 1 PLAN: Describe /smart:company 19-role evaluation → output: BRs + wireframes
- Step 2 BUILD: Describe Claude Code execution → output: production code
- Step 3 QA: Describe automated testing suite → output: 500+ passing tests
- Step 4 SHIP: Describe CI/CD pipeline → output: production deployment

Expertise cards (4 items: Microservices, Event Streaming, Saga Pattern, Idempotency):
- Plain-language layer: 1 sentence, subject is a human/system not a concept
- Technical deep-dive: 2-4 sentences, name patterns/protocols/tradeoffs, include one honest limitation
- Related project link where applicable

**AC:**
- [ ] Each workflow step is 2 sentences max
- [ ] Each step passes non-technical recruiter test
- [ ] 4 expertise cards with plain + technical layers
- [ ] Each expertise card includes one honest tradeoff
- [ ] All copy reviewed against voice: confident, specific, restrained

---

### P0.5: Define Voice & Tone Reference

**Type:** content
**Files:**
- `docs/content/voice-guide.md` — create: 1-page voice reference

**Implementation:**
Define: 3 adjectives the voice IS (e.g., precise, confident, restrained). 3 adjectives it is NOT (e.g., boastful, casual, corporate). 2 example sentences showing tone. Reading level target: grade 10 (verify with Hemingway App). Rule: every technical term gets a plain-language pair (BR-027 enforcement).

**AC:**
- [ ] Voice defined in 3 positive + 3 negative adjectives
- [ ] 2 example sentences demonstrating the tone
- [ ] Grade 10 reading level target documented

---

## Phase Checklist

- [ ] All 5 tasks complete
- [ ] Success metric and kill criteria documented
- [ ] ALL copy written and reviewed before any code
- [ ] NDA clearance confirmed for all projects
- [ ] Voice guide ready for reference during build
- [ ] Ready for A1-setup
