import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Team - Roam.io",
  description: "A focused page for the Roam.io team and project background.",
};

export default function AboutTheTeamPage() {
  return (
    <main data-header-theme="light" className="min-h-screen bg-roam-cream px-6 pb-24 pt-36 md:px-12 md:pt-44">
      <section className="mx-auto max-w-5xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-roam-sage">
          About the Team
        </p>
        <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-tighter text-roam-ink md:text-7xl">
          The team story has its own route now.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-roam-text-muted md:text-xl">
          This page is reserved for the team introduction, verified roles,
          project background, and supporting material. It is intentionally
          minimal until that content is ready.
        </p>
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex h-14 items-center justify-center rounded-[14px] bg-roam-sage px-7 font-semibold text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-2"
          >
            Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}
