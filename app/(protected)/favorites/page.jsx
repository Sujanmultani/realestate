import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getUserFavorites } from '@/lib/data';
import ListingsAnimatedGrid from '@/components/ListingsAnimatedGrid';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const metadata = {
  title: 'Saved Residences — EstatePortal',
  description: 'View your saved property shortlist.',
};

export default async function FavoritesPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login?callbackUrl=/favorites');
  }

  const favorites = await getUserFavorites(session.user.id);
  const favoritedIds = new Set(favorites.map((f) => f._id.toString()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="w-10 h-10 rounded-md bg-accent-subtle text-accent flex items-center justify-center font-bold">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Shortlisted Portfolio</span>
          <h1 className="font-display font-medium text-3xl text-primary tracking-tight">
            Saved Residences
          </h1>
          <p className="text-xs text-secondary font-medium">
            You have {favorites.length} saved property {favorites.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <ListingsAnimatedGrid properties={favorites} favoritedIds={favoritedIds} />
      ) : (
        <div className="bg-surface rounded-lg p-12 text-center border border-border shadow-sm max-w-lg mx-auto my-12 space-y-4">
          <div className="w-14 h-14 rounded-full bg-sunken border border-border text-secondary flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="font-display font-medium text-xl text-primary">No saved properties yet</h3>
          <p className="text-xs text-secondary leading-relaxed">
            Click the heart icon on any property card while browsing to save it to your personal shortlist.
          </p>
          <Link
            href="/listings"
            className="inline-block px-6 py-2.5 bg-accent text-white font-semibold rounded-md text-sm hover:bg-accent-hover transition"
          >
            Explore Residences
          </Link>
        </div>
      )}
    </div>
  );
}
