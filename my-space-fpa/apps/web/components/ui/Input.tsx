import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  leftElement,
  rightElement,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-msf-mist">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-msf-mist">
            {leftElement}
          </div>
        )}
        
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-msf-mist">
            {icon}
          </div>
        )}
        
        <input
          id={inputId}
          className={`
            w-full px-4 py-2.5 bg-msf-elevation-1 border border-white/10 rounded-xl
            text-white placeholder-msf-mist/50
            focus:outline-none focus:border-msf-cosmic-purple focus:ring-1 focus:ring-msf-cosmic-purple
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
            ${(icon || leftElement) && 'pl-10'}
            ${rightElement && 'pr-10'}
            ${error && 'border-msf-creative-coral focus:border-msf-creative-coral focus:ring-msf-creative-coral'}
          `}
          {...props}
        />
        
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-msf-mist">
            {rightElement}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-msf-creative-coral">{error}</p>
      )}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({
  label,
  error,
  className = '',
  id,
  ...props
}: TextAreaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-msf-mist">
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-2.5 bg-msf-elevation-1 border border-white/10 rounded-xl
          text-white placeholder-msf-mist/50
          focus:outline-none focus:border-msf-cosmic-purple focus:ring-1 focus:ring-msf-cosmic-purple
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors resize-none
          ${error && 'border-msf-creative-coral focus:border-msf-creative-coral focus:ring-msf-creative-coral'}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-msf-creative-coral">{error}</p>
      )}
    </div>
  );
}
