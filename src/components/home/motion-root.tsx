'use client';

import { MotionConfig } from 'framer-motion';

// Every framer-motion animation on the page respects the visitor's reduced-motion setting.
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
