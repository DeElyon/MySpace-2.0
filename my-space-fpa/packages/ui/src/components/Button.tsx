import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ai' | 'collaborative' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glowEffect?: boolean;
  pulseAnimation?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  glowEffect,
  pulseAnimation,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-msf-cosmic-purple text-white hover:bg-opacity-90 shadow-[0_0_20px_rgba(99,102,241,0.3)]",
    secondary: "bg-transparent border border-msf-mist/30 text-white hover:bg-white/5",
    ai: "bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan text-white shadow-[0_0_25px_rgba(34,211,238,0.4)]",
    collaborative: "bg-msf-emerald-glow text-white hover:bg-opacity-90",
    ghost: "bg-transparent text-msf-mist hover:text-white",
    danger: "bg-red-500 text-white hover:bg-opacity-90"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  const animations = [
    glowEffect ? "animate-pulse-glow" : "",
    pulseAnimation ? "animate-pulse" : ""
  ].join(" ");

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${animations} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
