import { cn } from '@/lib/utils';

type BadgeVariant = 'framework' | 'status' | 'claude' | 'default';

const variants: Record<BadgeVariant, string> = {
  framework: 'bg-syntax-purple/15 text-syntax-purple border-syntax-purple/20',
  status: 'bg-syntax-green/15 text-syntax-green border-syntax-green/20',
  claude: 'bg-syntax-pink/15 text-syntax-pink border-syntax-pink/20',
  default: 'bg-bg-elevated text-text-secondary border-border-default',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
