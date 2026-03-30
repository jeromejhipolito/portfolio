import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from '@/lib/github-api';
import fs from 'fs';
import path from 'path';

const RESOURCE_MAP: Record<string, string> = {
  projects: 'src/data/projects.json',
  experience: 'src/data/experience.json',
  workflow: 'src/data/workflow.json',
  expertise: 'src/data/expertise.json',
  'site-config': 'src/data/site-config.json',
};

const useGitHub = !!process.env.GITHUB_TOKEN && !!process.env.GITHUB_REPO;

interface RouteParams {
  params: Promise<{ resource: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { resource } = await params;
  const filePath = RESOURCE_MAP[resource];

  if (!filePath) {
    return NextResponse.json({ error: `Unknown resource: ${resource}` }, { status: 404 });
  }

  try {
    if (useGitHub) {
      const { content, sha } = await readFile(filePath);
      const data = JSON.parse(content);
      return NextResponse.json({ data, sha });
    }

    // Local fallback — read directly from filesystem
    const fullPath = path.join(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const data = JSON.parse(content);
    return NextResponse.json({ data, sha: 'local' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { resource } = await params;
  const filePath = RESOURCE_MAP[resource];

  if (!filePath) {
    return NextResponse.json({ error: `Unknown resource: ${resource}` }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { data, sha } = body;

    if (!data) {
      return NextResponse.json({ error: 'Missing required field: data' }, { status: 400 });
    }

    const content = JSON.stringify(data, null, 2);

    if (useGitHub) {
      if (!sha) {
        return NextResponse.json({ error: 'Missing required field: sha' }, { status: 400 });
      }
      await writeFile(filePath, content, sha, `admin: update ${resource}`);
    } else {
      // Local fallback — write directly to filesystem
      const fullPath = path.join(process.cwd(), filePath);
      fs.writeFileSync(fullPath, content, 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = message.includes('SHA conflict') ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
