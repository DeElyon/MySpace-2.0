"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard, Button, Badge, Avatar, Input, Label } from '@msf/ui';

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState<'connections' | 'pending' | 'requests'>('connections');

  const connections = [
    { id: '1', name: 'Michael Chen', role: 'Backend Developer', location: 'Lagos, Nigeria', mutual: 12, status: 'online', avatar: undefined },
    { id: '2', name: 'Sarah Johnson', role: 'UI/UX Designer', location: 'Abuja, Nigeria', mutual: 8, status: 'online', avatar: undefined },
    { id: '3', name: 'David Okon', role: 'Full-Stack Developer', location: 'Port Harcourt', mutual: 15, status: 'offline', avatar: undefined },
    { id: '4', name: 'Amina Hassan', role: 'Content Writer', location: 'Kano, Nigeria', mutual: 5, status: 'busy', avatar: undefined },
    { id: '5', name: 'James Peter', role: 'DevOps Engineer', location: 'Lagos, Nigeria', mutual: 20, status: 'online', avatar: undefined },
    { id: '6', name: 'Grace Emmanuel', role: 'Data Scientist', location: 'Ibadan, Nigeria', mutual: 7, status: 'away', avatar: undefined },
  ];

  const pendingRequests = [
    { id: '1', name: 'TechCorp Nigeria', type: 'company', employees: '50-200', industry: 'Technology', reason: 'Want to hire you' },
    { id: '2', name: 'StartupX Lagos', type: 'company', employees: '10-50', industry: 'Fintech', reason: 'Viewed your profile' },
  ];

  const incomingRequests = [
    { id: '1', name: 'Peter Williams', role: 'Frontend Developer', location: 'London, UK', mutual: 3, reason: 'Met at Tech Conference 2026' },
    { id: '2', name: 'Lisa Anderson', role: 'Product Manager', location: 'New York, USA', mutual: 7, reason: 'Worked on similar projects' },
    { id: '3', name: 'Ahmed Ibrahim', role: 'Blockchain Developer', location: 'Dubai, UAE', mutual: 5, reason: 'Interested in collaboration' },
  ];

  return (
    <DashboardLayout title="Network">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Professional Network</h1>
            <p className="text-msf-mist">Connect with freelancers, clients, and companies</p>
          </div>
          <Button variant="primary" icon="👥">Invite People</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-msf-cosmic-purple mb-1">523</div>
            <div className="text-sm text-msf-mist">Total Connections</div>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-msf-emerald-glow mb-1">45</div>
            <div className="text-sm text-msf-mist">This Month</div>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-msf-neon-cyan mb-1">12</div>
            <div className="text-sm text-msf-mist">Pending Requests</div>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-msf-warning-amber mb-1">8</div>
            <div className="text-sm text-msf-mist">Mutual Projects</div>
          </GlassCard>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/5">
          {['connections', 'pending', 'requests'].map((tab) => (
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
              {tab === 'requests' && <span className="ml-2 px-2 py-0.5 bg-msf-cosmic-purple/20 rounded-full text-xs">{incomingRequests.length}</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'connections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((connection) => (
              <GlassCard key={connection.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Avatar alt={connection.name} size="lg" />
                  <div className={`w-3 h-3 rounded-full ${
                    connection.status === 'online' ? 'bg-msf-emerald-glow' :
                    connection.status === 'busy' ? 'bg-red-500' :
                    connection.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{connection.name}</h3>
                <p className="text-sm text-msf-mist mb-2">{connection.role}</p>
                <p className="text-xs text-msf-mist mb-4">📍 {connection.location}</p>
                <div className="flex items-center gap-2 text-xs text-msf-mist mb-4">
                  <span>🤝 {connection.mutual} mutual connections</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1">Message</Button>
                  <Button variant="secondary" size="sm" className="flex-1">Profile</Button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="grid grid-cols-1 gap-6">
            {pendingRequests.map((request) => (
              <GlassCard key={request.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-msf-elevation-2 flex items-center justify-center text-2xl">
                      🏢
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{request.name}</h3>
                      <p className="text-sm text-msf-mist">{request.industry} • {request.employees} employees</p>
                      <p className="text-xs text-msf-mist mt-1">💡 {request.reason}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">Connect</Button>
                    <Button variant="secondary" size="sm">Ignore</Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="grid grid-cols-1 gap-6">
            {incomingRequests.map((request) => (
              <GlassCard key={request.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar alt={request.name} size="lg" />
                    <div>
                      <h3 className="text-lg font-bold text-white">{request.name}</h3>
                      <p className="text-sm text-msf-mist">{request.role} • {request.location}</p>
                      <p className="text-xs text-msf-mist mt-1">💡 {request.reason}</p>
                      <p className="text-xs text-msf-mist mt-1">🤝 {request.mutual} mutual connections</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">Accept</Button>
                    <Button variant="secondary" size="sm">Decline</Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
