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
    <aside className="w-full md:w-64 bg-surface border-r border-border p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-md bg-accent-subtle text-accent flex items-center justify-center font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display font-medium text-primary text-base">Admin Console</h2>
            <p className="text-[11px] text-secondary font-medium uppercase tracking-wider">Management</p>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="block relative">
                {isActive && (
                  <motion.div
                    layoutId="adminNavTab"
                    className="absolute inset-0 bg-accent-subtle border-l-2 border-accent rounded-r-md"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition relative z-10 ${
                    isActive ? 'text-accent font-bold' : 'text-secondary hover:text-primary hover:bg-sunken'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-secondary'}`} />
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-secondary hover:text-primary px-3 py-2 rounded-md hover:bg-sunken transition"
        >
          <ArrowLeft className="w-4 h-4 text-accent" />
          <span>Exit to Public Portal</span>
        </Link>
      </div>
    </aside>
  );
}
