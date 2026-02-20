"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard, Button, Badge, Avatar } from '@msf/ui';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'completed'>('active');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const projects = [
    {
      id: '1',
      title: 'E-commerce Platform',
      client: 'TechCorp Nigeria',
      status: 'active',
      progress: 75,
      deadline: '2026-02-28',
      milestone: 'Phase 2: Payment Integration',
      totalMilestones: 5,
      completedMilestones: 3,
      payment: 250000,
      paid: 150000,
      description: 'Full-stack e-commerce platform with payment integration, admin dashboard, and mobile responsiveness.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Paystack'],
      lastActivity: '2 hours ago',
      collaborators: [
        { name: 'You', role: 'Developer' },
        { name: 'Sarah Johnson', role: 'Designer' },
        { name: 'Michael Chen', role: 'Backend Dev' },
      ],
    },
    {
      id: '2',
      title: 'Fintech Mobile App',
      client: 'FinanceFlow',
      status: 'active',
      progress: 45,
      deadline: '2026-03-15',
      milestone: 'Phase 1: UI/UX Design',
      totalMilestones: 6,
      completedMilestones: 2,
      payment: 500000,
      paid: 150000,
      description: 'Cross-platform mobile application for financial services with real-time transactions.',
      technologies: ['React Native', 'TypeScript', 'Firebase'],
      lastActivity: '5 hours ago',
      collaborators: [
        { name: 'You', role: 'Lead Developer' },
        { name: 'Amina Hassan', role: 'Content Writer' },
      ],
    },
    {
      id: '3',
      title: 'Corporate Website Redesign',
      client: 'StartupX Lagos',
      status: 'pending',
      progress: 0,
      deadline: '2026-03-01',
      milestone: 'Awaiting Start',
      totalMilestones: 4,
      completedMilestones: 0,
      payment: 180000,
      paid: 0,
      description: 'Complete redesign of corporate website with modern UI/UX and CMS integration.',
      technologies: ['Next.js', 'Tailwind CSS', 'Sanity CMS'],
      lastActivity: '1 day ago',
      collaborators: [
        { name: 'You', role: 'Developer' },
      ],
    },
  ];

  const completedProjects = [
    {
      id: '4',
      title: 'Admin Dashboard',
      client: 'CloudScale Solutions',
      status: 'completed',
      progress: 100,
      completedDate: '2026-01-15',
      payment: 320000,
      rating: 5,
      review: 'Excellent work! Delivered ahead of schedule with outstanding quality.',
      technologies: ['React', 'TypeScript', 'Recharts'],
    },
    {
      id: '5',
      title: 'API Development for Logistics',
      client: 'DeliveryPro',
      status: 'completed',
      progress: 100,
      completedDate: '2025-12-20',
      payment: 450000,
      rating: 5,
      review: 'Amazing developer. Will definitely hire again!',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
    },
  ];

  const submissions = [
    { id: '1', project: 'E-commerce Platform', version: 'v2.1.0', date: '2026-02-18', status: 'pending', tests: { passed: 48, failed: 2, warnings: 5 } },
    { id: '2', project: 'Admin Dashboard', version: 'v1.0.0', date: '2026-01-14', status: 'approved', tests: { passed: 52, failed: 0, warnings: 0 } },
  ];

  return (
    <DashboardLayout title="Projects">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Projects</h1>
            <p className="text-msf-mist">Manage your ongoing work and submissions</p>
          </div>
          <Button variant="primary" icon="📤" onClick={() => setShowSubmitModal(true)}>
            Submit Project
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/5">
          {['active', 'pending', 'completed'].map((tab) => (
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
              {tab === 'active' && <span className="ml-2 px-2 py-0.5 bg-msf-cosmic-purple/20 rounded-full text-xs">{projects.filter(p => p.status === 'active').length}</span>}
              {tab === 'pending' && <span className="ml-2 px-2 py-0.5 bg-msf-warning-amber/20 rounded-full text-xs">{projects.filter(p => p.status === 'pending').length}</span>}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {(activeTab === 'active' || activeTab === 'pending' ? projects : completedProjects)
            .filter(p => activeTab === 'active' || activeTab === 'pending' ? p.status === activeTab : true)
            .map((project) => (
            <GlassCard key={project.id} className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={project.status === 'active' ? 'success' : project.status === 'pending' ? 'warning' : 'default'} size="sm">
                          {project.status}
                        </Badge>
                        {project.deadline && (
                          <Badge variant={new Date(project.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? 'danger' : 'info'} size="sm">
                            Due {new Date(project.deadline).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-msf-mist text-sm mb-4">{project.client}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-msf-emerald-glow">₦{project.payment.toLocaleString()}</div>
                      <div className="text-xs text-msf-mist">₦{project.paid.toLocaleString()} paid</div>
                    </div>
                  </div>

                  <p className="text-msf-mist mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="default" size="sm">{tech}</Badge>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-msf-mist">Progress</span>
                      <span className="text-white font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestone Info */}
                  <div className="flex items-center gap-4 text-sm text-msf-mist">
                    <span>📍 {project.milestone}</span>
                    <span>•</span>
                    <span>{project.completedMilestones}/{project.totalMilestones} milestones</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 lg:border-l lg:border-white/5 lg:pl-6">
                  {project.status === 'active' && (
                    <>
                      <Button variant="primary" size="sm" icon="📤" onClick={() => setShowSubmitModal(true)}>
                        Submit Work
                      </Button>
                      <Button variant="secondary" size="sm" icon="💬">Message Client</Button>
                      <Button variant="secondary" size="sm" icon="📊">View Details</Button>
                    </>
                  )}
                  {project.status === 'pending' && (
                    <>
                      <Button variant="primary" size="sm" icon="▶️">Start Project</Button>
                      <Button variant="secondary" size="sm" icon="💬">Contact Client</Button>
                    </>
                  )}
                  {project.status === 'completed' && (
                    <>
                      <Button variant="secondary" size="sm" icon="⭐">Leave Review</Button>
                      <Button variant="secondary" size="sm" icon="📥">Download Files</Button>
                    </>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Submissions History */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Submissions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-msf-mist uppercase tracking-widest border-b border-white/5">
                  <th className="pb-3 font-medium">Project</th>
                  <th className="pb-3 font-medium">Version</th>
                  <th className="pb-3 font-medium">Tests</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white font-medium">{sub.project}</td>
                    <td className="py-4 text-msf-mist font-mono">{sub.version}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-msf-emerald-glow text-xs">✓ {sub.tests.passed} passed</span>
                        {sub.tests.failed > 0 && <span className="text-red-500 text-xs">✗ {sub.tests.failed} failed</span>}
                        {sub.tests.warnings > 0 && <span className="text-yellow-500 text-xs">⚠ {sub.tests.warnings} warnings</span>}
                      </div>
                    </td>
                    <td className="py-4 text-msf-mist">{sub.date}</td>
                    <td className="py-4">
                      <Badge
                        variant={sub.status === 'approved' ? 'success' : sub.status === 'pending' ? 'warning' : 'default'}
                        size="sm"
                      >
                        {sub.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Submit Project Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Submit Project</h2>
                <button onClick={() => setShowSubmitModal(false)} className="text-msf-mist hover:text-white">✕</button>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Select Project</Label>
                  <select className="w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-msf-cosmic-purple/50">
                    <option>E-commerce Platform - TechCorp Nigeria</option>
                    <option>Fintech Mobile App - FinanceFlow</option>
                  </select>
                </div>

                <div>
                  <Label>Submission Type</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <button className="p-4 rounded-xl bg-msf-cosmic-purple/20 border border-msf-cosmic-purple/30 text-center">
                      <div className="text-2xl mb-2">🔗</div>
                      <div className="text-xs text-white">GitHub Repo</div>
                    </button>
                    <button className="p-4 rounded-xl bg-msf-elevation-1/50 border border-white/5 text-center hover:border-msf-cosmic-purple/30">
                      <div className="text-2xl mb-2">📁</div>
                      <div className="text-xs text-white">Upload Files</div>
                    </button>
                    <button className="p-4 rounded-xl bg-msf-elevation-1/50 border border-white/5 text-center hover:border-msf-cosmic-purple/30">
                      <div className="text-2xl mb-2">🌐</div>
                      <div className="text-xs text-white">Live Demo</div>
                    </button>
                  </div>
                </div>

                <div>
                  <Label>GitHub Repository URL</Label>
                  <Input placeholder="https://github.com/username/repo" />
                </div>

                <div>
                  <Label>Version Number</Label>
                  <Input placeholder="v1.0.0" />
                </div>

                <div>
                  <Label>Submission Notes</Label>
                  <textarea
                    rows={4}
                    className="w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-msf-mist/50 focus:outline-none focus:border-msf-cosmic-purple/50 focus:ring-1 focus:ring-msf-cosmic-purple/30 transition-all"
                    placeholder="Describe what you've completed, any known issues, and instructions for testing..."
                  />
                </div>

                <div className="p-4 bg-msf-elevation-1/50 rounded-xl">
                  <h4 className="text-sm font-bold text-white mb-3">Automated Testing</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-msf-mist">Code Linting</span>
                      <span className="text-msf-emerald-glow">✓ Will run</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-msf-mist">Security Audit</span>
                      <span className="text-msf-emerald-glow">✓ Will run</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-msf-mist">Performance Tests</span>
                      <span className="text-msf-emerald-glow">✓ Will run</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-msf-mist">Mobile Responsiveness</span>
                      <span className="text-msf-emerald-glow">✓ Will run</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="secondary" className="flex-1" onClick={() => setShowSubmitModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" className="flex-1" icon="📤">
                    Submit for Review
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </DashboardLayout>
  );
}
