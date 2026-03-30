'use client';

interface SaveButtonProps {
  status: 'idle' | 'saving' | 'saved' | 'error';
  dirty?: boolean;
  error?: string;
}

export function SaveButton({ status, dirty, error }: SaveButtonProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="submit"
        disabled={status === 'saving'}
        className="rounded bg-cyan-500 px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-cyan-400 disabled:opacity-50"
      >
        {status === 'saving' ? 'Saving...' : status === 'saved' ? '✓ Saved' : 'Save Changes'}
      </button>
      {dirty && status === 'idle' && (
        <span className="text-xs text-yellow-500">Unsaved changes</span>
      )}
      {status === 'saved' && (
        <span className="text-xs text-green-400">Saved — deploying to Vercel...</span>
      )}
      {status === 'error' && (
        <span className="text-xs text-red-400">{error || 'Save failed. Try again.'}</span>
      )}
    </div>
  );
}
