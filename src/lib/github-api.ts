const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_REPO = process.env.GITHUB_REPO || '';
const API_BASE = 'https://api.github.com';

interface GitHubFileResponse {
  content: string;
  sha: string;
  path: string;
}

function headers() {
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

export async function readFile(path: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${API_BASE}/repos/${GITHUB_REPO}/contents/${path}`, {
    headers: headers(),
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error(`File not found: ${path}`);
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data: GitHubFileResponse = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

export async function writeFile(
  path: string,
  content: string,
  sha: string,
  message: string,
): Promise<void> {
  const encoded = Buffer.from(content).toString('base64');

  const res = await fetch(`${API_BASE}/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ message, content: encoded, sha }),
  });

  if (!res.ok) {
    if (res.status === 409) throw new Error('SHA conflict — file was modified. Reload and retry.');
    throw new Error(`GitHub API write error: ${res.status} ${res.statusText}`);
  }
}

export async function uploadImage(
  destination: string,
  buffer: ArrayBuffer,
): Promise<string> {
  const encoded = Buffer.from(buffer).toString('base64');
  const path = `public/${destination}`;

  // Check if file exists to get SHA for update
  let sha: string | undefined;
  try {
    const existing = await readFile(path);
    sha = existing.sha;
  } catch {
    // File doesn't exist — that's fine, create new
  }

  const res = await fetch(`${API_BASE}/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({
      message: `admin: upload ${destination}`,
      content: encoded,
      ...(sha && { sha }),
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API upload error: ${res.status} ${res.statusText}`);
  }

  return `/${destination}`;
}
