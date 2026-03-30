'use client';

import { useState } from 'react';

export default function AdminImages() {
  const [file, setFile] = useState<File | null>(null);
  const [destination, setDestination] = useState('');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ path?: string; error?: string } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      // Auto-suggest destination from filename
      const name = f.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
      setDestination(`projects/${name}`);
    }
  };

  const upload = async () => {
    if (!file || !destination) return;
    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('destination', destination);

      const res = await fetch('/api/admin/images', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setResult({ path: data.path });
      setFile(null);
      setPreview(null);
    } catch (err) {
      setResult({ error: err instanceof Error ? err.message : 'Upload failed' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-white">Image Upload</h1>
      <p className="mb-6 text-sm text-neutral-400">
        Upload images to the portfolio repo. Files are committed to <code className="text-cyan-400">public/</code> via the GitHub API.
      </p>

      <div className="space-y-4">
        {/* File input */}
        <div className="rounded border-2 border-dashed border-neutral-700 p-8 text-center transition-colors hover:border-neutral-500">
          <input
            type="file"
            accept=".svg,.png,.jpg,.jpeg,.webp,.pdf"
            onChange={handleFileChange}
            className="mx-auto block text-sm text-neutral-400 file:mr-4 file:rounded file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:text-black file:cursor-pointer"
          />
          <p className="mt-2 text-xs text-neutral-500">SVG, PNG, JPG, WebP, or PDF — max 1MB</p>
        </div>

        {/* Preview */}
        {preview && (
          <div className="rounded border border-neutral-800 bg-neutral-900 p-4">
            <p className="mb-2 text-xs text-neutral-500">Preview:</p>
            <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded" />
          </div>
        )}

        {/* Destination */}
        <div>
          <label className="mb-1.5 block text-sm text-neutral-400">Destination path</label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="projects/my-image.svg"
            className="w-full rounded border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-neutral-500">Will be saved to: public/{destination}</p>
        </div>

        {/* Upload button */}
        <button
          onClick={upload}
          disabled={!file || !destination || uploading}
          className="rounded bg-cyan-500 px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-cyan-400 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload to Repo'}
        </button>

        {/* Result */}
        {result?.path && (
          <div className="rounded border border-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-400">Uploaded successfully!</p>
            <p className="mt-1 font-mono text-xs text-neutral-300">
              Public path: <code className="text-cyan-400">{result.path}</code>
            </p>
          </div>
        )}
        {result?.error && (
          <div className="rounded border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">{result.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
