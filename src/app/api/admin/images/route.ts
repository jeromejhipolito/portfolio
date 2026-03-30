import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/github-api';

const ALLOWED_PATTERN = /^[a-z0-9-/]+\.(svg|png|jpg|jpeg|webp|pdf)$/;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const destination = formData.get('destination') as string | null;

    if (!file || !destination) {
      return NextResponse.json(
        { error: 'Missing file or destination' },
        { status: 400 },
      );
    }

    if (!ALLOWED_PATTERN.test(destination)) {
      return NextResponse.json(
        { error: 'Invalid destination path. Use lowercase alphanumeric with extensions: svg, png, jpg, webp, pdf' },
        { status: 400 },
      );
    }

    if (file.size > 1_000_000) {
      return NextResponse.json(
        { error: 'File too large. Maximum 1MB for GitHub API uploads.' },
        { status: 400 },
      );
    }

    const buffer = await file.arrayBuffer();
    const publicPath = await uploadImage(destination, buffer);

    return NextResponse.json({ success: true, path: publicPath });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
