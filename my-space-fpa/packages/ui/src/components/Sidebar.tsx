import React from 'react';
import Link from 'next/link';

export interface NavItem {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
}

export interface SidebarProps {
  items: NavItem[];
  logo?: {
    src: string;
    label: string;
  };
  bottomItems?: NavItem[];
  collapsed?: boolean;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  logo,
  bottomItems,
  collapsed = false,
  className = '',
}) => {
  return (
    <aside
      className={`w-20 lg:w-64 border-r border-white/5 glass-nav p-6 flex flex-col justify-between fixed h-full z-20 ${className}`}
    >
      <div className="space-y-12">
        {logo && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-msf-cosmic-purple to-msf-neon-cyan animate-pulse-glow" />
            {!collapsed && (
              <span className="text-xl font-bold font-display text-white tracking-tight">
                {logo.label}
              </span>
            )}
          </div>
        )}

        <nav className="space-y-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all hover:bg-white/5 group ${
                item.active
                  ? 'bg-msf-cosmic-purple/20 text-white'
                  : 'text-msf-mist hover:text-white'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform relative">
                {item.icon}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-msf-creative-coral text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </span>
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {bottomItems && (
        <div className="space-y-4">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all hover:bg-white/5 group ${
                item.active ? 'text-white' : 'text-msf-mist hover:text-white'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
};
