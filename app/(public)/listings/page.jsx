import { getProperties, getUserFavorites } from '@/lib/data';
import { auth } from '@/lib/auth';
import FilterBar from '@/components/FilterBar';
import ListingsAnimatedGrid from '@/components/ListingsAnimatedGrid';
import Link from 'next/link';
import { Building2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Property Listings — Search Houses, Apartments & Commercial Spaces',
  description: 'Filter verified properties by city, budget, bedrooms, and listing type.',
};

export default async function ListingsPage({ searchParams }) {
  const params = await searchParams;
  const city = params?.city;
  const listingType = params?.listingType;
  const propertyType = params?.propertyType;
  const minPrice = params?.minPrice;
  const maxPrice = params?.maxPrice;
  const bedrooms = params?.bedrooms;
  const sort = params?.sort;
  const page = params?.page || 1;

  const [data, session] = await Promise.all([
    getProperties({
      city,
      listingType,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      sort,
      page,
      limit: 9,
    }),
    auth(),
  ]);

  const userFavorites = session?.user?.id ? await getUserFavorites(session.user.id) : [];
  const favoritedIds = new Set(userFavorites.map((f) => f._id.toString()));

  const { properties, total, pages, page: currentPage } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-400">Live Inventory</span>
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Real Estate Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            Displaying {properties.length} of {total} verified properties
          </p>
        </div>
      </div>

      {/* Filter Bar Component */}
      <FilterBar />

      {/* Staggered Animated Property Grid */}
      {properties.length > 0 ? (
        <ListingsAnimatedGrid properties={properties} favoritedIds={favoritedIds} />
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 shadow-modal max-w-lg mx-auto my-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 text-brand-400 flex items-center justify-center mx-auto shadow-inner">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No properties found</h3>
          <p className="text-xs text-slate-400">
            We couldn't find any listings matching your active filters. Try adjusting your city, budget, or category options.
          </p>
          <Link
            href="/listings"
            className="inline-block px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-xl text-xs shadow-glow transition"
          >
            Clear All Filters
          </Link>
        </div>
      )}

      {/* Pagination Controls */}
      {pages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2 pt-4">
          {currentPage > 1 && (
            <Link
              href={`/listings?${new URLSearchParams({ ...params, page: currentPage - 1 }).toString()}`}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-500/40 transition"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
          )}

          {Array.from({ length: pages }).map((_, idx) => {
            const p = idx + 1;
            const isActive = p === currentPage;
            return (
              <Link
                key={p}
                href={`/listings?${new URLSearchParams({ ...params, page: p }).toString()}`}
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black transition ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {p}
              </Link>
            );
          })}

          {currentPage < pages && (
            <Link
              href={`/listings?${new URLSearchParams({ ...params, page: currentPage + 1 }).toString()}`}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-500/40 transition"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
