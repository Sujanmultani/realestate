'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
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
    message: `Hi, I am interested in "${property?.title}". Please provide more details or schedule a private viewing.`,
  });

  if (!property) return null;

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="bg-surface rounded-xl max-w-lg w-full shadow-lg border border-border overflow-hidden relative"
          >
            {/* Header */}
            <div className="bg-bg border-b border-border p-6 relative">
              <button
                type="button"
                suppressHydrationWarning
                onClick={onClose}
                className="absolute top-5 right-5 p-1.5 rounded-md bg-surface hover:bg-sunken text-secondary transition"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Direct Owner Inquiry
              </span>
              <h2 className="font-display font-medium text-xl text-primary mt-1 pr-6 truncate">
                {property.title}
              </h2>
              <p className="text-xs text-secondary mt-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-secondary" />
                Listed by {property.ownerName || 'Property Representative'}
              </p>
            </div>

            {/* Form */}
            <div className="p-6">
              {status.success ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent-subtle text-accent border border-accent/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-medium text-xl text-primary">Inquiry Received</h3>
                  <p className="text-sm text-secondary max-w-sm mx-auto leading-relaxed">
                    {status.message}
                  </p>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 bg-accent text-white font-semibold rounded-md text-sm hover:bg-accent-hover transition"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status.error && (
                    <div className="p-3 rounded-md bg-red-50 text-semantic-error text-xs font-semibold border border-red-200">
                      {status.error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1">Your Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-tertiary absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full bg-sunken border border-border rounded-md pl-9 pr-3 py-2 text-sm text-primary focus:border-accent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-tertiary absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full bg-sunken border border-border rounded-md pl-9 pr-3 py-2 text-sm text-primary focus:border-accent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-tertiary absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-sunken border border-border rounded-md pl-9 pr-3 py-2 text-sm text-primary focus:border-accent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1">Message</label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-tertiary absolute left-3 top-3" />
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-sunken border border-border rounded-md pl-9 pr-3 py-2 text-sm text-primary focus:border-accent transition"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-md text-sm transition disabled:opacity-50 mt-2"
                  >
                    {loading ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Direct Inquiry</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
