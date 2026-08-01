'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Heart, LogOut, Menu, X, Shield, Sparkles, ChevronDown } from 'lucide-react';

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
    { label: 'Browse Listings', href: '/listings' },
    { label: 'For Sale', href: '/listings?listingType=sale' },
    { label: 'For Rent', href: '/listings?listingType=rent' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-2.5'
          : 'bg-slate-950/60 backdrop-blur-md border-b border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-400 text-white flex items-center justify-center font-bold text-xl shadow-glow transition-all"
            >
              <Building2 className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white leading-none group-hover:text-brand-300 transition">
                ESTATE<span className="text-brand-500">PORTAL</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                Luxury Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-xs font-bold transition text-slate-300 hover:text-white"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-brand-600/20 border border-brand-500/40 rounded-full shadow-subtle"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-brand-300 font-extrabold' : ''}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Session */}
          <div className="hidden md:flex items-center gap-3">
            {/* Favorites Link */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/favorites"
                className="relative p-2.5 text-slate-300 hover:text-red-400 hover:bg-slate-900 rounded-xl border border-slate-800 transition flex items-center gap-1.5 text-xs font-semibold"
                title="Saved Shortlist"
              >
                <Heart className="w-4 h-4 text-red-500" />
                <span className="hidden lg:inline">Shortlist</span>
              </Link>
            </motion.div>

            {/* Session Actions */}
            {session ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 text-slate-200 text-xs font-semibold shadow-sm transition"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-[10px]">
                    {session.user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[110px] truncate">{session.user.name}</span>
                  {isAdmin && (
                    <span className="px-1.5 py-0.5 text-[9px] uppercase font-black bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
                      Admin
                    </span>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-modal py-2 z-50 text-xs"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-800/80">
                        <p className="font-bold text-white truncate">{session.user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{session.user.email}</p>
                      </div>

                      <Link
                        href="/favorites"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white transition font-medium"
                      >
                        <Heart className="w-4 h-4 text-red-500" />
                        Saved Properties
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-amber-400 hover:bg-amber-500/10 transition font-bold"
                        >
                          <Shield className="w-4 h-4 text-amber-400" />
                          Admin Console
                        </Link>
                      )}

                      <div className="pt-1 border-t border-slate-800/80">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut({ callbackUrl: '/' });
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition font-semibold text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition"
                >
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 rounded-xl shadow-glow transition"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-300 bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer with Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 font-semibold text-sm"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 font-semibold text-sm"
            >
              <Heart className="w-4 h-4 text-red-500" />
              Shortlist Favorites
            </Link>

            {session ? (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <p className="px-3 text-[11px] text-slate-400 font-bold uppercase">Signed in as {session.user.name}</p>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 rounded-xl"
                  >
                    Admin Console
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="w-full text-left px-3 py-2.5 text-red-400 font-semibold hover:bg-red-500/10 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 text-slate-200 border border-slate-800 rounded-xl font-bold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 text-white bg-brand-600 rounded-xl font-extrabold text-xs shadow-glow"
                >
                  Create Account
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
