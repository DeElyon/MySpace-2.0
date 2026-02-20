"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard, Button, Badge } from '@msf/ui';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const stats = {
    profile_views: 1247,
    profile_views_change: 12.5,
    proposals_sent: 89,
    proposals_sent_change: -5.2,
    jobs_won: 23,
    jobs_won_change: 18.3,
    total_earned: 2500000,
    total_earned_change: 25.7,
    avg_rating: 4.9,
    completion_rate: 98,
    response_time: '2 hours',
    repeat_clients: 15,
  };

  const earningsData = [
    { month: 'Aug', amount: 320000 },
    { month: 'Sep', amount: 450000 },
    { month: 'Oct', amount: 280000 },
    { month: 'Nov', amount: 520000 },
    { month: 'Dec', amount: 380000 },
    { month: 'Jan', amount: 550000 },
  ];

  const skillsDemand = [
    { skill: 'React', demand: 95, jobs: 124 },
    { skill: 'Node.js', demand: 88, jobs: 98 },
    { skill: 'TypeScript', demand: 82, jobs: 87 },
    { skill: 'MongoDB', demand: 65, jobs: 56 },
    { skill: 'AWS', demand: 58, jobs: 43 },
  ];

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-msf-mist">Track your performance and growth</p>
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-msf-cosmic-purple text-white'
                    : 'bg-msf-elevation-1/50 text-msf-mist hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-msf-mist">Profile Views</span>
              <span className="text-lg">👁️</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{stats.profile_views.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-msf-emerald-glow">↑ {stats.profile_views_change}%</span>
              <span className="text-msf-mist">vs last period</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-msf-mist">Proposals Sent</span>
              <span className="text-lg">📝</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{stats.proposals_sent}</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-red-500">↓ {Math.abs(stats.proposals_sent_change)}%</span>
              <span className="text-msf-mist">vs last period</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-msf-mist">Jobs Won</span>
              <span className="text-lg">🏆</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{stats.jobs_won}</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-msf-emerald-glow">↑ {stats.jobs_won_change}%</span>
              <span className="text-msf-mist">vs last period</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-msf-mist">Total Earned</span>
              <span className="text-lg">💰</span>
            </div>
            <div className="text-2xl font-bold text-msf-emerald-glow mb-2">₦{(stats.total_earned / 1000000).toFixed(2)}M</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-msf-emerald-glow">↑ {stats.total_earned_change}%</span>
              <span className="text-msf-mist">vs last period</span>
            </div>
          </GlassCard>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Earnings Chart */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-6">Earnings Overview</h3>
            <div className="space-y-4">
              {earningsData.map((item) => (
                <div key={item.month} className="flex items-center gap-4">
                  <span className="text-sm text-msf-mist w-12">{item.month}</span>
                  <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan"
                      style={{ width: `${(item.amount / 600000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-white font-medium w-24 text-right">
                    ₦{(item.amount / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Skills Demand */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-6">In-Demand Skills</h3>
            <div className="space-y-4">
              {skillsDemand.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">{skill.skill}</span>
                    <span className="text-xs text-msf-mist">{skill.jobs} jobs available</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-msf-emerald-glow"
                      style={{ width: `${skill.demand}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Success Rate</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#10B981"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(stats.completion_rate / 100) * 351.68} 351.68`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{stats.completion_rate}%</span>
              </div>
            </div>
            <p className="text-sm text-msf-mist text-center">Job completion rate</p>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Client Satisfaction</h3>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-white mb-2">{stats.avg_rating}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= Math.round(stats.avg_rating) ? 'text-yellow-500' : 'text-gray-600'}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-msf-mist">Based on 38 reviews</p>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Response Time</h3>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-msf-neon-cyan mb-2">{stats.response_time}</div>
              <p className="text-sm text-msf-mist">Average response time</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-msf-mist">Repeat Clients</span>
                <span className="text-white font-medium">{stats.repeat_clients}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-msf-mist">On-time Delivery</span>
                <span className="text-white font-medium">96%</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* AI Insights */}
        <GlassCard className="p-6 bg-gradient-to-br from-msf-cosmic-purple/10 to-msf-neon-cyan/10 border-msf-cosmic-purple/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">✨</span>
            <h3 className="text-lg font-bold text-white">AI Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-msf-elevation-1/50 rounded-xl">
              <p className="text-sm text-white mb-2">📈 Profile Optimization</p>
              <p className="text-xs text-msf-mist">Add 2 more portfolio projects to increase visibility by 35%</p>
            </div>
            <div className="p-4 bg-msf-elevation-1/50 rounded-xl">
              <p className="text-sm text-white mb-2">🎯 Skill Recommendation</p>
              <p className="text-xs text-msf-mist">Learn Next.js - 124 jobs available with 40% higher rates</p>
            </div>
            <div className="p-4 bg-msf-elevation-1/50 rounded-xl">
              <p className="text-sm text-white mb-2">💰 Rate Optimization</p>
              <p className="text-xs text-msf-mist">Your rate is 15% below market average for your experience level</p>
            </div>
            <div className="p-4 bg-msf-elevation-1/50 rounded-xl">
              <p className="text-sm text-white mb-2">🔥 Trending</p>
              <p className="text-xs text-msf-mist">Your profile views increased 45% this week - keep optimizing!</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
