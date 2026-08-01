'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { toggleFavoriteAction } from '@/lib/actions';

export default function FavoriteButton({ propertyId, initialIsFavorited = false, className = '' }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    const previousState = isFavorited;
    setIsFavorited(!previousState);
    setLoading(true);

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

  return (
    <motion.button
      type="button"
      suppressHydrationWarning
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={handleToggle}
      disabled={loading}
      className={`p-2.5 rounded-full bg-surface border border-border text-secondary hover:text-accent shadow-sm transition ${className}`}
      title={isFavorited ? 'Remove from shortlist' : 'Save to shortlist'}
      aria-label="Toggle Shortlist"
    >
      <motion.div
        animate={isFavorited ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorited ? 'fill-accent text-accent' : 'text-secondary hover:text-accent'
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
