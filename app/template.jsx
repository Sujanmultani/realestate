'use client';

import { motion } from 'framer-motion';

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
