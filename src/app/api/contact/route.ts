import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { checkRateLimit } from '@/lib/rate-limit';
import { siteConfig } from '@/data/site-config';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  const { allowed, retryAfter } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
        retryAfter,
        fallbackUrl: siteConfig.socialLinks.find((l) => l.platform === 'linkedin')?.url,
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0]?.toString();
      if (field) fieldErrors[field] = issue.message;
    }
    return NextResponse.json(
      { success: false, errors: fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, subject, message, website } = result.data;

  // Honeypot: if filled, pretend success but don't send
  if (website) {
    return NextResponse.json({ success: true });
  }

  // TODO: Wire email sending (Resend) in C1
  // For now, log and return success
  console.log('[Contact]', { name, email, subject, message: message.slice(0, 50) });

  return NextResponse.json({
    success: true,
    message: "Got it — I'll reply within 48 hours.",
  });
}
