'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize2, MapPin, Building } from 'lucide-react';
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
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group md:col-span-2 lg:col-span-2 bg-surface rounded-lg border border-border shadow-sm hover:shadow-hover transition-all duration-300 grid grid-cols-1 md:grid-cols-12 overflow-hidden"
      >
        {/* Image Side */}
        <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto w-full overflow-hidden bg-sunken">
          <Link href={`/property/${_id}`} className="block w-full h-full">
            <motion.img
              src={primaryImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
          </Link>

          <div className="absolute top-3 left-3 flex gap-2 z-10">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm bg-accent text-white shadow-sm">
              Prime Listing
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm bg-surface text-primary border border-border">
              For {listingType === 'sale' ? 'Sale' : 'Rent'}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton propertyId={_id.toString()} initialIsFavorited={isFavorited} />
          </div>
        </div>

        {/* Content Side */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-secondary mb-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="truncate">{address?.locality}, {address?.city}</span>
            </div>

            <Link href={`/property/${_id}`} className="block group-hover:text-accent transition-colors">
              <h3 className="font-display font-medium text-primary text-2xl leading-tight tracking-tight line-clamp-2">
                {title}
              </h3>
            </Link>

            <p className="text-secondary text-sm mt-3 line-clamp-3 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div>
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-secondary font-medium uppercase tracking-wider">Asking Price</p>
                <p className="text-xl font-sans font-bold text-primary mt-0.5">{formatPrice(price, listingType)}</p>
              </div>

              <Link
                href={`/property/${_id}`}
                className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold text-sm rounded-md transition"
              >
                View Residence
              </Link>
            </div>
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
