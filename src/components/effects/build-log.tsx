const logLines = [
  '$ git push origin main',
  'npm run build',
  '✓ Compiled successfully',
  '$ npx playwright test',
  'Running 523 tests...',
  '✓ booking.create.spec.ts (12 passed)',
  '✓ auth.login.spec.ts (8 passed)',
  'npm run lint -- --fix',
  '$ docker compose up -d',
  'postgres:16 running on :5432',
  'redis:7 running on :6379',
  '$ npx prisma migrate deploy',
  'Applied 14 migrations',
  '$ curl localhost:3001/api/health',
  '{"status":"ok"}',
  'git commit -m "feat: add idempotency keys"',
  'npm run test:coverage',
  'Statements: 94.2% | Branches: 89.1%',
  '$ next build',
  'Route (app) 12 routes',
  '✓ Generating static pages (12/12)',
  'Deploy to Vercel: Success',
  '$ lighthouse --mobile',
  'Performance: 97 | A11y: 100',
];

export function BuildLog() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      <div
        className="build-log-scroll font-mono text-xs leading-6 text-text-muted opacity-[0.05]"
        style={{
          maskImage: 'linear-gradient(transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      >
        {/* Duplicate for seamless loop */}
        {[...logLines, ...logLines].map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}
