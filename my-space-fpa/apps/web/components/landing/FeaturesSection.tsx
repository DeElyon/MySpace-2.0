import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'purple' | 'cyan' | 'emerald' | 'coral';
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export default function FeaturesSection({
  title = 'Why My Space FPA?',
  subtitle = 'Everything you need to succeed in the freelancing world',
  features = [
    {
      icon: '🎥',
      title: 'Video Meetings',
      description: 'HD video calls integrated directly into your workspace. No external tools needed.',
      color: 'purple'
    },
    {
      icon: '💻',
      title: 'Cloud IDE',
      description: 'Real-time collaborative coding environment with AI pair programmer support.',
      color: 'cyan'
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Smart job matching, proposal writing, and code review powered by advanced AI.',
      color: 'emerald'
    },
    {
      icon: '🎨',
      title: 'Whiteboard',
      description: 'Infinite canvas for brainstorming, wireframing, and visual collaboration.',
      color: 'coral'
    },
    {
      icon: '🔒',
      title: 'Secure Wallet',
      description: 'Multi-currency wallet with escrow protection and instant transfers.',
      color: 'purple'
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Track your performance, earnings, and growth with detailed insights.',
      color: 'cyan'
    }
  ]
}: FeaturesSectionProps) {
  const colorStyles = {
    purple: 'bg-msf-cosmic-purple/20 text-msf-cosmic-purple border-msf-cosmic-purple/30',
    cyan: 'bg-msf-neon-cyan/20 text-msf-neon-cyan border-msf-neon-cyan/30',
    emerald: 'bg-msf-emerald-glow/20 text-msf-emerald-glow border-msf-emerald-glow/30',
    coral: 'bg-msf-creative-coral/20 text-msf-creative-coral border-msf-creative-coral/30'
  };

  return (
    <section className="py-24 px-6 relative">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-msf-cosmic-purple/10 blur-[128px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-msf-neon-cyan/10 blur-[128px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {title}
          </h2>
          <p className="text-xl text-msf-mist max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl border border-white/5 hover-lift group"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6 border ${colorStyles[feature.color]} group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-msf-mist leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
