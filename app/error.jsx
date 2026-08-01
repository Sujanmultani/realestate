'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12 space-y-4">
      <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-2xl">
        !
      </div>
      <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
      <p className="text-sm text-slate-500 max-w-sm">
        An unexpected error occurred while loading this page. Please try again or return home.
      </p>
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow transition"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
