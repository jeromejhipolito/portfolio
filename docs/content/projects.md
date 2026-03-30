# Project Descriptions

All projects follow the mandatory template. Copy is written in the voice guide tone.

---

## Project 1: BookEasy — Booking System v2 ⭐ FEATURED

**Framework:** NestJS + Next.js
**Slug:** bookeasy-booking-system
**Featured:** Yes
**Claude-Assisted:** Yes

**Problem:** Booking platforms break under concurrent reservations — double-bookings, failed payments without rollback, and silent notification failures erode user trust.

**Solution:** A full-stack booking system with CQRS architecture that handles concurrent reservations, multi-step transactions with automatic rollback, and real-time availability updates.

**Impact:** 151 test files covering the booking pipeline end-to-end. Zero double-booking incidents through idempotent reservation endpoints and Saga-pattern transaction management.

**Stack:** NestJS, Next.js 14, PostgreSQL, Redis, TypeScript, Docker, Turborepo, Zustand, React Query, Tailwind CSS

**My Role:** Solo architect and developer. Designed the CQRS backend, built the monorepo structure with shared packages (types, schemas, constants, utils), implemented JWT authentication, WebSocket real-time updates, recurring booking support (RRule), and the full Next.js frontend.

**Complexity:** The booking flow is a choreography-based Saga: reserve slot → validate payment → confirm booking → send notification. Each step is idempotent with compensating actions. The shared-schemas package ensures Zod validation is identical on frontend and backend — type mismatches are caught at build time, not runtime.

**Outcome Metric:** 151 test files · CQRS architecture · Real-time WebSocket updates

**Code Diff (for card flip — 12 lines):**
```diff
+ // Idempotent booking creation with Saga compensation
+ async createBooking(dto: CreateBookingDto, idempotencyKey: string) {
+   const existing = await this.idempotencyStore.get(idempotencyKey);
+   if (existing) return existing.response;
+
+   const saga = this.sagaBuilder
+     .step('reserve', () => this.availabilityService.reserve(dto))
+     .compensate('release', () => this.availabilityService.release(dto))
+     .step('charge', () => this.paymentService.charge(dto))
+     .compensate('refund', () => this.paymentService.refund(dto))
+     .step('confirm', () => this.notificationService.send(dto));
+
+   return saga.execute();
+ }
```

**NDA Clearance:** Personal project — no restrictions.

---

## Project 2: FlowBoard — Collaborative Task Management ⭐ FEATURED

**Framework:** NestJS + Next.js
**Slug:** flowboard-task-management
**Featured:** Yes
**Claude-Assisted:** Yes

**Problem:** Remote teams need real-time task visibility without page refreshes. Existing tools either lack real-time sync or require expensive per-seat licenses.

**Solution:** A Kanban-style task management platform with real-time WebSocket collaboration, drag-and-drop reordering, workspace-level RBAC, and background job processing.

**Impact:** Full real-time collaboration — task moves, comments, and assignments sync instantly across all connected clients. Fractional indexing eliminates reorder conflicts between simultaneous users.

**Stack:** NestJS 10, Next.js 15, React 19, PostgreSQL 16, Redis 7, Prisma, Socket.IO, Bull Queue, Tailwind CSS v4, Zustand, TanStack Query, dnd-kit, TipTap, Radix UI

**My Role:** Solo architect and developer. Designed the modular monolith backend (12 NestJS modules), built the real-time WebSocket gateway, implemented fractional indexing for drag-and-drop, workspace RBAC system, Bull queue for email digests and scheduled tasks, and the full Next.js dashboard frontend.

**Complexity:** Drag-and-drop reordering uses fractional indexing instead of integer positions — no reindex cascade when moving items. The WebSocket gateway broadcasts granular events per workspace, so users only receive updates for boards they're viewing. Bull queues handle email digest aggregation asynchronously.

**Outcome Metric:** 12 backend modules · Real-time WebSocket sync · Fractional indexing

**Code Diff (for card flip — 12 lines):**
```diff
+ // Fractional indexing for conflict-free drag-and-drop reorder
+ async reorderTask(taskId: string, afterId?: string, beforeId?: string) {
+   const afterPos = afterId
+     ? (await this.getTask(afterId)).position
+     : null;
+   const beforePos = beforeId
+     ? (await this.getTask(beforeId)).position
+     : null;
+
+   const newPosition = generateFractionalIndex(afterPos, beforePos);
+   await this.prisma.task.update({
+     where: { id: taskId },
+     data: { position: newPosition },
+   });
+ }
```

**NDA Clearance:** Personal project — no restrictions.

---

## Project 3: Money Management — Personal Finance App

**Framework:** Next.js
**Slug:** money-management-app
**Featured:** No
**Claude-Assisted:** Yes

**Problem:** Personal finance tools are either too simple (spreadsheets) or too complex (enterprise accounting). There's no middle ground for individuals who want multi-account tracking with visual insights.

**Solution:** A comprehensive personal finance dashboard with multi-account management, transaction categorization, savings/investment/debt tracking, and exportable reports.

**Impact:** Unified view across 8 financial categories (transactions, savings, investments, debt, credit, insurance, assets, scheduled). PDF and Excel export for tax season.

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Zustand, Recharts, Radix UI, React Hook Form, Zod, dnd-kit, jsPDF, XLSX, date-fns

**My Role:** Solo developer. Built the full application: authentication flow, multi-account dashboard, drag-and-drop category management, chart visualizations (Recharts), PDF/Excel data export, and responsive mobile design.

**Complexity:** The dashboard aggregates data across 8 distinct financial categories into unified views with real-time chart updates. Drag-and-drop (dnd-kit) allows users to reorder accounts and categories. Export generates formatted PDF reports with auto-table layouts for printing.

**Outcome Metric:** 8 financial categories · PDF/Excel export · Drag-and-drop UI

**NDA Clearance:** Personal project — no restrictions.

---

## Project 4: [Laravel Project — Placeholder]

**Framework:** Laravel
**Slug:** laravel-project-placeholder
**Featured:** No
**Claude-Assisted:** No

**Problem:** [TO BE FILLED — describe the problem this Laravel project solves]

**Solution:** [TO BE FILLED — what does it do]

**Impact:** [TO BE FILLED — measurable outcome]

**Stack:** Laravel, PHP, MySQL/PostgreSQL, Redis, Vue/Livewire, Tailwind CSS

**My Role:** [TO BE FILLED]

**Complexity:** [TO BE FILLED — one technical depth signal]

**Outcome Metric:** [TO BE FILLED]

**NDA Clearance:** [VERIFY — check employment contract/NDA before including]

---

## Project 5: [Laravel Project 2 — Placeholder]

**Framework:** Laravel
**Slug:** laravel-project-2-placeholder
**Featured:** No
**Claude-Assisted:** No

> Same template as above — TO BE FILLED when ready.

---

## Project 6: [Additional Project — Placeholder]

**Framework:** [React / Other]
**Slug:** additional-project-placeholder
**Featured:** No

> Same template as above — TO BE FILLED when ready.

---

## Notes for the Developer

1. **Projects 1-3 are complete** and ready for the data layer. Copy is based on actual codebase exploration.
2. **Projects 4-6 are placeholders** — fill these in with your Laravel and other projects. Use the same template.
3. **NDA check required** for any work-related projects before including them.
4. **The expandable structure means you can add more projects anytime** — just add another entry to the data file following this template.
5. **Code diffs** are currently representative examples. Replace with actual git diffs from your repos for authenticity.
