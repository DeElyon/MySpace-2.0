import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-msf-deep-space relative overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Features Grid Placeholder */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-display font-bold text-center mb-12 text-white">
          Why <span className="text-msf-cosmic-purple">My Space FPA</span>?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-msf-cosmic-purple/50 transition-colors">
            <div className="w-12 h-12 bg-msf-cosmic-purple/20 rounded-lg flex items-center justify-center mb-6 text-2xl">
              🎥
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Video Meetings</h3>
            <p className="text-msf-mist">Native HD video calls integrated directly into your workspace. No external tools needed.</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-msf-neon-cyan/50 transition-colors">
            <div className="w-12 h-12 bg-msf-neon-cyan/20 rounded-lg flex items-center justify-center mb-6 text-2xl">
              💻
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Cloud IDE</h3>
            <p className="text-msf-mist">Real-time collaborative coding environment with AI pair programmer support.</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-msf-emerald-glow/50 transition-colors">
            <div className="w-12 h-12 bg-msf-emerald-glow/20 rounded-lg flex items-center justify-center mb-6 text-2xl">
              🤖
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">AI Assistant</h3>
            <p className="text-msf-mist">Smart job matching, proposal writing, and code review powered by advanced AI.</p>
          </div>
        </div>
      </section>
      
      {/* Footer Placeholder */}
      <footer className="py-12 border-t border-white/5 text-center text-msf-mist text-sm">
        <p>© 2026 My Space FPA - EL VERSE. All rights reserved.</p>
      </footer>
    </main>
  );
}
