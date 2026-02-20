import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ai' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  glowEffect?: boolean;
  pulseAnimation?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  glowEffect = false,
  pulseAnimation = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-msf-cosmic-purple text-white hover:bg-opacity-90 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]',
    secondary: 'bg-msf-elevation-2 text-white hover:bg-msf-elevation-1 border border-white/10',
    ai: 'bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    ghost: 'text-msf-mist hover:text-white hover:bg-white/5'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5'
  };

  const glowStyles = glowEffect ? 'animate-pulse-glow' : '';
  const pulseStyles = pulseAnimation ? 'animate-pulse-glow' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${glowStyles} ${pulseStyles} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
