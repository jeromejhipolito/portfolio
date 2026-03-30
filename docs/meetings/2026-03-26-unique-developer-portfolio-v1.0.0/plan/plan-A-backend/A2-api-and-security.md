# A2: Serverless API & Security Configuration

**Plan:** Backend / API + Security
**Depends on:** A1-setup-data-layer
**Verify before starting:** `npm run build` succeeds, data files import without errors
**BRs covered:** BR-009, BR-013, BR-023, BR-024
**Estimated tasks:** 6

---

## Tasks

### A2.1: Contact Form API with Validation (Zod)

**Type:** API route
**Files:**
- `src/app/api/contact/route.ts` — create: POST handler
- `src/lib/validations/contact.ts` — create: Zod schema

**Implementation:**
Zod schema: name (string, 2-100 chars, trim), email (string, email format), subject (enum: "Job Opportunity"|"Freelance Project"|"Collaboration"|"Other"), message (string, 10-2000 chars, trim), website (string, optional — honeypot). POST handler: validate with Zod (return 400 with field-level errors on failure), check honeypot (if filled, return 200 silently), send email via Resend. Sanitize all inputs (strip HTML). Return `{ success: true }` or typed error response. Unit test the Zod schema.

**AC:**
- [ ] Valid submission returns 200 and sends email
- [ ] Invalid data returns 400 with per-field Zod errors
- [ ] Honeypot filled → 200 but no email sent
- [ ] HTML tags stripped from all inputs
- [ ] Zod schema has unit tests (Vitest)

---

### A2.2: Rate Limiting

**Type:** middleware
**Files:**
- `src/lib/rate-limit.ts` — create: rate limiter
- `src/lib/__tests__/rate-limit.test.ts` — create: unit tests

**Implementation:**
In-memory sliding window rate limiter (Map with IP keys). 5 requests/IP/hour. On exceed: 429 with `{ error: "Too many requests", retryAfter: seconds }`. Provide fallback: when rate limited, response includes `fallbackUrl` pointing to LinkedIn profile. Unit test: verify limit triggers at 6th request, verify different IPs tracked independently.

**AC:**
- [ ] 6th request from same IP returns 429
- [ ] Response includes retryAfter and fallbackUrl
- [ ] Different IPs tracked independently
- [ ] Unit tests pass

---

### A2.3: Security Headers

**Type:** config
**Files:**
- `next.config.js` — modify: security headers
- `src/lib/__tests__/headers.test.ts` — create: header verification test

**Implementation:**
In next.config.js `headers()`: `Content-Security-Policy` (default-src 'self', script-src 'self', style-src 'self' 'unsafe-inline', img-src 'self' data: blob:, connect-src 'self' [plausible domain], frame-ancestors 'none'), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. NO `unsafe-eval` needed (Three.js removed).

**AC:**
- [ ] SecurityHeaders.com grade A or A+ on preview deploy
- [ ] CSP allows Tailwind, fonts, Plausible — blocks everything else
- [ ] No `unsafe-eval` in CSP (confirmed Three.js removed)

---

### A2.4: Health Check + Static Projects JSON

**Type:** API routes
**Files:**
- `src/app/api/health/route.ts` — create: GET handler
- `src/app/projects.json/route.ts` — create: static JSON endpoint

**Implementation:**
Health: GET /api/health → `{ status: "ok", timestamp: ISO8601, version: env.NEXT_PUBLIC_GIT_SHA }`. Projects JSON: GET /projects.json → build-time static generation of all projects (slug, name, description, framework, techStack, githubUrl, outcomeMetric). Both are public, no auth.

**AC:**
- [ ] /api/health returns 200 with status "ok"
- [ ] /projects.json returns valid JSON array at build time

---

### A2.5: JSON-LD Structured Data + Open Graph

**Type:** utility
**Files:**
- `src/lib/structured-data.ts` — create: JSON-LD generators
- `src/lib/og-metadata.ts` — create: OG tag generators
- `src/lib/__tests__/structured-data.test.ts` — create: unit tests

**Implementation:**
JSON-LD: `generatePersonSchema()` (name, jobTitle, url, sameAs: [github, linkedin], address.addressCountry: "PH", knowsAbout: skills array). `generateWebSiteSchema()`. `generateProjectSchema(project)` for individual project pages. OG metadata: `generateOGMetadata(page)` returning title, description, image URL, twitter:card. Default OG image: 1200x630 with name + title + accent color. Per-project OG: project name + stack + outcome metric. Add geo-modified keywords to meta: "Senior Full Stack Developer Philippines". Unit test schema output structure.

**AC:**
- [ ] Person schema passes Google Rich Results Test
- [ ] OG tags render correctly (test with opengraph.xyz or similar)
- [ ] Per-project OG metadata generates unique title/description
- [ ] Geo-keywords in meta description
- [ ] Unit tests verify schema structure

---

### A2.6: Email Obfuscation Audit

**Type:** audit
**Files:**
- All source files — audit: no raw email in HTML

**Implementation:**
Grep codebase for email patterns. Verify no `mailto:` links, no email in meta tags or HTML. Contact is form-only. Social links are GitHub/LinkedIn URLs only. Document finding in a checklist.

**AC:**
- [ ] Zero personal email addresses in source code
- [ ] No mailto: links in generated HTML
- [ ] Documented in launch checklist

---

## Phase Checklist

- [ ] All 6 tasks implemented
- [ ] Contact form sends email with Zod validation + rate limiting
- [ ] Security headers grade A+ on preview deploy
- [ ] JSON-LD + OG metadata generate correctly
- [ ] All new utilities have unit tests
- [ ] Ready for B1 and eventually C1
