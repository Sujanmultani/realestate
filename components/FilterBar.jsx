'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowUpDown } from 'lucide-react';

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

  const [city, setCity] = useState(searchParams.get('city') || 'all');
  const [listingType, setListingType] = useState(searchParams.get('listingType') || 'all');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'all');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || 'all');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  useEffect(() => {
    setCity(searchParams.get('city') || 'all');
    setListingType(searchParams.get('listingType') || 'all');
    setPropertyType(searchParams.get('propertyType') || 'all');
    setBedrooms(searchParams.get('bedrooms') || 'all');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSort(searchParams.get('sort') || 'newest');
  }, [searchParams]);

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
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6 mb-8 space-y-4 shadow-sm" suppressHydrationWarning>
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border" suppressHydrationWarning>
        {/* Type Toggle Pills */}
        <div className="flex items-center gap-1 bg-sunken p-1 rounded-md border border-border w-full sm:w-auto" suppressHydrationWarning>
          {[
            { label: 'All Listings', value: 'all' },
            { label: 'For Sale', value: 'sale' },
            { label: 'For Rent', value: 'rent' },
          ].map((type) => {
            const isActive = listingType === type.value;
            return (
              <button
                type="button"
                key={type.value}
                suppressHydrationWarning
                onClick={() => {
                  setListingType(type.value);
                  applyFilters({ listingType: type.value });
                }}
                className={`relative flex-1 sm:flex-none px-4 py-1.5 text-xs font-semibold rounded-sm transition ${
                  isActive ? 'text-white bg-accent' : 'text-secondary hover:text-primary'
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>

        {/* Sort & Reset */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end" suppressHydrationWarning>
          <div className="flex items-center gap-2 text-xs font-medium text-secondary" suppressHydrationWarning>
            <ArrowUpDown className="w-3.5 h-3.5 text-secondary" />
            <span>Sort:</span>
            <select
              value={sort}
              suppressHydrationWarning
              onChange={(e) => {
                setSort(e.target.value);
                applyFilters({ sort: e.target.value });
              }}
              className="bg-sunken border border-border rounded-md px-3 py-1.5 text-primary text-xs font-semibold focus:outline-none focus:border-accent"
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
            className="flex items-center gap-1 text-xs font-semibold text-secondary hover:text-semantic-error px-2.5 py-1.5 rounded-md hover:bg-sunken transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Filter Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" suppressHydrationWarning>
        {/* City Filter */}
        <div suppressHydrationWarning>
          <label className="block text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">
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
            className="w-full bg-sunken border border-border rounded-md px-3 py-2 text-xs font-medium text-primary focus:border-accent transition"
          >
            {CITIES.map((c) => (
              <option key={c} value={c === 'All Cities' ? 'all' : c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div suppressHydrationWarning>
          <label className="block text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">
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
            className="w-full bg-sunken border border-border rounded-md px-3 py-2 text-xs font-medium text-primary focus:border-accent transition"
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
          <label className="block text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">
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
            className="w-full bg-sunken border border-border rounded-md px-3 py-2 text-xs font-medium text-primary focus:border-accent transition"
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
          <label className="block text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">
            Min Price (₹)
          </label>
          <input
            type="number"
            suppressHydrationWarning
            placeholder="e.g. 5000000"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={() => applyFilters({ minPrice })}
            className="w-full bg-sunken border border-border rounded-md px-3 py-2 text-xs font-medium text-primary focus:border-accent transition placeholder:text-tertiary"
          />
        </div>

        {/* Max Price */}
        <div suppressHydrationWarning>
          <label className="block text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">
            Max Price (₹)
          </label>
          <input
            type="number"
            suppressHydrationWarning
            placeholder="e.g. 30000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={() => applyFilters({ maxPrice })}
            className="w-full bg-sunken border border-border rounded-md px-3 py-2 text-xs font-medium text-primary focus:border-accent transition placeholder:text-tertiary"
          />
        </div>
      </div>
    </div>
  );
}
