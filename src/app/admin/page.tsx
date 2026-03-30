import Link from 'next/link';
import { projects } from '@/data/projects';
import { experience } from '@/data/experience';
import { workflowSteps } from '@/data/workflow';
import { expertiseItems } from '@/data/expertise';

const cards = [
  { label: 'Projects', count: projects.length, href: '/admin/projects', color: 'bg-cyan-500/10 border-cyan-500/30' },
  { label: 'Experience', count: experience.length, href: '/admin/experience', color: 'bg-purple-500/10 border-purple-500/30' },
  { label: 'Workflow Steps', count: workflowSteps.length, href: '/admin/workflow', color: 'bg-green-500/10 border-green-500/30' },
  { label: 'Expertise', count: expertiseItems.length, href: '/admin/expertise', color: 'bg-orange-500/10 border-orange-500/30' },
  { label: 'Site Config', count: 1, href: '/admin/site-config', color: 'bg-pink-500/10 border-pink-500/30' },
  { label: 'Images', count: null, href: '/admin/images', color: 'bg-yellow-500/10 border-yellow-500/30' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-white">Dashboard</h1>
      <p className="mb-8 text-sm text-neutral-400">
        Manage your portfolio content. Changes are committed to GitHub and auto-deployed.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`rounded-lg border p-6 transition-colors hover:bg-neutral-800/50 ${card.color}`}
          >
            <p className="text-3xl font-bold text-white">{card.count ?? '—'}</p>
            <p className="mt-1 text-sm text-neutral-400">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded border border-neutral-800 bg-neutral-900/50 p-4">
        <p className="font-mono text-xs text-neutral-500">
          How it works: Edit content here → Saved to GitHub repo → Vercel auto-redeploys → Live in ~60-90s
        </p>
      </div>
    </div>
  );
}
