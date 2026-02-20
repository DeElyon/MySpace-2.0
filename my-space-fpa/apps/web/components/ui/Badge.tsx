import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'ai' | 'new';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full';
  
  const variantStyles = {
    default: 'bg-msf-elevation-2 text-msf-pure-light',
    success: 'bg-msf-emerald-glow/20 text-msf-emerald-glow border border-msf-emerald-glow/30',
    warning: 'bg-msf-warning-amber/20 text-msf-warning-amber border border-msf-warning-amber/30',
    danger: 'bg-msf-creative-coral/20 text-msf-creative-coral border border-msf-creative-coral/30',
    ai: 'bg-gradient-to-r from-msf-cosmic-purple/20 to-msf-neon-cyan/20 text-msf-neon-cyan border border-msf-neon-cyan/30 animate-pulse-glow',
    new: 'bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan text-white'
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
