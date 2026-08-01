import { AdminStatsSkeleton } from '@/components/Skeletons';

export default function AdminLoading() {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div className="h-8 bg-slate-800 rounded-xl w-1/4 animate-pulse" />
      <AdminStatsSkeleton />
      <div className="h-64 bg-slate-800 rounded-3xl animate-pulse" />
    </div>
  );
}
