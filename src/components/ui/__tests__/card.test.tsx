import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../card';

describe('Card component', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies overflow-hidden and break-words', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('overflow-hidden');
    expect(card.className).toContain('break-words');
  });

  it('applies hover classes when hover is true', () => {
    const { container } = render(<Card hover>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('hover:-translate-y-1');
  });

  it('does not apply hover classes when hover is false', () => {
    const { container } = render(<Card hover={false}>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain('hover:-translate-y-1');
  });
});
