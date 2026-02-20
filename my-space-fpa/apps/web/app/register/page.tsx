"use client";

import React, { useState } from 'react';
import { GlassCard, Button, Input, Label } from '@msf/ui';
import { UserRole, generateMSFId } from '../../../../services/auth-service/src/id-generator';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const roles = [
    { id: UserRole.FREELANCER, title: 'Freelancer', description: 'I want to offer my skills and work on projects', icon: '👨‍💻', fee: '₦30,000' },
    { id: UserRole.CLIENT, title: 'Client', description: 'I want to hire professionals and build my vision', icon: '💼', fee: '₦40,000' },
    { id: UserRole.ENTERPRISE, title: 'Enterprise', description: 'Large organization with team management needs', icon: '🏢', fee: 'Custom' },
    { id: UserRole.AGENCY, title: 'Agency', description: 'I manage a team of freelancers', icon: '👥', fee: 'Custom' },
  ];

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    nextStep();
  };

  return (
    <main className="min-h-screen bg-msf-deep-space flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-msf-cosmic-purple/10 blur-[128px] rounded-full animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-msf-neon-cyan/10 blur-[128px] rounded-full animate-float delay-1000" />
      </div>

      <div className="w-full max-w-4xl z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Start Your <span className="text-msf-cosmic-purple">Vision</span>
          </h1>
          <p className="text-msf-mist mt-4">Join 50,000+ freelancers shaping the future of work in 2026.</p>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-page-enter">
            {roles.map((r) => (
              <GlassCard 
                key={r.id} 
                className={`p-8 cursor-pointer border-2 transition-all ${role === r.id ? 'border-msf-cosmic-purple bg-msf-cosmic-purple/10' : 'border-white/5 hover:border-msf-cosmic-purple/30'}`}
                onClick={() => handleRoleSelect(r.id)}
              >
                <div className="text-4xl mb-4">{r.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{r.title}</h3>
                <p className="text-msf-mist text-sm mb-4">{r.description}</p>
                <div className="text-xs font-mono text-msf-neon-cyan uppercase tracking-widest">
                  One-time Fee: {r.fee}
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="max-w-md mx-auto animate-page-enter">
            <GlassCard className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-msf-mist text-sm">Fill in your basic details to get started.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="sarah@example.com" />
                </div>
                <div>
                  <Label>Username</Label>
                  <Input type="text" placeholder="sarah_dev" />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="secondary" className="w-full" onClick={prevStep}>Back</Button>
                  <Button className="w-full" onClick={nextStep}>Next</Button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {step === 3 && role && (
          <div className="max-w-md mx-auto animate-page-enter">
            <GlassCard className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-msf-emerald-glow/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✨
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Registration Fee</h2>
                <p className="text-msf-mist text-sm">
                  To activate your {role.toLowerCase()} account, a one-time fee of 
                  <span className="text-msf-emerald-glow font-bold ml-1">
                    {role === UserRole.CLIENT ? '₦40,000' : '₦30,000'}
                  </span> is required.
                </p>
              </div>

              <div className="bg-msf-elevation-1/50 p-6 rounded-2xl mb-8 text-left space-y-3">
                <div className="text-xs font-mono text-msf-mist uppercase">Bank Transfer Details</div>
                <div className="text-sm">
                  <span className="text-msf-mist">Bank:</span> <span className="text-white">Access Bank</span>
                </div>
                <div className="text-sm">
                  <span className="text-msf-mist">Account:</span> <span className="text-white">1907856695</span>
                </div>
                <div className="text-sm">
                  <span className="text-msf-mist">Name:</span> <span className="text-white font-bold">My Space FPA</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Upload Payment Receipt</Label>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 hover:border-msf-cosmic-purple/50 transition-colors cursor-pointer bg-white/5 group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📸</div>
                  <div className="text-xs text-msf-mist">Click or drag to upload (JPG/PNG/PDF)</div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button variant="secondary" className="w-full" onClick={prevStep}>Back</Button>
                  <Button className="w-full" onClick={nextStep}>Verify Receipt</Button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {step === 4 && role && (
          <div className="max-w-md mx-auto animate-page-enter">
            <GlassCard className="p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-tr from-msf-cosmic-purple to-msf-neon-cyan rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                <div className="text-4xl text-white">🚀</div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Application Submitted</h2>
              <p className="text-msf-mist mb-8">
                Your payment receipt is being verified by our admin team. This usually takes less than 24 hours.
              </p>

              <div className="bg-msf-void p-6 rounded-2xl mb-8 border border-msf-cosmic-purple/30">
                <div className="text-xs font-mono text-msf-mist uppercase mb-2">Your MSF Unique ID (Pending Activation)</div>
                <div className="text-2xl font-bold text-msf-neon-cyan tracking-widest font-mono">
                  {generateMSFId(role)}
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full" glowEffect>Continue to Dashboard (Preview)</Button>
                <p className="text-xs text-msf-mist">
                  While we verify your payment, you can explore the marketplace and complete your profile.
                </p>
              </div>
            </GlassCard>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-msf-cosmic-purple' : 'w-2 bg-white/10'}`} />
          ))}
        </div>
      </div>
    </main>
  );
}
