'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize2, MapPin, Building, Sparkles, ArrowRight } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

export function formatPrice(price, listingType) {
  if (!price && price !== 0) return 'Price on Request';

  let formatted = '';
  if (price >= 10000000) {
    const cr = (price / 10000000).toFixed(2);
    formatted = `₹${cr.endsWith('.00') ? Math.floor(cr) : cr} Cr`;
  } else if (price >= 100000) {
    const lakh = (price / 100000).toFixed(2);
    formatted = `₹${lakh.endsWith('.00') ? Math.floor(lakh) : lakh} Lakhs`;
  } else {
    formatted = `₹${price.toLocaleString('en-IN')}`;
  }

  if (listingType === 'rent') {
    return `${formatted} / mo`;
  }
  return formatted;
}

export default function PropertyCard({ property, isFavorited = false, isLargeFeatured = false }) {
  if (!property) return null;

  const {
    _id,
    title,
    price,
    listingType,
    propertyType,
    bedrooms,
    bathrooms,
    areaSqft,
    address,
    images = [],
    featured = false,
  } = property;

  const primaryImage = images[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

  if (isLargeFeatured) {
    return (
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="group relative w-full aspect-[21/9] md:aspect-[2.4/1] rounded-xl overflow-hidden border border-border shadow-md hover:shadow-hover transition-shadow duration-300"
      >
        {/* Full-bleed image with cinematic slow zoom */}
        <motion.img
          src={primaryImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />

        {/* Functional Legibility Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm bg-accent text-white shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Prime Listing
          </span>
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm bg-black/60 text-white border border-white/20 backdrop-blur-md">
            For {listingType === 'sale' ? 'Sale' : 'Rent'}
          </span>
        </div>

        {/* Top Right Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton propertyId={_id.toString()} initialIsFavorited={isFavorited} />
        </div>

        {/* Bottom Overlaid Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/80 mb-2">
            <MapPin className="w-3.5 h-3.5 text-white/80 shrink-0" />
            <span>{address?.locality}, {address?.city}</span>
          </div>

          <Link href={`/property/${_id}`} className="block group-hover:text-white/90 transition-colors">
            <h3 className="font-display font-medium text-2xl md:text-4xl text-white leading-tight tracking-tight mb-4 max-w-2xl line-clamp-2">
              {title}
            </h3>
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-medium">
              {bedrooms && <span>{bedrooms} BHK</span>}
              {bedrooms && <span className="w-1 h-1 rounded-full bg-white/50" />}
              {areaSqft && <span>{areaSqft?.toLocaleString('en-IN')} sqft</span>}
              {areaSqft && <span className="w-1 h-1 rounded-full bg-white/50" />}
              <span className="text-base sm:text-lg font-sans font-bold text-white">
                {formatPrice(price, listingType)}
              </span>
            </div>

            <Link
              href={`/property/${_id}`}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-white text-primary font-semibold text-sm rounded-md hover:bg-white/90 transition group/btn shadow-sm"
            >
              <span>View Residence</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-surface rounded-lg border border-border shadow-sm hover:shadow-hover transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-sunken">
        <Link href={`/property/${_id}`} className="block w-full h-full">
          <motion.img
            src={primaryImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        </Link>

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-sm bg-surface text-primary border border-border shadow-sm">
            For {listingType === 'sale' ? 'Sale' : 'Rent'}
          </span>
          {featured && (
            <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-sm bg-accent text-white shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Favorite Heart Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton propertyId={_id.toString()} initialIsFavorited={isFavorited} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location with map pin */}
          <div className="flex items-center justify-between text-xs text-secondary mb-2">
            <div className="flex items-center gap-1 text-secondary truncate">
              <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="truncate">{address?.locality}, {address?.city}</span>
            </div>
            <span className="capitalize px-2 py-0.5 bg-sunken text-secondary rounded-sm font-medium text-[11px]">
              {propertyType}
            </span>
          </div>

          {/* Title in Fraunces medium */}
          <Link href={`/property/${_id}`} className="block group-hover:text-accent transition-colors">
            <h3 className="font-display font-medium text-primary text-xl line-clamp-2 leading-snug tracking-tight">
              {title}
            </h3>
          </Link>
        </div>

        {/* Price & Specs */}
        <div className="mt-4 pt-3.5 border-t border-border flex items-center justify-between">
          <span className="text-lg font-sans font-bold text-primary">
            {formatPrice(price, listingType)}
          </span>

          <div className="flex items-center gap-3 text-secondary text-xs font-medium">
            {propertyType !== 'commercial' && propertyType !== 'plot' ? (
              <span>{bedrooms} BHK • {bathrooms} Bath</span>
            ) : (
              <span className="capitalize">{propertyType}</span>
            )}
            <span>{areaSqft?.toLocaleString('en-IN')} sqft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
