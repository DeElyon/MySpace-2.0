import React from 'react';
import Link from 'next/link';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: string | number;
  active?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  collapsed?: boolean;
  className?: string;
  logo?: React.ReactNode;
  bottomItems?: SidebarItem[];
}

export default function Sidebar({
  items,
  collapsed = false,
  className = '',
  logo,
  bottomItems = []
}: SidebarProps) {
  return (
    <aside
      className={`
        fixed left-0 top-0 h-full w-64 glass-card-elevated border-r border-white/5
        flex flex-col z-40 transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
        ${className}
      `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        {logo || (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-msf-cosmic-purple to-msf-neon-cyan animate-pulse-glow" />
            {!collapsed && (
              <span className="text-lg font-bold font-display text-white">
                My Space <span className="text-msf-cosmic-purple">FPA</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
              ${item.active
                ? 'bg-msf-cosmic-purple/20 text-white border border-msf-cosmic-purple/30'
                : 'text-msf-mist hover:text-white hover:bg-white/5'
              }
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="text-xs bg-msf-cosmic-purple text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      {bottomItems.length > 0 && (
        <div className="px-3 py-4 border-t border-white/5">
          {bottomItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                ${item.active
                  ? 'bg-msf-cosmic-purple/20 text-white border border-msf-cosmic-purple/30'
                  : 'text-msf-mist hover:text-white hover:bg-white/5'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}
