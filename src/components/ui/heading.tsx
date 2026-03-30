import { cn } from '@/lib/utils';

interface HeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function Heading({ label, title, subtitle, className }: HeadingProps) {
  return (
    <div className={cn('mb-12', className)}>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.1em] text-text-secondary">
        // {label}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-text-primary">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
