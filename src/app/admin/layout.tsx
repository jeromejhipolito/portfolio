import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Experience', href: '/admin/experience' },
  { label: 'Workflow', href: '/admin/workflow' },
  { label: 'Expertise', href: '/admin/expertise' },
  { label: 'Site Config', href: '/admin/site-config' },
  { label: 'Images', href: '/admin/images' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-200">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-neutral-800 bg-neutral-900 p-4">
        <Link href="/admin" className="mb-6 block font-mono text-lg font-bold text-cyan-400">
          Admin
        </Link>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded px-3 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-neutral-800 pt-4">
          <Link href="/" className="text-xs text-neutral-500 hover:text-cyan-400 transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
