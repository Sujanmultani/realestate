'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Mail, Lock, User, UserPlus } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Auto sign-in after successful registration
      const signInRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        router.push('/login');
      } else {
        router.push('/listings');
        router.refresh();
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-surface rounded-xl border border-border shadow-md max-w-md w-full p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-accent text-white flex items-center justify-center font-bold mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="font-display font-medium text-2xl text-primary tracking-tight">Create an Account</h1>
          <p className="text-xs text-secondary font-medium">Join EstatePortal to save favorites and connect with owners</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-semantic-error/10 text-semantic-error text-xs font-semibold border border-semantic-error/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-tertiary absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full bg-sunken border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-tertiary focus:bg-surface focus:border-accent focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-tertiary absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@example.com"
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-sunken border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-tertiary focus:bg-surface focus:border-accent focus:outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg text-sm shadow-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
          </button>
        </form>

        <div className="text-center text-xs text-secondary pt-2 border-t border-border">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
