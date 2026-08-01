import { getProperties, getUserFavorites } from '@/lib/data';
import { auth } from '@/lib/auth';
import FilterBar from '@/components/FilterBar';
import ListingsAnimatedGrid from '@/components/ListingsAnimatedGrid';
import Link from 'next/link';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Property Listings — Verified Residences & Commercial Assets',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Active Portfolio</span>
          <h1 className="font-display font-normal text-3xl sm:text-4xl text-primary tracking-tight mt-1">
            Verified Residences
          </h1>
          <p className="text-xs sm:text-sm text-secondary mt-1 font-medium">
            Displaying {properties.length} of {total} verified property listings
          </p>
        </div>
      </div>

      {/* Filter Bar Component */}
      <FilterBar />

      {/* Property Grid */}
      {properties.length > 0 ? (
        <ListingsAnimatedGrid properties={properties} favoritedIds={favoritedIds} />
      ) : (
        <div className="bg-surface rounded-lg p-12 text-center border border-border shadow-sm max-w-lg mx-auto my-12 space-y-4">
          <div className="w-14 h-14 rounded-full bg-sunken text-secondary flex items-center justify-center mx-auto border border-border">
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="font-display font-medium text-xl text-primary">No listings found</h3>
          <p className="text-xs text-secondary leading-relaxed">
            We couldn't find any properties matching your active filter criteria. Try expanding your search options.
          </p>
          <Link
            href="/listings"
            className="inline-block px-6 py-2.5 bg-accent text-white font-semibold rounded-md text-sm hover:bg-accent-hover transition"
          >
            Clear Filters
          </Link>
        </div>
      )}

      {/* Pagination Controls */}
      {pages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2 pt-4">
          {currentPage > 1 && (
            <Link
              href={`/listings?${new URLSearchParams({ ...params, page: currentPage - 1 }).toString()}`}
              className="p-2 rounded-md bg-surface border border-border text-secondary hover:text-primary transition"
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
                className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold transition ${
                  isActive
                    ? 'bg-accent text-white font-bold'
                    : 'bg-surface border border-border text-secondary hover:text-primary'
                }`}
              >
                {p}
              </Link>
            );
          })}

          {currentPage < pages && (
            <Link
              href={`/listings?${new URLSearchParams({ ...params, page: currentPage + 1 }).toString()}`}
              className="p-2 rounded-md bg-surface border border-border text-secondary hover:text-primary transition"
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
