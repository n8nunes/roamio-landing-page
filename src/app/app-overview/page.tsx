import type { Metadata } from "next";
import { AppOverviewExperience } from "@/components/app-overview/AppOverviewExperience";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "App Overview - Roam.io",
  description: "A focused overview page for the Roam.io application experience.",
};

export default function AppOverviewPage() {
  return (
    <main data-header-theme="light" className="min-h-screen bg-roam-cream selection:bg-roam-sage selection:text-roam-cream">
      <AppOverviewExperience />
      <FinalCTA />
    </main>
  );
}
