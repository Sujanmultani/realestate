import Link from 'next/link';
import { getFeaturedProperties, getUserFavorites } from '@/lib/data';
import { auth } from '@/lib/auth';
import PropertyCard from '@/components/PropertyCard';
import { ScrollReveal, AnimatedCounter } from '@/components/MotionWrapper';
import { Search, MapPin, Home as HomeIcon, Building, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProperties, session] = await Promise.all([
    getFeaturedProperties(6),
    auth(),
  ]);

  const userFavorites = session?.user?.id ? await getUserFavorites(session.user.id) : [];
  const favoritedIds = new Set(userFavorites.map((f) => f._id.toString()));

  const cityHubs = [
    { name: 'Mumbai', count: '450+ Residences', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bengaluru', count: '380+ Residences', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Ahmedabad', count: '290+ Residences', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Hyderabad', count: '310+ Residences', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Editorial Hero Section */}
      <section className="relative pt-12 pb-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Offset Typography */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Direct Owner Real Estate
              </span>

              {/* Fraunces 64px display heading (weight 400 - serif display face regular) */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl font-normal text-primary tracking-tight leading-[1.08]">
                Properties of distinction, listed directly by owners.
              </h1>

              <p className="text-secondary text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                Discover verified sky villas, luxury penthouses, duplex residences, and commercial assets across India’s primary growth corridors.
              </p>

              {/* Search Widget */}
              <div className="bg-surface p-4 sm:p-5 rounded-lg border border-border shadow-sm max-w-2xl mt-6">
                <form action="/listings" method="GET" className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {/* Location */}
                  <div className="bg-sunken border border-border rounded-md p-2.5">
                    <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-0.5">Location</label>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <select name="city" className="w-full bg-transparent font-medium text-sm text-primary focus:outline-none cursor-pointer">
                        <option value="all">All Metros</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Hyderabad">Hyderabad</option>
                      </select>
                    </div>
                  </div>

                  {/* Listing Type */}
                  <div className="bg-sunken border border-border rounded-md p-2.5">
                    <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-0.5">Type</label>
                    <div className="flex items-center gap-1.5">
                      <HomeIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <select name="listingType" className="w-full bg-transparent font-medium text-sm text-primary focus:outline-none cursor-pointer">
                        <option value="all">Buy or Rent</option>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="bg-sunken border border-border rounded-md p-2.5">
                    <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-0.5">Category</label>
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <select name="propertyType" className="w-full bg-transparent font-medium text-sm text-primary focus:outline-none cursor-pointer">
                        <option value="all">All Categories</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-hover text-white font-semibold rounded-md py-3 px-5 text-sm flex items-center justify-center gap-2 transition"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Photography Frame */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border shadow-md bg-sunken">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                  alt="Worli Sky Villa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-surface/95 border border-border backdrop-blur-md rounded-md flex items-center justify-between">
                  <div>
                    <p className="font-display font-medium text-primary text-base">Worli Sea Face Sky Villa</p>
                    <p className="text-xs text-secondary mt-0.5">4 BHK • 4,200 sqft • ₹18.5 Cr</p>
                  </div>
                  <Link
                    href="/listings"
                    className="px-3.5 py-1.5 bg-accent text-white font-semibold text-xs rounded-md hover:bg-accent-hover transition"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface p-8 sm:p-12 rounded-xl border border-border shadow-sm">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Curated Inventory</span>
              <h2 className="font-display font-normal text-3xl sm:text-4xl text-primary leading-tight">
                <AnimatedCounter value={1500} suffix="+" /> Verified Residences
              </h2>
              <p className="text-secondary text-base leading-relaxed">
                Every residence listed undergoes title verification, land registry checks, and on-site physical audits before publication.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-6 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
              <div>
                <p className="text-xs text-secondary uppercase font-semibold">Brokerage Fee</p>
                <p className="text-3xl font-display font-medium text-accent mt-1">0%</p>
                <p className="text-xs text-tertiary mt-1">Direct owner contracts</p>
              </div>

              <div>
                <p className="text-xs text-secondary uppercase font-semibold">Active Corridors</p>
                <p className="text-3xl font-display font-medium text-primary mt-1">8 Metros</p>
                <p className="text-xs text-tertiary mt-1">Primary growth hubs</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Featured Properties Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Curated Selection</span>
              <h2 className="font-display font-normal text-3xl text-primary mt-1">Featured Prime Properties</h2>
            </div>
            <Link
              href="/listings"
              className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition group"
            >
              <span>View All Properties</span>
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
            <div className="bg-surface rounded-lg p-12 text-center border border-border">
              <p className="text-secondary text-sm">No properties found. Run seed script to populate database.</p>
            </div>
          )}
        </ScrollReveal>
      </section>

      {/* 4. Editorial Standards (Numbered List, No Repetitive Circles) */}
      <section className="bg-sunken border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-xl mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Verified Standards</span>
              <h2 className="font-display font-normal text-3xl text-primary mt-1">The EstatePortal Process</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="space-y-3 pr-4">
                <span className="text-2xl font-display font-medium text-accent">01</span>
                <h3 className="text-lg font-bold text-primary">Physical Title Audit</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  We inspect land registry records, 7/12 extracts, and RERA approval certificates before publishing any property listing.
                </p>
              </div>

              <div className="space-y-3 pt-6 md:pt-0 md:px-6">
                <span className="text-2xl font-display font-medium text-accent">02</span>
                <h3 className="text-lg font-bold text-primary">Direct Owner Negotiation</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  You deal directly with verified property owners or authorized builder reps with zero middleman markups.
                </p>
              </div>

              <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
                <span className="text-2xl font-display font-medium text-accent">03</span>
                <h3 className="text-lg font-bold text-primary">Legal Agreement Support</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Get standardized sale agreement drafts, stamp duty guidance, and home loan documentation assistance.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. City Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Growth Corridors</span>
            <h2 className="font-display font-normal text-3xl text-primary mt-1">Explore by City</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cityHubs.map((city) => (
              <Link
                key={city.name}
                href={`/listings?city=${city.name}`}
                className="group relative rounded-lg overflow-hidden aspect-[16/10] bg-sunken border border-border hover:border-accent transition"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-70 group-hover:opacity-85"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display font-medium text-lg text-white">{city.name}</h3>
                  <p className="text-xs text-slate-200 font-medium">{city.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
