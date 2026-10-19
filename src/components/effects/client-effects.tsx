'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const CustomCursor = dynamic(
  () => import('./custom-cursor').then((m) => m.CustomCursor),
  { ssr: false },
);

export function ClientEffects() {
  // The homepage and project pages use the new design with the system cursor; only admin keeps the old trail.
  return usePathname()?.startsWith('/admin') ? <CustomCursor /> : null;
}
