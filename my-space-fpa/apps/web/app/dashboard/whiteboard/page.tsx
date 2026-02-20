"use client";

import React, { useState } from 'react';
import { GlassCard, Button, Badge } from '@msf/ui';

interface Tool {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
}

interface Cursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

export default function WhiteboardPage() {
  const [activeTool, setActiveTool] = useState('select');
  const [color, setColor] = useState('#6366F1');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [elements, setElements] = useState<any[]>([]);

  const tools: Tool[] = [
    { id: 'select', icon: '👆', label: 'Select' },
    { id: 'pen', icon: '🖊️', label: 'Pen' },
    { id: 'shape', icon: '⬜', label: 'Shapes' },
    { id: 'text', icon: '🔤', label: 'Text' },
    { id: 'sticky', icon: '📝', label: 'Sticky Note' },
    { id: 'line', icon: '📏', label: 'Line' },
    { id: 'eraser', icon: '🧹', label: 'Eraser' },
  ];

  const colors = [
    '#6366F1', // Cosmic Purple
    '#22D3EE', // Neon Cyan
    '#10B981', // Emerald Glow
    '#F87171', // Creative Coral
    '#FBBF24', // Warning Amber
    '#38BDF8', // Focus Blue
    '#FFFFFF', // White
    '#000000', // Black
  ];

  const cursors: Cursor[] = [
    { id: '1', name: 'You', color: '#6366F1', x: 200, y: 150 },
    { id: '2', name: 'Sarah', color: '#10B981', x: 400, y: 250 },
    { id: '3', name: 'Michael', color: '#F87171', x: 600, y: 350 },
  ];

  const templates = [
    { name: 'Blank Canvas', icon: '⬜' },
    { name: 'Mind Map', icon: '🧠' },
    { name: 'Flowchart', icon: '📊' },
    { name: 'Wireframe', icon: '📱' },
    { name: 'Kanban', icon: '📋' },
    { name: 'UML Diagram', icon: '🏗️' },
  ];

  return (
    <main className="h-screen bg-msf-deep-space flex overflow-hidden">
      {/* Left Toolbar */}
      <aside className="w-20 border-r border-white/5 glass-nav flex flex-col items-center py-6 gap-4 z-20">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-msf-cosmic-purple to-msf-neon-cyan mb-4" />
        
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${
              activeTool === tool.id
                ? 'bg-msf-cosmic-purple text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                : 'bg-white/5 text-msf-mist hover:bg-white/10 hover:text-white'
            }`}
            title={tool.label}
          >
            {tool.icon}
          </button>
        ))}

        <div className="flex-1" />

        <button className="w-14 h-14 rounded-2xl bg-white/5 text-msf-mist hover:bg-white/10 hover:text-white flex items-center justify-center text-xl">
          ↩️
        </button>
        <button className="w-14 h-14 rounded-2xl bg-white/5 text-msf-mist hover:bg-white/10 hover:text-white flex items-center justify-center text-xl">
          ↪️
        </button>
      </aside>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 glass-nav flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-white font-bold">UI Wireframes - Project Review</h1>
              <p className="text-xs text-msf-mist flex items-center gap-2">
                <span className="w-2 h-2 bg-msf-emerald-glow rounded-full animate-pulse" />
                3 editors online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Color Picker */}
            <div className="flex items-center gap-2 px-4 py-2 bg-msf-elevation-1/50 rounded-xl">
              {colors.slice(0, 5).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    color === c ? 'scale-125 ring-2 ring-white' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <div className="w-px h-6 bg-white/10" />
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer bg-transparent"
              />
            </div>

            {/* Stroke Width */}
            <div className="flex items-center gap-2 px-4 py-2 bg-msf-elevation-1/50 rounded-xl">
              <span className="text-xs text-msf-mist">Width:</span>
              <input
                type="range"
                min="1"
                max="20"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-24 accent-msf-cosmic-purple"
              />
              <span className="text-xs text-white w-6">{strokeWidth}px</span>
            </div>

            <Button variant="secondary" size="sm" icon="📊">Templates</Button>
            <Button variant="primary" size="sm" icon="📤">Export</Button>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden bg-msf-void">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px),
                               linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Sample Elements on Canvas */}
          <div className="absolute inset-0 p-12">
            {/* Sample Rectangle */}
            <div className="absolute top-32 left-48 w-64 h-40 border-2 border-msf-cosmic-purple rounded-xl bg-msf-elevation-1/30">
              <div className="absolute -top-3 left-4 px-2 text-xs text-msf-cosmic-purple font-mono">Login Form</div>
              <div className="p-4 space-y-3">
                <div className="h-8 bg-msf-elevation-2 rounded" />
                <div className="h-8 bg-msf-elevation-2 rounded" />
                <div className="h-10 bg-msf-cosmic-purple/50 rounded" />
              </div>
            </div>

            {/* Sample Circle */}
            <div className="absolute top-64 left-[600px] w-32 h-32 rounded-full border-2 border-msf-neon-cyan bg-msf-neon-cyan/10 flex items-center justify-center">
              <span className="text-xs text-msf-neon-cyan">User Avatar</span>
            </div>

            {/* Sample Arrow */}
            <svg className="absolute top-48 left-[450px] w-32 h-20 pointer-events-none">
              <line x1="0" y1="0" x2="100" y2="80" stroke="#22D3EE" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#22D3EE" />
                </marker>
              </defs>
            </svg>

            {/* Sticky Note */}
            <div className="absolute top-96 left-96 w-48 h-48 bg-msf-warning-amber/80 rounded-lg p-4 shadow-lg transform rotate-3">
              <p className="text-msf-void font-medium text-sm">
                💡 Add password strength indicator here
              </p>
              <p className="text-xs text-msf-void/70 mt-2">- Sarah</p>
            </div>

            {/* Text Element */}
            <div className="absolute top-24 left-[700px] text-white">
              <h2 className="text-2xl font-bold">Dashboard Layout</h2>
              <p className="text-msf-mist text-sm">Version 2.0 - Iteration 3</p>
            </div>
          </div>

          {/* Live Cursors */}
          {cursors.map((cursor) => (
            <div
              key={cursor.id}
              className="absolute pointer-events-none transition-all duration-300 z-50"
              style={{ left: cursor.x, top: cursor.y }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: cursor.color }}>
                <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" fill="currentColor" />
              </svg>
              <span 
                className="absolute left-6 top-0 px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap text-white"
                style={{ backgroundColor: cursor.color }}
              >
                {cursor.name}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Bar - Active Users */}
        <footer className="h-12 border-t border-white/5 glass-nav flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['You', 'Sarah', 'Michael'].map((name, i) => (
                <div
                  key={name}
                  className="w-8 h-8 rounded-full border-2 border-msf-deep-space bg-msf-elevation-2 flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: i === 0 ? '#6366F1' : i === 1 ? '#10B981' : '#F87171' }}
                >
                  {name[0]}
                </div>
              ))}
            </div>
            <span className="text-xs text-msf-mist">3 editors active</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-msf-mist">
            <span>Auto-saving...</span>
            <span className="w-2 h-2 bg-msf-emerald-glow rounded-full animate-pulse" />
          </div>
        </footer>
      </div>

      {/* Right Panel - Templates & Layers */}
      <aside className="w-72 border-l border-white/5 glass-nav flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-sm font-bold text-white mb-3">Quick Templates</h3>
          <div className="grid grid-cols-3 gap-2">
            {templates.map((t) => (
              <button
                key={t.name}
                className="aspect-square rounded-xl bg-msf-elevation-1/50 border border-white/5 hover:border-msf-cosmic-purple/50 transition-all flex flex-col items-center justify-center gap-1"
              >
                <span className="text-xl">{t.icon}</span>
                <span className="text-[10px] text-msf-mist">{t.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-sm font-bold text-white mb-3">Layers</h3>
          <div className="space-y-2">
            {['Login Form', 'User Avatar', 'Arrow Connector', 'Sticky Note', 'Title Text'].map((layer, i) => (
              <div
                key={layer}
                className="flex items-center justify-between p-3 rounded-lg bg-msf-elevation-1/50 hover:bg-white/5 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-msf-mist">{i + 1}</span>
                  <span className="text-sm text-white">{layer}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-msf-mist hover:text-white">👁️</button>
                  <button className="text-msf-mist hover:text-white">🔒</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
