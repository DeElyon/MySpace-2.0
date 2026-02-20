"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard, Button, Badge, Avatar, Input, Label } from '@msf/ui';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security' | 'billing'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    msf_id: 'MSF12345678F',
    username: 'sarah_dev',
    display_name: 'Sarah Johnson',
    email: 'sarah@example.com',
    tagline: 'Full-Stack Developer | React & Node.js Expert',
    location: 'Lagos, Nigeria',
    about: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud infrastructure. I love turning complex problems into elegant solutions.',
    skills: [
      { name: 'React', proficiency: 5, verified: true },
      { name: 'Node.js', proficiency: 5, verified: true },
      { name: 'TypeScript', proficiency: 4, verified: true },
      { name: 'MongoDB', proficiency: 4, verified: false },
      { name: 'AWS', proficiency: 3, verified: false },
      { name: 'Python', proficiency: 3, verified: false },
    ],
    hourly_rate: 25000,
    availability: 'Available',
    profile_completion: 85,
    total_earned: 2500000,
    jobs_completed: 45,
    success_rate: 98,
    rating: 4.9,
    reviews: 38,
  };

  const settings = {
    notifications: {
      email: true,
      push: true,
      sms: false,
      job_alerts: true,
      project_updates: true,
      marketing: false,
    },
    privacy: {
      profile_visibility: 'public',
      show_email: false,
      show_phone: false,
      show_earnings: false,
    },
    preferences: {
      language: 'en',
      timezone: 'Africa/Lagos',
      currency: 'NGN',
    },
  };

  return (
    <DashboardLayout title="Profile & Settings">
      <div className="space-y-8">
        {/* Header with Tabs */}
        <div className="border-b border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-6">
              <Avatar alt={profile.display_name} size="xl" src={undefined} />
              <div>
                <h1 className="text-3xl font-display font-bold text-white mb-1">{profile.display_name}</h1>
                <p className="text-msf-mist">{profile.tagline}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <Badge variant="ai">🏆 Top Rated</Badge>
                  <span className="text-msf-mist">⭐ {profile.rating} ({profile.reviews} reviews)</span>
                  <span className="text-msf-emerald-glow">● {profile.availability}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" icon="👁️">View Public Profile</Button>
              <Button variant="primary" icon="✏️" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6">
            {['profile', 'settings', 'security', 'billing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-msf-cosmic-purple border-msf-cosmic-purple'
                    : 'text-msf-mist border-transparent hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-6">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Display Name</Label>
                    <Input defaultValue={profile.display_name} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Username</Label>
                    <Input defaultValue={profile.username} disabled />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue={profile.email} type="email" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input defaultValue={profile.location} disabled={!isEditing} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Tagline</Label>
                    <Input defaultValue={profile.tagline} disabled={!isEditing} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>About</Label>
                    <textarea
                      defaultValue={profile.about}
                      disabled={!isEditing}
                      rows={6}
                      className="w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-msf-mist/50 focus:outline-none focus:border-msf-cosmic-purple/50 focus:ring-1 focus:ring-msf-cosmic-purple/30 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-6">Skills & Expertise</h3>
                <div className="space-y-4">
                  {profile.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          {skill.verified && <Badge variant="success" size="sm">✓ Verified</Badge>}
                          <span className="text-xs text-msf-mist">{'★'.repeat(skill.proficiency)}{'☆'.repeat(5 - skill.proficiency)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${skill.verified ? 'bg-msf-emerald-glow' : 'bg-msf-cosmic-purple'}`}
                          style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="secondary" size="sm" icon="+">Add Skill</Button>
                  )}
                </div>
              </GlassCard>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-6">Profile Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-msf-mist">Profile Completion</span>
                    <span className="text-sm font-bold text-white">{profile.profile_completion}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan" style={{ width: `${profile.profile_completion}%` }} />
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-msf-mist">Total Earned</span>
                      <span className="text-sm font-bold text-msf-emerald-glow">₦{profile.total_earned.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-msf-mist">Jobs Completed</span>
                      <span className="text-sm font-bold text-white">{profile.jobs_completed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-msf-mist">Success Rate</span>
                      <span className="text-sm font-bold text-msf-emerald-glow">{profile.success_rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-msf-mist">Hourly Rate</span>
                      <span className="text-sm font-bold text-white">₦{profile.hourly_rate.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">MSF ID</h3>
                <div className="bg-msf-void p-4 rounded-xl mb-4">
                  <div className="text-xs text-msf-mist uppercase mb-1">Unique Identifier</div>
                  <div className="text-xl font-bold text-msf-neon-cyan font-mono tracking-widest">{profile.msf_id}</div>
                </div>
                <p className="text-xs text-msf-mist">
                  Share your MSF ID for direct transfers and quick profile access.
                </p>
              </GlassCard>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white font-medium capitalize">{key.replace('_', ' ')}</div>
                      <div className="text-xs text-msf-mist">Receive {key.replace('_', ' ')} notifications</div>
                    </div>
                    <button
                      className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-msf-cosmic-purple' : 'bg-msf-elevation-2'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Privacy Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label>Profile Visibility</Label>
                  <select className="w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-msf-cosmic-purple/50">
                    <option value="public">Public - Anyone can view</option>
                    <option value="connections">Connections Only</option>
                    <option value="private">Private - Hidden</option>
                  </select>
                </div>
                {Object.entries(settings.privacy).filter(([k]) => k !== 'profile_visibility').map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white font-medium capitalize">{key.replace('_', ' ')}</div>
                      <div className="text-xs text-msf-mist">Show {key.replace('_', ' ')} on profile</div>
                    </div>
                    <button
                      className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-msf-cosmic-purple' : 'bg-msf-elevation-2'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Preferences</h3>
              <div className="space-y-4">
                <div>
                  <Label>Language</Label>
                  <select defaultValue={settings.preferences.language} className="w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-msf-cosmic-purple/50">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
                <div>
                  <Label>Timezone</Label>
                  <select defaultValue={settings.preferences.timezone} className="w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-msf-cosmic-purple/50">
                    <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="America/New_York">America/New York (EST)</option>
                  </select>
                </div>
                <div>
                  <Label>Currency</Label>
                  <select defaultValue={settings.preferences.currency} className="w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-msf-cosmic-purple/50">
                    <option value="NGN">Nigerian Naira (NGN)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Account Actions</h3>
              <div className="space-y-4">
                <Button variant="secondary" className="w-full" icon="📤">Export My Data</Button>
                <Button variant="secondary" className="w-full" icon="📥">Download Archive</Button>
                <div className="pt-4 border-t border-white/5">
                  <Button variant="danger" className="w-full" icon="🗑️">Delete Account</Button>
                  <p className="text-xs text-msf-mist mt-2 text-center">
                    This action is irreversible. All your data will be permanently deleted.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label>New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button variant="primary" className="w-full mt-4">Update Password</Button>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Two-Factor Authentication</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-msf-elevation-1/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="text-sm text-white font-medium">Authenticator App</div>
                      <div className="text-xs text-msf-mist">Use TOTP with Google Authenticator</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-msf-emerald-glow text-white text-sm font-medium rounded-full">
                    Enabled
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-msf-elevation-1/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👆</span>
                    <div>
                      <div className="text-sm text-white font-medium">Biometric Authentication</div>
                      <div className="text-xs text-msf-mist">Use fingerprint or face recognition</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-msf-elevation-2 text-msf-mist text-sm font-medium rounded-full">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-msf-elevation-1/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <div className="text-sm text-white font-medium">Email OTP</div>
                      <div className="text-xs text-msf-mist">Receive codes via email</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-msf-emerald-glow text-white text-sm font-medium rounded-full">
                    Enabled
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-6">Active Sessions</h3>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on macOS', location: 'Lagos, Nigeria', ip: '197.210.xx.xx', current: true },
                  { device: 'Safari on iPhone', location: 'Lagos, Nigeria', ip: '197.210.xx.xx', current: false },
                  { device: 'Firefox on Windows', location: 'London, UK', ip: '81.103.xx.xx', current: false, suspicious: true },
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
                        <div className="text-xs text-msf-mist">{session.location} • {session.ip}</div>
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

        {activeTab === 'billing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Payment Methods</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-msf-cosmic-purple/20 to-msf-neon-cyan/20 border border-msf-cosmic-purple/30 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">💳</span>
                    <Badge variant="ai">Primary</Badge>
                  </div>
                  <div className="text-white font-mono mb-2">**** **** **** 1234</div>
                  <div className="text-xs text-msf-mist flex justify-between">
                    <span>Access Bank</span>
                    <span>Expires 12/28</span>
                  </div>
                </div>
                <Button variant="secondary" className="w-full" icon="+">Add Payment Method</Button>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Billing History</h3>
              <div className="space-y-3">
                {[
                  { date: 'Feb 1, 2026', description: 'Registration Fee - Freelancer', amount: -30000, status: 'Paid' },
                  { date: 'Jan 15, 2026', description: 'Platform Commission', amount: -12000, status: 'Paid' },
                ].map((invoice, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-msf-elevation-1/50 rounded-xl">
                    <div>
                      <div className="text-sm text-white font-medium">{invoice.description}</div>
                      <div className="text-xs text-msf-mist">{invoice.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-red-400">₦{Math.abs(invoice.amount).toLocaleString()}</div>
                      <Badge variant="success" size="sm">{invoice.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
