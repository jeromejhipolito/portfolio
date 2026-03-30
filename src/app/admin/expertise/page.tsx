'use client';

import { useState, useEffect } from 'react';
import { FormField } from '@/components/admin/form-field';
import { FieldArray } from '@/components/admin/field-array';
import { SaveButton } from '@/components/admin/save-button';

export default function AdminExpertise() {
  const [data, setData] = useState<any[] | null>(null);
  const [sha, setSha] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch('/api/admin/expertise')
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
      const res = await fetch('/api/admin/expertise', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data, sha }) });
      if (!res.ok) throw new Error((await res.json()).error);
      setStatus('saved');
      setDirty(false);
      setTimeout(() => setStatus('idle'), 5000);
    } catch { setStatus('error'); }
  };

  if (!data || !data.length) return <p className="text-neutral-500">Loading...</p>;

  return (
    <form onSubmit={save} className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold text-white">Expertise Cards</h1>
      {data.map((item, i) => (
        <div key={i} className="rounded border border-neutral-800 bg-neutral-900/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-cyan-400">{item.title || 'New Card'}</h2>
          <FormField label="Title" name="title" value={item.title} onChange={(v) => update(i, 'title', v)} />
          <FormField label="Icon" name="icon" value={item.icon} onChange={(v) => update(i, 'icon', v)} />
          <FormField label="Plain Description (non-technical)" name="plainDescription" value={item.plainDescription} onChange={(v) => update(i, 'plainDescription', v)} type="textarea" />
          <FormField label="Technical Deep-Dive" name="technicalDeepDive" value={item.technicalDeepDive} onChange={(v) => update(i, 'technicalDeepDive', v)} type="textarea" />
          <FormField label="Tradeoff" name="tradeoff" value={item.tradeoff} onChange={(v) => update(i, 'tradeoff', v)} type="textarea" />
          <FormField label="Related Project Slug" name="relatedProject" value={item.relatedProject || ''} onChange={(v) => update(i, 'relatedProject', v)} placeholder="bookeasy-booking-system" />
        </div>
      ))}
      <SaveButton status={status} dirty={dirty} />
    </form>
  );
}
