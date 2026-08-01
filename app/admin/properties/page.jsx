import { getAdminProperties } from '@/lib/data';
import PropertyManagerClient from '@/components/PropertyManagerClient';

export const revalidate = 0; // Dynamic server component

export default async function AdminPropertiesPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || '';

  const { properties } = await getAdminProperties(page, search);

  return <PropertyManagerClient initialProperties={properties} initialSearch={search} />;
}
