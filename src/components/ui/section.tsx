import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('mx-auto max-w-[1200px] px-6 py-24 md:py-32', className)}
    >
      {children}
    </section>
  );
}
