'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { toggleFavoriteAction } from '@/lib/actions';

export default function FavoriteButton({ propertyId, initialIsFavorited = false, className = '' }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    const previousState = isFavorited;
    const nextState = !previousState;
    setIsFavorited(nextState);
    setLoading(true);

    if (nextState) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 500);
    }

    try {
      const result = await toggleFavoriteAction(propertyId);

      if (!result.success) {
        setIsFavorited(previousState);
        if (result.requiresLogin) {
          router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
      } else {
        setIsFavorited(result.isFavorited);
      }
    } catch (err) {
      console.error('Favorite toggle error:', err);
      setIsFavorited(previousState);
    } finally {
      setLoading(false);
    }
  };

  // Particle burst offsets
  const particles = [
    { x: 0, y: -16 },
    { x: 16, y: 0 },
    { x: 0, y: 16 },
    { x: -16, y: 0 },
  ];

  return (
    <motion.button
      type="button"
      suppressHydrationWarning
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={handleToggle}
      disabled={loading}
      className={`relative p-2.5 rounded-full bg-surface border border-border text-secondary hover:text-accent shadow-sm transition ${className}`}
      title={isFavorited ? 'Remove from shortlist' : 'Save to shortlist'}
      aria-label="Toggle Shortlist"
    >
      <motion.div
        animate={isFavorited ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3, type: 'spring' }}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorited ? 'fill-accent text-accent' : 'text-secondary hover:text-accent'
          }`}
        />
      </motion.div>

      {/* Particle Burst Micro-Interaction */}
      <AnimatePresence>
        {showBurst &&
          particles.map((p, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0.3, x: p.x, y: p.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-accent pointer-events-none z-20"
            />
          ))}
      </AnimatePresence>
    </motion.button>
  );
}
