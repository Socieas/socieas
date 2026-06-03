"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import Testimonials from "@/components/Testimonials";

const SITE_URL = "https://socieas.com";
const PAGE_URL = `${SITE_URL}/services/staffing-solutions`;

const problemItems = [
  "Slow hiring cycles that stall growth",
  "Unclear role expectations and poor fit",
  "Inconsistent interview processes",
  "High effort with low hiring confidence",
];

const hiringTabs = [
  {
    title: "Role Intake",
    desc: "Strong hiring starts with clear role definition, aligned expectations, and a practical success profile.",
    items: ["Role scorecards", "Hiring criteria", "Priority alignment", "Decision clarity"],
  },
  {
    title: "Pipeline Management",
    desc: "A structured recruitment pipeline improves speed, coordination, and visibility across every hiring stage.",
    items: ["Stage tracking", "Candidate flow", "Drop-off visibility", "Faster movement"],
  },
  {
    title: "Interview Systems",
    desc: "Repeatable interview frameworks help teams evaluate fairly, compare consistently, and reduce guesswork.",
    items: ["Structured interviews", "Feedback capture", "Evaluation consistency", "Team alignment"],
  },
];

const processSteps = [
  {
    no: "01",
    title: "Define",
    desc: "Clarify the role, candidate profile, hiring priorities, and success criteria before sourcing begins.",
  },
  {
    no: "02",
    title: "Organize",
    desc: "Build a consistent hiring workflow with better stage visibility, team coordination, and evaluation logic.",
  },
  {
    no: "03",
    title: "Hire Better",
    desc: "Improve decision quality, reduce delays, and build a staffing process that supports long-term growth.",
  },
];

const capabilities = [
  "Role scorecards",
  "Hiring process design",
  "Candidate pipeline structuring",
  "Interview systems",
  "Evaluation frameworks",
  "Recruitment workflow clarity",
  "Hiring coordination",
  "Decision support systems",
];

const faqs = [
  {
    question: "Why do businesses need structured staffing systems?",
    answer:
      "Structured staffing systems reduce hiring delays, improve candidate quality, and help teams make decisions with more clarity and consistency.",
  },
  {
    question: "Can staffing support improve hiring speed?",
    answer:
      "Yes. Better process design, role clarity, and pipeline visibility usually reduce bottlenecks and help hiring move faster.",
  },
  {
    question: "What makes a strong hiring process?",
    answer:
      "A strong hiring process combines role definition, stage clarity, structured interviews, and better decision-making criteria across the team.",
  },
  {
    question: "Does staffing process improvement help hiring quality?",
    answer:
      "Yes. When evaluation becomes clearer and more consistent, teams usually make stronger hiring decisions with less confusion and rework.",
  },
];

