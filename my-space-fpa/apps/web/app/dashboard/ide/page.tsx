"use client";

import React, { useState } from 'react';
import { GlassCard, Button, Badge } from '@msf/ui';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  language?: string;
}

interface Problem {
  severity: 'error' | 'warning' | 'info';
  message: string;
  line: number;
  column: number;
}

export default function IDEPage() {
  const [activeFile, setActiveFile] = useState('App.tsx');
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePanel, setActivePanel] = useState<'problems' | 'debug' | 'terminal' | 'git'>('terminal');

  const fileTree: FileNode[] = [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'App.tsx', type: 'file', language: 'typescript' },
        { name: 'index.tsx', type: 'file', language: 'typescript' },
        { name: 'components', type: 'folder', children: [
          { name: 'Header.tsx', type: 'file', language: 'typescript' },
          { name: 'MainContent.tsx', type: 'file', language: 'typescript' },
          { name: 'Footer.tsx', type: 'file', language: 'typescript' },
        ]},
        { name: 'styles', type: 'folder', children: [
          { name: 'globals.css', type: 'file', language: 'css' },
        ]},
      ],
    },
    {
      name: 'public',
      type: 'folder',
      children: [
        { name: 'favicon.ico', type: 'file', language: 'binary' },
        { name: 'logo.png', type: 'file', language: 'binary' },
      ],
    },
    { name: 'package.json', type: 'file', language: 'json' },
    { name: 'tsconfig.json', type: 'file', language: 'json' },
    { name: 'README.md', type: 'file', language: 'markdown' },
  ];

  const codeContent = `import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'freelancer' | 'client';
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Header user={user} />
      <MainContent user={user} />
    </div>
  );
}

export default App;`;

  const problems: Problem[] = [
    { severity: 'warning', message: "'user' is declared but its value is never read", line: 17, column: 9 },
    { severity: 'info', message: "Consider using useCallback for fetchUser", line: 20, column: 11 },
  ];

  const terminalLines = [
    { type: 'info', text: 'Welcome to My Space FPA IDE' },
    { type: 'success', text: '✓ Project loaded successfully' },
    { type: 'command', text: '$ npm run dev' },
    { type: 'output', text: '> my-space-fpa@1.0.0 dev' },
    { type: 'output', text: '> next dev' },
    { type: 'success', text: '✓ Ready in 1.2s' },
    { type: 'info', text: '○ Local: http://localhost:3000' },
    { type: 'info', text: '● Watching for changes...' },
  ];

  const collaborators = [
    { name: 'You', color: '#6366F1', cursor: { line: 15, column: 20 } },
    { name: 'Sarah', color: '#10B981', cursor: { line: 8, column: 35 } },
  ];

  return (
    <main className="h-screen bg-msf-void flex overflow-hidden">
      {/* Activity Bar (Leftmost) */}
      <aside className="w-12 border-r border-white/5 glass-nav flex flex-col items-center py-4 gap-4 z-30">
        <button className="w-10 h-10 rounded-xl bg-msf-cosmic-purple/20 text-msf-cosmic-purple flex items-center justify-center">
          📁
        </button>
        <button className="w-10 h-10 rounded-xl text-msf-mist hover:text-white hover:bg-white/5 flex items-center justify-center">
          🔍
        </button>
        <button className="w-10 h-10 rounded-xl text-msf-mist hover:text-white hover:bg-white/5 flex items-center justify-center">
          🔄
        </button>
        <button className="w-10 h-10 rounded-xl text-msf-mist hover:text-white hover:bg-white/5 flex items-center justify-center">
          🐛
        </button>
        <button className="w-10 h-10 rounded-xl text-msf-mist hover:text-white hover:bg-white/5 flex items-center justify-center">
          📦
        </button>
        
        <div className="flex-1" />
        
        <button className="w-10 h-10 rounded-xl text-msf-mist hover:text-white hover:bg-white/5 flex items-center justify-center">
          ⚙️
        </button>
      </aside>

      {/* Sidebar - File Explorer */}
      {sidebarOpen && (
        <aside className="w-64 border-r border-white/5 glass-nav flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-widest">Explorer</span>
              <button onClick={() => setSidebarOpen(false)} className="text-msf-mist hover:text-white">✕</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {fileTree.map((node) => (
                <FileTreeNode key={node.name} node={node} depth={0} activeFile={activeFile} setActiveFile={setActiveFile} />
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Editor Tabs */}
        <div className="h-10 border-b border-white/5 glass-nav flex items-center">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="px-3 text-msf-mist hover:text-white">
              ☰
            </button>
          )}
          <div className="flex items-center gap-1">
            {['App.tsx', 'Header.tsx', 'globals.css'].map((file) => (
              <button
                key={file}
                onClick={() => setActiveFile(file)}
                className={`px-4 py-2 text-sm flex items-center gap-2 border-r border-white/5 transition-colors ${
                  activeFile === file
                    ? 'bg-msf-deep-space text-white border-t-2 border-t-msf-cosmic-purple'
                    : 'text-msf-mist hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xs">
                  {file.endsWith('.tsx') || file.endsWith('.ts') ? '📘' :
                   file.endsWith('.css') ? '🎨' : '📄'}
                </span>
                {file}
                <span className="ml-2 text-msf-mist hover:text-white">×</span>
              </button>
            ))}
          </div>
          
          {/* Collaborators */}
          <div className="flex-1" />
          <div className="flex items-center gap-2 px-4">
            <div className="flex -space-x-2">
              {collaborators.map((c) => (
                <div
                  key={c.name}
                  className="w-6 h-6 rounded-full border-2 border-msf-deep-space flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: c.color }}
                  title={`${c.name} is editing`}
                >
                  {c.name[0]}
                </div>
              ))}
            </div>
            <Button variant="ai" size="sm" icon="✨">AI</Button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-auto bg-msf-deep-space font-mono text-sm">
          <div className="flex min-h-full">
            {/* Line Numbers */}
            <div className="w-12 flex-shrink-0 bg-msf-void/50 text-msf-mist text-right py-4 pr-3 select-none">
              {codeContent.split('\n').map((_, i) => (
                <div key={i} className="leading-6">{i + 1}</div>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 py-4 pl-2">
              <pre className="leading-6">
                <code dangerouslySetInnerHTML={{
                  __html: syntaxHighlight(codeContent)
                }} />
              </pre>

              {/* Collaborator Cursors */}
              {collaborators.map((c) => (
                c.name !== 'You' && (
                  <div
                    key={c.name}
                    className="absolute pointer-events-none"
                    style={{ 
                      top: `${c.cursor.line * 24 + 16}px`, 
                      left: `${c.cursor.column * 8.4 + 48}px` 
                    }}
                  >
                    <div 
                      className="h-5 w-0.5 animate-pulse"
                      style={{ backgroundColor: c.color }}
                    />
                    <span 
                      className="absolute left-2 -top-1 px-1.5 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.name}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Panel */}
        {terminalOpen && (
          <div className="h-48 border-t border-white/5 glass-nav flex flex-col">
            {/* Panel Tabs */}
            <div className="flex items-center border-b border-white/5">
              {['problems', 'debug', 'terminal', 'git'].map((panel) => (
                <button
                  key={panel}
                  onClick={() => setActivePanel(panel as any)}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                    activePanel === panel
                      ? 'text-white border-b-2 border-msf-cosmic-purple'
                      : 'text-msf-mist hover:text-white'
                  }`}
                >
                  {panel === 'problems' && `⚠️ Problems ${problems.length > 0 && `(${problems.length})`}`}
                  {panel === 'debug' && '🐛 Debug'}
                  {panel === 'terminal' && '📦 Terminal'}
                  {panel === 'git' && '📊 Git'}
                </button>
              ))}
              <div className="flex-1" />
              <button onClick={() => setTerminalOpen(false)} className="px-3 text-msf-mist hover:text-white">
                ✕
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs">
              {activePanel === 'problems' && (
                <div className="space-y-2">
                  {problems.map((problem, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded hover:bg-white/5 cursor-pointer">
                      <span className={
                        problem.severity === 'error' ? 'text-red-500' :
                        problem.severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                      }>
                        {problem.severity === 'error' ? '🔴' : problem.severity === 'warning' ? '⚠️' : 'ℹ️'}
                      </span>
                      <div>
                        <p className="text-white">{problem.message}</p>
                        <p className="text-msf-mist">Line {problem.line}, Column {problem.column}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activePanel === 'terminal' && (
                <div className="space-y-1">
                  {terminalLines.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.type === 'command' ? 'text-msf-cosmic-purple' :
                        line.type === 'success' ? 'text-msf-emerald-glow' :
                        line.type === 'error' ? 'text-red-500' :
                        'text-msf-mist'
                      }
                    >
                      {line.text}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-white">
                    <span>$</span>
                    <input
                      type="text"
                      className="flex-1 bg-transparent outline-none"
                      placeholder="Type a command..."
                    />
                  </div>
                </div>
              )}

              {activePanel === 'debug' && (
                <div className="text-msf-mist text-center py-8">
                  <p>No active debug session</p>
                  <Button variant="secondary" size="sm" className="mt-4">Start Debugging</Button>
                </div>
              )}

              {activePanel === 'git' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">main</span>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">Pull</Button>
                      <Button variant="secondary" size="sm">Push</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-msf-mist uppercase">Changes</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-500">M</span>
                        <span className="text-white">App.tsx</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-500">U</span>
                        <span className="text-white">Header.tsx</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Simple syntax highlighting function
function syntaxHighlight(code: string): string {
  return code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(import|from|const|let|var|function|return|if|else|try|catch|finally|async|await|interface|export|default)/g, '<span class="text-purple-400">$1</span>')
    .replace(/(useState|useEffect|fetch|console|log|error)/g, '<span class="text-yellow-300">$1</span>')
    .replace(/('.*?')/g, '<span class="text-green-400">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')
    .replace(/(\{|\}|\(|\)|\[|\])/g, '<span class="text-blue-400">$1</span>');
}

// File Tree Node Component
function FileTreeNode({ node, depth, activeFile, setActiveFile }: { 
  node: FileNode; 
  depth: number; 
  activeFile: string;
  setActiveFile: (file: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-msf-mist hover:text-white hover:bg-white/5 rounded"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <span className="text-xs">{expanded ? '📂' : '📁'}</span>
          <span>{node.name}</span>
        </button>
        {expanded && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeNode key={child.name} node={child} depth={depth + 1} activeFile={activeFile} setActiveFile={setActiveFile} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => setActiveFile(node.name)}
      className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
        activeFile === node.name
          ? 'bg-msf-cosmic-purple/20 text-white'
          : 'text-msf-mist hover:text-white hover:bg-white/5'
      }`}
      style={{ paddingLeft: `${depth * 12 + 28}px` }}
    >
      <span className="text-xs">
        {node.language === 'typescript' ? '📘' :
         node.language === 'css' ? '🎨' :
         node.language === 'json' ? '📋' :
         '📄'}
      </span>
      <span>{node.name}</span>
    </button>
  );
}
