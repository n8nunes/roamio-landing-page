"use client";

export function Footer() {
  return (
    <footer className="w-full bg-roam-ink text-roam-cream py-16 md:py-24 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
        
        {/* Brand & Safety */}
        <div className="flex flex-col gap-6 md:w-1/3">
          <span className="text-3xl font-bold tracking-tighter text-white">Roam.io</span>
          <p className="text-sm text-roam-cream/50 leading-relaxed">
            Roam.io is designed for personal exploration and is not a navigation or emergency-response service. Users should remain aware of their surroundings and follow local access rules.
          </p>
          <div className="text-xs text-roam-cream/30 mt-auto pt-8">
            &copy; {new Date().getFullYear()} Monash University FIT3170 Team. All rights reserved.
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:w-2/3">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-2 tracking-wide">Explore</h4>
            <a href="#home" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">Home</a>
            <a href="#how-it-works" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">How It Works</a>
            <a href="#features" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">Features</a>
            <a href="#roadmap" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">Roadmap</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-2 tracking-wide">Project</h4>
            <a href="#about" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">About</a>
            <a href="#team" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">Team</a>
            <a href="#repo" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">Repository</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-2 tracking-wide">Legal & Social</h4>
            <a href="#" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-roam-cream/60 hover:text-roam-sage transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
