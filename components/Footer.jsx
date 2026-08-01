import Link from 'next/link';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border text-secondary text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-accent text-white flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-medium text-xl text-primary tracking-tight">
                EstatePortal
              </span>
            </Link>
            <p className="text-secondary leading-relaxed">
              Curated luxury & commercial real estate marketplace with verified title deeds and direct owner representation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-primary text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/" className="hover:text-accent transition">
                  Home Residences
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-accent transition">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/listings?listingType=sale" className="hover:text-accent transition">
                  Residences for Sale
                </Link>
              </li>
              <li>
                <Link href="/listings?listingType=rent" className="hover:text-accent transition">
                  Residences for Rent
                </Link>
              </li>
            </ul>
          </div>

          {/* Markets */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-primary text-xs uppercase tracking-wider">Primary Markets</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/listings?city=Mumbai" className="hover:text-accent transition">
                  Mumbai Luxury Enclaves
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Bengaluru" className="hover:text-accent transition">
                  Bengaluru Tech Parks
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Ahmedabad" className="hover:text-accent transition">
                  Ahmedabad Townships
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Hyderabad" className="hover:text-accent transition">
                  Hyderabad Jubilee Hills
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-primary text-xs uppercase tracking-wider">Headquarters</h4>
            <div className="space-y-2 font-medium">
              <p className="flex items-center gap-2 text-secondary">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                Worli Sea Face, Mumbai 400018
              </p>
              <p className="flex items-center gap-2 text-secondary">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                +91 1800-REAL-ESTATE
              </p>
              <p className="flex items-center gap-2 text-secondary">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                concierge@estateportal.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-tertiary">
          <p>© {new Date().getFullYear()} EstatePortal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-accent transition font-semibold text-accent">
              Admin Console
            </Link>
            <Link href="/listings" className="hover:text-secondary transition">
              Privacy Policy
            </Link>
            <Link href="/listings" className="hover:text-secondary transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
