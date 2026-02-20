"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard, Button, Badge, Input, Label } from '@msf/ui';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<'account' | 'privacy' | 'notifications' | 'appearance' | 'ai'>('account');

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Settings</h1>
          <p className="text-msf-mist">Manage your account preferences and configurations</p>
        </div>

        {/* Settings Navigation Grid (Design Doc 3.1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SettingsCard
            icon="👤"
            title="Account"
            items={['Profile visibility', 'Account type', 'Delete account']}
            active={activeSection === 'account'}
            onClick={() => setActiveSection('account')}
          />
          <SettingsCard
            icon="🔒"
            title="Privacy & Security"
            items={['Two-factor auth', 'Login history', 'Blocked users']}
            active={activeSection === 'privacy'}
            onClick={() => setActiveSection('privacy')}
          />
          <SettingsCard
            icon="💰"
            title="Wallet & Payments"
            items={['Bank accounts', 'Withdrawal limits', 'Currency settings']}
            active={activeSection === 'wallet'}
            onClick={() => setActiveSection('wallet')}
          />
          <SettingsCard
            icon="🔔"
            title="Notifications"
            items={['Email preferences', 'Push notifications', 'SMS alerts']}
            active={activeSection === 'notifications'}
            onClick={() => setActiveSection('notifications')}
          />
          <SettingsCard
            icon="🎨"
            title="Appearance"
            items={['Dark/Light mode', 'Compact view', 'Font size']}
            active={activeSection === 'appearance'}
            onClick={() => setActiveSection('appearance')}
          />
          <SettingsCard
            icon="🌐"
            title="Language & Region"
            items={['Language', 'Timezone', 'Date format']}
            active={activeSection === 'language'}
            onClick={() => setActiveSection('language')}
          />
          <SettingsCard
            icon="🤝"
            title="Collaboration"
            items={['Default permissions', 'Team settings', 'Share defaults']}
            active={activeSection === 'collaboration'}
            onClick={() => setActiveSection('collaboration')}
          />
          <SettingsCard
            icon="🎥"
            title="Meeting Settings"
            items={['Camera default', 'Microphone', 'Background']}
            active={activeSection === 'meeting'}
            onClick={() => setActiveSection('meeting')}
          />
          <SettingsCard
            icon="🤖"
            title="AI Preferences"
            items={['AI assistance level', 'Auto-suggestions', 'Privacy mode']}
            active={activeSection === 'ai'}
            onClick={() => setActiveSection('ai')}
          />
        </div>

        {/* Settings Content */}
        {activeSection === 'account' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <Label>Email Address</Label>
                  <div className="flex gap-2">
                    <Input defaultValue="sarah@example.com" disabled />
                    <Button variant="secondary">Change</Button>
                  </div>
                  <Badge variant="success" className="mt-2">✓ Verified</Badge>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <div className="flex gap-2">
                    <Input defaultValue="+234 801 234 5678" disabled />
                    <Button variant="secondary">Change</Button>
                  </div>
                  <Badge variant="warning" className="mt-2">⚠ Unverified</Badge>
                </div>
                <div>
                  <Label>Password</Label>
                  <div className="flex gap-2">
                    <Input type="password" value="••••••••" disabled />
                    <Button variant="primary">Update</Button>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Account Type</h3>
              <div className="space-y-4">
                {[
                  { id: 'freelancer', label: 'Freelancer', desc: 'I want to offer services', icon: '👨‍💻' },
                  { id: 'client', label: 'Client', desc: 'I want to hire talent', icon: '💼' },
                  { id: 'company', label: 'Company', desc: 'I represent an organization', icon: '🏢' },
                  { id: 'agency', label: 'Agency', desc: 'I manage a team', icon: '👥' },
                ].map((type) => (
                  <label
                    key={type.id}
                    className="flex items-start gap-4 p-4 rounded-xl border border-white/10 cursor-pointer hover:border-msf-cosmic-purple/50 transition-colors"
                  >
                    <input type="radio" name="accountType" defaultChecked={type.id === 'freelancer'} className="mt-1" />
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <div className="text-white font-medium">{type.label}</div>
                      <div className="text-xs text-msf-mist">{type.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-4 p-4 bg-msf-focus-blue/10 border border-msf-focus-blue/30 rounded-xl text-xs text-msf-mist">
                ⚠️ Changing account type will affect your dashboard and available features.
              </div>
            </GlassCard>

            <GlassCard className="p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-6 text-red-400">Danger Zone</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-msf-elevation-1/50 rounded-xl">
                  <h4 className="text-white font-medium mb-2">Export My Data</h4>
                  <p className="text-xs text-msf-mist mb-4">Download all your data in a portable format</p>
                  <Button variant="secondary" size="sm" icon="📤">Export Data</Button>
                </div>
                <div className="p-4 bg-msf-elevation-1/50 rounded-xl">
                  <h4 className="text-white font-medium mb-2">Delete Account</h4>
                  <p className="text-xs text-msf-mist mb-4">Permanently delete your account and all data</p>
                  <Button variant="danger" size="sm" icon="🗑️">Delete Account</Button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {activeSection === 'privacy' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Profile Visibility</h3>
              <div className="space-y-4">
                {[
                  { id: 'public', label: 'Public', desc: 'Anyone can see your profile' },
                  { id: 'connections', label: 'Connections Only', desc: 'Only your network can see' },
                  { id: 'private', label: 'Private', desc: 'Only people you approve' },
                ].map((option) => (
                  <label
                    key={option.id}
                    className="flex items-start gap-4 p-4 rounded-xl border border-white/10 cursor-pointer hover:border-msf-cosmic-purple/50 transition-colors"
                  >
                    <input type="radio" name="visibility" defaultChecked={option.id === 'public'} className="mt-1" />
                    <div>
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-xs text-msf-mist">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Two-Factor Authentication</h3>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium">Current Status</span>
                  <Badge variant="danger">Disabled</Badge>
                </div>
                <Button variant="primary" className="w-full" icon="🔐">Enable 2FA</Button>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-msf-mist uppercase">Recommended Methods</h4>
                {[
                  { icon: '📱', name: 'Authenticator App', desc: 'Most secure option' },
                  { icon: '📞', name: 'SMS Authentication', desc: 'Codes via text message' },
                  { icon: '🔑', name: 'Security Key', desc: 'Hardware key (FIDO2)' },
                  { icon: '✋', name: 'Fingerprint', desc: 'Biometric authentication' },
                ].map((method) => (
                  <div key={method.name} className="flex items-center justify-between p-3 bg-msf-elevation-1/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{method.icon}</span>
                      <div>
                        <div className="text-sm text-white">{method.name}</div>
                        <div className="text-xs text-msf-mist">{method.desc}</div>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">Setup</Button>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-6">Login History</h3>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on macOS', location: 'Lagos, Nigeria', ip: '197.210.xx.xx', current: true, time: 'Now' },
                  { device: 'Safari on iPhone', location: 'Lagos, Nigeria', ip: '197.210.xx.xx', current: false, time: '2h ago' },
                  { device: 'Firefox on Windows', location: 'London, UK', ip: '81.103.xx.xx', current: false, suspicious: true, time: '5d ago' },
                ].map((session, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${session.current ? 'bg-msf-cosmic-purple/10 border border-msf-cosmic-purple/30' : 'bg-msf-elevation-1/50'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-msf-elevation-2 flex items-center justify-center text-xl">
                        {session.device.includes('Chrome') ? '🌐' : session.device.includes('Safari') ? '🧭' : '🦊'}
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium flex items-center gap-2">
                          {session.device}
                          {session.current && <Badge variant="success" size="sm">Current</Badge>}
                          {session.suspicious && <Badge variant="warning" size="sm">Suspicious</Badge>}
                        </div>
                        <div className="text-xs text-msf-mist">{session.location} • {session.ip} • {session.time}</div>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="danger" size="sm">Revoke</Button>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Jobs & Projects</h3>
              <div className="space-y-4">
                <Toggle label="New job matches" desc="Get notified when jobs match your skills" defaultChecked channels={['push', 'email']} />
                <Toggle label="Proposal updates" desc="When clients view your proposals" defaultChecked channels={['push', 'email']} />
                <Toggle label="Project deadlines" desc="Daily reminders before deadlines" defaultChecked />
                <Toggle label="Milestone completed" desc="When milestones are approved" defaultChecked />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Messages</h3>
              <div className="space-y-4">
                <Toggle label="New messages" desc="Instant notifications for new chats" defaultChecked schedule="9:00 - 21:00" />
                <Toggle label="Mentions" desc="When someone @mentions you" defaultChecked />
                <Toggle label="Message requests" desc="When someone outside network messages" />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Payments</h3>
              <div className="space-y-4">
                <Toggle label="Payment received" desc="When money enters your wallet" defaultChecked />
                <Toggle label="Withdrawal status" desc="Updates on withdrawal requests" defaultChecked />
                <Toggle label="Low balance alerts" desc="When wallet below ₦10,000" threshold="₦10,000" />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">System</h3>
              <div className="space-y-4">
                <Toggle label="Security alerts" desc="Login attempts, password changes" defaultChecked urgent />
                <Toggle label="Platform updates" desc="New features and announcements" />
                <Toggle label="Marketing emails" desc="Tips, trends, and promotions" />
              </div>
            </GlassCard>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                {['Dark', 'Light', 'System'].map((theme) => (
                  <button
                    key={theme}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      theme === 'Dark' ? 'border-msf-cosmic-purple bg-msf-cosmic-purple/10' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className={`w-full h-16 rounded-lg mb-3 ${theme === 'Dark' ? 'bg-msf-deep-space' : theme === 'Light' ? 'bg-white' : 'bg-gradient-to-r from-msf-deep-space to-white'}`} />
                    <div className="text-sm text-white font-medium">{theme}</div>
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Display Options</h3>
              <div className="space-y-4">
                <Toggle label="Compact mode" desc="Reduce spacing in lists and cards" />
                <Toggle label="Reduce motion" desc="Minimize animations and transitions" />
                <Toggle label="High contrast" desc="Increase contrast for better visibility" />
                <div>
                  <Label>Font Size</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-msf-mist">A</span>
                    <input type="range" className="flex-1 accent-msf-cosmic-purple" />
                    <span className="text-xl text-msf-mist">A</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {activeSection === 'ai' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6 bg-gradient-to-br from-msf-cosmic-purple/10 to-msf-neon-cyan/10 border-msf-cosmic-purple/30">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span>✨</span> AI Assistant
              </h3>
              <div className="space-y-4">
                <Toggle label="AI job matching" desc="Automatically find best job matches" defaultChecked />
                <Toggle label="AI proposal writing" desc="Get AI-suggested proposals" defaultChecked />
                <Toggle label="AI code review" desc="Automatic code analysis and suggestions" defaultChecked />
                <Toggle label="AI meeting summaries" desc="Generate meeting notes automatically" />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">AI Privacy</h3>
              <div className="space-y-4">
                <Toggle label="Allow AI training" desc="Use my data to improve AI models" />
                <Toggle label="Share code with AI" desc="Allow AI to analyze my code" defaultChecked />
                <Toggle label="AI conversation history" desc="Save AI chat history" defaultChecked />
                <div>
                  <Label>AI Assistance Level</Label>
                  <select className="w-full mt-2 bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white">
                    <option>Minimal - Only when requested</option>
                    <option>Balanced - Helpful suggestions</option>
                    <option>Proactive - Active recommendations</option>
                    <option>Maximum - Full AI integration</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// Settings Card Component
function SettingsCard({ icon, title, items, active, onClick }: {
  icon: string;
  title: string;
  items: string[];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <GlassCard
      className={`p-6 cursor-pointer transition-all ${
        active ? 'border-msf-cosmic-purple/50 bg-msf-cosmic-purple/10' : 'hover:border-white/30'
      }`}
      onClick={onClick}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-msf-mist">• {item}</li>
        ))}
      </ul>
    </GlassCard>
  );
}

// Toggle Component
function Toggle({ label, desc, defaultChecked, channels, schedule, urgent, threshold }: {
  label: string;
  desc: string;
  defaultChecked?: boolean;
  channels?: string[];
  schedule?: string;
  urgent?: boolean;
  threshold?: string;
}) {
  const [enabled, setEnabled] = useState(defaultChecked || false);

  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="text-sm text-white font-medium flex items-center gap-2">
          {label}
          {urgent && <Badge variant="danger" size="sm">Critical</Badge>}
        </div>
        <div className="text-xs text-msf-mist">{desc}</div>
        {channels && (
          <div className="flex gap-2 mt-2">
            {channels.map((c) => (
              <Badge key={c} variant="default" size="sm">{c}</Badge>
            ))}
          </div>
        )}
        {schedule && (
          <div className="text-xs text-msf-mist mt-2">🕐 {schedule}</div>
        )}
        {threshold && (
          <div className="text-xs text-msf-mist mt-2">⚠️ Threshold: {threshold}</div>
        )}
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-msf-cosmic-purple' : 'bg-msf-elevation-2'
        }`}
      >
        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );
}
