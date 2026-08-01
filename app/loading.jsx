import { PropertyGridSkeleton } from '@/components/Skeletons';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="h-8 bg-slate-200 rounded-xl w-1/3 animate-pulse mb-8" />
      <PropertyGridSkeleton count={6} />
    </div>
  );
}
