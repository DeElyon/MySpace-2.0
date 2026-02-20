import React from 'react';
import Link from 'next/link';

export interface TopBarProps {
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  walletBalance?: string;
  notifications?: number;
  user?: {
    name: string;
    avatar?: string;
  };
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchPlaceholder = 'Search jobs, projects, or people...',
  onSearch,
  walletBalance,
  notifications = 0,
  user,
  className = '',
}) => {
  return (
    <header className={`flex justify-between items-center mb-12 ${className}`}>
      <div className="relative w-full max-w-xl group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-msf-mist group-focus-within:text-msf-cosmic-purple transition-colors">
          🔍
        </span>
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full bg-msf-elevation-1/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-msf-mist/50 focus:outline-none focus:border-msf-cosmic-purple/50 focus:ring-1 focus:ring-msf-cosmic-purple/30 transition-all backdrop-blur-md"
        />
      </div>

      <div className="flex items-center gap-6">
        {walletBalance && (
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-msf-mist uppercase tracking-widest">
              Wallet Balance
            </div>
            <div className="text-lg font-bold text-white tracking-tight">{walletBalance}</div>
          </div>
        )}

        <button className="w-12 h-12 rounded-2xl bg-msf-elevation-1/50 border border-white/10 flex items-center justify-center relative hover:border-msf-cosmic-purple/50 transition-all">
          <span className="text-xl">🔔</span>
          {notifications > 0 && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#EF4444]" />
          )}
        </button>

        {user && (
          <button className="w-12 h-12 rounded-2xl bg-msf-elevation-1/50 border border-white/10 flex items-center justify-center overflow-hidden hover:border-msf-cosmic-purple/50 transition-all">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-2xl bg-msf-cosmic-purple flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
