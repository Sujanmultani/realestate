export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[16/10] bg-slate-200 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-4 bg-slate-200 rounded w-1/3" />
        </div>
        <div className="h-6 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="pt-4 border-t border-slate-100 flex justify-between">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-4 bg-slate-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function PropertyGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AdminStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 h-28 flex flex-col justify-between">
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-8 bg-slate-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
