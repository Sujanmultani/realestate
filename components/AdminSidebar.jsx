'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, MessageSquareText, Home, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Properties', href: '/admin/properties', icon: Building2 },
    { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquareText },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex-shrink-0 min-h-screen p-4 flex flex-col justify-between">
      <div>
        {/* Brand Header */}
        <div className="p-3 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-900 font-bold flex items-center justify-center text-sm">
              AD
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base leading-none">Admin Panel</h2>
              <p className="text-[10px] text-amber-400 font-bold uppercase mt-1">Management Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <Home className="w-4 h-4" />
          <span>Return to Portal</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
