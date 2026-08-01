import Link from 'next/link';
import Image from 'next/image';
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

export default function PropertyCard({ property, isFavorited = false }) {
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

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Link href={`/property/${_id}`} className="block w-full h-full">
          <img
            src={primaryImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </Link>

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span
            className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md text-white shadow-sm ${
              listingType === 'sale' ? 'bg-brand-600' : 'bg-blue-600'
            }`}
          >
            For {listingType === 'sale' ? 'Sale' : 'Rent'}
          </span>

          {featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-amber-500 text-white shadow-sm">
              <Sparkles className="w-3 h-3 fill-current" />
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
          <span className="text-xl font-extrabold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
            {formatPrice(price, listingType)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Property Type & Location */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span className="capitalize px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold border border-slate-200">
              {propertyType}
            </span>
            <div className="flex items-center gap-1 text-slate-500 max-w-[180px] truncate">
              <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span className="truncate">{address?.locality}, {address?.city}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/property/${_id}`} className="block group-hover:text-brand-600 transition">
            <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>
        </div>

        {/* Specs Matrix */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-slate-600 text-xs font-semibold">
          {propertyType !== 'commercial' && propertyType !== 'plot' ? (
            <>
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-slate-400" />
                <span>{bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-slate-400" />
                <span>{bathrooms} Baths</span>
              </div>
            </>
          ) : (
            <div className="col-span-2 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-slate-400" />
              <span className="capitalize">{propertyType} Space</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 justify-end text-slate-700">
            <Maximize2 className="w-4 h-4 text-slate-400" />
            <span>{areaSqft?.toLocaleString('en-IN')} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
}
