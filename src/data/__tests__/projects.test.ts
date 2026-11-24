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
    // every string VALUE, nested ones too (key names like `claudeAssisted` / `githubUrl` would match)
    const values = (v: unknown): string[] =>
      typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(values) : [];
    const text = values(p).join('\n');
    const deny = [/claude/i, /anthropic/i, /openai|gpt-?\d/i, /gemini/i, /tmux/i, /\bmcp\b/i, /jira|slack|gitlab|github/i, /fincom/i, /mall\s*\+|mallplus/i, /MP-\d/, /jerome|hipolito/i, /@/, /https?:/, /\b[a-z0-9-]+\.(com|io|dev|app|asia|net|ai|org|co|me|so|xyz|tech|cloud)\b/i];
    for (const word of deny) {
      expect(text, String(word)).not.toMatch(word);
    }
  });
});
