export function PropertyCardSkeleton() {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm flex flex-col">
      <div className="aspect-[16/10] w-full skeleton-shimmer" />
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-4 skeleton-shimmer rounded-sm w-1/4" />
            <div className="h-4 skeleton-shimmer rounded-sm w-1/3" />
          </div>
          <div className="h-6 skeleton-shimmer rounded-sm w-3/4" />
        </div>
        <div className="pt-4 border-t border-border flex justify-between">
          <div className="h-4 skeleton-shimmer rounded-sm w-1/4" />
          <div className="h-4 skeleton-shimmer rounded-sm w-1/4" />
          <div className="h-4 skeleton-shimmer rounded-sm w-1/4" />
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-surface p-6 rounded-lg border border-border h-32 flex flex-col justify-between">
          <div className="h-4 skeleton-shimmer rounded-sm w-1/3" />
          <div className="h-8 skeleton-shimmer rounded-sm w-1/2" />
        </div>
      ))}
    </div>
  );
}
