import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getUserFavorites } from '@/lib/data';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { Heart, Building2 } from 'lucide-react';

export const metadata = {
  title: 'My Saved Properties — EstatePortal',
  description: 'View your favorited properties and saved real estate listings.',
};

export default async function FavoritesPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login?callbackUrl=/favorites');
  }

  const favorites = await getUserFavorites(session.user.id);
  const favoritedIds = new Set(favorites.map((f) => f._id.toString()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center font-bold">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Saved Properties
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            You have {favorites.length} saved property {favorites.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {favorites.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              isFavorited={favoritedIds.has(property._id.toString())}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No saved properties yet</h3>
          <p className="text-xs text-slate-500">
            Click the heart icon on any property card while browsing to save it to your personal shortlist.
          </p>
          <Link
            href="/listings"
            className="inline-block px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl text-xs hover:bg-brand-700 transition"
          >
            Explore Properties
          </Link>
        </div>
      )}
    </div>
  );
}
