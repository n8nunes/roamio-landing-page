import { Hero } from "@/components/sections/Hero";
import { Editorial } from "@/components/sections/Editorial";
import { ProductMoment } from "@/components/sections/ProductMoment";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="relative bg-roam-cream min-h-screen selection:bg-roam-sage selection:text-roam-cream">
      <Hero />
      <Editorial />
      <ProductMoment />
      <FinalCTA />
    </main>
  );
}
