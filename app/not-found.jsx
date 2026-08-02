import Link from 'next/link';
import { Building2, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="bg-surface p-10 rounded-xl border border-border shadow-md max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-lg bg-accent-subtle border border-accent/20 text-accent flex items-center justify-center mx-auto">
          <Building2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">404 Error</span>
          <h1 className="font-display font-medium text-2xl sm:text-3xl text-primary tracking-tight mt-1">
            Listing Not Found
          </h1>
          <p className="mt-2 text-secondary text-xs leading-relaxed font-medium">
            This property listing or URL has been moved, sold, or is no longer active in our inventory.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Link
            href="/listings"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg text-xs shadow-sm transition"
          >
            <Search className="w-4 h-4" />
            <span>Search Active Listings</span>
          </Link>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-sunken border border-border hover:bg-border text-primary font-semibold rounded-lg text-xs transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
