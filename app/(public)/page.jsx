import Link from 'next/link';
import { getFeaturedProperties, getUserFavorites } from '@/lib/data';
import { auth } from '@/lib/auth';
import PropertyCard from '@/components/PropertyCard';
import { ScrollReveal, AnimatedCounter } from '@/components/MotionWrapper';
import {
  Building2,
  Search,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Home as HomeIcon,
  Check,
  TrendingUp,
  Award,
  Users,
  Building,
} from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProperties, session] = await Promise.all([
    getFeaturedProperties(6),
    auth(),
  ]);

  const userFavorites = session?.user?.id ? await getUserFavorites(session.user.id) : [];
  const favoritedIds = new Set(userFavorites.map((f) => f._id.toString()));

  const mainFeatured = featuredProperties[0];
  const secondaryFeatured = featuredProperties.slice(1, 5);

  const cityHubs = [
    { name: 'Mumbai', count: '450+ verified homes', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bengaluru', count: '380+ tech park flats', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Ahmedabad', count: '290+ township villas', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Hyderabad', count: '310+ duplex residences', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-24 pb-24 overflow-hidden">
      {/* 1. Asymmetric Hero Section (Offset Text + Real Photography Collage) */}
      <section className="relative bg-slate-950 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Offset Content - High Type Scale Contrast */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span>1,500+ Verified Direct Owner Listings</span>
              </div>

              {/* Bold 64px Heading (Dramatic contrast vs 16px body) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                Real Estate without <br className="hidden sm:inline" />
                <span className="text-brand-500">brokerage markups</span>.
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                Connect directly with property owners across Mumbai, Bengaluru, Ahmedabad & Hyderabad. Verified title deeds, zero commission fees.
              </p>

              {/* Search Widget - Asymmetric Solid Padded Box */}
              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-2xl max-w-2xl mt-4">
                <form action="/listings" method="GET" className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {/* City Select */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <select name="city" className="w-full bg-transparent font-bold text-xs text-white focus:outline-none cursor-pointer">
                        <option value="all" className="bg-slate-900">All Metros</option>
                        <option value="Mumbai" className="bg-slate-900">Mumbai</option>
                        <option value="Bengaluru" className="bg-slate-900">Bengaluru</option>
                        <option value="Ahmedabad" className="bg-slate-900">Ahmedabad</option>
                        <option value="Hyderabad" className="bg-slate-900">Hyderabad</option>
                      </select>
                    </div>
                  </div>

                  {/* Listing Type */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Listing Type</label>
                    <div className="flex items-center gap-2">
                      <HomeIcon className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <select name="listingType" className="w-full bg-transparent font-bold text-xs text-white focus:outline-none cursor-pointer">
                        <option value="all" className="bg-slate-900">Buy or Rent</option>
                        <option value="sale" className="bg-slate-900">For Sale</option>
                        <option value="rent" className="bg-slate-900">For Rent</option>
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Category</label>
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <select name="propertyType" className="w-full bg-transparent font-bold text-xs text-white focus:outline-none cursor-pointer">
                        <option value="all" className="bg-slate-900">All Categories</option>
                        <option value="apartment" className="bg-slate-900">Apartment</option>
                        <option value="villa" className="bg-slate-900">Villa</option>
                        <option value="commercial" className="bg-slate-900">Commercial</option>
                      </select>
                    </div>
                  </div>

                  {/* Search CTA */}
                  <button
                    type="submit"
                    className="bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-xl py-3 px-5 text-xs flex items-center justify-center gap-2 shadow-glow transition"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Asymmetric Hero Image Collage */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                  alt="Worli Sky Villa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-white text-sm">Worli Sea Face Sky Villa</p>
                    <p className="text-xs text-slate-400 mt-0.5">4 BHK • 4,200 sqft • ₹18.5 Cr</p>
                  </div>
                  <Link
                    href="/property/679d"
                    className="px-3.5 py-1.5 bg-brand-600 text-white font-extrabold text-xs rounded-xl hover:bg-brand-500 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bento Grid Layout Section (Stats & Metrics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Bento Box 1 (Large - Featured Hero Card) */}
            <div className="lg:col-span-7 bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Platform Scale</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  <AnimatedCounter value={1500} suffix="+" /> Active Properties Listed
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                  Every property listed on EstatePortal is verified on-site by our inspection team. Title deeds, floor plans, and owner identities are cross-checked before publishing.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-xs">
                <div>
                  <p className="text-slate-500 font-semibold uppercase">Avg Days to Close</p>
                  <p className="text-xl font-black text-white mt-0.5">14 Days</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold uppercase">Brokerage Saved</p>
                  <p className="text-xl font-black text-emerald-400 mt-0.5">₹4.2 Cr+</p>
                </div>
              </div>
            </div>

            {/* Bento Box 2 (Stacked Small Cards) */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-white">0% Commission</p>
                  <p className="text-xs text-slate-400 mt-1">Direct owner-to-buyer agreements without brokerage fees.</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold shrink-0 ml-4">
                  <Check className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-white">8 Metro Markets</p>
                  <p className="text-xs text-slate-400 mt-1">Coverage across Mumbai, Bengaluru, Pune, Hyderabad, Delhi NCR & Ahmedabad.</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0 ml-4">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Asymmetric Featured Property Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Handpicked Portfolio</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Featured Verified Listings</h2>
            </div>
            <Link
              href="/listings"
              className="flex items-center gap-1.5 text-xs font-extrabold text-brand-400 hover:text-brand-300 transition group"
            >
              <span>Explore All 1,500+ Properties</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((prop, idx) => (
                <PropertyCard
                  key={prop._id}
                  property={prop}
                  isFavorited={favoritedIds.has(prop._id.toString())}
                  isLargeFeatured={idx === 0}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800">
              <p className="text-slate-400 text-sm">No listings found. Run seed script to load database.</p>
            </div>
          )}
        </ScrollReveal>
      </section>

      {/* 4. Editorial Layout (No Repetitive Icon Circles) */}
      <section className="bg-slate-900/80 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Platform Standards</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">How EstatePortal protects buyers</h2>
            </div>

            {/* Editorial Numbered List (Replaces repetitive colored circle icons) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              <div className="space-y-3 pr-4">
                <span className="text-3xl font-black text-brand-500 font-mono">01</span>
                <h3 className="text-lg font-bold text-white">Physical Title Audit</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  We inspect land registry records, 7/12 extracts, and RERA approval certificates before publishing any property listing.
                </p>
              </div>

              <div className="space-y-3 pt-6 md:pt-0 md:px-6">
                <span className="text-3xl font-black text-brand-500 font-mono">02</span>
                <h3 className="text-lg font-bold text-white">Direct Owner Negotiation</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  You deal directly with verified property owners or authorized builder reps. No intermediary commissions or inflated quotes.
                </p>
              </div>

              <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
                <span className="text-3xl font-black text-brand-500 font-mono">03</span>
                <h3 className="text-lg font-bold text-white">Legal Agreement Support</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Get standardized sale agreement drafts, stamp duty guidance, and home loan documentation support from verified legal partners.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. City Hubs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Growth Corridors</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Explore by City</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cityHubs.map((city) => (
              <Link
                key={city.name}
                href={`/listings?city=${city.name}`}
                className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-all duration-300"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg group-hover:text-brand-300 transition">{city.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{city.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
