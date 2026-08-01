import Link from 'next/link';
import { getFeaturedProperties, getUserFavorites } from '@/lib/data';
import { auth } from '@/lib/auth';
import PropertyCard from '@/components/PropertyCard';
import { Building2, Search, MapPin, ShieldCheck, Sparkles, ArrowRight, Home as HomeIcon, CheckCircle2, TrendingUp } from 'lucide-react';

export const revalidate = 60; // Revalidate home page every 60 seconds

export default async function HomePage() {
  const [featuredProperties, session] = await Promise.all([
    getFeaturedProperties(6),
    auth(),
  ]);

  const userFavorites = session?.user?.id ? await getUserFavorites(session.user.id) : [];
  const favoritedIds = new Set(userFavorites.map((f) => f._id.toString()));

  const popularCities = [
    { name: 'Mumbai', label: 'Financial Capital', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80', count: '450+ Properties' },
    { name: 'Bengaluru', label: 'Tech Capital', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80', count: '380+ Properties' },
    { name: 'Ahmedabad', label: 'Growing Megacity', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', count: '290+ Properties' },
    { name: 'Pune', label: 'Cultural & IT Hub', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', count: '240+ Properties' },
    { name: 'Hyderabad', label: 'Cyberabad Hub', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80', count: '310+ Properties' },
    { name: 'Delhi', label: 'National Capital', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', count: '410+ Properties' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white min-h-[580px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
            alt="Hero Luxury Real Estate"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Your Dream Address</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find verified homes that fit your <span className="text-brand-400">lifestyle</span>.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            Explore 1,000+ verified apartments, luxury villas, commercial spaces, and residential plots across India's top metropolitan cities.
          </p>

          {/* Quick Search Form Container */}
          <div className="mt-10 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-2xl text-slate-900 border border-white/20 max-w-4xl mx-auto">
            <form action="/listings" method="GET" className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {/* City Select */}
              <div className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-3">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Location</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                  <select name="city" className="w-full bg-transparent font-semibold text-xs text-slate-800 focus:outline-none cursor-pointer">
                    <option value="all">All Metros</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi">Delhi NCR</option>
                  </select>
                </div>
              </div>

              {/* Listing Type */}
              <div className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-3">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Purpose</label>
                <div className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4 text-brand-600 shrink-0" />
                  <select name="listingType" className="w-full bg-transparent font-semibold text-xs text-slate-800 focus:outline-none cursor-pointer">
                    <option value="all">Buy or Rent</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              {/* Property Type */}
              <div className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-3">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Category</label>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <select name="propertyType" className="w-full bg-transparent font-semibold text-xs text-slate-800 focus:outline-none cursor-pointer">
                    <option value="all">All Types</option>
                    <option value="apartment">Apartment / Flat</option>
                    <option value="villa">Independent Villa</option>
                    <option value="house">Duplex House</option>
                    <option value="commercial">Commercial</option>
                    <option value="plot">Plot / Land</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-2xl py-3 px-6 text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-slate-900">1,500+</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Verified Properties</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-slate-900">12,000+</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Happy Families</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-slate-900">8 Metros</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Prime Cities</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-brand-600">99.4%</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Handpicked Selection</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Featured Prime Properties</h2>
            <p className="text-sm text-slate-500 mt-1">Curated high-value listings with complete title verification and virtual tours.</p>
          </div>
          <Link
            href="/listings"
            className="flex items-center gap-1.5 text-sm font-extrabold text-brand-700 hover:text-brand-800 transition"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} isFavorited={favoritedIds.has(prop._id.toString())} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500">No featured properties found. Run the seed script to populate realistic listings.</p>
          </div>
        )}
      </section>

      {/* Popular Cities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Top Destinations</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Explore Properties by City</h2>
          <p className="text-sm text-slate-500 mt-1">Find top-rated residential and commercial hubs in key Indian growth corridors.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularCities.map((city) => (
            <Link
              key={city.name}
              href={`/listings?city=${city.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-sm border border-slate-200 hover:shadow-lg transition duration-300"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-bold text-base group-hover:text-brand-300 transition">{city.name}</h3>
                <p className="text-[11px] text-slate-300 font-medium truncate">{city.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose EstatePortal */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Unmatched Trust</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Why Choose EstatePortal?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">100% Verified Listings</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every property listing undergoes physical site audits and title verification before publishing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Direct Owner Contact</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Connect directly with property owners and verified developer representatives with zero middleman fees.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">End-to-End Assistance</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                From virtual site visits to home loan sanctions and legal paperwork assistance, we guide you every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 relative z-10 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Are you a Property Owner or Agent?</h2>
            <p className="text-slate-300 text-sm">
              List your property on EstatePortal and get instant access to thousands of active buyers and tenants.
            </p>
          </div>
          <div className="relative z-10 flex gap-4">
            <Link
              href="/admin"
              className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl text-sm shadow-md transition"
            >
              Post Free Property
            </Link>
            <Link
              href="/listings"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition border border-slate-700"
            >
              Explore Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
