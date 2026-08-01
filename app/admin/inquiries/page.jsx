import { getAdminInquiries } from '@/lib/data';
import InquiryManagerClient from '@/components/InquiryManagerClient';

export const revalidate = 0; // Dynamic server component

export default async function AdminInquiriesPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || 'all';

  const inquiries = await getAdminInquiries(status);

  return <InquiryManagerClient initialInquiries={inquiries} />;
}
