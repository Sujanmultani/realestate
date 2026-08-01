import Link from 'next/link';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                ESTATE<span className="text-brand-500">PORTAL</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              India's premier real estate destination for verified residential & commercial properties. Connecting buyers, renters, and top developers seamlessly.
            </p>
            <div className="pt-2 flex items-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-brand-500" /> +91 1800 123 4567</span>
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-brand-500" /> contact@estateportal.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Property Types</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/listings?propertyType=apartment" className="hover:text-brand-400 transition">Apartments & Flats</Link></li>
              <li><Link href="/listings?propertyType=villa" className="hover:text-brand-400 transition">Independent Villas</Link></li>
              <li><Link href="/listings?propertyType=house" className="hover:text-brand-400 transition">Duplex Houses</Link></li>
              <li><Link href="/listings?propertyType=commercial" className="hover:text-brand-400 transition">Commercial Spaces</Link></li>
              <li><Link href="/listings?propertyType=plot" className="hover:text-brand-400 transition">Plots & Lands</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Top Cities</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/listings?city=Mumbai" className="hover:text-brand-400 transition">Mumbai</Link></li>
              <li><Link href="/listings?city=Bengaluru" className="hover:text-brand-400 transition">Bengaluru</Link></li>
              <li><Link href="/listings?city=Ahmedabad" className="hover:text-brand-400 transition">Ahmedabad</Link></li>
              <li><Link href="/listings?city=Pune" className="hover:text-brand-400 transition">Pune</Link></li>
              <li><Link href="/listings?city=Hyderabad" className="hover:text-brand-400 transition">Hyderabad</Link></li>
            </ul>
          </div>

          {/* Account & Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Account & Tools</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/login" className="hover:text-brand-400 transition">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-brand-400 transition">Register Account</Link></li>
              <li><Link href="/favorites" className="hover:text-brand-400 transition">Saved Properties</Link></li>
              <li><Link href="/admin" className="hover:text-brand-400 transition">Admin Console</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EstatePortal Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
