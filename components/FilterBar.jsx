'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowUpDown, Filter } from 'lucide-react';

const CITIES = ['All Cities', 'Mumbai', 'Bengaluru', 'Ahmedabad', 'Pune', 'Gurugram', 'Hyderabad', 'Delhi'];
const PROPERTY_TYPES = [
  { label: 'All Types', value: 'all' },
  { label: 'Apartments', value: 'apartment' },
  { label: 'Villas', value: 'villa' },
  { label: 'Houses', value: 'house' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Plots', value: 'plot' },
];

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state initialized from searchParams
  const [city, setCity] = useState(searchParams.get('city') || 'all');
  const [listingType, setListingType] = useState(searchParams.get('listingType') || 'all');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'all');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || 'all');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  // Sync state with URL when searchParams change
  useEffect(() => {
    setCity(searchParams.get('city') || 'all');
    setListingType(searchParams.get('listingType') || 'all');
    setPropertyType(searchParams.get('propertyType') || 'all');
    setBedrooms(searchParams.get('bedrooms') || 'all');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSort(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  // Construct search params string and navigate
  const applyFilters = useCallback(
    (overrides = {}) => {
      const params = new URLSearchParams(searchParams);

      const currentFilters = {
        city: overrides.city !== undefined ? overrides.city : city,
        listingType: overrides.listingType !== undefined ? overrides.listingType : listingType,
        propertyType: overrides.propertyType !== undefined ? overrides.propertyType : propertyType,
        bedrooms: overrides.bedrooms !== undefined ? overrides.bedrooms : bedrooms,
        minPrice: overrides.minPrice !== undefined ? overrides.minPrice : minPrice,
        maxPrice: overrides.maxPrice !== undefined ? overrides.maxPrice : maxPrice,
        sort: overrides.sort !== undefined ? overrides.sort : sort,
      };

      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value && value !== 'all' && value !== '') {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      params.delete('page');

      const queryString = params.toString();
      const targetPath = pathname.startsWith('/listings') ? pathname : '/listings';
      router.push(queryString ? `${targetPath}?${queryString}` : targetPath);
    },
    [searchParams, city, listingType, propertyType, bedrooms, minPrice, maxPrice, sort, pathname, router]
  );

  const handleReset = () => {
    setCity('all');
    setListingType('all');
    setPropertyType('all');
    setBedrooms('all');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    router.push('/listings');
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 p-4 lg:p-6 mb-8 space-y-4 shadow-modal" suppressHydrationWarning>
      {/* Header bar: Listing type pills + Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80" suppressHydrationWarning>
        {/* Listing Type Toggle Pills */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto" suppressHydrationWarning>
          {[
            { label: 'All Properties', value: 'all' },
            { label: 'For Sale', value: 'sale' },
            { label: 'For Rent', value: 'rent' },
          ].map((type) => {
            const isActive = listingType === type.value;
            return (
              <motion.button
                type="button"
                key={type.value}
                whileTap={{ scale: 0.95 }}
                suppressHydrationWarning
                onClick={() => {
                  setListingType(type.value);
                  applyFilters({ listingType: type.value });
                }}
                className={`relative flex-1 sm:flex-none px-4 py-2 text-xs font-extrabold rounded-xl transition ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-brand-600 rounded-xl shadow-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{type.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Sort & Reset Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end" suppressHydrationWarning>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400" suppressHydrationWarning>
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-400" />
            <span>Sort:</span>
            <select
              value={sort}
              suppressHydrationWarning
              onChange={(e) => {
                setSort(e.target.value);
                applyFilters({ sort: e.target.value });
              }}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="newest" className="bg-slate-900">Newest First</option>
              <option value="price_asc" className="bg-slate-900">Price: Low to High</option>
              <option value="price_desc" className="bg-slate-900">Price: High to Low</option>
              <option value="popular" className="bg-slate-900">Most Popular</option>
            </select>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.93 }}
            suppressHydrationWarning
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-xl hover:bg-red-500/10 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </motion.button>
        </div>
      </div>

      {/* Main Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" suppressHydrationWarning>
        {/* City Filter */}
        <div suppressHydrationWarning>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            City
          </label>
          <select
            value={city}
            suppressHydrationWarning
            onChange={(e) => {
              const val = e.target.value;
              setCity(val);
              applyFilters({ city: val });
            }}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-brand-500 focus:bg-slate-900 transition"
          >
            {CITIES.map((c) => (
              <option key={c} value={c === 'All Cities' ? 'all' : c} className="bg-slate-900">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div suppressHydrationWarning>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Category
          </label>
          <select
            value={propertyType}
            suppressHydrationWarning
            onChange={(e) => {
              const val = e.target.value;
              setPropertyType(val);
              applyFilters({ propertyType: val });
            }}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-brand-500 focus:bg-slate-900 transition"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value} className="bg-slate-900">
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div suppressHydrationWarning>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Bedrooms (BHK)
          </label>
          <select
            value={bedrooms}
            suppressHydrationWarning
            onChange={(e) => {
              const val = e.target.value;
              setBedrooms(val);
              applyFilters({ bedrooms: val });
            }}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-brand-500 focus:bg-slate-900 transition"
          >
            <option value="all" className="bg-slate-900">Any BHK</option>
            <option value="1" className="bg-slate-900">1 BHK</option>
            <option value="2" className="bg-slate-900">2 BHK</option>
            <option value="3" className="bg-slate-900">3 BHK</option>
            <option value="4" className="bg-slate-900">4+ BHK</option>
          </select>
        </div>

        {/* Min Price */}
        <div suppressHydrationWarning>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Min Price (₹)
          </label>
          <input
            type="number"
            suppressHydrationWarning
            placeholder="e.g. 5000000"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={() => applyFilters({ minPrice })}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-brand-500 focus:bg-slate-900 transition placeholder:text-slate-600"
          />
        </div>

        {/* Max Price */}
        <div suppressHydrationWarning>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Max Price (₹)
          </label>
          <input
            type="number"
            suppressHydrationWarning
            placeholder="e.g. 30000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={() => applyFilters({ maxPrice })}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-brand-500 focus:bg-slate-900 transition placeholder:text-slate-600"
          />
        </div>
      </div>
    </div>
  );
}
