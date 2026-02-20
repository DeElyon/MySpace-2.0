"use client";

import React from 'react';
import { GlassCard, Button } from '@msf/ui';

export default function DashboardPage() {
  const quickActions = [
    { icon: '🎥', title: 'Start Meeting', subtitle: 'Instant video call', color: 'bg-msf-cosmic-purple/10 border-msf-cosmic-purple/30 text-msf-cosmic-purple' },
    { icon: '💻', title: 'Open IDE', subtitle: 'Continue coding', progress: 75, color: 'bg-msf-neon-cyan/10 border-msf-neon-cyan/30 text-msf-neon-cyan' },
    { icon: '💰', title: 'Wallet', subtitle: '₦245,000 balance', alert: 'Pending withdrawal', color: 'bg-msf-emerald-glow/10 border-msf-emerald-glow/30 text-msf-emerald-glow' },
    { icon: '📁', title: 'Submit Project', subtitle: '2 pending reviews', badge: 'Due tomorrow', color: 'bg-msf-creative-coral/10 border-msf-creative-coral/30 text-msf-creative-coral' },
  ];

  const activities = [
    { type: 'proposal', user: 'Sarah', action: 'submitted', target: 'E-commerce App', time: '2m ago', icon: '📝' },
    { type: 'payment', user: 'System', action: 'payment received', amount: '₦50,000', time: '5m ago', icon: '💰' },
    { type: 'meeting', user: 'Team', action: 'started meeting', participants: 3, time: '10m ago', icon: '🎥' },
    { type: 'code', user: 'Mike', action: 'committed to', repo: 'main', time: '15m ago', icon: '⌨️' },
  ];

  return (
    <main className="min-h-screen bg-msf-void flex">
      {/* Left Sidebar (Part 2.1.2) */}
      <aside className="w-20 lg:w-64 border-r border-white/5 glass-nav p-6 flex flex-col justify-between fixed h-full z-20">
        <div className="space-y-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-msf-cosmic-purple to-msf-neon-cyan animate-pulse-glow" />
            <span className="text-xl font-bold font-display text-white hidden lg:block tracking-tight">
              My Space <span className="text-msf-cosmic-purple">FPA</span>
            </span>
          </div>

          <nav className="space-y-4">
            {['🏠 Dashboard', '💼 Jobs', '👥 Network', '💬 Messages', '📁 Projects', '⚙️ Settings'].map((item) => (
              <div key={item} className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all hover:bg-white/5 group ${item.includes('Dashboard') ? 'bg-msf-cosmic-purple/20 text-white' : 'text-msf-mist hover:text-white'}`}>
                <span className="text-xl group-hover:scale-110 transition-transform">{item.split(' ')[0]}</span>
                <span className="hidden lg:block font-medium text-sm">{item.split(' ')[1]}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
           <div className="flex items-center gap-4 px-4 py-3 text-msf-mist hover:text-white cursor-pointer rounded-2xl transition-all hover:bg-white/5">
              <span className="text-xl">🌙</span>
              <span className="hidden lg:block font-medium text-sm">Theme</span>
           </div>
           <div className="flex items-center gap-4 px-4 py-3 text-msf-mist hover:text-red-400 cursor-pointer rounded-2xl transition-all hover:bg-white/5">
              <span className="text-xl">🚪</span>
              <span className="hidden lg:block font-medium text-sm">Logout</span>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-20 lg:ml-64 p-6 lg:p-12">
        {/* Top Navigation */}
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-full max-w-xl group">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-msf-mist group-focus-within:text-msf-cosmic-purple transition-colors">🔍</span>
             <input type="text" placeholder="Search jobs, projects, or people..." className="w-full bg-msf-elevation-1/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-msf-cosmic-purple/50 focus:ring-1 focus:ring-msf-cosmic-purple/30 transition-all backdrop-blur-md" />
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-mono text-msf-mist uppercase tracking-widest">Wallet Balance</div>
              <div className="text-lg font-bold text-white tracking-tight">₦245,000.00</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-msf-elevation-1/50 border border-white/10 flex items-center justify-center relative hover:border-msf-cosmic-purple/50 transition-all cursor-pointer">
              <span className="text-xl">🔔</span>
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#EF4444]" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-msf-elevation-1/50 border border-white/10 flex items-center justify-center overflow-hidden hover:border-msf-cosmic-purple/50 transition-all cursor-pointer">
              <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366F1&color=fff" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Welcome Section (Part 2.3.1) */}
        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Good afternoon, Sarah! 👋</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-msf-cosmic-purple/10 border border-msf-cosmic-purple/20 rounded-full text-xs text-msf-pure-light animate-pulse-glow">
            <span>✨</span> AI Insight: 3 high-matching jobs posted in the last hour
          </div>
        </div>

        {/* Quick Actions Grid (Part 2.3.1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {quickActions.map((action) => (
             <GlassCard key={action.title} className="p-6 relative overflow-hidden group">
               <div className={`w-12 h-12 rounded-2xl ${action.color} border flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                 {action.icon}
               </div>
               <h3 className="text-lg font-bold text-white mb-1">{action.title}</h3>
               <p className="text-xs text-msf-mist mb-4">{action.subtitle}</p>
               
               {action.progress && (
                 <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-msf-neon-cyan transition-all duration-1000 shadow-[0_0_10px_#22D3EE]" style={{ width: `${action.progress}%` }} />
                 </div>
               )}

               {action.badge && (
                 <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-msf-creative-coral bg-msf-creative-coral/10 px-2 py-1 rounded">
                   {action.badge}
                 </div>
               )}

               {action.alert && (
                 <div className="text-[10px] text-msf-warning-amber mt-2 flex items-center gap-1">
                   <span>⚠️</span> {action.alert}
                 </div>
               )}
             </GlassCard>
           ))}
        </div>

        {/* Live Activity Feed & Active Collaborations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <GlassCard className="lg:col-span-2 p-8">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-bold text-white tracking-tight">Live Activity</h3>
               <Button variant="ghost" size="sm">Filter ▼</Button>
             </div>
             
             <div className="space-y-6">
                {activities.map((act, i) => (
                  <div key={i} className="flex items-center justify-between group hover:bg-white/5 p-3 rounded-2xl transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-msf-elevation-2 flex items-center justify-center text-lg border border-white/5">
                         {act.icon}
                       </div>
                       <div>
                          <p className="text-sm text-white font-medium">
                            <span className="text-msf-cosmic-purple">{act.user}</span> {act.action} {act.target || act.amount || act.repo}
                          </p>
                          <p className="text-xs text-msf-mist">{act.time}</p>
                       </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">View Details</Button>
                  </div>
                ))}
             </div>
           </GlassCard>

           <GlassCard className="p-8">
             <h3 className="text-xl font-bold text-white mb-8 tracking-tight">Active Collaborations</h3>
             <div className="space-y-8">
                <div className="p-4 bg-msf-elevation-1/50 rounded-2xl border border-white/5 hover:border-msf-cosmic-purple/30 transition-all cursor-pointer">
                  <h4 className="text-sm font-bold text-white mb-4">E-commerce Platform</h4>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex -space-x-3">
                       {[1, 2, 3].map((u) => (
                         <div key={u} className="w-8 h-8 rounded-full border-2 border-msf-void bg-msf-elevation-2 flex items-center justify-center overflow-hidden">
                           <img src={`https://ui-avatars.com/api/?name=User+${u}&background=random&color=fff`} alt={`User ${u}`} className="w-full h-full object-cover" />
                         </div>
                       ))}
                       <div className="w-8 h-8 rounded-full border-2 border-msf-void bg-msf-elevation-2 flex items-center justify-center text-[10px] text-white font-bold">
                         +2
                       </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-msf-emerald-glow font-bold uppercase tracking-widest">
                       <div className="w-1.5 h-1.5 bg-msf-emerald-glow rounded-full animate-pulse shadow-[0_0_8px_#10B981]" />
                       Live Now
                    </div>
                  </div>
                  <p className="text-[10px] text-msf-mist italic">Sarah is coding in App.js...</p>
                </div>

                <div className="p-4 bg-msf-elevation-1/50 rounded-2xl border border-white/5 opacity-50">
                  <h4 className="text-sm font-bold text-white mb-2">Fintech App UX</h4>
                  <p className="text-[10px] text-msf-mist">Last activity: 2 hours ago</p>
                </div>

                <Button className="w-full" variant="secondary" size="sm">View All Projects</Button>
             </div>
           </GlassCard>
        </div>
      </div>
    </main>
  );
}
