'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { X, Send, CheckCircle2, User, Mail, Phone, MessageSquare, Building2 } from 'lucide-react';
import { submitInquiryAction } from '@/lib/actions';

export default function ContactModal({ property, isOpen, onClose }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: false, error: null, message: null });

  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    message: `Hi, I am interested in "${property?.title}". Please provide more details or schedule a call.`,
  });

  if (!isOpen || !property) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: false, error: null, message: null });

    const payload = new FormData();
    payload.append('propertyId', property._id.toString());
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('message', formData.message);

    try {
      const res = await submitInquiryAction(null, payload);

      if (res.success) {
        setStatus({
          success: true,
          error: null,
          message: res.message || 'Inquiry submitted successfully!',
        });
      } else {
        setStatus({ success: false, error: res.error || 'Failed to submit inquiry', message: null });
      }
    } catch (err) {
      console.error('Contact modal submission error:', err);
      setStatus({ success: false, error: 'An unexpected error occurred', message: null });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400">
            Contact Owner / Agent
          </span>
          <h2 className="text-xl font-bold text-white mt-1 pr-6 line-clamp-1">
            {property.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-brand-400" />
            Listed by {property.ownerName || 'Property Owner'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {status.success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Inquiry Sent!</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                {status.message}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-brand-600 text-white font-semibold rounded-xl text-sm hover:bg-brand-700 transition"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status.error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                  {status.error}
                </div>
              )}

              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Owner</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
