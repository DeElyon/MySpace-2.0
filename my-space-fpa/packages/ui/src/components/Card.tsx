import React from 'react';
import { GlassCard } from './GlassCard';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', interactive = true }) => {
  return (
    <GlassCard interactive={interactive} className={className}>
      {children}
    </GlassCard>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`p-6 border-b border-white/5 ${className}`}>{children}</div>;
};

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 pt-0 border-t border-white/5 ${className}`}>
      {children}
    </div>
  );
};
