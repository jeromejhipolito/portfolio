'use client';

import { useState } from 'react';
import { FormField } from './form-field';
import { FieldArray } from './field-array';
import { SaveButton } from './save-button';
import type { Project } from '@/types/portfolio';

interface ProjectFormProps {
  project: Project;
  allProjects: Project[];
  isNew?: boolean;
}

export function ProjectForm({ project: initial, allProjects, isNew }: ProjectFormProps) {
  const [project, setProject] = useState<Project>(initial);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');

  const update = <K extends keyof Project>(key: K, value: Project[K]) => {
    setProject((p) => ({ ...p, [key]: value }));
    setDirty(true);
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setError('');

    try {
      // Fetch current SHA
      const getRes = await fetch('/api/admin/projects');
      const { data: current, sha } = await getRes.json();

      let updated;
      if (isNew) {
        updated = [...current, project];
      } else {
        updated = current.map((p: Project) => (p.slug === project.slug ? project : p));
      }

      const putRes = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updated, sha }),
      });

      if (!putRes.ok) {
        const err = await putRes.json();
        throw new Error(err.error || 'Save failed');
      }

      setStatus('saved');
      setDirty(false);
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const frameworkOptions = [
    { value: 'laravel', label: 'Laravel' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nestjs', label: 'NestJS' },
    { value: 'react', label: 'React' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <FormField label="Slug" name="slug" value={project.slug} onChange={(v) => update('slug', v as string)} required />
      <FormField label="Name" name="name" value={project.name} onChange={(v) => update('name', v as string)} required />
      <FormField label="Problem" name="problem" value={project.problem} onChange={(v) => update('problem', v as string)} type="textarea" required />
      <FormField label="Solution" name="solution" value={project.solution} onChange={(v) => update('solution', v as string)} type="textarea" required />
      <FormField label="Impact" name="impact" value={project.impact} onChange={(v) => update('impact', v as string)} type="textarea" required />
      <FormField label="Framework" name="framework" value={project.framework} onChange={(v) => update('framework', v as Project['framework'])} type="select" options={frameworkOptions} />
      <FieldArray label="Tech Stack" values={project.techStack} onChange={(v) => update('techStack', v)} placeholder="Add technology..." />
      <FormField label="GitHub URL" name="githubUrl" value={project.githubUrl} onChange={(v) => update('githubUrl', v as string)} type="url" required />
      <FormField label="Screenshot Path" name="screenshot" value={project.screenshot} onChange={(v) => update('screenshot', v as string)} placeholder="/projects/name.svg" />
      <FormField label="Outcome Metric" name="outcomeMetric" value={project.outcomeMetric} onChange={(v) => update('outcomeMetric', v as string)} required />
      <FormField label="Order" name="order" value={project.order} onChange={(v) => update('order', v as number)} type="number" />
      <div className="flex gap-6">
        <FormField label="Featured" name="featured" value={project.featured} onChange={(v) => update('featured', v as boolean)} type="checkbox" />
        <FormField label="Claude-assisted" name="claudeAssisted" value={project.claudeAssisted} onChange={(v) => update('claudeAssisted', v as boolean)} type="checkbox" />
      </div>
      <FormField label="Code Diff" name="codeDiff" value={project.codeDiff || ''} onChange={(v) => update('codeDiff', v as string)} type="textarea" />
      <SaveButton status={status} dirty={dirty} error={error} />
    </form>
  );
}
