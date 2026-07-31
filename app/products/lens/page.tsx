import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonLink } from "@/components/lens/ui/button";
import Link from "next/link";
import { LENS_BASE } from "@/lib/lens/routes";

export const metadata: Metadata = {
  title:
    "Socieas Lens — Marketing Analytics & Client Reporting in One Dashboard",
  description:
    "Socieas Lens unifies Google Analytics 4, Search Console, and social media metrics into one client dashboard. AI-powered insights, branded reports, and AI-search readiness scores for agencies and growing brands.",
  keywords: [
    "marketing analytics dashboard",
    "agency client reporting tool",
    "GA4 dashboard",
    "Google Search Console reports",
    "AI marketing insights",
    "SEO reporting software",
    "client dashboard for agencies",
    "all in one marketing dashboard",
  ],
  alternates: { canonical: "https://socieas.com/products/lens" },
  openGraph: {
    title: "Socieas Lens | Every metric. One lens.",
    description:
      "One dashboard for all your digital growth. Connect. Analyze. Report. Grow.",
    siteName: "Socieas Lens",
    type: "website",
    url: "https://socieas.com/products/lens",
  },
  twitter: {
    card: "summary_large_image",
    title: "Socieas Lens | Every metric. One lens.",
    description:
      "One dashboard for all your digital growth. Connect. Analyze. Report. Grow.",
  },
};

const platforms = [
  "Google Analytics 4",
  "Search Console",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "YouTube",
  "Google Ads",
  "Meta Ads",
];

const steps = [
  {
    step: "01",
    title: "Add a client workspace",
    body: "Each client gets an isolated workspace with its own connections, branding, and reports. Your data never mixes.",
  },
  {
    step: "02",
    title: "Connect platforms once",
    body: "Secure one-click Google sign-in for Analytics and Search Console. Tokens are encrypted, and Lens syncs daily on its own.",
  },
  {
    step: "03",
    title: "See answers, not just charts",
    body: "Dashboards update automatically and AI insights explain what changed, why it changed, and what to do next.",
  },
];

const pillars = [
  {
    title: "One dashboard",
    body: "Every channel, every metric, one clean view. No more seven logins before your morning coffee.",
  },
  {
    title: "Insights that explain",
    body: "The numbers moved. Lens tells you why, with evidence, and what the team should do next.",
  },
  {
    title: "Reports clients love",
    body: "One click branded reports with an AI summary your clients actually read.",
  },
  {
    title: "Ready for AI search",
    body: "SGE, GEO, and AEO readiness scores with the exact fixes, not vanity numbers.",
  },
];

const faqs = [
  {
    q: "What is Socieas Lens?",
    a: "Socieas Lens is a growth intelligence platform that unifies marketing analytics from Google Analytics 4, Google Search Console, and social platforms into one dashboard, with AI-generated insights and branded client reports.",
  },
  {
    q: "Who is Socieas Lens for?",
    a: "Marketing agencies, freelancers, and in-house teams that manage one or more brands and want a single source of truth for web, search, and social performance.",
  },
  {
    q: "Which platforms does Socieas Lens connect to?",
    a: "Google Analytics 4 and Google Search Console are available today. Instagram, Facebook, LinkedIn, YouTube, Google Ads, and Meta Ads are rolling out next.",
  },
  {
    q: "Is my data safe with Socieas Lens?",
    a: "Yes. Connections use official OAuth sign-in, access tokens are encrypted at rest, and every client workspace is isolated with row-level security.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function LensLandingPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="overflow-x-hidden pt-24">
        {/* Hero */}
        <section className="relative px-6 pb-20 pt-8 text-center md:pt-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
            <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-fuchsia-100/40 blur-[140px]" />
          </div>

          <div className="relative mx-auto max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2 text-sm font-semibold text-brand shadow-card">
              Free while in beta
            </span>
            <h1 className="display mx-auto mt-6 max-w-3xl text-5xl md:text-7xl">
              Every metric. <span className="gradient-text">One lens.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              The marketing analytics dashboard that turns GA4, Search Console,
              and social data into plain-language answers to the only question
              that counts: what should we do next?
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href={`${LENS_BASE}/signup`}>
                Start free
              </ButtonLink>
              <ButtonLink href="#how" variant="secondary">
                See how it works
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-muted">
              Already using Lens?{" "}
              <Link
                href={`${LENS_BASE}/login`}
                className="font-semibold text-brand hover:underline"
              >
                Log in
              </Link>
            </p>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
              {platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-muted"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="display text-center text-3xl md:text-4xl">
              From scattered logins to one source of truth
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
              Set up a client in minutes. Lens does the syncing, the math, and
              the explaining.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="rounded-card border border-line bg-surface p-8 shadow-card transition hover:shadow-glow"
                >
                  <span className="text-sm font-black text-brand">{s.step}</span>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-card border border-line bg-surface p-8 shadow-card transition hover:shadow-glow"
              >
                <h2 className="text-xl font-bold tracking-tight">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="display text-center text-3xl md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-10 flex flex-col gap-4">
              {faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-card border border-line bg-surface p-6 shadow-card"
                >
                  <h3 className="text-lg font-bold tracking-tight">{f.q}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="gradient-cta mx-auto max-w-6xl rounded-hero px-8 py-16 text-center text-white md:py-20">
            <h2 className="display mx-auto max-w-2xl text-4xl md:text-5xl">
              Stop reporting. Start understanding.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              We built Lens so growth decisions take minutes, not spreadsheets.
            </p>
            <div className="mt-8">
              <ButtonLink
                href={`${LENS_BASE}/signup`}
                variant="secondary"
                className="border-0"
              >
                Get started free
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}