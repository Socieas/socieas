"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import Testimonials from "@/components/Testimonials";

const SITE_URL = "https://socieas.com";
const PAGE_URL = `${SITE_URL}/services/ai-automation`;

const problemItems = [
  "Manual workflows slowing teams down",
  "Leads falling through the cracks",
  "No real-time operational visibility",
  "Repetitive tasks consuming strategic time",
];

const systemTabs = [
  {
    title: "Workflow Automation",
    desc: "Automated operational systems that eliminate repetitive manual execution and improve end-to-end business efficiency.",
    items: ["Task routing", "Process triggers", "Multi-step workflows", "Error handling"],
  },
  {
    title: "AI Lead Routing",
    desc: "Smart lead qualification and routing systems designed to improve response speed, conversion flow, and follow-up consistency.",
    items: ["Lead scoring", "Auto-assignment", "Follow-up sequences", "CRM sync"],
  },
  {
    title: "Reporting Infrastructure",
    desc: "Centralized reporting systems that deliver real-time operational visibility and data-driven decision making.",
    items: ["Live dashboards", "Automated reports", "Cross-platform data", "KPI tracking"],
  },
];

const processSteps = [
  {
    no: "01",
    title: "Audit",
    desc: "Map existing workflows, identify manual bottlenecks, repetitive tasks, and operational inefficiencies.",
  },
  {
    no: "02",
    title: "Architect",
    desc: "Design automation systems around your business logic, integrations, triggers, and execution layers.",
  },
  {
    no: "03",
    title: "Deploy",
    desc: "Build, test, and launch automation infrastructure with ongoing monitoring and continuous improvement.",
  },
];

const capabilities = [
  "Workflow automation",
  "AI lead routing",
  "Reporting infrastructure",
  "AI communication systems",
  "Zapier / Make / n8n builds",
  "CRM automation",
  "Notification systems",
  "Operational dashboards",
];

const faqs = [
  {
    question: "Why do businesses need AI automation?",
    answer:
      "AI automation reduces repetitive work, improves operational speed, minimizes manual errors, and creates scalable execution systems that free teams to focus on strategic work.",
  },
  {
    question: "Can AI automation improve lead management?",
    answer:
      "Yes. AI systems can qualify leads automatically, route them to the right team member, trigger follow-up sequences, and sync data into your CRM without manual input.",
  },
  {
    question: "What processes can be automated?",
    answer:
      "Lead routing, notifications, reporting, communication, onboarding workflows, data syncing, and most repeatable operational tasks can all be automated strategically.",
  },
  {
    question: "Does automation replace teams?",
    answer:
      "No. Strong automation systems enhance operational efficiency and allow teams to focus on higher-value strategic work instead of repetitive execution.",
  },
];

