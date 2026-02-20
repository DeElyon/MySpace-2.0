import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'interactive';
  glow?: boolean;
  interactive?: boolean;
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  glow = false,
  interactive = false
}: CardProps) {
  const baseStyles = 'glass-card rounded-2xl overflow-hidden';
  
  const variantStyles = {
    default: '',
    elevated: 'glass-card-elevated',
    interactive: 'cursor-pointer hover-lift hover-glow'
  };

  const glowStyles = glow ? 'animate-pulse-glow' : '';

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${glowStyles} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-white/5 ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 border-t border-white/5 bg-msf-void/30 ${className}`}>
      {children}
    </div>
  );
}
