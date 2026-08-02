import connectDB from '@/lib/db';
import Property from '@/models/Property';
import Inquiry from '@/models/Inquiry';
import User from '@/models/User';
import Link from 'next/link';
import { AnimatedCounter, ScrollReveal } from '@/components/MotionWrapper';
import { Building2, MessageSquare, Users, Plus } from 'lucide-react';

export const revalidate = 0;

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">System Administration</span>
          <h1 className="font-display font-normal text-3xl text-primary tracking-tight mt-1">
            Metrics & Overview
          </h1>
        </div>
        <Link
          href="/admin/properties?action=new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-md text-sm transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Property
        </Link>
      </div>

      {/* Metrics Cards */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-surface p-6 rounded-lg border border-border space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Total Listings</span>
              <div className="w-8 h-8 rounded-md bg-sunken text-accent flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-display font-medium text-primary">
                <AnimatedCounter value={totalProperties} />
              </p>
              <p className="text-xs text-secondary mt-1">Active inventory in database</p>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Total Inquiries</span>
              <div className="w-8 h-8 rounded-md bg-sunken text-accent flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-display font-medium text-primary">
                <AnimatedCounter value={totalInquiries} />
              </p>
              <p className="text-xs text-secondary mt-1">Submitted customer inquiries</p>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Registered Users</span>
              <div className="w-8 h-8 rounded-md bg-sunken text-accent flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-display font-medium text-primary">
                <AnimatedCounter value={totalUsers} />
              </p>
              <p className="text-xs text-secondary mt-1">Registered platform accounts</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface p-6 rounded-lg border border-border space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-medium text-xl text-primary">Recent Properties</h2>
            <Link href="/admin/properties" className="text-xs font-semibold text-accent hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentProperties.map((prop) => (
              <div key={prop._id.toString()} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-primary text-xs truncate">{prop.title}</p>
                  <p className="text-[11px] text-secondary font-medium">
                    {prop.address?.city} • ₹{(prop.price / 100000).toFixed(1)} L
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-sunken text-secondary border border-border">
                  {prop.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-border space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-medium text-xl text-primary">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs font-semibold text-accent hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentInquiries.map((inq) => (
              <div key={inq._id.toString()} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-primary text-xs truncate">{inq.name}</p>
                  <p className="text-[11px] text-secondary font-medium truncate">
                    Re: {inq.property?.title || 'General Inquiry'}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    inq.status === 'pending'
                      ? 'bg-semantic-warning/10 text-semantic-warning border border-semantic-warning/20'
                      : 'bg-accent-subtle text-accent border border-accent/20'
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
