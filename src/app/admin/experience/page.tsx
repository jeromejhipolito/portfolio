'use client';

import { useState, useEffect } from 'react';
import { FormField } from '@/components/admin/form-field';
import { FieldArray } from '@/components/admin/field-array';
import { SaveButton } from '@/components/admin/save-button';

export default function AdminExperience() {
  const [data, setData] = useState<any[] | null>(null);
  const [sha, setSha] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch('/api/admin/experience')
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
      const res = await fetch('/api/admin/experience', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data, sha }) });
      if (!res.ok) throw new Error((await res.json()).error);
      setStatus('saved');
      setDirty(false);
      setTimeout(() => setStatus('idle'), 5000);
    } catch { setStatus('error'); }
  };

  if (!data || !data.length) return <p className="text-neutral-500">Loading...</p>;

  return (
    <form onSubmit={save} className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold text-white">Experience</h1>
      {data.map((job, i) => (
        <div key={i} className="rounded border border-neutral-800 bg-neutral-900/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-cyan-400">{job.company || 'New Entry'}</h2>
          <FormField label="Company" name="company" value={job.company} onChange={(v) => update(i, 'company', v)} />
          <FormField label="Role" name="role" value={job.role} onChange={(v) => update(i, 'role', v)} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Start Date" name="startDate" value={job.startDate} onChange={(v) => update(i, 'startDate', v)} />
            <FormField label="End Date" name="endDate" value={job.endDate || ''} onChange={(v) => update(i, 'endDate', v)} placeholder="present" />
          </div>
          <FormField label="Outcome Metric" name="outcomeMetric" value={job.outcomeMetric} onChange={(v) => update(i, 'outcomeMetric', v)} />
          <FieldArray label="Responsibilities" values={job.responsibilities || []} onChange={(v) => update(i, 'responsibilities', v)} />
          <FieldArray label="Tech Stack" values={job.techStack || []} onChange={(v) => update(i, 'techStack', v)} />
        </div>
      ))}
      <SaveButton status={status} dirty={dirty} />
    </form>
  );
}
