"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import Testimonials from "@/components/Testimonials";

const SITE_URL = "https://socieas.com";
const PAGE_URL = `${SITE_URL}/services/personal-branding`;

const problemItems = [
  "Strong expertise, weak visibility",
  "Profiles that do not build trust fast",
  "Inconsistent founder messaging",
  "Content without authority positioning",
];

const platformTabs = [
  {
    title: "LinkedIn",
    desc: "The strongest platform for founder credibility, authority, and trust-led professional visibility.",
    items: ["Profile positioning", "Authority content", "Thought leadership", "Inbound trust"],
  },
  {
    title: "Instagram",
    desc: "A visual layer that adds familiarity, personality, and stronger audience connection when relevant.",
    items: ["Visual identity", "Founder storytelling", "Audience familiarity", "Brand recall"],
  },
  {
    title: "Content System",
    desc: "A repeatable visibility engine that turns founder ideas into consistent and strategic content output.",
    items: ["Content repurposing", "Narrative consistency", "Content themes", "Publishing structure"],
  },
];

const processSteps = [
  {
    no: "01",
    title: "Position",
    desc: "Clarify founder narrative, expertise angle, audience signals, and trust-building message.",
  },
  {
    no: "02",
    title: "Systemize",
    desc: "Build profile structure, content themes, platform consistency, and visibility workflows.",
  },
  {
    no: "03",
    title: "Compound",
    desc: "Grow recognition, authority, referrals, and inbound trust through repeated visibility.",
  },
];

const capabilities = [
  "Founder positioning",
  "LinkedIn personal branding",
  "Thought leadership content",
  "Instagram founder visibility",
  "Content repurposing systems",
  "Narrative strategy",
  "Audience research",
  "Authority content planning",
];

const faqs = [
  {
    question: "Why is personal branding important for founders?",
    answer:
      "Personal branding helps founders build visibility, trust, and familiarity. Potential clients, partners, hires, and referrals often evaluate the founder before they evaluate the business in depth.",
  },
  {
    question: "How long does founder branding take to show results?",
    answer:
      "Founder branding usually works through consistency rather than one viral moment. Many founders start noticing stronger profile perception, audience recognition, and trust signals within the first few months.",
  },
  {
    question: "Which platform is best for founder personal branding?",
    answer:
      "LinkedIn is usually the strongest platform for founder authority and professional trust. Instagram can support familiarity and visual storytelling when it fits the founder’s audience and business context.",
  },
  {
    question: "Can personal branding help generate leads?",
    answer:
      "Yes. Strong founder visibility can improve trust before a sales conversation, which supports warmer inbound opportunities, stronger referrals, and better-quality business interactions.",
  },
];

