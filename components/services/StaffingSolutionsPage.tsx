"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import Testimonials from "@/components/Testimonials";

export default function PersonalBrandingPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeHiringSlide, setActiveHiringSlide] = useState(0);

  const ecosystem = [
    {
      title: "LinkedIn Authority",
      description:
        "Professional visibility designed to position founders as credible industry voices instead of overlooked operators.",
      content: [
        "Thought leadership systems",
        "Founder positioning",
        "Authority storytelling",
        "Inbound trust architecture",
      ],
    },
    {
      title: "Instagram Positioning",
      description:
        "Audience familiarity built through visual storytelling and consistent founder visibility.",
      content: [
        "Visual storytelling",
        "Audience familiarity",
        "Founder lifestyle narrative",
        "Trust psychology",
      ],
    },
    {
      title: "Content Infrastructure",
      description:
        "Structured content systems designed to create strategic visibility across multiple digital touchpoints.",
      content: [
        "Content repurposing",
        "Strategic hooks",
        "Attention systems",
        "Platform consistency",
      ],
    },
    {
      title: "Authority Compounding",
      description:
        "Long-term visibility systems that compound trust, opportunities, credibility, and recognition.",
      content: [
        "Audience recognition",
        "Founder credibility",
        "Partnership trust",
        "Inbound opportunities",
      ],
    },
  ];

  const hiringSlides = [
    {
      eyebrow: "Candidate Intake",
      title: "Every strong hiring system starts with structured intake.",
      description:
        "Before sourcing begins, define role clarity, candidate criteria, hiring priorities, and process ownership so every later step feels aligned instead of reactive.",
      points: [
        "Role scorecards",
        "Hiring briefs",
        "Decision clarity",
        "Process alignment",
      ],
    },
    {
      eyebrow: "Pipeline Flow",
      title: "A clean pipeline makes hiring easier to manage and improve.",
      description:
        "When applicants move through clear stages, your team can reduce delays, avoid confusion, and understand where conversion begins to drop.",
      points: [
        "Stage visibility",
        "Pipeline tracking",
        "Drop-off review",
        "Faster movement",
      ],
    },
    {
      eyebrow: "Interview Ops",
      title: "Interviewing should feel consistent, not improvised.",
      description:
        "A repeatable interview structure helps teams evaluate candidates fairly, compare feedback properly, and reduce random decision-making.",
      points: [
        "Structured interviews",
        "Feedback capture",
        "Evaluation consistency",
        "Team coordination",
      ],
    },
    {
      eyebrow: "Hiring Signals",
      title: "Better operations create better hiring decisions.",
      description:
        "Good systems reveal the signals that matter most, from response rates and speed to quality indicators and final hiring confidence.",
      points: [
        "Response quality",
        "Decision confidence",
        "Process speed",
        "Hiring insights",
      ],
    },
  ];

  const techStack = [
    "LinkedIn Positioning",
    "Instagram Growth Systems",
    "Content Repurposing",
    "SEO Content Structuring",
    "AI Content Assistance",
    "Audience Research",
    "Analytics Infrastructure",
    "Founder Narrative Systems",
  ];

  const faqs = [
    {
      question: "Why is personal branding important for founders?",
      answer:
        "Personal branding increases visibility, trust, credibility, and audience familiarity. Modern buyers often research founders online before making decisions.",
    },
    {
      question: "How long does personal branding take to show results?",
      answer:
        "Consistency compounds over time. Most founders begin noticing audience recognition and engagement improvements within the first few months.",
    },
    {
      question: "Which platforms are best for founder personal branding?",
      answer:
        "LinkedIn builds professional authority while Instagram strengthens familiarity and audience connection through visual storytelling.",
    },
    {
      question: "Does personal branding help generate leads?",
      answer:
        "Strong visibility improves trust and increases inbound opportunities, partnerships, referrals, and audience engagement naturally.",
    },
  ];

  const nextHiringSlide = () => {
    setActiveHiringSlide((prev) => (prev + 1) % hiringSlides.length);
  };

  const prevHiringSlide = () => {
    setActiveHiringSlide(
      (prev) => (prev - 1 + hiringSlides.length) % hiringSlides.length
    );
  };

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Personal Branding for Founders",
          serviceType: "Founder personal branding and visibility strategy",
          description:
            "Personal branding services for founders focused on authority building, visibility, trust, content systems, and inbound credibility.",
          provider: {
            "@type": "Organization",
            name: "Socieas",
            url: "https://example.com",
          },
          url: "https://example.com/personal-branding",
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
    [faqs]
  );

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="overflow-x-hidden bg-white text-[var(--text)]">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden bg-white pt-28 pb-12 md:pt-34 md:pb-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(139,92,246,0.04),transparent_28%)]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-[1fr_0.88fr] lg:gap-10">
            <FadeUp>
              <div className="max-w-4xl">
                <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700 md:text-sm">
                  Founder Visibility Infrastructure
                </div>

                <h1 className="mt-6 text-[56px] font-black leading-[0.92] tracking-[-0.06em] text-[#111111] sm:text-6xl xl:text-7xl">
                  Personal Branding
                  <br />
                  for Founders
                  <br />
                  Who Want Real
                  <br />
                  Authority
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  Exceptional founders stay overlooked because the internet
                  rewards familiarity before expertise.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  Visibility changes how people perceive trust, credibility, and
                  authority.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 md:px-7 md:py-4 md:text-base"
                  >
                    Build Your Personal Brand
                  </Link>

                  <Link
                    href="/insights/articles"
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-[var(--soft-surface)] md:px-7 md:py-4 md:text-base"
                  >
                    Explore Visibility Systems
                  </Link>
                </div>
              </div>
            </FadeUp>

            <FadeUp>
              <div className="relative mx-auto w-full max-w-[480px]">
                <div className="relative overflow-hidden rounded-[28px] border border-violet-100 bg-white p-5 shadow-[0_20px_60px_rgba(124,58,237,0.08)] md:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)] md:text-sm">
                        Founder Visibility Growth
                      </div>

                      <div className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#111111] md:text-5xl">
                        +312%
                      </div>
                    </div>

                    <div className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700 md:px-4 md:py-2 md:text-sm">
                      Authority
                    </div>
                  </div>

                  <div className="mt-10 flex h-[180px] items-end gap-2 md:h-[200px] md:gap-3">
                    <div
                      className="w-full rounded-t-[14px] bg-violet-100"
                      style={{ height: "18%" }}
                    />
                    <div
                      className="w-full rounded-t-[14px] bg-violet-200"
                      style={{ height: "34%" }}
                    />
                    <div
                      className="w-full rounded-t-[14px] bg-violet-300"
                      style={{ height: "48%" }}
                    />
                    <div
                      className="w-full rounded-t-[14px] bg-violet-400"
                      style={{ height: "68%" }}
                    />
                    <div
                      className="w-full rounded-t-[14px] bg-violet-600"
                      style={{ height: "92%" }}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                      <div className="text-xs text-[var(--muted)] md:text-sm">
                        Inbound Opportunities
                      </div>

                      <div className="mt-2 text-xl font-black text-[#111111] md:text-2xl">
                        4.2X
                      </div>
                    </div>

                    <div className="rounded-2xl border border-violet-100 bg-[#111111] p-4 text-white">
                      <div className="text-xs text-violet-200 md:text-sm">
                        Audience Trust
                      </div>

                      <div className="mt-2 text-xl font-black md:text-2xl">
                        Compounding
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* TRANSFORMATION */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp>
              <div className="max-w-5xl">
                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">
                  Founder Transformation
                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">
                  Visibility compounds authority over time.
                </h2>
              </div>
            </FadeUp>

            <div className="relative mt-12">
              <div className="absolute left-[18px] top-0 h-full w-[2px] bg-violet-200" />

              <div className="space-y-8">
                {[
                  {
                    title: "Invisible Expertise",
                    desc: "Strong founders often remain digitally invisible despite deep execution and expertise.",
                  },
                  {
                    title: "Consistent Visibility",
                    desc: "Strategic content begins creating audience familiarity and recognition.",
                  },
                  {
                    title: "Authority Recognition",
                    desc: "The visible founder becomes associated with credibility, trust, and leadership.",
                  },
                  {
                    title: "Compounding Opportunities",
                    desc: "Visibility influences partnerships, inbound leads, hiring, and long term positioning.",
                  },
                ].map((item, index) => (
                  <div key={index} className="relative pl-16 md:pl-20">
                    <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white md:h-11 md:w-11 md:text-sm">
                      {index + 1}
                    </div>

                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] md:p-8">
                      <h3 className="text-2xl font-bold md:text-3xl">
                        {item.title}
                      </h3>

                      <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VISIBILITY ECOSYSTEM */}
        <section className="bg-[var(--soft-surface)] py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp>
              <div className="max-w-5xl">
                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">
                  Visibility Ecosystem
                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">
                  Strong personal brands operate like connected systems.
                </h2>
              </div>
            </FadeUp>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.42fr_1fr]">
              <div className="space-y-3">
                {ecosystem.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full cursor-pointer rounded-[22px] border p-5 text-left transition-all duration-300 ${
                      activeTab === index
                        ? "border-violet-200 bg-[var(--surface)] shadow-[0_20px_40px_rgba(124,58,237,0.10)]"
                        : "border-[var(--border)] bg-[var(--surface)]"
                    }`}
                  >
                    <div className="text-xl font-semibold md:text-2xl">
                      {item.title}
                    </div>

                    <div className="mt-2 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                      {item.description}
                    </div>
                  </button>
                ))}
              </div>

              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] md:p-8">
                <div className="text-sm uppercase tracking-[0.2em] text-violet-600">
                  Visibility Layer
                </div>

                <h3 className="mt-5 text-3xl font-bold leading-[1.02] md:text-5xl">
                  {ecosystem[activeTab].title}
                </h3>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  {ecosystem[activeTab].description}
                </p>

                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  {ecosystem[activeTab].content.map((point, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--soft-surface)] px-5 py-4 text-sm md:text-base"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HIRING OPERATIONS STACK */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-4xl">
                  <div className="text-sm uppercase tracking-[0.28em] text-violet-600">
                    Hiring Operations Stack
                  </div>

                  <h2 className="mt-4 text-4xl font-bold leading-[1.02] text-[#111111] md:text-6xl">
                    Clear hiring systems make better hiring decisions.
                  </h2>

                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                    A strong hiring operation is not just about filling roles
                    faster. It is about building clarity across intake,
                    pipeline movement, interviews, and decision-making.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={prevHiringSlide}
                    className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[#111111] transition-all duration-300 hover:bg-[var(--surface)]"
                    aria-label="Previous hiring operations slide"
                  >
                    Prev
                  </button>

                  <button
                    onClick={nextHiringSlide}
                    className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-700"
                    aria-label="Next hiring operations slide"
                  >
                    Next
                  </button>
                </div>
              </div>
            </FadeUp>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <FadeUp>
                <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--card-shadow)] md:p-8">
                  <div className="text-xs uppercase tracking-[0.22em] text-violet-600">
                    System Overview
                  </div>

                  <h3 className="mt-4 text-2xl font-bold leading-[1.08] text-[#111111] md:text-3xl">
                    Four connected layers of hiring operations.
                  </h3>

                  <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)]">
                    Each layer supports the next one. When the system is
                    structured properly, your team hires with better speed,
                    better coordination, and better confidence.
                  </p>

                  <div className="mt-8 space-y-3">
                    {hiringSlides.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveHiringSlide(index)}
                        className={`flex w-full items-center justify-between rounded-[20px] border px-4 py-4 text-left transition-all duration-300 ${
                          activeHiringSlide === index
                            ? "border-violet-200 bg-violet-50"
                            : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--soft-surface)]"
                        }`}
                      >
                        <div>
                          <div className="text-base font-semibold text-[#111111] md:text-lg">
                            {item.eyebrow}
                          </div>

                          <div className="mt-1 text-sm text-[var(--muted)]">
                            {item.points[0]}
                          </div>
                        </div>

                        <div
                          className={`h-3 w-3 rounded-full ${
                            activeHiringSlide === index
                              ? "bg-violet-600"
                              : "bg-violet-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] md:p-8">
                  <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                    {hiringSlides[activeHiringSlide].eyebrow}
                  </div>

                  <h3 className="mt-5 text-3xl font-bold leading-[1.08] text-[#111111] md:text-5xl">
                    {hiringSlides[activeHiringSlide].title}
                  </h3>

                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                    {hiringSlides[activeHiringSlide].description}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {hiringSlides[activeHiringSlide].points.map(
                      (point, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-medium text-[#111111] md:text-base"
                        >
                          {point}
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-8 rounded-[24px] border border-violet-100 bg-violet-50 p-5">
                    <div className="text-xs uppercase tracking-[0.16em] text-violet-700">
                      Operational Signal
                    </div>

                    <div className="mt-4 flex h-[140px] items-end gap-3 md:h-[165px]">
                      {[25, 42, 63, 88].map((height, index) => (
                        <div
                          key={index}
                          className={`w-full rounded-t-[16px] ${
                            index === activeHiringSlide
                              ? "bg-violet-600"
                              : "bg-violet-200"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>

                    <div className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                      Better systems improve consistency across every stage of
                      hiring.
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-violet-600">
                    Strategic Infrastructure
                  </div>

                  <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">
                    Personal branding requires systems, not random posting.
                  </h2>

                  <p className="mt-5 text-base leading-relaxed text-[var(--muted)] md:text-lg">
                    Strong founder positioning is built through structured
                    visibility systems, audience psychology, platform
                    consistency, and strategic content infrastructure.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {techStack.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--card-shadow)]"
                    >
                      <div className="text-base font-semibold md:text-lg">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-12 md:py-16">
          <Testimonials />
        </section>

        {/* FAQ */}
        <section className="bg-[var(--soft-surface)] py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <FadeUp>
              <div className="text-center">
                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">
                  Frequently Asked Questions
                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">
                  Common founder questions about personal branding.
                </h2>
              </div>
            </FadeUp>

            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)]"
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
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <FadeUp>
              <div className="rounded-[32px] border border-[var(--border)] bg-[var(--soft-surface)] px-6 py-10 shadow-[var(--card-shadow)] md:px-10 md:py-14">
                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">
                  Founder Positioning
                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">
                  The founders who stay visible become the founders people trust
                  first.
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  Strong visibility compounds for years. Strategic positioning
                  changes how opportunities arrive.
                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex rounded-2xl bg-violet-600 px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700"
                >
                  Build Your Personal Brand
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}