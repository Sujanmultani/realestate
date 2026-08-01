'use client';

import { motion } from 'framer-motion';

export default function MarqueeStrip({ items = [] }) {
  const defaultItems = [
    'Verified Title Deeds',
    '0% Commission Fees',
    'Mumbai Sky Villas',
    'Bengaluru Tech Parks',
    'Ahmedabad Townships',
    'Hyderabad Jubilee Hills',
    '1,500+ Direct Owner Residences',
    'On-Site Physical Inspection',
    'Legal Agreement Guidance',
  ];

  const displayItems = items.length ? items : defaultItems;

  return (
    <div className="relative overflow-hidden bg-sunken border-y border-border py-3">
      {/* Solid warm bg mask overlays on edges (NO gradient) */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-sunken z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-sunken z-10 pointer-events-none" />

      <div className="flex w-max space-x-8">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
          }}
          className="flex space-x-8 shrink-0 items-center"
        >
          {[...displayItems, ...displayItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
