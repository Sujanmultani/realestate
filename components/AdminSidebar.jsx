'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Building2, MessageSquare, ArrowLeft, Shield } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Properties', href: '/admin/properties', icon: Building2 },
    { label: 'Manage Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Admin Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-black text-white text-sm">Admin Console</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Management</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="block relative">
                {isActive && (
                  <motion.div
                    layoutId="adminNavTab"
                    className="absolute inset-0 bg-brand-600/20 border-l-4 border-brand-500 rounded-r-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <div
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition relative z-10 ${
                    isActive ? 'text-brand-300 font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to Site Button */}
      <div className="pt-6 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4 text-brand-400" />
          <span>Exit to Public Portal</span>
        </Link>
      </div>
    </aside>
  );
}
