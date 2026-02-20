import React from 'react';

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => (
  <label 
    className={`text-xs font-semibold uppercase tracking-widest text-msf-mist mb-2 block ${className}`}
    {...props}
  >
    {children}
  </label>
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-msf-mist/50 focus:outline-none focus:border-msf-cosmic-purple/50 focus:ring-1 focus:ring-msf-cosmic-purple/30 transition-all ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
