"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard, Button, Badge, Avatar } from '@msf/ui';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'file' | 'image';
}

interface Conversation {
  id: string;
  participant: {
    name: string;
    role: string;
    avatar?: string;
    status: 'online' | 'offline' | 'busy';
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
  typing?: boolean;
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations: Conversation[] = [
    { id: '1', participant: { name: 'Sarah Johnson', role: 'UI/UX Designer', status: 'online' }, lastMessage: 'Sure! Let me check the files...', timestamp: '2m ago', unread: 2, typing: true },
    { id: '2', participant: { name: 'Michael Chen', role: 'Backend Developer', status: 'online' }, lastMessage: 'The API is ready for testing', timestamp: '15m ago', unread: 0 },
    { id: '3', participant: { name: 'TechCorp Nigeria', role: 'Company', status: 'offline' }, lastMessage: 'We would like to proceed with the project', timestamp: '1h ago', unread: 1 },
    { id: '4', participant: { name: 'Amina Hassan', role: 'Content Writer', status: 'busy' }, lastMessage: 'I will submit the articles by tomorrow', timestamp: '3h ago', unread: 0 },
    { id: '5', participant: { name: 'David Okon', role: 'Full-Stack Developer', status: 'offline' }, lastMessage: 'Thanks for the connection!', timestamp: '1d ago', unread: 0 },
  ];

  const messages: Message[] = [
    { id: '1', senderId: '2', senderName: 'Sarah Johnson', content: 'Hey! Are you available for a quick call?', timestamp: '10:30 AM', read: true, type: 'text' },
    { id: '2', senderId: '1', senderName: 'You', content: 'Yes, I am! What\'s up?', timestamp: '10:32 AM', read: true, type: 'text' },
    { id: '3', senderId: '2', senderName: 'Sarah Johnson', content: 'I need your feedback on the latest designs for the e-commerce project.', timestamp: '10:33 AM', read: true, type: 'text' },
    { id: '4', senderId: '2', senderName: 'Sarah Johnson', content: '', timestamp: '10:34 AM', read: true, type: 'file', content: 'design_v3.fig' },
    { id: '5', senderId: '1', senderName: 'You', content: 'Let me review them now.', timestamp: '10:35 AM', read: true, type: 'text' },
    { id: '6', senderId: '2', senderName: 'Sarah Johnson', content: 'Sure! Let me check the files...', timestamp: '10:36 AM', read: false, type: 'text' },
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <DashboardLayout title="Messages">
      <div className="h-[calc(100vh-140px)]">
        <GlassCard className="h-full flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 md:w-96 border-r border-white/5 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-msf-mist">🔍</span>
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full bg-msf-elevation-1/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-msf-mist/50 focus:outline-none focus:border-msf-cosmic-purple/50"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 ${
                    selectedConversation === conv.id ? 'bg-msf-cosmic-purple/10' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar alt={conv.participant.name} size="md" />
                    {conv.participant.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-msf-emerald-glow rounded-full border-2 border-msf-deep-space" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white truncate">{conv.participant.name}</span>
                      <span className="text-xs text-msf-mist">{conv.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {conv.typing ? (
                        <span className="text-xs text-msf-cosmic-purple italic">typing...</span>
                      ) : (
                        <span className="text-xs text-msf-mist truncate flex-1">{conv.lastMessage}</span>
                      )}
                      {conv.unread > 0 && (
                        <span className="w-5 h-5 bg-msf-cosmic-purple rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <Avatar alt={selectedConv.participant.name} size="md" />
                    <div>
                      <h3 className="text-white font-medium">{selectedConv.participant.name}</h3>
                      <p className="text-xs text-msf-mist flex items-center gap-2">
                        {selectedConv.participant.role}
                        {selectedConv.participant.status === 'online' && (
                          <span className="text-msf-emerald-glow">• Online</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">📞</button>
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">🎥</button>
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">⋮</button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg) => {
                    const isMe = msg.senderId === '1';
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                          {!isMe && (
                            <span className="text-xs text-msf-mist mb-1">{msg.senderName}</span>
                          )}
                          <div className={`px-4 py-3 rounded-2xl ${
                            isMe 
                              ? 'bg-msf-cosmic-purple text-white rounded-br-sm' 
                              : 'bg-msf-elevation-1/50 text-white rounded-bl-sm'
                          }`}>
                            {msg.type === 'file' ? (
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">📎</span>
                                <div>
                                  <div className="text-sm font-medium">design_v3.fig</div>
                                  <div className="text-xs opacity-70">2.4 MB</div>
                                </div>
                                <button className="text-sm opacity-70 hover:opacity-100">⬇️</button>
                              </div>
                            ) : (
                              <p className="text-sm">{msg.content}</p>
                            )}
                          </div>
                          <span className="text-xs text-msf-mist mt-1">{msg.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-xl">
                      📎
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-msf-elevation-1/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-msf-mist/50 focus:outline-none focus:border-msf-cosmic-purple/50"
                    />
                    <button className="w-10 h-10 rounded-xl bg-msf-cosmic-purple flex items-center justify-center hover:bg-opacity-90 transition-colors text-lg">
                      📤
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-bold text-white mb-2">Select a conversation</h3>
                  <p className="text-msf-mist">Choose from your existing conversations or start a new one</p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
