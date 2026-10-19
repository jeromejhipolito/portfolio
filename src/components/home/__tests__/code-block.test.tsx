import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { CodeBlock } from '../code-block';

describe('CodeBlock', () => {
  it('drops the leading diff marker and greys out comment lines', () => {
    const { container } = render(<CodeBlock code={"+ -- a comment\n+ CONSTRAINT 'x'"} />);
    expect(container.textContent).not.toContain('+ ');
    // Each line has a wrapper span with the same text, so look for any matching span carrying the colour.
    const comment = [...container.querySelectorAll('span')].filter((s) => s.textContent === '-- a comment');
    expect(comment.some((s) => s.className.includes('#64748b'))).toBe(true);
  });

  it('colours keywords and strings', () => {
    const { container } = render(<CodeBlock code={"const x = 'hi'"} />);
    const spans = [...container.querySelectorAll('span')];
    expect(spans.find((s) => s.textContent === 'const')?.className).toContain('#7eeeff');
    expect(spans.find((s) => s.textContent === "'hi'")?.className).toContain('#3dff9a');
  });
});
