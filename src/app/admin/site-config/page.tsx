'use client';

import { useState, useEffect } from 'react';
import { FormField } from '@/components/admin/form-field';
import { SaveButton } from '@/components/admin/save-button';

export default function AdminSiteConfig() {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [sha, setSha] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch('/api/admin/site-config')
      .then((r) => r.json())
      .then((res) => { if (res.data) { setData(res.data); setSha(res.sha); } })
      .catch(() => {});
  }, []);

  const update = (key: string, value: unknown) => {
    setData((d) => d ? { ...d, [key]: value } : d);
    setDirty(true);
    setStatus('idle');
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const res = await fetch('/api/admin/site-config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data, sha }) });
      if (!res.ok) throw new Error((await res.json()).error);
      setStatus('saved');
      setDirty(false);
      setTimeout(() => setStatus('idle'), 5000);
    } catch { setStatus('error'); }
  };

  if (!data) return <p className="text-neutral-500">Loading...</p>;

  return (
    <form onSubmit={save} className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-white">Site Config</h1>
      <FormField label="Name" name="name" value={data.name} onChange={(v) => update('name', v)} />
      <FormField label="Title" name="title" value={data.title} onChange={(v) => update('title', v)} />
      <FormField label="Tagline" name="tagline" value={data.tagline} onChange={(v) => update('tagline', v)} />
      <FormField label="Subtitle" name="subtitle" value={data.subtitle} onChange={(v) => update('subtitle', v)} />
      <FormField label="Availability" name="availability" value={data.availability} onChange={(v) => update('availability', v)} />
      <FormField label="Location" name="location" value={data.location} onChange={(v) => update('location', v)} />
      <FormField label="Resume Date" name="resumeDate" value={data.resumeDate} onChange={(v) => update('resumeDate', v)} />
      <FormField label="Meta Title" name="metaTitle" value={data.metaTitle} onChange={(v) => update('metaTitle', v)} />
      <FormField label="Meta Description" name="metaDescription" value={data.metaDescription} onChange={(v) => update('metaDescription', v)} type="textarea" />
      <SaveButton status={status} dirty={dirty} />
    </form>
  );
}