export default function StaffingSolutionsPage() {
  const [activeTab, setActiveTab] = useState(0);
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
              name: "Staffing Solutions",
              item: PAGE_URL,
            },
          ],
        },
        {
          "@type": "Service",
          name: "Staffing Solutions",
          serviceType:
            "Hiring systems, recruitment process improvement, interview operations, staffing support",
          description:
            "Socieas helps businesses improve staffing outcomes through hiring systems, structured recruitment workflows, interview process clarity, and better hiring decisions.",
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
            audienceType: "Businesses, startups, founders, hiring teams, operations leaders",
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
        id="staffing-solutions-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="overflow-x-hidden bg-[var(--surface)] text-slate-900">
        <Navbar />

        <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.08),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-22 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <FadeUp>
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                Staffing Solutions
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                Staffing Systems That Help Teams Hire Faster and Better
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Socieas helps businesses improve hiring through structured staffing systems,
                better recruitment workflows, interview clarity, and stronger decision-making.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-800"
                >
                  Contact
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Services
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {["Hiring Systems", "Interview Structure", "Pipeline Visibility", "Better Decisions"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-[var(--surface)] px-4 py-2 text-[var(--muted)] shadow-sm"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </FadeUp>

            <FadeUp>
              <div className="rounded-[32px] border border-slate-200 bg-[var(--surface)] p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:p-8">
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">Before</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      Hiring feels inconsistent, slow, and difficult to manage across roles and stages.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-sky-50 p-5">
                    <p className="text-sm font-medium text-sky-700">After</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      A cleaner staffing system with more clarity, better evaluation, and stronger hiring confidence.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-[var(--surface)] p-4 text-center text-sm font-semibold text-slate-700">
                      Faster movement
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-[var(--surface)] p-4 text-center text-sm font-semibold text-slate-700">
                      Better fit
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Why Hiring Systems Break Down
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Staffing struggles usually come from unclear process design, weak coordination, and inconsistent decision logic.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {problemItems.map((item) => (
                <div
                  key={item}
                  className="group rounded-[24px] border border-slate-200 bg-[var(--surface)] px-5 py-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                      <span className="text-base font-bold">!</span>
                    </div>
                    <p className="text-base font-semibold text-slate-900">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Our Staffing Approach
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                We help businesses turn reactive hiring into a more structured staffing system that improves speed and decision quality.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-[32px] border border-rose-200 bg-[var(--surface)] p-7 shadow-sm md:p-8">
                <div className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                  Before
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Reactive hiring decisions",
                    "Unclear candidate flow",
                    "Interview inconsistency",
                    "Low confidence at final selection",
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

              <article className="rounded-[32px] border border-sky-200 bg-[var(--surface)] p-7 shadow-lg md:p-8">
                <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  After
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Clear hiring structure",
                    "More consistent interviews",
                    "Better pipeline visibility",
                    "Stronger hiring decisions",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-medium text-slate-800"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                How Socieas Improves Staffing
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                A practical process that moves from hiring clarity to workflow structure to better outcomes.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {processSteps.map((step) => (
                <article
                  key={step.no}
                  className="group rounded-[28px] border border-slate-200 bg-[var(--surface)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-sky-700">{step.no}</span>
                    <div className="h-2 w-20 rounded-full bg-slate-100">
                      <div className="h-2 w-12 rounded-full bg-sky-500 transition-all duration-500 group-hover:w-20" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Better Staffing Across the Right Hiring Layers
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Strong staffing systems work best when role definition, candidate flow, and interviews work together.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {hiringTabs.map((tab, index) => (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    activeTab === index
                      ? "bg-slate-950 text-white"
                      : "border border-slate-300 bg-[var(--surface)] text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-[32px] border border-slate-200 bg-[var(--surface)] p-6 shadow-sm md:p-8">
              <h3 className="text-2xl font-bold text-slate-950">{hiringTabs[activeTab].title}</h3>
              <p className="mt-2 max-w-3xl text-[var(--muted)]">{hiringTabs[activeTab].desc}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {hiringTabs[activeTab].items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center font-medium text-slate-800 transition hover:-translate-y-0.5 hover:bg-sky-50"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Staffing Needs Systems, Not Just More Hiring Activity
                </h2>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                  Better hiring outcomes come from process structure, role clarity, and stronger evaluation systems.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {capabilities.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-slate-200 bg-[var(--surface)] p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="text-base font-semibold md:text-lg">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <Testimonials />
        </section>

        <section className="py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Explore More from Socieas
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Keep visitors moving with direct paths to contact, services, and insights.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Contact",
                  desc: "Talk to Socieas about staffing systems, hiring process clarity, and workflow improvement.",
                  href: "/contact",
                },
                {
                  title: "Services",
                  desc: "Explore broader service capabilities across staffing, CRM, automation, and growth.",
                  href: "/services",
                },
                {
                  title: "Insights",
                  desc: "Read practical content on hiring systems, business processes, and growth operations.",
                  href: "/insights",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[28px] border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-[var(--surface)] hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">{item.desc}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-sky-700 transition group-hover:translate-x-1">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-18">
          <div className="mx-auto max-w-5xl px-6">
            <FadeUp>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Staffing Solutions FAQs
                </h2>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                  Clear answers for businesses improving hiring systems and staffing outcomes.
                </p>
              </div>
            </FadeUp>

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-[var(--surface)] shadow-sm"
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
                    <div id={`faq-${index}`} className="px-6 pb-6 leading-7 text-[var(--muted)]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-[36px] border border-sky-200 bg-[linear-gradient(180deg,#f8fdff_0%,#eef7ff_100%)] p-8 text-center shadow-lg md:p-14">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Build a Staffing System That Supports Better Hiring Decisions
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                Get staffing support built around process clarity, candidate evaluation, and stronger hiring workflows.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-800"
                >
                  Contact
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Services
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
