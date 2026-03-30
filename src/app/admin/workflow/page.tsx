'use client';

import { useState, useEffect } from 'react';
import { FormField } from '@/components/admin/form-field';
import { FieldArray } from '@/components/admin/field-array';
import { SaveButton } from '@/components/admin/save-button';

export default function AdminWorkflow() {
  const [data, setData] = useState<any[] | null>(null);
  const [sha, setSha] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch('/api/admin/workflow')
      .then((r) => r.json())
      .then((res) => { if (res.data) { setData(res.data); setSha(res.sha); } })
      .catch(() => {});
  }, []);

  const update = (index: number, key: string, value: unknown) => {
    setData((d) => d?.map((item, i) => (i === index ? { ...item, [key]: value } : item)) ?? null);
    setDirty(true);
    setStatus('idle');
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const res = await fetch('/api/admin/workflow', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data, sha }) });
      if (!res.ok) throw new Error((await res.json()).error);
      setStatus('saved');
      setDirty(false);
      setTimeout(() => setStatus('idle'), 5000);
    } catch { setStatus('error'); }
  };

  if (!data || !data.length) return <p className="text-neutral-500">Loading...</p>;

  return (
    <form onSubmit={save} className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold text-white">Workflow Steps</h1>
      {data.map((step, i) => (
        <div key={i} className="rounded border border-neutral-800 bg-neutral-900/50 p-6 space-y-4">
          <h2 className="font-mono text-sm text-cyan-400">Step {step.number}: {step.shortTitle}</h2>
          <FormField label="Title" name="title" value={step.title} onChange={(v) => update(i, 'title', v)} />
          <FormField label="Short Title" name="shortTitle" value={step.shortTitle} onChange={(v) => update(i, 'shortTitle', v)} />
          <FormField label="Description" name="description" value={step.description} onChange={(v) => update(i, 'description', v)} type="textarea" />
          <FieldArray label="Tools" values={step.tools || []} onChange={(v) => update(i, 'tools', v)} />
          <FormField label="Output" name="output" value={step.output} onChange={(v) => update(i, 'output', v)} />
          <FormField label="Quote" name="quote" value={step.quote} onChange={(v) => update(i, 'quote', v)} type="textarea" />
        </div>
      ))}
      <SaveButton status={status} dirty={dirty} />
    </form>
  );
}
