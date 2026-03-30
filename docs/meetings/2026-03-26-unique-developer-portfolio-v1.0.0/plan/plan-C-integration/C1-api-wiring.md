# C1: API Wiring & Content Verification

**Plan:** Integration
**Depends on:** A2-api-and-security + B5-contact-polish (both complete)
**Verify before starting:** Contact form renders, API endpoints respond, security headers configured
**BRs covered:** BR-009, BR-023, BR-027
**Estimated tasks:** 4

---

## Tasks

### C1.1: Wire Contact Form to Real API

**Type:** integration
**Files:**
- `src/lib/api-client.ts` — create: typed fetch wrapper
- `src/components/sections/contact.tsx` — modify: connect to /api/contact

**Implementation:**
Create `submitContact(data: ContactFormData): Promise<ContactResponse>` in api-client.ts. Replace mock handler in contact.tsx with real API call. Handle all response codes: 200 (success message), 400 (map Zod field errors to form fields), 429 (rate limit — show cooldown + LinkedIn fallback), 500 (generic error + retry). Loading: spinner in button, button disabled.

**AC:**
- [ ] Form submits to /api/contact with correct payload
- [ ] Success: green confirmation appears
- [ ] Validation errors: mapped to correct fields inline
- [ ] Rate limit: cooldown + LinkedIn fallback URL shown
- [ ] Server error: retry button shown
- [ ] Loading: button spinner during submission

---

### C1.2: Inject Structured Data in Layout

**Type:** integration
**Files:**
- `src/app/layout.tsx` — modify: add JSON-LD scripts
- `src/app/projects/[slug]/page.tsx` — modify: add per-project schema

**Implementation:**
Homepage: inject Person + WebSite JSON-LD from A2.5. Project pages: inject SoftwareApplication + BreadcrumbList JSON-LD per project. Validate all schemas against Google Rich Results Test.

**AC:**
- [ ] JSON-LD present in homepage source
- [ ] Per-project schema on each /projects/[slug]
- [ ] Google Rich Results Test passes for all schema types

---

### C1.3: BR-027 Content Review Checkpoint

**Type:** audit
**Files:**
- All content sections — review against P0 content and BR-027

**Implementation:**
Review every section against BR-027 (plain-language pairing): verify every technical term (Saga, idempotency, AMQP, Kafka, microservices) has a plain-language explanation visible to non-technical recruiters. Verify all copy matches P0 documents. Check: project descriptions follow template, workflow steps are 2 sentences max, expertise cards have both layers.

**AC:**
- [ ] Every technical term has plain-language pair
- [ ] All copy matches P0 content documents
- [ ] Workflow steps pass non-technical recruiter test
- [ ] Expertise cards have plain + technical layers

---

### C1.4: SRI + External Resource Audit

**Type:** security
**Files:**
- `src/app/layout.tsx` — audit external resources

**Implementation:**
Audit all external script/stylesheet refs. If any CDN resources exist, add `integrity` + `crossorigin` attributes. If all self-hosted (likely with next/font), document as clean. Add `crossorigin="anonymous"` to preconnect hints.

**AC:**
- [ ] All external resources have SRI hashes OR documented as self-hosted
- [ ] Audit documented in launch checklist

---

## Phase Checklist

- [ ] All 4 tasks implemented
- [ ] Contact form works end-to-end (submit → email received)
- [ ] Structured data validates on all pages
- [ ] BR-027 compliance verified
- [ ] Ready for C2-testing
