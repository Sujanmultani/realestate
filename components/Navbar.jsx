'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Heart, LogOut, Menu, X, Shield, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/listings' },
    { label: 'For Sale', href: '/listings?listingType=sale' },
    { label: 'For Rent', href: '/listings?listingType=rent' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-bg border-b border-border/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo in Fraunces Medium */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-accent text-white flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-medium text-xl text-primary tracking-tight">
              EstatePortal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-sunken p-1 rounded-md border border-border">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-sm font-medium transition rounded-sm ${
                    isActive ? 'text-accent font-semibold' : 'text-secondary hover:text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-accent-subtle rounded-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/favorites"
              className="p-2 text-secondary hover:text-accent rounded-md border border-border bg-surface transition flex items-center gap-1.5 text-sm font-medium"
              title="Saved Shortlist"
            >
              <Heart className="w-4 h-4 text-accent" />
              <span className="hidden lg:inline">Shortlist</span>
            </Link>

            {session ? (
              <div className="relative">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border text-primary text-sm font-medium transition hover:border-border-strong"
                >
                  <div className="w-6 h-6 rounded-full bg-accent text-white font-bold flex items-center justify-center text-xs">
                    {session.user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{session.user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-secondary" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 mt-2 w-52 bg-surface border border-border rounded-lg shadow-md py-2 z-50 text-sm"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-border">
                        <p className="font-semibold text-primary truncate">{session.user.name}</p>
                        <p className="text-xs text-secondary truncate">{session.user.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-accent font-semibold hover:bg-accent-subtle transition"
                        >
                          <Shield className="w-4 h-4 text-accent" />
                          Admin Console
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-semantic-error hover:bg-red-50 transition font-medium text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary transition">
                  Sign In
                </Link>
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-md transition shadow-sm"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-primary bg-surface border border-border"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-bg px-4 pt-3 pb-6 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-primary font-medium text-sm rounded-md hover:bg-sunken"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-accent font-medium text-sm rounded-md hover:bg-accent-subtle"
            >
              <Heart className="w-4 h-4 text-accent" />
              Shortlist
            </Link>

            {!session && (
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2 text-primary border border-border rounded-md font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2 text-white bg-accent rounded-md font-semibold text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
