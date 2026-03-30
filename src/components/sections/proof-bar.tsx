'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteConfig } from '@/data/site-config';

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="font-mono text-2xl font-bold text-accent sm:text-3xl"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
    >
      {value}
    </motion.span>
  );
}

export function ProofBar() {
  return (
    <div className="border-y border-border-subtle bg-bg-surface">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-3 lg:grid-cols-6">
        {siteConfig.proofMetrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <AnimatedCounter value={metric.value} />
            <p className="mt-1 text-xs text-text-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
