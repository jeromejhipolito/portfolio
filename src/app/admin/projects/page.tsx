import Link from 'next/link';
import { projects } from '@/data/projects';

export default function AdminProjects() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-400"
        >
          + New Project
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-800 text-neutral-400">
            <tr>
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 pr-4">Framework</th>
              <th className="pb-3 pr-4">Featured</th>
              <th className="pb-3 pr-4">Order</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.slug} className="border-b border-neutral-800/50">
                <td className="py-3 pr-4 font-medium text-white">{project.name}</td>
                <td className="py-3 pr-4 font-mono text-xs text-neutral-400">{project.framework}</td>
                <td className="py-3 pr-4">
                  {project.featured ? (
                    <span className="text-cyan-400">★</span>
                  ) : (
                    <span className="text-neutral-600">—</span>
                  )}
                </td>
                <td className="py-3 pr-4 font-mono text-neutral-400">{project.order}</td>
                <td className="py-3">
                  <Link
                    href={`/admin/projects/${project.slug}`}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
