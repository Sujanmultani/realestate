import { getProperties, getUserFavorites } from '@/lib/data';
import { auth } from '@/lib/auth';
import PropertyCard from '@/components/PropertyCard';
import FilterBar from '@/components/FilterBar';
import Link from 'next/link';
import { Building2, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Property Listings — Search Houses, Apartments & Commercial Spaces',
  description: 'Filter verified properties by city, budget, bedrooms, and listing type.',
};

export default async function ListingsPage({ searchParams }) {
  // Await searchParams in Next.js 15
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Real Estate Listings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Showing {properties.length} of {total} verified properties
          </p>
        </div>
      </div>

      {/* Filter Bar Component */}
      <FilterBar />

      {/* Property Cards Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              isFavorited={favoritedIds.has(property._id.toString())}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No properties found</h3>
          <p className="text-xs text-slate-500">
            We couldn't find any listings matching your search filters. Try adjusting your location or price range.
          </p>
          <Link
            href="/listings"
            className="inline-block px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl text-xs hover:bg-brand-700 transition"
          >
            Clear All Filters
          </Link>
        </div>
      )}

      {/* Pagination Controls */}
      {pages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/listings?${new URLSearchParams({ ...params, page: currentPage - 1 }).toString()}`}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
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
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {p}
              </Link>
            );
          })}

          {currentPage < pages && (
            <Link
              href={`/listings?${new URLSearchParams({ ...params, page: currentPage + 1 }).toString()}`}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
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
