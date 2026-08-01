import connectDB from '@/lib/db';
import Property from '@/models/Property';
import Inquiry from '@/models/Inquiry';
import User from '@/models/User';
import Link from 'next/link';
import { AnimatedCounter, ScrollReveal } from '@/components/MotionWrapper';
import { Building2, MessageSquare, Users, Plus, Eye, TrendingUp, Sparkles } from 'lucide-react';

export const revalidate = 0; // Dynamic server page

export default async function AdminDashboardPage() {
  await connectDB();

  const [totalProperties, totalInquiries, totalUsers, recentProperties, recentInquiries] =
    await Promise.all([
      Property.countDocuments(),
      Inquiry.countDocuments(),
      User.countDocuments(),
      Property.find().sort({ createdAt: -1 }).limit(5).lean(),
      Inquiry.find().sort({ createdAt: -1 }).limit(5).populate('property', 'title').lean(),
    ]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-400">Admin Control</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            System Overview & Metrics
          </h1>
        </div>
        <Link
          href="/admin/properties?action=new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-extrabold rounded-xl text-xs shadow-glow transition"
        >
          <Plus className="w-4 h-4" />
          Add New Property
        </Link>
      </div>

      {/* Metrics Cards Grid with Animated Counters */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1: Properties */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-subtle hover:border-brand-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Listings</span>
              <div className="w-10 h-10 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-white">
                <AnimatedCounter value={totalProperties} />
              </p>
              <p className="text-xs text-slate-400 mt-1">Active inventory in database</p>
            </div>
          </div>

          {/* Card 2: Inquiries */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-subtle hover:border-brand-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Inquiries</span>
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-white">
                <AnimatedCounter value={totalInquiries} />
              </p>
              <p className="text-xs text-slate-400 mt-1">Submitted buyer/tenant leads</p>
            </div>
          </div>

          {/* Card 3: Users */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-subtle hover:border-brand-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Accounts</span>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-white">
                <AnimatedCounter value={totalUsers} />
              </p>
              <p className="text-xs text-slate-400 mt-1">Buyers, sellers & admins</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Two Column Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Properties */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-modal">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white">Recently Added Listings</h2>
            <Link href="/admin/properties" className="text-xs font-bold text-brand-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {recentProperties.map((prop) => (
              <div key={prop._id.toString()} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-bold text-white text-xs truncate">{prop.title}</p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {prop.address?.city} • ₹{(prop.price / 100000).toFixed(1)} L
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-slate-800 text-brand-300">
                  {prop.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-modal">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white">Latest Customer Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs font-bold text-brand-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {recentInquiries.map((inq) => (
              <div key={inq._id.toString()} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-bold text-white text-xs truncate">{inq.name}</p>
                  <p className="text-[11px] text-slate-400 font-medium truncate">
                    Re: {inq.property?.title || 'General Inquiry'}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                    inq.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
