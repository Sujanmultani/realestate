'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { Search, RotateCcw, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

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

  // Sync state with URL when searchParams change (e.g. Back/Forward button)
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

      // Reset to page 1 on filter change
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 lg:p-6 mb-8 space-y-4" suppressHydrationWarning>
      {/* Header bar: Listing type pills + Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100" suppressHydrationWarning>
        {/* Listing Type Toggle Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto" suppressHydrationWarning>
          {[
            { label: 'All Properties', value: 'all' },
            { label: 'For Sale', value: 'sale' },
            { label: 'For Rent', value: 'rent' },
          ].map((type) => (
            <button
              type="button"
              key={type.value}
              suppressHydrationWarning
              onClick={() => {
                setListingType(type.value);
                applyFilters({ listingType: type.value });
              }}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition ${
                listingType === type.value
                  ? 'bg-white text-brand-700 shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Sort & Reset Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end" suppressHydrationWarning>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500" suppressHydrationWarning>
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort By:</span>
            <select
              value={sort}
              suppressHydrationWarning
              onChange={(e) => {
                setSort(e.target.value);
                applyFilters({ sort: e.target.value });
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <button
            type="button"
            suppressHydrationWarning
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" suppressHydrationWarning>
        {/* City Filter */}
        <div suppressHydrationWarning>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
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
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
          >
            {CITIES.map((c) => (
              <option key={c} value={c === 'All Cities' ? 'all' : c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div suppressHydrationWarning>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Property Type
          </label>
          <select
            value={propertyType}
            suppressHydrationWarning
            onChange={(e) => {
              const val = e.target.value;
              setPropertyType(val);
              applyFilters({ propertyType: val });
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div suppressHydrationWarning>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
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
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
          >
            <option value="all">Any BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </div>

        {/* Min Price */}
        <div suppressHydrationWarning>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Min Price (₹)
          </label>
          <input
            type="number"
            suppressHydrationWarning
            placeholder="e.g. 5000000"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={() => applyFilters({ minPrice })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 focus:bg-white transition placeholder:text-slate-400"
          />
        </div>

        {/* Max Price */}
        <div suppressHydrationWarning>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Max Price (₹)
          </label>
          <input
            type="number"
            suppressHydrationWarning
            placeholder="e.g. 30000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={() => applyFilters({ maxPrice })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 focus:bg-white transition placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
}
