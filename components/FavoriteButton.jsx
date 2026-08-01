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

    // Optimistic UI update
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
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.85 }}
      onClick={handleToggle}
      disabled={loading}
      className={`p-2.5 rounded-full glass-panel text-slate-300 hover:text-red-400 shadow-glass transition-colors ${className}`}
      title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
      aria-label="Toggle Favorite"
    >
      <motion.div
        animate={isFavorited ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorited ? 'fill-red-500 text-red-500' : 'text-slate-300 hover:text-red-400'
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
