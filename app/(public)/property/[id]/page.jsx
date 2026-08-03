import { notFound } from 'next/navigation';
import { getPropertyById, getSimilarProperties, getUserFavorites } from '@/lib/data';
import { incrementPropertyViews } from '@/lib/actions';
import { auth } from '@/lib/auth';
import PropertyDetailClient from '@/components/PropertyDetailClient';

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
      <PropertyDetailClient
        property={property}
        isFavorited={isFavorited}
        similarProperties={similarProperties}
        favoritedIds={favoritedIds}
      />
    </div>
  );
}

