import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, _getStoreForTesting } from '../rate-limit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    _getStoreForTesting().clear();
  });

  it('allows the first request', () => {
    const result = checkRateLimit('192.168.1.1');
    expect(result.allowed).toBe(true);
  });

  it('allows up to 5 requests from the same IP', () => {
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit('192.168.1.1');
      expect(result.allowed).toBe(true);
    }
  });

  it('blocks the 6th request from the same IP', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('192.168.1.1');
    }
    const result = checkRateLimit('192.168.1.1');
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it('tracks different IPs independently', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('192.168.1.1');
    }
    const blockedResult = checkRateLimit('192.168.1.1');
    expect(blockedResult.allowed).toBe(false);

    const newIpResult = checkRateLimit('10.0.0.1');
    expect(newIpResult.allowed).toBe(true);
  });

  it('returns retryAfter in seconds', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('192.168.1.1');
    }
    const result = checkRateLimit('192.168.1.1');
    expect(result.retryAfter).toBeLessThanOrEqual(3600);
    expect(result.retryAfter).toBeGreaterThan(0);
  });
});
