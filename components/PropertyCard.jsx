'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize2, MapPin, Sparkles, Building } from 'lucide-react';
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
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="group md:col-span-2 lg:col-span-2 bg-slate-900 rounded-3xl border border-brand-500/30 shadow-modal hover:shadow-card-hover hover:border-brand-500/60 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 overflow-hidden relative"
      >
        {/* Large Featured Image */}
        <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto w-full overflow-hidden bg-slate-950">
          <Link href={`/property/${_id}`} className="block w-full h-full">
            <motion.img
              src={primaryImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
          </Link>

          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span className="flex items-center gap-1 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-xl bg-amber-500 text-slate-950 shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              Prime Spotlight
            </span>
            <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded-xl bg-brand-600 text-white shadow-md">
              For {listingType === 'sale' ? 'Sale' : 'Rent'}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton propertyId={_id.toString()} initialIsFavorited={isFavorited} />
          </div>
        </div>

        {/* Content Side */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-2">
              <span className="capitalize px-2.5 py-1 bg-slate-800 text-brand-300 rounded-lg border border-slate-700">
                {propertyType}
              </span>
              <div className="flex items-center gap-1 text-slate-400 truncate">
                <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span className="truncate">{address?.locality}, {address?.city}</span>
              </div>
            </div>

            <Link href={`/property/${_id}`} className="block group-hover:text-brand-300 transition-colors">
              <h3 className="font-black text-white text-xl leading-snug tracking-tight line-clamp-2">
                {title}
              </h3>
            </Link>

            <p className="text-slate-400 text-xs mt-3 line-clamp-3 leading-relaxed font-medium">
              {property.description}
            </p>
          </div>

          <div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Asking Price</p>
                <p className="text-2xl font-black text-white mt-0.5">{formatPrice(price, listingType)}</p>
              </div>

              <Link
                href={`/property/${_id}`}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl transition shadow-glow"
              >
                View Details
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
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-slate-900/90 rounded-2xl border border-slate-800/80 shadow-subtle hover:shadow-card-hover hover:border-slate-700 transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <Link href={`/property/${_id}`} className="block w-full h-full">
          <motion.img
            src={primaryImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
        </Link>

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span
            className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg text-white shadow-sm border backdrop-blur-md ${
              listingType === 'sale'
                ? 'bg-brand-600/90 border-brand-400/30'
                : 'bg-blue-600/90 border-blue-400/30'
            }`}
          >
            For {listingType === 'sale' ? 'Sale' : 'Rent'}
          </span>

          {featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg bg-amber-500/90 border border-amber-300/40 text-slate-950 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              Featured
            </span>
          )}
        </div>

        {/* Favorite Heart Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton propertyId={_id.toString()} initialIsFavorited={isFavorited} />
        </div>

        {/* Price Tag Overlay Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-base font-black text-white bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 shadow-sm">
            {formatPrice(price, listingType)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Property Type & Location */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span className="capitalize px-2.5 py-0.5 bg-slate-800 text-brand-300 rounded-md font-bold border border-slate-700/60 text-[11px]">
              {propertyType}
            </span>
            <div className="flex items-center gap-1 text-slate-400 max-w-[170px] truncate text-xs">
              <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span className="truncate">{address?.locality}, {address?.city}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/property/${_id}`} className="block group-hover:text-brand-400 transition-colors duration-200">
            <h3 className="font-bold text-white text-base line-clamp-2 leading-snug tracking-tight">
              {title}
            </h3>
          </Link>
        </div>

        {/* Specs Matrix */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-slate-400 text-xs font-semibold">
          {propertyType !== 'commercial' && propertyType !== 'plot' ? (
            <>
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-slate-500" />
                <span>{bedrooms} BHK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-slate-500" />
                <span>{bathrooms} Baths</span>
              </div>
            </>
          ) : (
            <div className="col-span-2 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-slate-500" />
              <span className="capitalize">{propertyType} Space</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 justify-end text-slate-300 font-bold">
            <Maximize2 className="w-4 h-4 text-slate-500" />
            <span>{areaSqft?.toLocaleString('en-IN')} sqft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
