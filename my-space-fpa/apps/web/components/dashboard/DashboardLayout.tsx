'use client';

import React, { useState } from 'react';
import Sidebar from '../ui/Sidebar';
import TopBar from '../ui/TopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({
  children,
  title = 'Dashboard'
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { icon: '🏠', label: 'Dashboard', href: '/dashboard', active: true },
    { icon: '💼', label: 'Jobs', href: '/dashboard/jobs', badge: 3 },
    { icon: '👥', label: 'Network', href: '/dashboard/network' },
    { icon: '💬', label: 'Messages', href: '/dashboard/messages', badge: 12 },
    { icon: '📁', label: 'Projects', href: '/dashboard/projects' },
    { icon: '📊', label: 'Analytics', href: '/dashboard/analytics' },
  ];

  const bottomItems = [
    { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
    { icon: '🚪', label: 'Logout', href: '/logout' },
  ];

  const logo = (
    <button
      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      className="flex items-center gap-3 group"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-msf-cosmic-purple to-msf-neon-cyan animate-pulse-glow" />
      {!sidebarCollapsed && (
        <span className="text-lg font-bold font-display text-white">
          My Space <span className="text-msf-cosmic-purple">FPA</span>
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-msf-deep-space">
      {/* Sidebar */}
      <Sidebar
        items={navItems}
        bottomItems={bottomItems}
        collapsed={sidebarCollapsed}
        logo={logo}
      />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Top Bar */}
        <TopBar
          title={title}
          searchPlaceholder="Search jobs, projects, or people..."
          notifications={5}
          user={{
            name: 'John Doe',
            role: 'Full-Stack Developer',
            avatar: undefined
          }}
        />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
