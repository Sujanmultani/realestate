'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CloudinaryUploader from './CloudinaryUploader';
import { formatPrice } from './PropertyCard';
import { createPropertyAction, updatePropertyAction, deletePropertyAction } from '@/lib/actions';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Building2,
  Eye,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Search,
} from 'lucide-react';

export default function PropertyManagerClient({ initialProperties = [], initialSearch = '' }) {
  const router = useRouter();
  const [properties, setProperties] = useState(initialProperties);
  const [search, setSearch] = useState(initialSearch);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form Fields State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'apartment',
    listingType: 'sale',
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1200,
    address: { city: 'Mumbai', locality: 'Bandra West', pincode: '400050', state: 'Maharashtra' },
    images: [],
    amenities: 'Gym, Power Backup, Security, Covered Parking',
    ownerName: 'Portal Admin',
    ownerPhone: '+91 98200 12345',
    ownerEmail: 'admin@realestate.com',
    status: 'available',
    featured: false,
  });

  const handleOpenAdd = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      propertyType: 'apartment',
      listingType: 'sale',
      bedrooms: 2,
      bathrooms: 2,
      areaSqft: 1200,
      address: { city: 'Mumbai', locality: 'Bandra West', pincode: '400050', state: 'Maharashtra' },
      images: [],
      amenities: 'Gym, Power Backup, Security, Covered Parking',
      ownerName: 'Portal Admin',
      ownerPhone: '+91 98200 12345',
      ownerEmail: 'admin@realestate.com',
      status: 'available',
      featured: false,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title || '',
      description: property.description || '',
      price: property.price || '',
      propertyType: property.propertyType || 'apartment',
      listingType: property.listingType || 'sale',
      bedrooms: property.bedrooms || 1,
      bathrooms: property.bathrooms || 1,
      areaSqft: property.areaSqft || 1000,
      address: {
        city: property.address?.city || 'Mumbai',
        locality: property.address?.locality || '',
        pincode: property.address?.pincode || '',
        state: property.address?.state || 'Maharashtra',
      },
      images: property.images || [],
      amenities: Array.isArray(property.amenities) ? property.amenities.join(', ') : '',
      ownerName: property.ownerName || '',
      ownerPhone: property.ownerPhone || '',
      ownerEmail: property.ownerEmail || '',
      status: property.status || 'available',
      featured: property.featured || false,
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const amenitiesArray = formData.amenities
      ? formData.amenities.split(',').map((a) => a.trim()).filter(Boolean)
      : [];

    const payload = {
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      areaSqft: Number(formData.areaSqft),
      amenities: amenitiesArray,
    };

    try {
      let res;
      if (editingProperty) {
        res = await updatePropertyAction(editingProperty._id, payload);
      } else {
        res = await createPropertyAction(payload);
      }

      if (!res.success) {
        setError(res.error || 'Operation failed');
      } else {
        setIsFormOpen(false);
        router.refresh();
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setLoading(true);

    try {
      const res = await deletePropertyAction(deletingId);
      if (res.success) {
        setDeletingId(null);
        router.refresh();
      } else {
        alert(res.error || 'Failed to delete property');
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((p) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(term) ||
      p.address?.city?.toLowerCase().includes(term) ||
      p.address?.locality?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Properties</h1>
          <p className="text-xs text-slate-400">Add, edit, feature, or remove property listings in MongoDB.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by title, city, or locality..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Properties Table */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold border-b border-slate-700/60">
              <tr>
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40 text-slate-300">
              {filteredProperties.map((prop) => (
                <tr key={prop._id} className="hover:bg-slate-700/30 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.images[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=150&q=80'}
                        alt=""
                        className="w-12 h-10 object-cover rounded-lg bg-slate-900 shrink-0"
                      />
                      <div className="max-w-[200px]">
                        <p className="font-bold text-white truncate">{prop.title}</p>
                        {prop.featured && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-400">
                            <Sparkles className="w-2.5 h-2.5" /> Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 capitalize font-semibold">{prop.propertyType} ({prop.listingType})</td>
                  <td className="py-3.5 px-4 font-bold text-amber-400">{formatPrice(prop.price, prop.listingType)}</td>
                  <td className="py-3.5 px-4 text-slate-400">{prop.address?.locality}, {prop.address?.city}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                        prop.status === 'available'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {prop.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{prop.views || 0}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/property/${prop._id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(prop)}
                        className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 transition"
                        title="Edit Property"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingId(prop._id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
                        title="Delete Property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl max-w-2xl w-full p-6 space-y-6 my-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Property Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Luxury 3BHK Apartment in Bandra"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="25000000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Listing Purpose</label>
                  <select
                    value={formData.listingType}
                    onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Property Category</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="house">House</option>
                    <option value="commercial">Commercial</option>
                    <option value="plot">Plot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Area (sqft)</label>
                  <input
                    type="number"
                    required
                    value={formData.areaSqft}
                    onChange={(e) => setFormData({ ...formData, areaSqft: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.address.city}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Locality</label>
                  <input
                    type="text"
                    required
                    value={formData.address.locality}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, locality: e.target.value } })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Cloudinary Uploader */}
              <CloudinaryUploader
                images={formData.images}
                onChange={(newImages) => setFormData({ ...formData, images: newImages })}
              />

              <div>
                <label className="block text-xs font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-500"
                  />
                  <span>Mark as Featured</span>
                </label>

                <div className="flex items-center gap-2 text-xs">
                  <label className="font-semibold">Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-white"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md transition"
                >
                  {loading ? 'Saving...' : editingProperty ? 'Update Property' : 'Publish Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-white">Delete Property?</h3>
            <p className="text-xs text-slate-400">
              This action cannot be undone. All associated inquiries for this property will also be removed.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
