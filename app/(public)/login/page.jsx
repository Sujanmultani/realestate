'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Building2, Mail, Lock, LogIn, KeyRound } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-surface rounded-xl border border-border shadow-md max-w-md w-full p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-accent text-white flex items-center justify-center font-bold mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="font-display font-medium text-2xl text-primary tracking-tight">Welcome Back</h1>
          <p className="text-xs text-secondary font-medium">Sign in to manage your saved properties and inquiries</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-semantic-error/10 text-semantic-error text-xs font-semibold border border-semantic-error/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-tertiary absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@realestate.com"
                className="w-full bg-sunken border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-tertiary focus:bg-surface focus:border-accent focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-tertiary absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-sunken border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-tertiary focus:bg-surface focus:border-accent focus:outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg text-sm shadow-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Demo Account Quick Buttons */}
        <div className="pt-4 border-t border-border space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-tertiary text-center">Quick Demo Login</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoFill('user@realestate.com', 'user123')}
              className="px-3 py-2 bg-sunken hover:bg-border text-primary rounded-lg text-xs font-semibold transition"
            >
              Demo Buyer
            </button>
            <button
              onClick={() => handleDemoFill('admin@realestate.com', 'admin123')}
              className="px-3 py-2 bg-accent-subtle hover:bg-accent/20 text-accent rounded-lg text-xs font-semibold transition"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-secondary">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-accent hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  );
}
