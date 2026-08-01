import Link from 'next/link';
import { Building2, Heart, Shield, Sparkles, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-400 text-white flex items-center justify-center font-bold text-lg shadow-glow">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                ESTATE<span className="text-brand-500">PORTAL</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              India’s next-generation luxury & commercial real estate marketplace with zero middleman fees and 100% verified listings.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-tight uppercase">Quick Navigation</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/" className="hover:text-brand-300 transition">
                  Home Portal
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-brand-300 transition">
                  Browse All Listings
                </Link>
              </li>
              <li>
                <Link href="/listings?listingType=sale" className="hover:text-brand-300 transition">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link href="/listings?listingType=rent" className="hover:text-brand-300 transition">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-brand-300 transition">
                  Shortlisted Homes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Metros */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-tight uppercase">Top Growth Corridors</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/listings?city=Mumbai" className="hover:text-brand-300 transition">
                  Mumbai Luxury Real Estate
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Bengaluru" className="hover:text-brand-300 transition">
                  Bengaluru Tech Parks & Villas
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Ahmedabad" className="hover:text-brand-300 transition">
                  Ahmedabad Townships
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Hyderabad" className="hover:text-brand-300 transition">
                  Hyderabad Jubilee Hills Enclave
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Gurugram" className="hover:text-brand-300 transition">
                  Gurugram Grade-A Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Verification */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-tight uppercase">Headquarters</h4>
            <div className="space-y-2 font-medium">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                Worli Sea Face, Mumbai 400018
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                +91 1800-REAL-ESTATE
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                support@estateportal.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-medium text-slate-500">
          <p>© {new Date().getFullYear()} EstatePortal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-brand-400 transition text-amber-400 font-extrabold">
              Admin Portal
            </Link>
            <Link href="/listings" className="hover:text-slate-300 transition">
              Privacy Policy
            </Link>
            <Link href="/listings" className="hover:text-slate-300 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
