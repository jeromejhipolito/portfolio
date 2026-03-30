'use client';

import { cn } from '@/lib/utils';

interface FilterTabsProps {
  options: Array<{ value: string; label: string; count: number }>;
  active: string;
  onChange: (value: string) => void;
}

export function FilterTabs({ options, active, onChange }: FilterTabsProps) {
  return (
    <div
      role="tablist"
      className="mb-8 flex flex-wrap gap-2 overflow-x-auto"
    >
      {options.map((option) => (
        <button
          key={option.value}
          role="tab"
          aria-selected={active === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'rounded-sm px-4 py-2 font-mono text-sm transition-colors duration-150',
            active === option.value
              ? 'bg-accent text-bg-base'
              : 'bg-bg-surface text-text-secondary hover:text-text-primary border border-border-subtle',
          )}
        >
          {option.label}{' '}
          <span className="opacity-60">({option.count})</span>
        </button>
      ))}
    </div>
  );
}
