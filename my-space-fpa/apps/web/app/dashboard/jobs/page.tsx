"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard, Button, Badge, Avatar } from '@msf/ui';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAIMatches, setShowAIMatches] = useState(true);

  const categories = ['All', 'Development', 'Design', 'Writing', 'Marketing', 'Consulting'];

  const jobs = [
    {
      id: '1',
      title: 'Full-Stack Developer for E-commerce Platform',
      client: 'TechCorp Nigeria',
      clientRating: 4.9,
      budget: 250000,
      budgetType: 'fixed',
      skills: ['React', 'Node.js', 'MongoDB', 'Paystack'],
      description: 'We need an experienced full-stack developer to build a modern e-commerce platform with payment integration...',
      proposals: 12,
      postedAgo: '2 hours',
      aiMatch: 95,
      isNew: true,
      featured: true,
    },
    {
      id: '2',
      title: 'Mobile App UI/UX Design',
      client: 'StartupX Lagos',
      clientRating: 4.7,
      budget: 150000,
      budgetType: 'fixed',
      skills: ['Figma', 'UI Design', 'Mobile Design', 'Prototyping'],
      description: 'Looking for a talented designer to create beautiful UI/UX for our fintech mobile application...',
      proposals: 8,
      postedAgo: '4 hours',
      aiMatch: 88,
      isNew: true,
      featured: false,
    },
    {
      id: '3',
      title: 'Senior Backend Engineer - API Development',
      client: 'FinanceFlow',
      clientRating: 5.0,
      budget: 50000,
      budgetType: 'hourly',
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      description: 'We are seeking a senior backend engineer to develop scalable APIs for our financial services platform...',
      proposals: 5,
      postedAgo: '6 hours',
      aiMatch: 92,
      isNew: false,
      featured: true,
    },
    {
      id: '4',
      title: 'Content Writer for Tech Blog',
      client: 'DevMedia Africa',
      clientRating: 4.5,
      budget: 30000,
      budgetType: 'fixed',
      skills: ['Content Writing', 'SEO', 'Technical Writing'],
      description: 'Need an experienced tech writer to create engaging blog posts about software development trends...',
      proposals: 24,
      postedAgo: '1 day',
      aiMatch: 75,
      isNew: false,
      featured: false,
    },
    {
      id: '5',
      title: 'DevOps Engineer - AWS Infrastructure',
      client: 'CloudScale Solutions',
      clientRating: 4.8,
      budget: 60000,
      budgetType: 'hourly',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      description: 'Looking for a DevOps expert to set up and manage our cloud infrastructure on AWS...',
      proposals: 7,
      postedAgo: '1 day',
      aiMatch: 85,
      isNew: false,
      featured: false,
    },
    {
      id: '6',
      title: 'React Native Developer for Social App',
      client: 'ConnectHub',
      clientRating: 4.6,
      budget: 400000,
      budgetType: 'fixed',
      skills: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
      description: 'We need a skilled React Native developer to build a social networking app with real-time features...',
      proposals: 15,
      postedAgo: '2 days',
      aiMatch: 90,
      isNew: false,
      featured: false,
    },
  ];

  const formatBudget = (budget: number, type: string) => {
    if (type === 'hourly') {
      return `₦${budget.toLocaleString()}/hr`;
    }
    return `₦${budget.toLocaleString()}`;
  };

  return (
    <DashboardLayout title="Job Marketplace">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Job Marketplace</h1>
            <p className="text-msf-mist">Find your next opportunity with AI-powered matching</p>
          </div>
          <Button variant="ai" icon="✨">Write Proposal with AI</Button>
        </div>

        {/* Search & Filters */}
        <GlassCard className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-msf-mist">🔍</span>
              <input
                type="text"
                placeholder="Search jobs, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-msf-mist/50 focus:outline-none focus:border-msf-cosmic-purple/50 focus:ring-1 focus:ring-msf-cosmic-purple/30 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select className="bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-msf-cosmic-purple/50">
                <option>All Categories</option>
                {categories.slice(1).map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <select className="bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-msf-cosmic-purple/50">
                <option>Budget Range</option>
                <option>₦10k - ₦50k</option>
                <option>₦50k - ₦200k</option>
                <option>₦200k+</option>
              </select>
            </div>
          </div>

          {/* AI Match Toggle */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-msf-cosmic-purple text-white'
                      : 'bg-msf-elevation-1/50 text-msf-mist hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAIMatches(!showAIMatches)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showAIMatches
                  ? 'bg-gradient-to-r from-msf-cosmic-purple/20 to-msf-neon-cyan/20 text-msf-neon-cyan border border-msf-neon-cyan/30'
                  : 'bg-msf-elevation-1/50 text-msf-mist hover:text-white'
              }`}
            >
              <span>🤖</span> AI Matches Only
            </button>
          </div>
        </GlassCard>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <GlassCard key={job.id} className="p-6 group">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {job.featured && (
                          <Badge variant="ai" size="sm">Featured</Badge>
                        )}
                        {job.isNew && (
                          <Badge variant="success" size="sm">New</Badge>
                        )}
                        {job.aiMatch >= 90 && (
                          <Badge variant="ai" size="sm">✨ {job.aiMatch}% Match</Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-msf-cosmic-purple transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-msf-mist">
                        <span className="flex items-center gap-1">
                          <Avatar alt={job.client} size="sm" />
                          {job.client}
                        </span>
                        <span className="flex items-center gap-1">
                          ⭐ {job.clientRating}
                        </span>
                        <span>•</span>
                        <span>{job.postedAgo} ago</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-msf-emerald-glow">
                        {formatBudget(job.budget, job.budgetType)}
                      </div>
                      <div className="text-xs text-msf-mist uppercase">
                        {job.budgetType === 'hourly' ? 'Hourly Rate' : 'Fixed Price'}
                      </div>
                    </div>
                  </div>

                  <p className="text-msf-mist mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end justify-between gap-4 lg:border-l lg:border-white/5 lg:pl-6">
                  <div className="text-sm text-msf-mist">
                    <span className="text-white font-medium">{job.proposals}</span> proposals
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="primary" size="md">Quick Apply ✨</Button>
                    <Button variant="secondary" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button variant="secondary" size="sm">Previous</Button>
          <Button variant="primary" size="sm">1</Button>
          <Button variant="secondary" size="sm">2</Button>
          <Button variant="secondary" size="sm">3</Button>
          <Button variant="secondary" size="sm">Next</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
