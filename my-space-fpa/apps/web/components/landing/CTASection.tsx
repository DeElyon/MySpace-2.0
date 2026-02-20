import React from 'react';
import Button from '../ui/Button';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function CTASection({
  title = 'Ready to Shape Your Vision?',
  subtitle = 'Join thousands of freelancers and clients building the future together',
  primaryAction = {
    label: 'Get Started Free',
    href: '/signup'
  },
  secondaryAction = {
    label: 'Watch Demo ▶',
    href: '#demo'
  }
}: CTASectionProps) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-msf-cosmic-purple/20 via-msf-neon-cyan/10 to-msf-cosmic-purple/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-msf-cosmic-purple/20 blur-[128px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
        <h2 className="text-5xl md:text-6xl font-display font-bold text-white">
          {title}
        </h2>
        
        <p className="text-xl text-msf-mist max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={primaryAction.onClick}
            className="min-w-[200px]"
          >
            {primaryAction.label}
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-msf-mist text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-msf-emerald-glow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-msf-emerald-glow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-msf-emerald-glow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
