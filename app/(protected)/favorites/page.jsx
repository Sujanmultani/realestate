import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getUserFavorites } from '@/lib/data';
import ListingsAnimatedGrid from '@/components/ListingsAnimatedGrid';
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
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center font-bold">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-400">Shortlisted Homes</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Saved Properties
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            You have {favorites.length} saved property {favorites.length === 1 ? 'listing' : 'listings'} in your shortlist
          </p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <ListingsAnimatedGrid properties={favorites} favoritedIds={favoritedIds} />
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 shadow-modal max-w-lg mx-auto my-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 text-red-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No saved properties yet</h3>
          <p className="text-xs text-slate-400">
            Click the heart icon on any property card while browsing to save it to your personal shortlist.
          </p>
          <Link
            href="/listings"
            className="inline-block px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-xl text-xs shadow-glow transition"
          >
            Explore Properties
          </Link>
        </div>
      )}
    </div>
  );
}
