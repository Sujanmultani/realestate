'use client';

import { useState } from 'react';
import ContactModal from '@/components/ContactModal';
import FavoriteButton from '@/components/FavoriteButton';
import { formatPrice } from '@/components/PropertyCard';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Eye,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CheckCircle,
  Share2,
  Sparkles,
} from 'lucide-react';

export default function PropertyDetailClient({ property, isFavorited = false }) {
  const [selectedImage, setSelectedImage] = useState(
    property?.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  );
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!property) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Title & Quick Info Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md text-white ${
                  property.listingType === 'sale' ? 'bg-brand-600' : 'bg-blue-600'
                }`}
              >
                For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
              </span>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-700 rounded-md">
                {property.propertyType}
              </span>
              {property.featured && (
                <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-amber-500 text-white rounded-md">
                  <Sparkles className="w-3.5 h-3.5" /> Featured
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {property.title}
            </h1>

            <p className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
              <span>
                {property.address.locality}, {property.address.city}, {property.address.state} - {property.address.pincode}
              </span>
            </p>
          </div>

          {/* Right Action & Price Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0">
            <div className="text-left sm:text-right">
              <p className="text-xs font-bold uppercase text-slate-400">Asking Price</p>
              <p className="text-3xl font-black text-brand-700">
                {formatPrice(property.price, property.listingType)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <FavoriteButton propertyId={property._id.toString()} initialIsFavorited={isFavorited} />
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-brand-600 shadow-sm transition"
                title="Share link"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-3">
          {/* Main Selected Image */}
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200">
            <img src={selectedImage} alt={property.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-slate-900/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>{property.views || 1} Views</span>
            </div>
          </div>

          {/* Thumbnails */}
          {property.images && property.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                    selectedImage === img.url ? 'border-brand-600 ring-2 ring-brand-500/20' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Specs Bar & Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Specs Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-slate-100">
              {property.propertyType !== 'commercial' && property.propertyType !== 'plot' ? (
                <>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400">Bedrooms</p>
                    <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-slate-800">
                      <Bed className="w-5 h-5 text-brand-600" />
                      <span>{property.bedrooms} BHK</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400">Bathrooms</p>
                    <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-slate-800">
                      <Bath className="w-5 h-5 text-brand-600" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-span-2 space-y-1">
                  <p className="text-xs font-semibold text-slate-400">Category</p>
                  <p className="text-lg font-bold text-slate-800 capitalize">{property.propertyType}</p>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400">Carpet Area</p>
                <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-slate-800">
                  <Maximize2 className="w-5 h-5 text-brand-600" />
                  <span>{property.areaSqft?.toLocaleString('en-IN')} sqft</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400">Availability</p>
                <p className="text-lg font-bold text-emerald-600 capitalize">{property.status}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">About this Property</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Key Features & Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                      <CheckCircle className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Owner Contact Card */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6 sticky top-24">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg">
                  {property.ownerName?.charAt(0) || 'O'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{property.ownerName || 'Property Owner'}</h3>
                  <p className="text-xs text-slate-500 font-medium">Verified Property Representative</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                  <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{property.ownerPhone || '+91 98000 00000'}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl truncate">
                  <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="font-semibold text-slate-800 truncate">{property.ownerEmail || 'contact@owner.com'}</span>
                </div>
              </div>

              <button
                onClick={() => setContactModalOpen(true)}
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-2xl text-sm shadow-md transition"
              >
                Send Inquiry to Owner
              </button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Listing • Zero Spam Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal Launcher */}
      <ContactModal
        property={property}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
