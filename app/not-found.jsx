import Link from 'next/link';
import { Building2, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="w-16 h-16 rounded-3xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6">
        <Building2 className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404 — Property Not Found</h1>
      <p className="mt-2 text-slate-500 max-w-md text-sm">
        The property listing or page you are looking for has been removed, sold, or doesn't exist.
      </p>
      <Link
        href="/listings"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl text-sm shadow-md transition"
      >
        <Home className="w-4 h-4" />
        <span>Browse Available Properties</span>
      </Link>
    </div>
  );
}
