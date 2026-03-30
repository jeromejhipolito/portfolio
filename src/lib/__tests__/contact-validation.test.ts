import { describe, it, expect } from 'vitest';
import { contactSchema } from '../validations/contact';

describe('contactSchema', () => {
  const validData = {
    name: 'Jane Recruiter',
    email: 'jane@company.com',
    subject: 'Job Opportunity' as const,
    message: 'Hello, I have an exciting opportunity for you.',
  };

  it('accepts valid data', () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects name shorter than 2 chars', () => {
    const result = contactSchema.safeParse({ ...validData, name: 'A' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 2');
    }
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...validData, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid subject', () => {
    const result = contactSchema.safeParse({ ...validData, subject: 'Invalid Subject' });
    expect(result.success).toBe(false);
  });

  it('rejects message under 10 chars', () => {
    const result = contactSchema.safeParse({ ...validData, message: 'Short' });
    expect(result.success).toBe(false);
  });

  it('strips HTML tags from name and message', () => {
    const result = contactSchema.safeParse({
      ...validData,
      name: '<script>alert("xss")</script>Jane',
      message: '<b>Bold</b> message with <a href="#">link</a> inside it.',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('alert("xss")Jane');
      expect(result.data.message).toBe('Bold message with link inside it.');
    }
  });

  it('trims whitespace', () => {
    const result = contactSchema.safeParse({
      ...validData,
      name: '  Jane  ',
      email: '  jane@company.com  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Jane');
      expect(result.data.email).toBe('jane@company.com');
    }
  });

  it('accepts honeypot field (optional)', () => {
    const result = contactSchema.safeParse({ ...validData, website: 'spam-bot-value' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe('spam-bot-value');
    }
  });
});
