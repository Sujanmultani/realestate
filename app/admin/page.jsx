import { getAdminStats } from '@/lib/data';
import Link from 'next/link';
import { formatPrice } from '@/components/PropertyCard';
import {
  Building2,
  CheckCircle2,
  MessageSquareText,
  Eye,
  Plus,
  ArrowUpRight,
  Clock,
} from 'lucide-react';

export const revalidate = 0; // Dynamic dashboard

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time property inventory metrics and buyer inquiry leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/properties?action=add"
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Listed</p>
            <p className="text-3xl font-black text-white">{stats.totalProperties}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Active Properties */}
        <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Available</p>
            <p className="text-3xl font-black text-emerald-400">{stats.activeProperties}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Buyer Inquiries</p>
            <p className="text-3xl font-black text-blue-400">{stats.totalInquiries}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
            <MessageSquareText className="w-6 h-6" />
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Page Views</p>
            <p className="text-3xl font-black text-purple-400">{stats.totalViews}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl overflow-hidden shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Buyer Lead Inquiries</h2>
            <p className="text-xs text-slate-400">Latest messages submitted by prospective buyers & tenants</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.recentInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/60 text-slate-400 uppercase font-semibold border-b border-slate-700/60">
                <tr>
                  <th className="py-3 px-4">Buyer Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40 text-slate-300">
                {stats.recentInquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-700/30 transition">
                    <td className="py-3.5 px-4 font-bold text-white">{inq.name}</td>
                    <td className="py-3.5 px-4">
                      <div>{inq.email}</div>
                      <div className="text-slate-400">{inq.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-[200px] truncate">
                      {inq.property?.title || 'Unknown Property'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-md ${
                          inq.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : inq.status === 'contacted'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-6 text-center">No inquiries received yet.</p>
        )}
      </div>
    </div>
  );
}
