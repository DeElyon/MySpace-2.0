import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'flat' | 'glow';
  interactive?: boolean;
  glow?: boolean;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'elevated',
  interactive = true,
  glow = false,
  className = ''
}) => {
  const baseStyles = "glass-card rounded-[24px] overflow-hidden backdrop-blur-[12px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300";
  
  const variants = {
    elevated: "bg-[#1F2937]/70",
    flat: "bg-[#0A0F1E]/50",
    glow: "bg-[#1F2937]/70 border-msf-cosmic-purple/30 shadow-[0_0_40px_rgba(99,102,241,0.1)]"
  };

  const interactiveStyles = interactive ? "hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(99,102,241,0.2)]" : "";
  const glowStyles = glow ? "border-msf-neon-cyan/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]" : "";

  return (
    <div className={`${baseStyles} ${variants[variant]} ${interactiveStyles} ${glowStyles} ${className}`}>
      {children}
    </div>
  );
};
