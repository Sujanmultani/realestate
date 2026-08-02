import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata = {
  title: 'Admin Console — EstatePortal',
  description: 'Property management, lead inquiries, and analytics dashboard.',
};

export default async function AdminLayout({ children }) {
  const session = await auth();

  // Server-side auth guard: prevent flash of protected content
  if (!session || session.user?.role !== 'admin') {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row text-primary">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-bg overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
