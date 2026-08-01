'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Building2, Heart, User, LogOut, Menu, X, Shield, PlusCircle, Search } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAdmin = session?.user?.role === 'admin';

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Listings', href: '/listings' },
    { label: 'Buy', href: '/listings?listingType=sale' },
    { label: 'Rent', href: '/listings?listingType=rent' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:bg-brand-700 transition">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                ESTATE<span className="text-brand-600">PORTAL</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
                Premium Properties
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'text-brand-700 bg-brand-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Session */}
          <div className="hidden md:flex items-center gap-3">
            {/* Favorites Icon */}
            <Link
              href="/favorites"
              className="relative p-2 text-slate-600 hover:text-red-500 hover:bg-slate-50 rounded-lg transition"
              title="Saved Favorites"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Session Actions */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-slate-800 text-sm font-medium transition"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs">
                    {session.user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">{session.user.name}</span>
                  {isAdmin && (
                    <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold bg-amber-100 text-amber-800 rounded">
                      Admin
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-sm"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-semibold text-slate-800 truncate">{session.user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                    </div>

                    <Link
                      href="/favorites"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition"
                    >
                      <Heart className="w-4 h-4 text-red-500" />
                      Saved Properties
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-amber-700 hover:bg-amber-50 transition font-medium"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
          >
            <Heart className="w-4 h-4 text-red-500" />
            Favorites
          </Link>

          {session ? (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="px-3 text-xs text-slate-400 font-semibold uppercase">Signed in as {session.user.name}</p>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-amber-700 font-semibold bg-amber-50 rounded-lg"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="w-full text-left px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 text-slate-700 border border-slate-200 rounded-lg font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 text-white bg-brand-600 rounded-lg font-semibold"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
