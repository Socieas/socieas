import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonLink } from "@/components/lens/ui/button";
import { LENS_BASE } from "@/lib/lens/routes";

export const metadata: Metadata = {
  title: "Socieas Lens | Every metric. One lens.",
  description:
    "Socieas Lens is a growth intelligence platform. Connect every marketing platform once, see every metric in one dashboard, and get plain language explanations of what to do next.",
  openGraph: {
    title: "Socieas Lens | Every metric. One lens.",
    description:
      "One dashboard for all your digital growth. Connect. Analyze. Report. Grow.",
    siteName: "Socieas Lens",
    type: "website",
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

export default function LensLandingPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden pt-24">
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
              Every metric.{" "}
              <span className="gradient-text">One lens.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              One dashboard for all your digital growth. Connect your platforms
              once, see everything that matters, and get plain language answers
              to the only question that counts: what should we do next?
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href={`${LENS_BASE}/dashboard`}>
                Open your dashboard
              </ButtonLink>
              <ButtonLink href="#how" variant="secondary">
                See how it works
              </ButtonLink>
            </div>

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

        <section id="how" className="px-6 pb-24">
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

        <section className="px-6 pb-24">
          <div className="gradient-cta mx-auto max-w-6xl rounded-hero px-8 py-16 text-center text-white md:py-20">
            <h2 className="display mx-auto max-w-2xl text-4xl md:text-5xl">
              Stop reporting. Start understanding.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              The team built Lens so growth decisions take minutes, not
              spreadsheets.
            </p>
            <div className="mt-8">
              <ButtonLink
                href={`${LENS_BASE}/dashboard`}
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
