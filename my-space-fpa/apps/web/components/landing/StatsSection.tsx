import React from 'react';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats?: Stat[];
}

export default function StatsSection({
  stats = [
    { value: '50,000+', label: 'Active Freelancers' },
    { value: '₦500M+', label: 'Transactions Processed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'AI Support' }
  ]
}: StatsSectionProps) {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-msf-cosmic-purple/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan">
                {stat.value}
              </div>
              <div className="text-msf-mist font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
