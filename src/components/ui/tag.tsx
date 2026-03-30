import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block rounded bg-bg-elevated px-2 py-0.5 font-mono text-xs text-text-secondary',
        className,
      )}
    >
      {children}
    </span>
  );
}
