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
  Eye,
  Share2,
} from 'lucide-react';

export default function PropertyDetailClient({ property, isFavorited = false, similarProperties = [], favoritedIds }) {
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
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold uppercase rounded-sm bg-accent text-white shadow-sm">
              For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
            </span>
            <span className="capitalize px-3 py-1 bg-sunken text-secondary text-xs font-medium rounded-sm border border-border">
              {property.propertyType}
            </span>
            {property.featured && (
              <span className="px-3 py-1 bg-accent-subtle text-accent text-xs font-semibold uppercase rounded-sm">
                Featured Residence
              </span>
            )}
          </div>

          <h1 className="font-display font-normal text-3xl sm:text-4xl text-primary tracking-tight leading-snug">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-sm text-secondary font-medium">
            <MapPin className="w-4 h-4 text-secondary shrink-0" />
            <span>
              {property.address?.locality}, {property.address?.city}, {property.address?.state} — {property.address?.pincode}
            </span>
          </div>
        </div>

        {/* Right Price & Actions */}
        <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
          <div className="text-2xl sm:text-3xl font-sans font-bold text-primary bg-surface border border-border px-4 py-2 rounded-md shadow-sm">
            {formatPrice(property.price, property.listingType)}
          </div>

          <div className="flex items-center gap-2">
            <FavoriteButton propertyId={property._id.toString()} initialIsFavorited={isFavorited} />
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleShare}
              className="px-3 py-2 rounded-md bg-surface border border-border text-secondary hover:text-primary transition flex items-center gap-1 text-xs font-medium"
              title="Share property"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Image Gallery Carousel */}
      <div className="space-y-3">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-lg overflow-hidden bg-sunken border border-border shadow-sm">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImageIndex}
              src={images[activeImageIndex]?.url}
              alt={`${property.title} - Photo ${activeImageIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-accent scale-105' : 'border-border opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content & Sticky Contact Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Specs & Description */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Overview Matrix */}
          <div className="bg-surface p-6 rounded-lg border border-border shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {property.propertyType !== 'commercial' && property.propertyType !== 'plot' ? (
              <>
                <div className="p-3 bg-sunken rounded-md border border-border">
                  <Bed className="w-5 h-5 text-accent mx-auto mb-1" />
                  <p className="text-lg font-bold text-primary">{property.bedrooms} BHK</p>
                  <p className="text-[11px] text-secondary uppercase font-semibold">Bedrooms</p>
                </div>
                <div className="p-3 bg-sunken rounded-md border border-border">
                  <Bath className="w-5 h-5 text-accent mx-auto mb-1" />
                  <p className="text-lg font-bold text-primary">{property.bathrooms}</p>
                  <p className="text-[11px] text-secondary uppercase font-semibold">Bathrooms</p>
                </div>
              </>
            ) : (
              <div className="col-span-2 p-3 bg-sunken rounded-md border border-border">
                <Building className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-lg font-bold text-primary capitalize">{property.propertyType}</p>
                <p className="text-[11px] text-secondary uppercase font-semibold">Property Type</p>
              </div>
            )}

            <div className="p-3 bg-sunken rounded-md border border-border">
              <Maximize2 className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{property.areaSqft?.toLocaleString('en-IN')}</p>
              <p className="text-[11px] text-secondary uppercase font-semibold">Sq. Ft. Area</p>
            </div>

            <div className="p-3 bg-sunken rounded-md border border-border">
              <Eye className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{property.views || 1}</p>
              <p className="text-[11px] text-secondary uppercase font-semibold">Total Views</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-surface p-6 sm:p-8 rounded-lg border border-border shadow-sm space-y-3">
            <h2 className="font-display font-medium text-2xl text-primary">Property Overview</h2>
            <p className="text-primary text-base leading-relaxed font-normal whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          {property.amenities?.length > 0 && (
            <div className="bg-surface p-6 sm:p-8 rounded-lg border border-border shadow-sm space-y-4">
              <h2 className="font-display font-medium text-2xl text-primary">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-md bg-sunken border border-border text-xs font-semibold text-primary"
                  >
                    <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Contact Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="bg-surface p-6 rounded-lg border border-border shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-base">
                {property.ownerName?.charAt(0) || 'O'}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">Direct Owner Contact</p>
                <h3 className="font-sans font-bold text-primary text-base">{property.ownerName || 'Property Representative'}</h3>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-md bg-sunken border border-border text-primary font-medium">
                <Phone className="w-4 h-4 text-accent" />
                <span>{property.ownerPhone || '+91 Contact Via Form'}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md bg-sunken border border-border text-primary font-medium truncate">
                <Mail className="w-4 h-4 text-accent" />
                <span className="truncate">{property.ownerEmail || 'concierge@estateportal.com'}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setModalOpen(true)}
              className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-md text-sm transition"
            >
              Inquire / Request Viewing
            </motion.button>

            <p className="text-xs text-center text-secondary font-medium">
              Zero brokerage fees. Connect directly with the verified listing owner.
            </p>
          </div>
        </div>
      </div>

      {/* Similar Residences */}
      {similarProperties.length > 0 && (
        <div className="pt-8 border-t border-border space-y-6">
          <h2 className="font-display font-medium text-2xl text-primary">Similar Verified Residences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard
                key={prop._id}
                property={prop}
                isFavorited={favoritedIds?.has(prop._id.toString()) ?? false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Contact Owner Modal Popup */}
      <ContactModal property={property} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
