export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface py-8">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <p className="font-mono text-sm text-text-muted">
          Built with{' '}
          <span className="text-text-secondary">Next.js</span> · Deployed on{' '}
          <span className="text-text-secondary">Vercel</span> · CI/CD via{' '}
          <span className="text-text-secondary">GitHub Actions</span>
        </p>
        <p className="mt-2 font-mono text-xs text-text-muted">
          Lighthouse:{' '}
          <span className="text-syntax-green">90+</span> · Security:{' '}
          <span className="text-syntax-green">A+</span>
        </p>
        <p className="mt-4 text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Jerome Hipolito. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
