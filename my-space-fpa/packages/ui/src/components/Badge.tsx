import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}) => {
  const variants = {
    default: 'bg-msf-elevation-2 text-msf-mist border-white/10',
    success: 'bg-msf-emerald-glow/10 text-msf-emerald-glow border-msf-emerald-glow/30',
    warning: 'bg-msf-warning-amber/10 text-msf-warning-amber border-msf-warning-amber/30',
    danger: 'bg-msf-creative-coral/10 text-msf-creative-coral border-msf-creative-coral/30',
    info: 'bg-msf-focus-blue/10 text-msf-focus-blue border-msf-focus-blue/30',
    ai: 'bg-gradient-to-r from-msf-cosmic-purple/20 to-msf-neon-cyan/20 text-msf-neon-cyan border-msf-neon-cyan/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
