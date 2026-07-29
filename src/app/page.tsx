import CustomCursor from "@/components/ui/CustomCursor";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Editorial } from "@/components/sections/Editorial";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { About } from "@/components/sections/About";
import { Roadmap } from "@/components/sections/Roadmap";
import { Team } from "@/components/sections/Team";
import { RepositoryCTA } from "@/components/sections/RepositoryCTA";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main className="relative bg-roam-cream min-h-screen selection:bg-roam-sage selection:text-roam-cream">
        <Hero />
        <Editorial />
        <HowItWorks />
        <Features />
        <About />
        <Roadmap />
        <Team />
        <RepositoryCTA />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
