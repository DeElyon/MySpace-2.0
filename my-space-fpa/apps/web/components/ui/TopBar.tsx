import React from 'react';
import Avatar from './Avatar';

interface TopBarProps {
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  notifications?: number;
  user?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  rightActions?: React.ReactNode;
  className?: string;
}

export default function TopBar({
  title,
  searchPlaceholder = 'Search...',
  onSearch,
  notifications = 0,
  user,
  rightActions,
  className = ''
}: TopBarProps) {
  return (
    <header
      className={`
        h-16 glass-nav border-b border-white/5 px-6 flex items-center justify-between
        sticky top-0 z-30
        ${className}
      `}
    >
      {/* Left Section - Title & Search */}
      <div className="flex items-center gap-6 flex-1">
        {title && (
          <h1 className="text-xl font-bold text-white font-display">{title}</h1>
        )}
        
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch?.(e.target.value)}
              className="
                w-full px-4 py-2 pl-10 bg-msf-elevation-1/50 border border-white/10 rounded-full
                text-sm text-white placeholder-msf-mist/50
                focus:outline-none focus:border-msf-cosmic-purple focus:ring-1 focus:ring-msf-cosmic-purple
                transition-colors
              "
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-msf-mist"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex items-center gap-4">
        {rightActions}

        {/* Notifications */}
        <button className="relative p-2 text-msf-mist hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-msf-creative-coral text-white text-xs rounded-full flex items-center justify-center">
              {notifications > 99 ? '99+' : notifications}
            </span>
          )}
        </button>

        {/* User Menu */}
        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              {user.role && (
                <p className="text-xs text-msf-mist">{user.role}</p>
              )}
            </div>
            <Avatar src={user.avatar} alt={user.name} size="md" />
          </div>
        )}
      </div>
    </header>
  );
}
