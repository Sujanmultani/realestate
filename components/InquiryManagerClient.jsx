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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-400">Customer Leads</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Inquiries Management
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Review and respond to direct buyer & tenant messages.</p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
          {['all', 'pending', 'contacted', 'closed'].map((st) => {
            const isActive = filterStatus === st;
            return (
              <motion.button
                key={st}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus(st)}
                className={`relative px-3.5 py-1.5 text-xs font-extrabold rounded-xl capitalize transition ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeInquiryPill"
                    className="absolute inset-0 bg-brand-600 rounded-xl shadow-glow"
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
              className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-modal space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-600/20 border border-brand-500/30 text-brand-300 flex items-center justify-center font-black">
                    {inq.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">{inq.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
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
                    className={`px-3 py-1 text-xs font-black uppercase rounded-xl border ${
                      inq.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : inq.status === 'contacted'
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
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
                      className="px-3 py-1.5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition"
                    >
                      Mark Contacted
                    </motion.button>
                  )}

                  {inq.status !== 'closed' && (
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      disabled={updatingId === inq._id}
                      onClick={() => handleStatusUpdate(inq._id, 'closed')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                    >
                      Close Inquiry
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Inquiry Property Reference */}
              {inq.property && (
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-white truncate max-w-lg">
                    <Building2 className="w-4 h-4 text-brand-400 shrink-0" />
                    <span className="truncate">{inq.property.title}</span>
                  </div>
                  <span className="font-extrabold text-brand-300">
                    {formatPrice(inq.property.price, inq.property.listingType)}
                  </span>
                </div>
              )}

              {/* Customer Message */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-bold">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>Customer Message</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-medium">{inq.message}</p>
              </div>

              {/* Contact Details */}
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-1">
                <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-brand-400 transition">
                  <Phone className="w-3.5 h-3.5 text-brand-400" />
                  <span>{inq.phone}</span>
                </a>
                <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-brand-400 transition">
                  <Mail className="w-3.5 h-3.5 text-brand-400" />
                  <span>{inq.email}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 max-w-md mx-auto space-y-3">
          <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No inquiries found</h3>
          <p className="text-xs text-slate-400">There are no customer inquiries matching the selected filter status.</p>
        </div>
      )}
    </div>
  );
}
