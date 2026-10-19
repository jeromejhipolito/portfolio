import { describe, expect, it } from 'vitest';
import { step } from '../pipeline-board';

const board = () => ({
  lanes: [0, 1, 2, 3, 4].map((i) => ({ name: `t${i}`, stage: 0 })),
  shipped: 0,
  next: 5,
  tick: 0,
});

describe('pipeline board step', () => {
  it('moves one lane per tick', () => {
    const b = step(board());
    expect(b.lanes.filter((l) => l.stage === 1)).toHaveLength(1);
  });

  it('ships a ticket after review and starts a new one at plan', () => {
    let b = { ...board(), lanes: board().lanes.map((l) => ({ ...l, stage: 4 })) };
    b = step(b);
    expect(b.shipped).toBe(1);
    expect(b.next).toBe(6);
    expect(b.lanes.filter((l) => l.stage === 0)).toHaveLength(1);
  });
});
