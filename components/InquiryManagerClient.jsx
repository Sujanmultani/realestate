'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Buyer Lead Inquiries</h1>
          <p className="text-xs text-slate-400">Review and manage buyer inquiries and contact leads.</p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
          {['all', 'pending', 'contacted', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition ${
                filterStatus === st ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List Cards */}
      {filteredInquiries.length > 0 ? (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq._id}
              className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-5 space-y-4 shadow-lg hover:border-slate-600 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
                {/* Buyer info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-base">{inq.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md ${
                        inq.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : inq.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-400" /> {inq.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-400" /> {inq.phone}</span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(inq.createdAt).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>

                {/* Status change actions */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1">Mark Status:</span>
                  <button
                    onClick={() => handleStatusUpdate(inq._id, 'pending')}
                    disabled={updatingId === inq._id || inq.status === 'pending'}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      inq.status === 'pending' ? 'bg-amber-500/30 text-amber-300' : 'bg-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(inq._id, 'contacted')}
                    disabled={updatingId === inq._id || inq.status === 'contacted'}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      inq.status === 'contacted' ? 'bg-blue-500/30 text-blue-300' : 'bg-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(inq._id, 'closed')}
                    disabled={updatingId === inq._id || inq.status === 'closed'}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      inq.status === 'closed' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>

              {/* Message body & property preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="md:col-span-2 space-y-1.5 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/40">
                  <p className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider">Buyer Message</p>
                  <p className="text-slate-200 leading-relaxed font-normal">{inq.message}</p>
                </div>

                {inq.property && (
                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/40 space-y-1">
                    <p className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider">Target Property</p>
                    <a
                      href={`/property/${inq.property._id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-amber-400 hover:underline block truncate"
                    >
                      {inq.property.title}
                    </a>
                    <p className="text-slate-300 font-semibold">
                      {formatPrice(inq.property.price, inq.property.listingType)}
                    </p>
                    <p className="text-slate-500 text-[11px] truncate">
                      {inq.property.address?.locality}, {inq.property.address?.city}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-12 text-center text-slate-400">
          No inquiries matching status filter "{filterStatus}".
        </div>
      )}
    </div>
  );
}
