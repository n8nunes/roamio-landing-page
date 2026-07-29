"use client";

import Link from "next/link";
import { Apple, GitBranch, Play } from "lucide-react";

const repositoryUrl = "https://github.com/n8nunes/roamio-landing-page";

export function Footer() {
  return (
    <footer data-header-theme="dark" className="w-full border-t border-white/5 bg-roam-ink px-6 py-14 text-roam-cream md:px-12 md:py-18">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="text-3xl font-bold tracking-tighter text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-dark-sage focus-visible:ring-offset-4 focus-visible:ring-offset-roam-ink"
          >
            Roam.io
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-roam-cream/55">
            Roam.io is designed for personal exploration and is not a navigation
            or emergency-response service. Stay aware of your surroundings and
            follow local access rules.
          </p>
          <p className="mt-8 text-xs text-roam-cream/30">
            &copy; 2026 Monash University, r/Kuang.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-roam-cream/45">
            Pages
          </h2>
          <div className="flex flex-col items-start gap-3">
            <Link className="footer-link" href="/">
              Home
            </Link>
            <Link className="footer-link" href="/app-overview">
              App Overview
            </Link>
            <Link className="footer-link" href="/about-the-team">
              About the Team
            </Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-roam-cream/45">
            Project
          </h2>
          <div className="flex flex-col items-start gap-3">
            <a
              className="footer-link inline-flex items-center gap-2"
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="View Roam.io repository"
            >
              <GitBranch aria-hidden="true" className="h-4 w-4" />
              Repository
            </a>
            <span
              className="inline-flex items-center gap-2 text-sm text-roam-cream/38"
              aria-label="Apple App Store coming soon"
              title="Apple App Store coming soon"
            >
              <Apple aria-hidden="true" className="h-4 w-4" />
              App Store Coming Soon
            </span>
            <span
              className="inline-flex items-center gap-2 text-sm text-roam-cream/38"
              aria-label="Google Play coming soon"
              title="Google Play coming soon"
            >
              <Play aria-hidden="true" className="h-4 w-4" />
              Google Play Coming Soon
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
