"use client";

import React, { useState } from 'react';
import { GlassCard, Button, Badge, Avatar } from '@msf/ui';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isSpeaking: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  isHandRaised: boolean;
}

export default function MeetingPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'participants' | 'whiteboard'>('chat');
  const [showControls, setShowControls] = useState(true);

  const participants: Participant[] = [
    { id: '1', name: 'You (Host)', avatar: undefined, isSpeaking: false, isMuted: false, isVideoOff: false, isHandRaised: false },
    { id: '2', name: 'Sarah Johnson', avatar: undefined, isSpeaking: true, isMuted: false, isVideoOff: false, isHandRaised: false },
    { id: '3', name: 'Michael Chen', avatar: undefined, isSpeaking: false, isMuted: true, isVideoOff: false, isHandRaised: true },
    { id: '4', name: 'Amina Hassan', avatar: undefined, isSpeaking: false, isMuted: false, isVideoOff: true, isHandRaised: false },
  ];

  const [messages, setMessages] = useState([
    { id: '1', sender: 'Sarah Johnson', text: 'Hey everyone! Ready for the sprint planning?', time: '10:00 AM' },
    { id: '2', sender: 'Michael Chen', text: 'Yes! I have the wireframes ready to share', time: '10:01 AM' },
    { id: '3', sender: 'You', text: 'Great! Let me start the recording', time: '10:02 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const speaker = participants.find(p => p.isSpeaking) || participants[0];
  const otherParticipants = participants.filter(p => p.id !== speaker.id);

  return (
    <main className="h-screen bg-msf-void flex overflow-hidden">
      {/* Main Meeting Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 glass-nav">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-white font-bold">Sprint Planning - E-commerce Platform</h1>
              <p className="text-xs text-msf-mist flex items-center gap-2">
                <span className="w-2 h-2 bg-msf-emerald-glow rounded-full animate-pulse" />
                {participants.length} participants • 00:24:35
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" icon="🔴">Record</Button>
            <Button variant="ai" size="sm" icon="✨">AI Summary</Button>
            <button
              onClick={() => setShowControls(!showControls)}
              className="w-10 h-10 rounded-full bg-msf-elevation-1/50 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              ⚙️
            </button>
          </div>
        </header>

        {/* Video Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
          {/* Main Speaker */}
          <div className="col-span-12 lg:col-span-8 relative">
            <div className="w-full h-full bg-msf-elevation-1 rounded-2xl overflow-hidden relative group">
              {/* Video Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-msf-cosmic-purple/20 to-msf-neon-cyan/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-msf-elevation-2 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">🎥</span>
                  </div>
                  <p className="text-white font-medium">{speaker.name}</p>
                  <p className="text-xs text-msf-mist">{speaker.isSpeaking ? 'Speaking...' : 'Participant'}</p>
                </div>
              </div>

              {/* Speaker Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-msf-deep-space/80 backdrop-blur-md rounded-full">
                <Avatar alt={speaker.name} size="sm" />
                <span className="text-sm text-white font-medium">{speaker.name}</span>
                {speaker.isSpeaking && (
                  <div className="flex gap-0.5">
                    <div className="w-1 h-3 bg-msf-emerald-glow rounded-full animate-pulse" />
                    <div className="w-1 h-4 bg-msf-emerald-glow rounded-full animate-pulse delay-75" />
                    <div className="w-1 h-2 bg-msf-emerald-glow rounded-full animate-pulse delay-150" />
                  </div>
                )}
              </div>

              {/* Quality Indicator */}
              <div className="absolute top-4 right-4 px-2 py-1 bg-msf-deep-space/80 backdrop-blur-md rounded-lg text-xs text-msf-mist">
                HD 1080p
              </div>
            </div>
          </div>

          {/* Side Panel - Participants */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            {otherParticipants.map((participant) => (
              <div
                key={participant.id}
                className="flex-1 bg-msf-elevation-1 rounded-xl overflow-hidden relative group min-h-[120px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-msf-elevation-2 to-msf-deep-space flex items-center justify-center">
                  <div className="text-center">
                    <Avatar alt={participant.name} size="lg" />
                    <p className="text-xs text-white font-medium mt-2">{participant.name}</p>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1">
                  {participant.isMuted && (
                    <span className="px-1.5 py-0.5 bg-red-500/80 rounded text-[10px]">🔇</span>
                  )}
                  {participant.isVideoOff && (
                    <span className="px-1.5 py-0.5 bg-red-500/80 rounded text-[10px]">📷</span>
                  )}
                  {participant.isHandRaised && (
                    <span className="px-1.5 py-0.5 bg-msf-warning-amber/80 rounded text-[10px]">🙋</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Controls */}
        {showControls && (
          <div className="h-24 px-6 pb-6">
            <div className="h-full glass-card rounded-[60px] flex items-center justify-center gap-4 px-8">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isMuted ? '🔇' : '🎤'}
              </button>
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isVideoOff ? '📷' : '📹'}
              </button>
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isScreenSharing ? 'bg-msf-emerald-glow text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                📺
              </button>
              <button className="w-14 h-14 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
                📝
              </button>
              <button className="w-14 h-14 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
                🙋
              </button>
              <div className="w-px h-8 bg-white/10" />
              <button className="w-14 h-14 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all">
                📞
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Chat/Participants/Whiteboard */}
      <div className="w-80 border-l border-white/5 glass-nav flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-white/5">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'chat' ? 'text-msf-cosmic-purple border-b-2 border-msf-cosmic-purple' : 'text-msf-mist hover:text-white'
            }`}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setActiveTab('participants')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'participants' ? 'text-msf-cosmic-purple border-b-2 border-msf-cosmic-purple' : 'text-msf-mist hover:text-white'
            }`}
          >
            👥 Participants
          </button>
          <button
            onClick={() => setActiveTab('whiteboard')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'whiteboard' ? 'text-msf-cosmic-purple border-b-2 border-msf-cosmic-purple' : 'text-msf-mist hover:text-white'
            }`}
          >
            🎨 Board
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white">{msg.sender}</span>
                      <span className="text-[10px] text-msf-mist">{msg.time}</span>
                    </div>
                    <p className="text-sm text-msf-mist bg-msf-elevation-1/50 rounded-lg p-3">
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-msf-mist/50 focus:outline-none focus:border-msf-cosmic-purple/50"
                  />
                  <button className="w-10 h-10 rounded-xl bg-msf-cosmic-purple flex items-center justify-center hover:bg-opacity-90 transition-colors">
                    📤
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'participants' && (
            <div className="p-4 space-y-3 overflow-y-auto">
              {participants.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-msf-elevation-1/50">
                  <div className="flex items-center gap-3">
                    <Avatar alt={p.name} size="sm" />
                    <div>
                      <p className="text-sm text-white font-medium">{p.name}</p>
                      <p className="text-xs text-msf-mist">
                        {p.isSpeaking ? 'Speaking' : p.isMuted ? 'Muted' : 'Listening'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {p.isMuted && <span className="text-xs">🔇</span>}
                    {p.isHandRaised && <span className="text-xs">🙋</span>}
                  </div>
                </div>
              ))}
              <Button variant="secondary" size="sm" className="w-full mt-4">Invite People</Button>
            </div>
          )}

          {activeTab === 'whiteboard' && (
            <div className="p-4 flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-msf-elevation-1/50 flex items-center justify-center mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <p className="text-white font-medium mb-2">Whiteboard</p>
              <p className="text-xs text-msf-mist mb-4">Collaborate visually in real-time</p>
              <Button variant="primary" size="sm">Open Whiteboard</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
