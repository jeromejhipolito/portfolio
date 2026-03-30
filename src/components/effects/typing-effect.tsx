import { cn } from '@/lib/utils';

interface TypingEffectProps {
  lines: string[];
  className?: string;
}

export function TypingEffect({ lines, className }: TypingEffectProps) {
  return (
    <div className={cn('typing-container', className)}>
      {lines.map((line, i) => (
        <div
          key={i}
          className="typing-line overflow-hidden whitespace-nowrap border-r-2 border-accent"
          style={{
            animationDelay: `${i * 0.8}s`,
            animationDuration: '0.8s',
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
