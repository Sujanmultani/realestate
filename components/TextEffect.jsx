'use client';

import { motion } from 'framer-motion';

export default function TextEffect({ text, className = '' }) {
  return (
    <motion.h1
      initial={{ opacity: 0.85, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {text}
    </motion.h1>
  );
}
