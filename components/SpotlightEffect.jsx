'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SpotlightEffect() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only activate cursor spotlight on desktop devices
    if (window.innerWidth >= 1024 && matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true);
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      animate={{
        background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(31, 77, 60, 0.05), transparent 80%)`,
      }}
    />
  );
}
