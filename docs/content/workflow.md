# Workflow Step Copy

Each step: 2 sentences max. Passes the non-technical recruiter test.

---

## Step 1: PLAN — AI-Powered Requirements Gathering

**Description:**
Before writing code, I simulate a company meeting with 19 expert perspectives — from CTO and security engineer to UX designer and recruiter — using Claude Code's Smart Workflows plugin. In under 2 hours, I produce complete business requirements, screen wireframes, and testable acceptance criteria that would normally take a team two weeks.

**Tools:** Claude Code, Smart Workflows (/smart:company), Playwright MCP
**Output:** Business requirements document, ASCII wireframes, acceptance criteria
**Quote:** "What normally takes a team of 5 people two weeks, I complete in under 2 hours — with 41 business requirements, 5 screen designs, and every edge case documented."

---

## Step 2: BUILD — AI-Assisted Development

**Description:**
I convert the requirements into a phased implementation plan, then execute each phase using Claude Code as my pair programmer. The typed data layer is built first, then components, then integration — every decision traces back to a specific business requirement.

**Tools:** Claude Code, Smart Workflows (/smart:execute), TypeScript, Next.js / Laravel / NestJS
**Output:** Production code with typed interfaces, component library, API endpoints
**Quote:** "Every line of code traces to a business requirement. Nothing is built on assumption."

---

## Step 3: QA — Automated Testing at Scale

**Description:**
I write tests at every level of the pyramid — unit tests for business logic, component tests for UI behavior, integration tests for API contracts, and end-to-end tests for critical user flows. Smart Workflows helps generate comprehensive test scenarios covering edge cases I might miss.

**Tools:** Vitest, React Testing Library, Playwright, Smart Workflows (/smart:company --review)
**Output:** 500+ automated tests, Lighthouse CI gate (>= 90), accessibility audit (axe-core zero violations)
**Quote:** "500+ tests run on every pull request. If it doesn't pass, it doesn't ship."

---

## Step 4: SHIP — Automated CI/CD Pipeline

**Description:**
Every push triggers a 9-step CI pipeline: lint, typecheck, unit tests, build, Lighthouse audit, broken-link check, E2E tests, accessibility tests, and deployment. One failed step blocks the merge — no exceptions.

**Tools:** GitHub Actions, Vercel, Lighthouse CI, Playwright, UptimeRobot
**Output:** Production deployment with zero-downtime, uptime monitoring, A+ security headers
**Quote:** "The pipeline is the quality gate. If any of the 9 steps fail, the code doesn't reach production."
