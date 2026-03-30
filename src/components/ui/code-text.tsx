import { cn } from '@/lib/utils';

interface CodeTextProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeText({ children, className }: CodeTextProps) {
  return (
    <code
      className={cn(
        'rounded bg-bg-elevated/50 px-1.5 py-0.5 font-mono text-[0.9em] text-accent-text',
        className,
      )}
    >
      {children}
    </code>
  );
}
