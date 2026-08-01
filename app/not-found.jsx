import Link from 'next/link';
import { Building2, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="glass-panel p-10 rounded-3xl border border-slate-800 shadow-modal max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-600/20 border border-brand-500/30 text-brand-400 flex items-center justify-center mx-auto shadow-inner">
          <Building2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-400">404 Error</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Listing Not Found
          </h1>
          <p className="mt-2 text-slate-400 text-xs leading-relaxed font-medium">
            This property listing or URL has been moved, sold, or is no longer active in our inventory.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Link
            href="/listings"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-xl text-xs shadow-glow transition"
          >
            <Search className="w-4 h-4" />
            <span>Search Active Listings</span>
          </Link>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
