# Portfolio Success Metrics

## Primary Conversion Event
A recruiter or hiring manager initiates contact — via the contact form, LinkedIn connection request mentioning the portfolio, or email reply to an application that references the portfolio URL.

## Baseline (Estimated)
- Current recruiter response rate to cold applications: ~5-8% (industry average for senior developers)
- Current inbound recruiter contacts per month: ~2-3 (LinkedIn organic)
- Current portfolio: none live (previous version retired due to similarity concern)

## Target (60-Day Window)
- Recruiter response rate to applications including portfolio link: **15%+** (2x improvement)
- Inbound contacts via portfolio contact form: **5+ per month**
- Portfolio-attributed interview invitations: **3+ in 60 days**

## Measurement Method
1. **Plausible Analytics** (privacy-respecting, no cookie consent needed):
   - Page views (total + unique visitors)
   - Section scroll depth (custom events on each section)
   - CTA clicks: `contact_submit`, `linkedin_click`, `github_click`, `project_view`
   - Referrer tracking: which channels drive traffic
   - UTM params: `?utm_source=linkedin`, `?utm_source=application`, `?utm_source=referral`

2. **Manual Tracking** (spreadsheet):
   - Applications sent with portfolio link vs without
   - Response rate comparison (with/without portfolio)
   - Contact form submissions → conversation → interview conversion
   - Source attribution: which UTM source generates the most interviews

## Proxy Leading Indicators (Weekly Check)
| Indicator | Healthy | Warning | Critical |
|-----------|---------|---------|----------|
| Unique visitors/week | 50+ | 20-49 | < 20 |
| Avg time on page | > 90s | 45-90s | < 45s |
| Scroll depth > 60% | > 40% of visitors | 20-40% | < 20% |
| Contact form submits/month | 5+ | 2-4 | 0-1 |
| Bounce rate | < 40% | 40-60% | > 60% |

## Kill / Pivot Criteria (60-Day Gate)
**If after 60 days with 200+ unique visitors:**
- Contact form submissions < 3 total → **Pivot: redesign hero + CTA copy, run recruiter feedback session**
- Bounce rate > 60% → **Pivot: simplify hero, reduce animation, test with 5 recruiters**
- Average time on page < 30s → **Pivot: content is not engaging, rewrite project descriptions**
- Zero interview invitations attributed to portfolio → **Pivot: distribution strategy change (different channels, different positioning)**

**If after 60 days with < 100 unique visitors:**
- Problem is distribution, not conversion → **Pivot to channel strategy: increase LinkedIn activity, add portfolio to more job applications, share projects on dev communities**

## Review Cadence
- **Weekly:** Check Plausible dashboard, note trends
- **Bi-weekly:** Update manual tracking spreadsheet
- **60-day mark:** Full review against all targets, decide: continue / iterate / pivot
