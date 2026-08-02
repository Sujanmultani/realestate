import { AdminStatsSkeleton } from '@/components/Skeletons';

export default function AdminLoading() {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div className="h-8 bg-sunken rounded-md w-1/4 animate-pulse" />
      <AdminStatsSkeleton />
      <div className="h-64 bg-sunken rounded-lg animate-pulse" />
    </div>
  );
}
