import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "App Overview - Roam.io",
  description: "A focused overview page for the Roam.io application experience.",
};

export default function AppOverviewPage() {
  return (
    <main data-header-theme="light" className="min-h-screen bg-roam-cream px-6 pb-24 pt-36 md:px-12 md:pt-44">
      <section className="mx-auto max-w-5xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-roam-sage">
          App Overview
        </p>
        <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-tighter text-roam-ink md:text-7xl">
          The complete product walkthrough is coming next.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-roam-text-muted md:text-xl">
          This route is ready for the full Roam.io app overview: feature detail,
          product screens, how the experience works, and roadmap context. For
          now, the homepage introduces the core exploration story.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex h-14 items-center justify-center rounded-[14px] bg-roam-sage px-7 font-semibold text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-2"
          >
            Back Home
          </Link>
          <a
            href="https://github.com/n8nunes/roamio-landing-page"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-[14px] border border-roam-border-dark bg-roam-inner px-7 font-semibold text-roam-ink transition hover:-translate-y-0.5 hover:border-roam-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-2"
          >
            View Repository
          </a>
        </div>
      </section>
    </main>
  );
}