export default function AIAutomationPage() {
  const [activeSystem, setActiveSystem] = useState(0);
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
            { "@type": "ListItem", position: 3, name: "AI Automation", item: PAGE_URL },
          ],
        },
        {
          "@type": "Service",
          name: "AI Automation Services for Businesses",
          serviceType: "AI automation, workflow automation, lead routing, reporting infrastructure",
          description:
            "Socieas helps businesses scale through AI automation systems, workflow infrastructure, reporting systems, lead routing, and operational optimization.",
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
            audienceType: "Business owners, operations teams, founders, scaling companies",
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
        id="ai-automation-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="overflow-x-hidden bg-[var(--surface)] text-slate-900">
        <Navbar />

        <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <FadeUp>
              <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                AI Automation Services
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                AI Automation Systems That Reduce Manual Work and Scale Operations
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Socieas helps businesses build AI automation infrastructure through workflow systems,
                lead routing, reporting automation, and operational efficiency engines that compound over time.
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
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Insights
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {["Workflow Automation", "AI Lead Routing", "Reporting Systems", "Operational Efficiency"].map(
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
                      Teams spend hours on repetitive tasks, leads are missed, and operations lack real-time visibility.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-violet-50 p-5">
                    <p className="text-sm font-medium text-violet-700">After</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      Automated systems handle execution, routing, and reporting so teams focus on strategic growth.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-[var(--surface)] p-4 text-center text-sm font-semibold text-slate-700">
                      Faster execution
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-[var(--surface)] p-4 text-center text-sm font-semibold text-slate-700">
                      Less manual work
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
                Why Growing Businesses Stay Stuck in Manual Operations
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Operational bottlenecks compound as businesses scale, making automation a strategic necessity rather than a convenience.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {problemItems.map((item) => (
                <div
                  key={item}
                  className="group rounded-[24px] border border-slate-200 bg-[var(--surface)] px-5 py-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg"
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
                Our AI Automation Approach
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                We build connected automation systems around your existing operations to improve speed, consistency, and visibility.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-[32px] border border-rose-200 bg-[var(--surface)] p-7 shadow-sm md:p-8">
                <div className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                  Before
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Manual lead follow-up processes",
                    "Disconnected tools and platforms",
                    "No automated reporting",
                    "Operational errors from human execution",
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

              <article className="rounded-[32px] border border-violet-200 bg-[var(--surface)] p-7 shadow-lg md:p-8">
                <div className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                  After
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Automated lead routing and follow-ups",
                    "Connected systems across all platforms",
                    "Real-time reporting dashboards",
                    "Consistent and reliable execution",
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

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                How Socieas Builds AI Automation Systems
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                A structured process from operational audit to deployed automation infrastructure.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {processSteps.map((step) => (
                <article
                  key={step.no}
                  className="group rounded-[28px] border border-slate-200 bg-[var(--surface)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-violet-700">{step.no}</span>
                    <div className="h-2 w-20 rounded-full bg-slate-100">
                      <div className="h-2 w-12 rounded-full bg-violet-500 transition-all duration-500 group-hover:w-20" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                AI Automation Systems Built for Real Operations
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Automation works best as a connected system rather than isolated tools running independently.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {systemTabs.map((tab, index) => (
                <button
                  key={tab.title}
                  onClick={() => setActiveSystem(index)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    activeSystem === index
                      ? "bg-slate-950 text-white"
                      : "border border-slate-300 bg-[var(--surface)] text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-[32px] border border-slate-200 bg-[var(--surface)] p-6 shadow-sm md:p-8">
              <h3 className="text-2xl font-bold text-slate-950">{systemTabs[activeSystem].title}</h3>
              <p className="mt-2 max-w-3xl text-[var(--muted)]">{systemTabs[activeSystem].desc}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {systemTabs[activeSystem].items.map((item) => (
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

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  AI Automation Needs Systems, Not Isolated Tools
                </h2>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                  Automation becomes stronger when every workflow, trigger, and integration operates as one connected infrastructure.
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

        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <FadeUp>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  AI Automation FAQs
                </h2>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                  Clear answers for businesses evaluating AI automation support.
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
                  >
                    <span className="text-base font-semibold text-slate-900 md:text-lg">
                      {faq.question}
                    </span>
                    <span className="text-2xl text-slate-400">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {activeFaq === index && (
                    <div className="px-6 pb-6 leading-7 text-[var(--muted)]">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Explore More from Socieas
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Keep moving with direct paths to contact, services, and insights.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Contact",
                  desc: "Talk to Socieas about AI automation, workflow systems, and operational infrastructure.",
                  href: "/contact",
                },
                {
                  title: "Services",
                  desc: "Explore broader service capabilities across automation, CRM, development, and growth.",
                  href: "/services",
                },
                {
                  title: "Insights",
                  desc: "Read practical content on automation, operations, and business efficiency.",
                  href: "/insights",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[28px] border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-[var(--surface)] hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">{item.desc}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-violet-700 transition group-hover:translate-x-1">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-[36px] border border-violet-200 bg-[linear-gradient(180deg,#fdfbff_0%,#eef6ff_100%)] p-8 text-center shadow-lg md:p-14">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Build Automation Systems That Scale With Your Business
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                Get AI automation support built around your workflows, tools, and operational goals.
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
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
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
