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
      <div className="bg-surface p-10 rounded-xl border border-border shadow-md max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-lg bg-semantic-error/10 border border-semantic-error/30 text-semantic-error flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-semantic-error">Application Exception</span>
          <h1 className="font-display font-medium text-2xl sm:text-3xl text-primary tracking-tight mt-1">
            Unexpected Error
          </h1>
          <p className="mt-2 text-secondary text-xs leading-relaxed font-medium">
            An unexpected error occurred while loading this page section. Please try re-rendering or navigate to home.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg text-xs shadow-sm transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Re-try Loading Page</span>
          </button>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-sunken border border-border hover:bg-border text-primary font-semibold rounded-lg text-xs transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portal Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
