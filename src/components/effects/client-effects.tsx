'use client';

import dynamic from 'next/dynamic';

const CustomCursor = dynamic(
  () => import('./custom-cursor').then((m) => m.CustomCursor),
  { ssr: false },
);

export function ClientEffects() {
  return <CustomCursor />;
}
