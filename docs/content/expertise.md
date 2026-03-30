# Expertise Card Copy

Each card: plain-language layer (default visible) + technical deep-dive (expandable).

---

## 1. Microservices Architecture

**Plain-language (visible by default):**
I break large applications into independent services that can be built, deployed, and scaled separately — so a problem in one part never brings down the whole system.

**Technical deep-dive (expandable):**
I design bounded contexts using Domain-Driven Design, with each service owning its data store and communicating through well-defined API contracts or async events. Services are independently deployable via Docker containers with health checks and graceful shutdown. The tradeoff: microservices add operational complexity — distributed tracing, service discovery, and network failure handling are mandatory, not optional. I only split a monolith when the team or domain boundaries justify it.

**Related project:** Booking System v2 (NestJS monorepo with service separation)

---

## 2. Event Streaming (AMQP / Kafka)

**Plain-language (visible by default):**
When services need to talk to each other, I use message queues that guarantee delivery even when something fails — orders keep processing, notifications keep sending, data stays consistent.

**Technical deep-dive (expandable):**
I implement event-driven architectures using RabbitMQ (AMQP) for task queues and command routing, and Kafka for high-throughput event streaming and log-based processing. Patterns include transactional outbox for exactly-once event publishing, dead-letter exchanges for failed message recovery, and consumer group rebalancing for horizontal scaling. The tradeoff: async messaging makes debugging harder — you trade request-response simplicity for resilience, which means investing in structured logging and distributed tracing from day one.

**Related project:** Booking System v2 (RabbitMQ event-driven architecture)

---

## 3. Saga Pattern

**Plain-language (visible by default):**
When a business operation spans multiple services — like booking a slot, charging a card, and sending a confirmation — I coordinate them so that if any step fails, all previous steps roll back automatically.

**Technical deep-dive (expandable):**
I implement choreography-based Sagas where each service listens for domain events and either continues the chain or triggers compensating actions. Each step is idempotent, so retries are safe. The saga state is tracked via an event log, not a central orchestrator, which avoids a single point of failure. The tradeoff: Saga choreography requires careful failure mapping before writing code. Every step needs a defined compensating action, and the more steps in the chain, the more complex the rollback graph becomes. I document the failure matrix upfront as part of the planning phase.

**Related project:** Booking System v2 (multi-step reservation flow with compensation)

---

## 4. Idempotency

**Plain-language (visible by default):**
I build APIs where sending the same request twice never creates a duplicate — so retries are always safe, whether it's a payment, a booking, or a notification.

**Technical deep-dive (expandable):**
Every mutating API endpoint accepts an `X-Idempotency-Key` header. The key is stored alongside the response in a database table with a TTL. On duplicate request, the stored response is returned without re-executing the operation. For event consumers, I use message deduplication via a processed-events table checked before handler execution. The tradeoff: idempotency adds a database lookup to every write operation, which marginally increases latency. For any system handling payments or state mutations, this cost is negligible compared to the cost of a duplicate charge or double-booking.

**Related project:** Booking System v2 (idempotent reservation endpoints)

---

## 5. Custom Packages & Libraries

**Plain-language (visible by default):**
I build reusable packages that solve common problems across projects — so I don't reinvent the wheel every time I start a new application.

**Technical deep-dive (expandable):**
I maintain shared packages in monorepo structures (Turborepo/pnpm workspaces) including: typed API client generators, validation schema libraries, event bus abstractions, and testing utilities. Packages are versioned, published to private registries, and consumed across projects via workspace protocols. The tradeoff: maintaining shared packages means backward compatibility discipline — breaking changes require migration guides and coordinated updates across consuming projects.

**Related project:** FlowBoard (shared packages in Turborepo monorepo)
