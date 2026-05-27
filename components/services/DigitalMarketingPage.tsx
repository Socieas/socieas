"use client";

import Link from "next/link";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import Testimonials from "@/components/Testimonials";

const serviceSchema = {
  "@context": "https://schema.org",

  "@type": "Service",

  serviceType:
    "Digital Marketing Services",

  provider: {
    "@type":
      "Organization",

    name:
      "Socieas",

    url:
      "https://socieas.com",
  },

  areaServed:
    "Worldwide",

  description:
    "Socieas builds scalable digital marketing ecosystems combining SEO, content infrastructure, audience positioning, inbound acquisition, search visibility, and authority systems.",

  url:
    "https://socieas.com/services/digital-marketing",
};

export default function DigitalMarketingPage() {

  const [activeLayer, setActiveLayer] =
    useState(0);

  const ecosystems = [
    {
      title:
        "Search Visibility",

      description:
        "Structured search ecosystems improve discoverability, authority positioning, and long term inbound growth.",

      points: [
        "Semantic SEO",
        "Entity optimization",
        "Search positioning",
        "Authority signals",
      ],
    },

    {
      title:
        "Audience Positioning",

      description:
        "Consistent positioning ecosystems strengthen recognition, familiarity, and audience trust.",

      points: [
        "Brand familiarity",
        "Content ecosystems",
        "Trust formation",
        "Visibility consistency",
      ],
    },

    {
      title:
        "Performance Systems",

      description:
        "Scalable acquisition infrastructure improves campaign efficiency and growth consistency.",

      points: [
        "Campaign scaling",
        "Audience targeting",
        "Acquisition systems",
        "Conversion optimization",
      ],
    },

    {
      title:
        "Growth Intelligence",

      description:
        "Connected reporting ecosystems improve optimization visibility and strategic decision making.",

      points: [
        "Attribution tracking",
        "Performance visibility",
        "Behavior analytics",
        "Optimization insights",
      ],
    },
  ];

  const technologyStacks = [
    {
      category:
        "Search Ecosystem",

      tools: [
        "Google Search Console",
        "Ahrefs",
        "SEMrush",
        "Google Analytics",
      ],
    },

    {
      category:
        "Advertising Infrastructure",

      tools: [
        "Meta Ads",
        "Google Ads",
        "LinkedIn Ads",
        "YouTube Ads",
      ],
    },

    {
      category:
        "Automation Systems",

      tools: [
        "HubSpot",
        "Zapier",
        "Notion",
        "Mailchimp",
      ],
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

  return (

    <>
    
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              serviceSchema
            ),
        }}
      />

      <main className="overflow-x-hidden bg-white text-[var(--text)]">

        <Navbar />

        {/* HERO */}

        <section className="relative overflow-hidden bg-white pt-24 pb-14 md:pt-32 md:pb-20">

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(139,92,246,0.05),transparent_30%)]" />

          <div className="absolute right-[-100px] top-[10%] h-[320px] w-[320px] rounded-full bg-violet-100/60 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.92fr]">

            {/* LEFT */}

            <FadeUp>

              <div className="max-w-5xl">

                <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-700 md:text-sm">

                  Digital Growth Infrastructure

                </div>

                <h1 className="mt-6 text-4xl font-black leading-[0.92] tracking-[-0.06em] text-[#111111] sm:text-6xl xl:text-7xl">

                  Strong brands
                  become invisible
                  without visibility
                  ecosystems.

                </h1>

                <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">

                  Modern growth depends on connected systems combining search visibility, audience positioning, acquisition infrastructure, content ecosystems, and authority signals.

                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <Link
                    href="/contact"
                    className="rounded-2xl bg-violet-600 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 md:text-base"
                  >

                    Build Growth Systems

                  </Link>

                  <Link
                    href="/insights/articles"
                    className="rounded-2xl border border-violet-100 bg-white px-7 py-4 text-sm font-medium transition-all duration-300 hover:bg-violet-50 md:text-base"
                  >

                    Explore Marketing Insights

                  </Link>

                </div>

              </div>

            </FadeUp>

            {/* RIGHT */}

            <FadeUp>

              <div className="relative mx-auto w-full max-w-[540px]">

                <div className="relative overflow-hidden rounded-[36px] border border-violet-100 bg-white p-6 shadow-[0_25px_80px_rgba(124,58,237,0.08)] md:p-8">

                  <div className="absolute right-[-50px] top-[-50px] h-[220px] w-[220px] rounded-full bg-violet-100/70 blur-3xl" />

                  <div className="relative">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] md:text-sm">

                          Visibility Ecosystem

                        </div>

                        <div className="mt-2 text-5xl font-black tracking-[-0.05em] text-[#111111]">

                          +360%

                        </div>

                      </div>

                      <div className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700 md:text-sm">

                        Visibility Active

                      </div>

                    </div>

                    <div className="mt-8 space-y-4">

                      {[
                        "Search Visibility",
                        "Audience Trust",
                        "Authority Positioning",
                        "Inbound Acquisition",
                      ].map((item, index) => (

                        <div
                          key={index}
                          className="group flex items-center justify-between rounded-2xl border border-violet-100 bg-[var(--soft-surface)] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50"
                        >

                          <div className="text-sm font-medium md:text-base">

                            {item}

                          </div>

                          <div className="h-3 w-3 rounded-full bg-violet-600 transition-all duration-300 group-hover:scale-125" />

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            </FadeUp>

          </div>

        </section>

        {/* SEARCH VISIBILITY */}

        <section className="py-14 md:py-20">

          <div className="mx-auto max-w-7xl px-6">

            <FadeUp>

              <div className="max-w-5xl">

                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                  Search Visibility Ecosystem

                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                  Modern search
                  rewards authority,
                  relevance, and trust.

                </h2>

              </div>

            </FadeUp>

            <div className="mt-12 flex flex-wrap gap-4">

              {visibilitySystems.map((item, index) => (

                <div
                  key={index}
                  className="group rounded-2xl border border-violet-100 bg-white px-5 py-4 shadow-[0_15px_40px_rgba(124,58,237,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50"
                >

                  <div className="flex items-center gap-3">

                    <div className="h-3 w-3 rounded-full bg-violet-600" />

                    <div className="text-sm font-semibold text-[#111111] md:text-base">

                      {item}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* GROWTH ECOSYSTEM */}

        <section className="bg-[var(--soft-surface)] py-14 md:py-20">

          <div className="mx-auto max-w-7xl px-6">

            <FadeUp>

              <div className="text-center">

                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                  Growth Infrastructure

                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                  Connected visibility
                  systems create
                  scalable growth.

                </h2>

              </div>

            </FadeUp>
                        <div className="mt-14 grid gap-6 lg:grid-cols-[0.42fr_1fr]">

              {/* LEFT */}

              <div className="space-y-3">

                {ecosystems.map((item, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setActiveLayer(index)
                    }
                    className={`group relative w-full overflow-hidden rounded-[28px] border p-5 text-left transition-all duration-300 ${
                      activeLayer === index
                        ? "border-violet-300 bg-white shadow-[0_20px_60px_rgba(124,58,237,0.08)]"
                        : "border-violet-100 bg-white hover:border-violet-200"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <div className="text-xl font-semibold text-[#111111]">

                        {item.title}

                      </div>

                      <div className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        activeLayer === index
                          ? "bg-violet-600 scale-125"
                          : "bg-violet-200"
                      }`} />

                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">

                      {item.description}

                    </p>

                  </button>

                ))}

              </div>

              {/* RIGHT */}

              <div className="rounded-[34px] border border-violet-100 bg-white p-6 shadow-[0_25px_80px_rgba(124,58,237,0.08)] md:p-8">

                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                  <div>

                    <div className="text-sm uppercase tracking-[0.2em] text-violet-600">

                      Active Layer

                    </div>

                    <h3 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-[#111111]">

                      {ecosystems[activeLayer].title}

                    </h3>

                  </div>

                  <div className="rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4">

                    <div className="text-xs uppercase tracking-[0.16em] text-violet-600">

                      Growth Active

                    </div>

                    <div className="mt-2 text-lg font-bold text-[#111111]">

                      Visibility Connected

                    </div>

                  </div>

                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">

                  {ecosystems[activeLayer].points.map((point, index) => (

                    <div
                      key={index}
                      className="group rounded-2xl border border-violet-100 bg-violet-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50"
                    >

                      <div className="flex items-start gap-4">

                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">

                          {index + 1}

                        </div>

                        <div className="text-base font-semibold text-[#111111] md:text-lg">

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

        {/* CONTENT DISTRIBUTION */}

        <section className="py-14 md:py-20">

          <div className="mx-auto max-w-7xl px-6">

            <FadeUp>

              <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">

                <div>

                  <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                    Content Distribution Ecosystem

                  </div>

                  <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                    Visibility compounds
                    faster when content
                    ecosystems connect.

                  </h2>

                  <p className="mt-5 text-base leading-relaxed text-[var(--muted)] md:text-lg">

                    Modern growth depends on connected distribution systems combining search, social visibility, authority positioning, and inbound audience ecosystems.

                  </p>

                </div>

                <div className="grid gap-4">

                  {[
                    "Content → Search Visibility",
                    "Search → Audience Discovery",
                    "Audience → Familiarity",
                    "Familiarity → Trust Formation",
                    "Trust → Inbound Opportunities",
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="group rounded-[28px] border border-violet-100 bg-white px-6 py-5 shadow-[0_18px_50px_rgba(124,58,237,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300"
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div className="text-lg font-semibold text-[#111111]">

                          {item}

                        </div>

                        <div className="h-3 w-3 rounded-full bg-violet-600 transition-all duration-300 group-hover:scale-125" />

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </FadeUp>

          </div>

        </section>

        {/* TECH STACK */}

        <section className="bg-[var(--soft-surface)] py-14 md:py-20">

          <div className="mx-auto max-w-7xl px-6">

            <FadeUp>

              <div className="max-w-5xl">

                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                  Technology Infrastructure

                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                  Scalable growth
                  depends on connected
                  marketing ecosystems.

                </h2>

              </div>

            </FadeUp>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">

              {technologyStacks.map((stack, index) => (

                <FadeUp key={index}>

                  <div className="relative overflow-hidden rounded-[30px] border border-violet-100 bg-white p-6 shadow-[0_20px_70px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 md:p-8">

                    <div className="absolute right-[-50px] top-[-50px] h-[180px] w-[180px] rounded-full bg-violet-100/50 blur-3xl" />

                    <div className="relative">

                      <div className="text-sm uppercase tracking-[0.22em] text-violet-600">

                        {stack.category}

                      </div>

                      <div className="mt-8 flex flex-wrap gap-3">

                        {stack.tools.map((tool, toolIndex) => (

                          <div
                            key={toolIndex}
                            className="rounded-2xl border border-violet-100 bg-violet-50/70 px-4 py-3 text-sm font-semibold text-[#111111] transition-all duration-300 hover:border-violet-300 hover:bg-violet-100"
                          >

                            {tool}

                          </div>

                        ))}

                      </div>

                    </div>

                  </div>

                </FadeUp>

              ))}

            </div>

          </div>

        </section>

        {/* OUTCOMES */}

        <section className="py-14 md:py-20">

          <div className="mx-auto max-w-7xl px-6">

            <FadeUp>

              <div className="text-center">

                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                  Growth Outcomes

                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                  Structured visibility
                  ecosystems create
                  scalable growth momentum.

                </h2>

              </div>

            </FadeUp>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {[
                {
                  title:
                    "Search Discoverability",

                  desc:
                    "Improved visibility across search ecosystems and inbound discovery channels.",
                },

                {
                  title:
                    "Audience Trust",

                  desc:
                    "Consistent exposure strengthens recognition and long term familiarity.",
                },

                {
                  title:
                    "Inbound Growth",

                  desc:
                    "Connected acquisition systems improve scalable lead generation.",
                },

                {
                  title:
                    "Authority Positioning",

                  desc:
                    "Visibility ecosystems improve expertise perception and brand credibility.",
                },
              ].map((item, index) => (

                <FadeUp key={index}>

                  <div className="group rounded-[30px] border border-violet-100 bg-white p-6 shadow-[0_20px_60px_rgba(124,58,237,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300">

                    <div className="text-sm uppercase tracking-[0.2em] text-violet-600">

                      Outcome

                    </div>

                    <h3 className="mt-5 text-2xl font-bold leading-tight text-[#111111]">

                      {item.title}

                    </h3>

                    <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">

                      {item.desc}

                    </p>

                  </div>

                </FadeUp>

              ))}

            </div>

          </div>

        </section>

        {/* TESTIMONIALS */}

        <section className="bg-[var(--soft-surface)] py-14 md:py-20">

          <Testimonials />

        </section>

        {/* FAQ */}

        <section className="py-14 md:py-20">

          <div className="mx-auto max-w-5xl px-6">

            <FadeUp>

              <div className="text-center">

                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                  Frequently Asked Questions

                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                  Common questions
                  about digital
                  growth ecosystems.

                </h2>

              </div>

            </FadeUp>

            <div className="mt-10 space-y-4">

              {[
                {
                  question:
                    "Why do businesses struggle with visibility?",

                  answer:
                    "Most businesses lack connected ecosystems combining search visibility, positioning, content distribution, and authority infrastructure.",
                },

                {
                  question:
                    "How does SEO improve long term growth?",

                  answer:
                    "SEO strengthens discoverability, inbound traffic, authority positioning, and sustainable visibility across search ecosystems.",
                },

                {
                  question:
                    "What makes modern marketing effective?",

                  answer:
                    "Modern growth depends on integrated systems combining search, content, audience positioning, and acquisition infrastructure.",
                },

                {
                  question:
                    "Can visibility systems improve conversions?",

                  answer:
                    "Yes. Stronger positioning, audience trust, and connected acquisition ecosystems improve conversion consistency.",
                },
              ].map((faq, index) => (

                <div
                  key={index}
                  className="rounded-[28px] border border-violet-100 bg-white p-6 shadow-[0_20px_60px_rgba(124,58,237,0.04)] md:p-8"
                >

                  <h3 className="text-xl font-semibold md:text-2xl">

                    {faq.question}

                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[var(--muted)] md:text-lg">

                    {faq.answer}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="pb-14 pt-4 md:pb-20">

          <div className="mx-auto max-w-5xl px-6 text-center">

            <FadeUp>

              <div className="relative overflow-hidden rounded-[36px] border border-violet-100 bg-white px-6 py-10 shadow-[0_25px_80px_rgba(124,58,237,0.08)] md:px-10 md:py-14">

                <div className="absolute right-[-60px] top-[-60px] h-[220px] w-[220px] rounded-full bg-violet-100/60 blur-3xl" />

                <div className="relative">

                  <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                    Growth Infrastructure

                  </div>

                  <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                    Scalable visibility
                    systems create
                    long term leverage.

                  </h2>

                  <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">

                    Strong digital ecosystems improve discoverability, audience trust, authority positioning, and inbound acquisition consistency.

                  </p>

                  <Link
                    href="/contact"
                    className="mt-8 inline-flex rounded-2xl bg-violet-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700"
                  >

                    Build Visibility Systems

                  </Link>

                </div>

              </div>

            </FadeUp>

          </div>

        </section>

        <Footer />

      </main>

    </>

  );
}