export default function PersonalBrandingPage() {
  const [activePlatform, setActivePlatform] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: `${SITE_URL}/services`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Personal Branding",
              item: PAGE_URL,
            },
          ],
        },
        {
          "@type": "Service",
          name: "Personal Branding Services for Founders",
          serviceType:
            "Founder personal branding, LinkedIn positioning, thought leadership, visibility strategy",
          description:
            "Socieas helps founders build visibility, authority, and trust through personal branding, LinkedIn positioning, thought leadership, and content systems.",
          provider: {
            "@type": "Organization",
            name: "Socieas",
            url: SITE_URL,
          },
          areaServed: [
            "India",
            "United States",
            "United Kingdom",
            "United Arab Emirates",
            "Australia",
          ],
          audience: {
            "@type": "Audience",
            audienceType: "Founders, entrepreneurs, business owners, startup leaders",
          },
          url: PAGE_URL,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/contact`,
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      ],
    }),
    []
  );

  return (
    <>
      <Script
        id="personal-branding-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="overflow-x-hidden bg-white text-slate-900">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <FadeUp>
              <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                Personal Branding Services
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                Personal Branding for Founders Who Want Trust, Visibility, and Real Authority
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Socieas helps founders build stronger digital authority through personal branding,
                LinkedIn positioning, founder storytelling, and content systems that compound over time.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-800"
                >
                  Contact
                </Link>
                <Link
                  href="/insights"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Insights
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {["LinkedIn Authority", "Thought Leadership", "Founder Positioning", "Content Systems"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-600 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FadeUp>

            <FadeUp>
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:p-8">
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">Before</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      Strong expertise exists, but the founder is still hard to understand, trust, or remember online.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-violet-50 p-5">
                    <p className="text-sm font-medium text-violet-700">After</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      A visible founder presence that builds familiarity, credibility, and authority across touchpoints.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold text-slate-700">
                      Better recall
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold text-slate-700">
                      Stronger trust
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* PROBLEM STRIP */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Why Strong Founders Still Get Overlooked
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Founder authority often gets lost when visibility, message consistency, and trust signals are weak.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {problemItems.map((item) => (
                <div
                  key={item}
                  className="group rounded-[24px] border border-slate-200 bg-white px-5 py-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                      <span className="text-base font-bold">!</span>
                    </div>
                    <p className="text-base font-semibold text-slate-900">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION PANEL */}
        <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Our Founder Branding Approach
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                We turn scattered founder presence into a clear authority system that builds trust over time.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-[32px] border border-rose-200 bg-white p-7 shadow-sm md:p-8">
                <div className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                  Before
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Generic profiles and bios",
                    "Random posting without narrative",
                    "Low familiarity with the founder",
                    "Trust built too slowly",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[32px] border border-violet-200 bg-white p-7 shadow-lg md:p-8">
                <div className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                  After
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Clear founder positioning",
                    "Consistent thought leadership",
                    "Stronger audience familiarity",
                    "Trust that compounds over time",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm font-medium text-slate-800"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 3-STEP PROCESS */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                How Socieas Builds Founder Visibility
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                A focused process that moves from positioning to content systems to long-term authority.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {processSteps.map((step) => (
                <article
                  key={step.no}
                  className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-violet-700">{step.no}</span>
                    <div className="h-2 w-20 rounded-full bg-slate-100">
                      <div className="h-2 w-12 rounded-full bg-violet-500 transition-all duration-500 group-hover:w-20" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PLATFORM SYSTEM */}
        <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Founder Visibility Across the Right Platforms
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Personal branding works best as a connected system instead of isolated posting on one platform.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {platformTabs.map((platform, index) => (
                <button
                  key={platform.title}
                  onClick={() => setActivePlatform(index)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    activePlatform === index
                      ? "bg-slate-950 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {platform.title}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-2xl font-bold text-slate-950">
                {platformTabs[activePlatform].title}
              </h3>
              <p className="mt-2 max-w-3xl text-slate-600">
                {platformTabs[activePlatform].desc}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {platformTabs[activePlatform].items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center font-medium text-slate-800 transition hover:-translate-y-0.5 hover:bg-violet-50"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Personal Branding Needs Systems, Not Random Posting
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Founder branding becomes stronger when visibility is supported by structure, clarity, and platform consistency.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {capabilities.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="text-base font-semibold md:text-lg">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-12 md:py-16">
          <Testimonials />
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <FadeUp>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Personal Branding FAQs
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Clear answers for founders evaluating personal branding support.
                </p>
              </div>
            </FadeUp>

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={activeFaq === index}
                    aria-controls={`faq-${index}`}
                  >
                    <span className="text-base font-semibold text-slate-900 md:text-lg">
                      {faq.question}
                    </span>
                    <span className="text-2xl text-slate-400">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {activeFaq === index && (
                    <div id={`faq-${index}`} className="px-6 pb-6 leading-7 text-slate-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Explore More from Socieas
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Keep visitors moving with direct paths to contact, services, and insights.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Contact",
                  desc: "Talk to Socieas about founder branding, visibility strategy, and content systems.",
                  href: "/contact",
                },
                {
                  title: "Services",
                  desc: "Explore broader service capabilities across branding, CRM, automation, and growth.",
                  href: "/services",
                },
                {
                  title: "Insights",
                  desc: "Read practical content on visibility, authority, and business growth.",
                  href: "/insights",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[28px] border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-violet-700 transition group-hover:translate-x-1">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-[36px] border border-violet-200 bg-[linear-gradient(180deg,#fdfbff_0%,#eef6ff_100%)] p-8 text-center shadow-lg md:p-14">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Build a Founder Brand People Trust Before the First Conversation
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Get personal branding support built around your positioning, content systems, and long-term authority.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-800"
                >
                  Contact
                </Link>
                <Link
                  href="/insights"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Insights
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}