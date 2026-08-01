'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';
import FavoriteButton from './FavoriteButton';
import PropertyCard, { formatPrice } from './PropertyCard';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Building,
  CheckCircle,
  Phone,
  Mail,
  User,
  Eye,
  Share2,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function PropertyDetailClient({ property, isFavorited = false, similarProperties = [] }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!property) return null;

  const images = property.images?.length
    ? property.images
    : [{ url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80' }];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 text-xs font-black uppercase rounded-lg text-white shadow-sm ${
                property.listingType === 'sale' ? 'bg-brand-600' : 'bg-blue-600'
              }`}
            >
              For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
            </span>
            <span className="capitalize px-3 py-1 bg-slate-900 border border-slate-800 text-brand-300 text-xs font-extrabold rounded-lg">
              {property.propertyType}
            </span>
            {property.featured && (
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black uppercase rounded-lg">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Listing
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
            <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
            <span>
              {property.address?.locality}, {property.address?.city}, {property.address?.state} — {property.address?.pincode}
            </span>
          </div>
        </div>

        {/* Right Actions & Price */}
        <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
          <div className="text-2xl sm:text-3xl font-black text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl shadow-subtle">
            {formatPrice(property.price, property.listingType)}
          </div>

          <div className="flex items-center gap-2">
            <FavoriteButton propertyId={property._id.toString()} initialIsFavorited={isFavorited} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2.5 rounded-full glass-panel text-slate-300 hover:text-white transition flex items-center gap-1 text-xs font-bold"
              title="Share property"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Copied Link!' : 'Share'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Image Gallery Carousel */}
      <div className="space-y-3">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-modal">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImageIndex}
              src={images[activeImageIndex]?.url}
              alt={`${property.title} - Image ${activeImageIndex + 1}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-brand-500 scale-105 shadow-glow' : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid Layout: Content Left vs Sticky Contact Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Overview Specs */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {property.propertyType !== 'commercial' && property.propertyType !== 'plot' ? (
              <>
                <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
                  <Bed className="w-5 h-5 text-brand-400 mx-auto mb-1" />
                  <p className="text-lg font-black text-white">{property.bedrooms} BHK</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Bedrooms</p>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
                  <Bath className="w-5 h-5 text-brand-400 mx-auto mb-1" />
                  <p className="text-lg font-black text-white">{property.bathrooms}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Bathrooms</p>
                </div>
              </>
            ) : (
              <div className="col-span-2 p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
                <Building className="w-5 h-5 text-brand-400 mx-auto mb-1" />
                <p className="text-lg font-black text-white capitalize">{property.propertyType}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Property Type</p>
              </div>
            )}

            <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
              <Maximize2 className="w-5 h-5 text-brand-400 mx-auto mb-1" />
              <p className="text-lg font-black text-white">{property.areaSqft?.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Sq. Ft. Area</p>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
              <Eye className="w-5 h-5 text-brand-400 mx-auto mb-1" />
              <p className="text-lg font-black text-white">{property.views || 1}</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Total Views</p>
            </div>
          </div>

          {/* Description */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-3">
            <h2 className="text-xl font-black text-white">About This Property</h2>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-medium">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          {property.amenities?.length > 0 && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <h2 className="text-xl font-black text-white">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-bold text-slate-200"
                  >
                    <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Contact Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 shadow-modal">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-black text-lg">
                {property.ownerName?.charAt(0) || 'O'}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-400">Listed By Owner</p>
                <h3 className="font-extrabold text-white text-base">{property.ownerName || 'Property Representative'}</h3>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold">
                <Phone className="w-4 h-4 text-brand-400" />
                <span>{property.ownerPhone || '+91 Contact Via Modal'}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold truncate">
                <Mail className="w-4 h-4 text-brand-400" />
                <span className="truncate">{property.ownerEmail || 'contact@realestate.com'}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-black rounded-2xl text-xs shadow-glow transition"
            >
              Inquire / Request Tour
            </motion.button>

            <p className="text-[11px] text-center text-slate-500 font-medium">
              Zero brokerage fees. Connect directly with the verified listing owner.
            </p>
          </div>
        </div>
      </div>

      {/* Similar Listings Carousel */}
      {similarProperties.length > 0 && (
        <div className="pt-8 border-t border-slate-800 space-y-6">
          <h2 className="text-2xl font-black text-white">Similar Verified Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} isFavorited={isFavorited} />
            ))}
          </div>
        </div>
      )}

      {/* Contact Owner Modal Popup */}
      <ContactModal property={property} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
