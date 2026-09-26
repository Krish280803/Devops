'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Wrench, 
  Mic, 
  FolderGit2, 
  Terminal, 
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Learn Curriculum', href: '/learn', icon: BookOpen },
    { label: 'Quizzes', href: '/quizzes', icon: HelpCircle },
    { label: 'Notes & PDF', href: '/notes', icon: FileText },
    { label: 'Troubleshooter', href: '/troubleshoot', icon: Wrench },
    { label: 'Mock Interview', href: '/interview', icon: Mic },
    { label: 'Projects & Labs', href: '/projects', icon: FolderGit2 },
    { label: 'Cheat Sheets', href: '/cheatsheets', icon: Terminal },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-devops-border bg-devops-dark/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-lg shadow-brand-600/30">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-sky-400 via-brand-500 to-blue-500 bg-clip-text text-transparent font-extrabold">
            AI DevOps Academy
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-devops-card hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live AI Mentor
          </span>
        </div>
      </div>
    </header>
  );
};
