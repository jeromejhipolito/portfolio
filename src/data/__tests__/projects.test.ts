import { existsSync } from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { projects } from '../projects';

const publicFile = (src: string) => path.join(__dirname, '../../../public', src);

describe('projects data', () => {
  it('has unique slugs and orders', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.order)).size).toBe(projects.length);
  });

  it('points every screenshot and gallery item at a file in public/', () => {
    for (const p of projects) {
      for (const src of [p.screenshot, ...(p.gallery ?? []).map((g) => g.src)]) {
        expect(existsSync(publicFile(src)), `${p.slug}: ${src}`).toBe(true);
      }
    }
  });

  // Private projects are described by what they do, never how they are built.
  it('keeps the handsoff entry capability-only', () => {
    const p = projects.find((x) => x.slug === 'handsoff-agent-orchestrator');
    expect(p).toBeDefined();
    expect(p!.githubUrl).toBe('');
    expect(p!.claudeAssisted).toBe(false);
    expect(p!.codeDiff).toBeUndefined();
    expect(p!.gallery?.[0]?.src).toBe(p!.screenshot);
    // values only: the key `claudeAssisted` itself would match
    const text = JSON.stringify([p!.name, p!.problem, p!.solution, p!.impact, p!.techStack, p!.outcomeMetric, p!.demoNote, p!.gallery]);
    for (const word of [/claude/i, /anthropic/i, /tmux/i, /\bmcp\b/i, /fincom/i, /mall\s*\+|mallplus/i, /MP-\d/, /@/, /https?:/]) {
      expect(text, String(word)).not.toMatch(word);
    }
  });
});
