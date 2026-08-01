'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
        // Rollback state if server action failed
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
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-slate-600 hover:text-red-500 hover:scale-110 shadow-sm transition-all duration-200 ${className}`}
      title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
      aria-label="Toggle Favorite"
    >
      <Heart
        className={`w-5 h-5 transition-colors ${
          isFavorited ? 'fill-red-500 text-red-500' : 'text-slate-600 hover:text-red-500'
        }`}
      />
    </button>
  );
}
