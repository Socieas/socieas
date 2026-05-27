"use client";

import Link from "next/link";
import Script from "next/script";
import { useMemo, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import Testimonials from "@/components/Testimonials";

const SITE_URL = "https://socieas.com";
const PAGE_URL = `${SITE_URL}/services/digital-marketing`;

const problemItems = [
  "Low search visibility",
  "Weak audience trust",
  "Disconnected acquisition efforts",
  "Unclear growth attribution",
];

const growthLayers = [
  {
    title: "Search Visibility",
    description:
      "Structured search ecosystems improve discoverability, authority positioning, and long-term inbound growth.",
    points: ["Semantic SEO", "Entity optimization", "Search positioning", "Authority signals"],
  },
  {
    title: "Audience Positioning",
    description:
      "Consistent positioning ecosystems strengthen recognition, familiarity, and audience trust over time.",
    points: ["Brand familiarity", "Content ecosystems", "Trust formation", "Visibility consistency"],
  },
  {
    title: "Performance Systems",
    description:
      "Scalable acquisition infrastructure improves campaign efficiency, conversion quality, and growth consistency.",
    points: ["Campaign scaling", "Audience targeting", "Acquisition systems", "Conversion optimization"],
  },
  {
    title: "Growth Intelligence",
    description:
      "Connected reporting ecosystems improve optimization visibility and stronger strategic decision making.",
    points: ["Attribution tracking", "Performance visibility", "Behavior analytics", "Optimization insights"],
  },
];

const techCategories = [
  {
    title: "Search Ecosystem",
    tools: ["Google Search Console", "Ahrefs", "SEMrush", "Google Analytics"],
  },
  {
    title: "Advertising Infrastructure",
    tools: ["Meta Ads", "Google Ads", "LinkedIn Ads", "YouTube Ads"],
  },
  {
    title: "Automation Systems",
    tools: ["HubSpot", "Zapier", "Notion", "Mailchimp"],
  },
];

const visibilitySystems = [
  "SEO Infrastructure",
  "Search Entity Optimization",
  "AI Search Readiness",
  "Content Distribution",
  "Audience Positioning",
  "Authority Signals",
  "Inbound Acquisition",
  "Conversion Ecosystems",
];

const faqs = [
  {
    q: "Why do businesses struggle with visibility?",
    a: "Most businesses lack connected ecosystems combining search visibility, positioning, content distribution, and authority infrastructure.",
  },
  {
    q: "How does SEO improve long term growth?",
    a: "SEO strengthens discoverability, inbound traffic, authority positioning, and sustainable visibility across search ecosystems.",
  },
  {
    q: "What makes modern marketing effective?",
    a: "Modern growth depends on integrated systems combining search, content, audience positioning, and acquisition infrastructure.",
  },
  {
    q: "Can visibility systems improve conversions?",
    a: "Yes. Stronger positioning, audience trust, and connected acquisition ecosystems improve conversion consistency.",
  },
];

export default function DigitalMarketingPage() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
            { "@type": "ListItem", position: 3, name: "Digital Marketing", item: PAGE_URL },
          ],
        },
        {
          "@type": "Service",
          name: "Digital Marketing Services",
          serviceType:
            "Digital marketing, SEO, content strategy, inbound acquisition, audience positioning, performance marketing",
          description:
            "Socieas builds scalable digital marketing ecosystems combining SEO, content infrastructure, audience positioning, inbound acquisition, search visibility, and authority systems.",
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
            audienceType: "Business owners, founders, growth teams, scaling companies",
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
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
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
        id="digital-marketing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="overflow-x-hidden bg-white text-slate-900">
        <Navbar />

        <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <FadeUp>
              <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                Digital Marketing Services
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                Digital Growth Systems Built for Search Visibility, Trust, and Inbound Scale
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Socieas helps businesses grow through connected digital marketing systems that combine
                search visibility, content ecosystems, audience positioning, acquisition infrastructure,
                and authority signals.
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
                {["SEO", "Audience Positioning", "Inbound Growth", "Authority Systems"].map((item) => (
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
                      Strong brands stay hard to discover because visibility, positioning, and acquisition stay disconnected.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-violet-50 p-5">
                    <p className="text-sm font-medium text-violet-700">After</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      One connected growth ecosystem improves discoverability, audience trust, and inbound momentum.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold text-slate-700">
                      Better visibility
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

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Why Growth Stalls Without Visibility Infrastructure
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Growth slows when discoverability, trust, positioning, and acquisition do not work as one connected system.
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

        <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Search Visibility Systems
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Modern search growth comes from connected systems built around relevance, authority, and trust.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {visibilitySystems.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Our Digital Growth Approach
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                We connect visibility, positioning, acquisition, and intelligence into one scalable marketing ecosystem.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.42fr_1fr]">
              <div className="space-y-3">
                {growthLayers.map((item, index) => (
                  <button
                    key={item.title}
                    onClick={() => setActiveLayer(index)}
                    className={`group relative w-full overflow-hidden rounded-[28px] border p-5 text-left transition-all duration-300 ${
                      activeLayer === index
                        ? "border-violet-300 bg-white shadow-[0_20px_60px_rgba(124,58,237,0.08)]"
                        : "border-slate-200 bg-white hover:border-violet-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-semibold text-slate-950">{item.title}</div>
                      <div
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                          activeLayer === index ? "bg-violet-600 scale-125" : "bg-violet-200"
                        }`}
                      />
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                      {item.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-violet-600">
                      Active Layer
                    </div>
                    <h3 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950">
                      {growthLayers[activeLayer].title}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-violet-600">
                      Growth Active
                    </div>
                    <div className="mt-2 text-lg font-bold text-slate-950">
                      Visibility Connected
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {growthLayers[activeLayer].points.map((point, index) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <div className="text-base font-semibold text-slate-950 md:text-lg">
                          {point}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Content Distribution Compounds Growth Faster
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Search, content, audience discovery, familiarity, and trust must reinforce each other to create durable growth.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  "Content → Search Visibility",
                  "Search → Audience Discovery",
                  "Audience → Familiarity",
                  "Familiarity → Trust Formation",
                  "Trust → Inbound Opportunities",
                ].map((item) => (
                  <div
                    key={item}
                    className="group rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-lg font-semibold text-slate-950">{item}</div>
                      <div className="h-3 w-3 rounded-full bg-violet-600 transition-all duration-300 group-hover:scale-125" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Marketing Technology and Growth Infrastructure
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Scalable growth depends on connected search, advertising, reporting, and automation systems.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {techCategories.map((stack) => (
                <FadeUp key={stack.title}>
                  <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg md:p-8">
                    <div className="text-sm uppercase tracking-[0.22em] text-violet-600">
                      {stack.title}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {stack.tools.map((tool) => (
                        <div
                          key={tool}
                          className="rounded-2xl border border-violet-100 bg-violet-50/70 px-4 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:border-violet-300 hover:bg-violet-100"
                        >
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Growth Outcomes from Connected Marketing Systems
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Stronger visibility ecosystems create more durable discoverability, trust, and inbound growth momentum.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Search Discoverability",
                  desc: "Improved visibility across search ecosystems and inbound discovery channels.",
                },
                {
                  title: "Audience Trust",
                  desc: "Consistent exposure strengthens recognition and long-term familiarity.",
                },
                {
                  title: "Inbound Growth",
                  desc: "Connected acquisition systems improve scalable lead generation.",
                },
                {
                  title: "Authority Positioning",
                  desc: "Visibility ecosystems improve expertise perception and brand credibility.",
                },
              ].map((item) => (
                <FadeUp key={item.title}>
                  <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
                    <div className="text-sm uppercase tracking-[0.2em] text-violet-600">
                      Outcome
                    </div>
                    <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <Testimonials />
        </section>

        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Digital Marketing FAQs
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Clear answers for businesses building long-term visibility and inbound growth systems.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={activeFaq === index}
                    aria-controls={`faq-${index}`}
                  >
                    <span className="text-base font-semibold text-slate-900 md:text-lg">
                      {faq.q}
                    </span>
                    <span className="text-2xl text-slate-400">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {activeFaq === index && (
                    <div id={`faq-${index}`} className="px-6 pb-6 leading-7 text-slate-600">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-[36px] border border-violet-200 bg-[linear-gradient(180deg,#fdfbff_0%,#eef6ff_100%)] p-8 text-center shadow-lg md:p-14">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Build Digital Growth Systems That Create Long-Term Leverage
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Get visibility, positioning, acquisition, and authority systems designed around your market, audience, and growth goals.
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
