import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded bg-bg-elevated motion-safe:animate-[shimmer_1.5s_infinite]',
        'motion-safe:bg-[length:200%_100%]',
        'motion-safe:bg-gradient-to-r motion-safe:from-bg-elevated motion-safe:via-bg-overlay motion-safe:to-bg-elevated',
        className,
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-sm border border-border-subtle bg-bg-surface p-4">
      <Skeleton className="mb-4 h-40 w-full" />
      <Skeleton className="mb-2 h-5 w-3/4" />
      <Skeleton className="mb-4 h-4 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}
