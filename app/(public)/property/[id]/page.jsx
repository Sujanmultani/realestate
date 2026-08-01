import { notFound } from 'next/navigation';
import { getPropertyById, getSimilarProperties, getUserFavorites } from '@/lib/data';
import { incrementPropertyViews } from '@/lib/actions';
import { auth } from '@/lib/auth';
import PropertyDetailClient from '@/components/PropertyDetailClient';
import PropertyCard from '@/components/PropertyCard';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return { title: 'Property Not Found — EstatePortal' };
  }

  return {
    title: `${property.title} — ${property.address.city} Real Estate`,
    description: property.description.substring(0, 160),
  };
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;

  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  // Trigger view increment
  await incrementPropertyViews(id);

  const [session, similarProperties] = await Promise.all([
    auth(),
    getSimilarProperties(property._id, property.address.city, property.propertyType, 3),
  ]);

  const userFavorites = session?.user?.id ? await getUserFavorites(session.user.id) : [];
  const isFavorited = userFavorites.some((f) => f._id.toString() === property._id.toString());
  const favoritedIds = new Set(userFavorites.map((f) => f._id.toString()));

  return (
    <div className="space-y-12">
      <PropertyDetailClient property={property} isFavorited={isFavorited} />

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Recommendations</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Similar Properties You May Like</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((similar) => (
              <PropertyCard
                key={similar._id}
                property={similar}
                isFavorited={favoritedIds.has(similar._id.toString())}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
