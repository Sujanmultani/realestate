'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { updateInquiryStatusAction } from '@/lib/actions';
import { Mail, Phone, Building2, Calendar, MessageSquare, CheckCircle, Clock, XCircle } from 'lucide-react';
import { formatPrice } from './PropertyCard';

export default function InquiryManagerClient({ initialInquiries = [] }) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [filterStatus, setFilterStatus] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    setUpdatingId(inquiryId);
    try {
      const res = await updateInquiryStatusAction(inquiryId, newStatus);
      if (res.success) {
        setInquiries((prev) =>
          prev.map((i) => (i._id === inquiryId ? { ...i, status: newStatus } : i))
        );
        router.refresh();
      } else {
        alert(res.error || 'Failed to update status');
      }
    } catch (err) {
      console.error('Update status error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterStatus === 'all') return true;
    return inq.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Customer Leads</span>
          <h1 className="font-display font-normal text-3xl text-primary tracking-tight mt-1">
            Inquiries Management
          </h1>
          <p className="text-xs text-secondary mt-1 font-medium">Review and respond to direct buyer & tenant messages.</p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1 bg-sunken border border-border p-1.5 rounded-lg">
          {['all', 'pending', 'contacted', 'closed'].map((st) => {
            const isActive = filterStatus === st;
            return (
              <motion.button
                key={st}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus(st)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-md capitalize transition ${
                  isActive ? 'text-white' : 'text-secondary hover:text-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeInquiryPill"
                    className="absolute inset-0 bg-accent rounded-md shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{st}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Inquiries Cards Grid */}
      {filteredInquiries.length > 0 ? (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <motion.div
              key={inq._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-lg border border-border shadow-sm space-y-4 hover:border-border-strong transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-accent-subtle border border-accent/20 text-accent flex items-center justify-center font-bold">
                    {inq.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-base">{inq.name}</h3>
                    <p className="text-xs text-secondary flex items-center gap-1 mt-0.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-tertiary" />
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-xs font-semibold uppercase rounded-md border ${
                      inq.status === 'pending'
                        ? 'bg-semantic-warning/10 text-semantic-warning border-semantic-warning/30'
                        : inq.status === 'contacted'
                        ? 'bg-accent-subtle text-accent border-accent/30'
                        : 'bg-sunken text-secondary border-border'
                    }`}
                  >
                    {inq.status}
                  </span>

                  {/* Status Action Buttons */}
                  {inq.status !== 'contacted' && (
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      disabled={updatingId === inq._id}
                      onClick={() => handleStatusUpdate(inq._id, 'contacted')}
                      className="px-3 py-1.5 bg-accent hover:bg-accent-hover text-white rounded-md text-xs font-semibold shadow-sm transition"
                    >
                      Mark Contacted
                    </motion.button>
                  )}

                  {inq.status !== 'closed' && (
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      disabled={updatingId === inq._id}
                      onClick={() => handleStatusUpdate(inq._id, 'closed')}
                      className="px-3 py-1.5 bg-sunken hover:bg-border text-secondary hover:text-primary rounded-md text-xs font-semibold transition"
                    >
                      Close Inquiry
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Inquiry Property Reference */}
              {inq.property && (
                <div className="p-3.5 rounded-md bg-sunken border border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-primary truncate max-w-lg">
                    <Building2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="truncate">{inq.property.title}</span>
                  </div>
                  <span className="font-semibold text-accent">
                    {formatPrice(inq.property.price, inq.property.listingType)}
                  </span>
                </div>
              )}

              {/* Customer Message */}
              <div className="p-4 rounded-md bg-sunken/60 border border-border space-y-2 text-xs">
                <div className="flex items-center gap-2 text-secondary font-semibold">
                  <MessageSquare className="w-4 h-4 text-tertiary" />
                  <span>Customer Message</span>
                </div>
                <p className="text-primary leading-relaxed font-medium">{inq.message}</p>
              </div>

              {/* Contact Details */}
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-secondary pt-1">
                <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-accent transition">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>{inq.phone}</span>
                </a>
                <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-accent transition">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <span>{inq.email}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-lg p-12 text-center border border-border max-w-md mx-auto space-y-3 shadow-sm">
          <MessageSquare className="w-10 h-10 text-tertiary mx-auto" />
          <h3 className="font-display font-medium text-lg text-primary">No inquiries found</h3>
          <p className="text-xs text-secondary">There are no customer inquiries matching the selected filter status.</p>
        </div>
      )}
    </div>
  );
}
