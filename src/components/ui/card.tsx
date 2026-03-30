import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-sm border border-border-subtle bg-bg-surface break-words',
        hover &&
          'motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_0_20px_var(--color-accent-glow)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
