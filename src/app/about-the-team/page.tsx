import type { Metadata } from "next";
import { TeamClient } from "./TeamClient";

export const metadata: Metadata = {
  title: "About the Team - Roam.io",
  description: "Meet the multidisciplinary team building Roam.io.",
};

export default function AboutTheTeamPage() {
  return <TeamClient />;
}
