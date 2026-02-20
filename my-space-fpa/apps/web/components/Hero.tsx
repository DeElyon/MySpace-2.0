export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-msf-deep-space overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-msf-cosmic-purple/20 blur-[128px] rounded-full animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-msf-neon-cyan/20 blur-[128px] rounded-full animate-float delay-1000" />
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mx-auto space-y-8 pt-20">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-tight">
          Shape Your Vision in <span className="text-transparent bg-clip-text bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan animate-pulse-glow">2026</span>
        </h1>
        
        <p className="text-xl text-msf-mist max-w-2xl mx-auto font-light">
          The first immersive freelancing platform with built-in IDE, video, and AI collaboration. Experience the future of work.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className="px-8 py-4 bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan text-white font-bold rounded-full text-lg shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 transition-transform">
            Get Started Free
          </button>
          <button className="px-8 py-4 border border-msf-mist/30 text-white font-medium rounded-full text-lg hover:bg-white/5 transition-colors backdrop-blur-sm">
            Watch Demo ▶
          </button>
        </div>

        {/* Mock Interface: IDE + Video */}
        <div className="mt-16 w-full max-w-5xl aspect-video glass-card rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl animate-fade-in-up">
          <div className="absolute top-0 left-0 w-full h-12 border-b border-white/10 flex items-center px-4 justify-between bg-msf-elevation-1/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs text-msf-mist font-mono">MySpace FPA - Project: E-commerce v2.0</div>
            <div className="w-20" />
          </div>
          
          <div className="grid grid-cols-12 h-full pt-12">
            {/* Sidebar */}
            <div className="col-span-2 border-r border-white/5 bg-msf-elevation-1/30 p-4 hidden md:block">
              <div className="space-y-4">
                <div className="h-2 w-16 bg-white/10 rounded" />
                <div className="h-2 w-24 bg-white/10 rounded" />
                <div className="h-2 w-20 bg-white/10 rounded" />
                <div className="h-2 w-12 bg-white/10 rounded" />
              </div>
            </div>

            {/* Code Editor */}
            <div className="col-span-12 md:col-span-7 bg-msf-deep-space/80 p-6 font-mono text-sm">
              <div className="text-msf-mist">1  import React from 'react';</div>
              <div className="text-msf-mist">2  import &#123; useState &#125; from 'react';</div>
              <div className="text-msf-mist">3</div>
              <div className="text-blue-400">4  function App() &#123;</div>
              <div className="text-yellow-300">5    const [user, setUser] = useState(null);</div>
              <div className="text-msf-mist">6    </div>
              <div className="text-msf-mist">7    return (</div>
              <div className="text-green-400">8      &lt;div className="app"&gt;</div>
              <div className="flex items-center gap-2 pl-8 text-white relative">
                9        &lt;Header user=&#123;user&#125; /&gt;
                <div className="absolute left-64 -top-4 bg-msf-cosmic-purple text-[10px] px-2 py-0.5 rounded text-white shadow-lg z-20">
                  Sarah is typing...
                </div>
                <div className="w-0.5 h-4 bg-msf-cosmic-purple animate-pulse" />
              </div>
              <div className="text-msf-mist pl-8">10       &lt;MainContent /&gt;</div>
              <div className="text-green-400">11     &lt;/div&gt;</div>
              <div className="text-msf-mist">12   );</div>
              <div className="text-blue-400">13 &#125;</div>
            </div>

            {/* Video/Collab Panel */}
            <div className="col-span-3 border-l border-white/5 bg-msf-elevation-1/30 p-4 hidden lg:block space-y-4">
              <div className="aspect-video bg-msf-elevation-2 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50">User 1 (Host)</div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#10B981]" />
              </div>
              <div className="aspect-video bg-msf-elevation-2 rounded-lg relative overflow-hidden border border-msf-cosmic-purple">
                 <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50">Sarah (You)</div>
                 <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
              </div>
              
              <div className="mt-8">
                <div className="text-xs text-msf-mist uppercase tracking-widest mb-2">AI Assistant</div>
                <div className="p-3 bg-msf-cosmic-purple/10 border border-msf-cosmic-purple/30 rounded-lg text-xs text-msf-pure-light">
                  ✨ I noticed a potential bug in line 5. Consider initializing with an empty object instead of null.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
