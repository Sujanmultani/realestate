'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="glass-panel p-10 rounded-3xl border border-slate-800 shadow-modal max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-inner">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-widest text-red-400">Application Exception</span>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Unexpected Error
          </h1>
          <p className="mt-2 text-slate-400 text-xs leading-relaxed font-medium">
            An unexpected error occurred while loading this page section. Please try re-rendering or navigate to home.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-xl text-xs shadow-glow transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Re-try Loading Page</span>
          </button>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portal Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
