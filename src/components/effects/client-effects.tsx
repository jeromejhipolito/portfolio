'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const CustomCursor = dynamic(
  () => import('./custom-cursor').then((m) => m.CustomCursor),
  { ssr: false },
);

export function ClientEffects() {
  // The homepage has its own design and keeps the system cursor.
  return usePathname() === '/' ? null : <CustomCursor />;
}
