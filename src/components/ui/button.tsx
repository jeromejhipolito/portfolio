import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: undefined;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  href: string;
};

type Props = ButtonProps | AnchorProps;

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-bg-base hover:bg-accent-dim active:scale-[0.97] motion-safe:transition-all',
  secondary:
    'border border-accent text-accent hover:bg-accent/10 active:scale-[0.97] motion-safe:transition-all',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-bg-elevated motion-safe:transition-colors',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded px-5 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50';

export function Button({ variant = 'primary', className, ...props }: Props) {
  const classes = cn(base, variants[variant], className);

  if ('href' in props && props.href) {
    return <a className={classes} {...(props as AnchorProps)} />;
  }

  return <button className={classes} {...(props as ButtonProps)} />;
}
