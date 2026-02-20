import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-16 flex items-center justify-between px-6 md:px-12 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-msf-cosmic-purple to-msf-neon-cyan animate-pulse-glow" />
        <span className="text-xl font-bold font-display tracking-wide text-white">
          My Space <span className="text-msf-cosmic-purple">FPA</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-msf-mist text-sm font-medium">
        <Link href="#" className="hover:text-white transition-colors">Marketplace</Link>
        <Link href="#" className="hover:text-white transition-colors">Projects</Link>
        <Link href="#" className="hover:text-white transition-colors">Enterprise</Link>
        <Link href="#" className="hover:text-white transition-colors">Talent</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="#" className="hidden md:block text-sm font-medium text-white hover:text-msf-neon-cyan transition-colors">
          Login
        </Link>
        <Link href="#" className="px-5 py-2 text-sm font-bold text-white bg-msf-cosmic-purple rounded-full hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
