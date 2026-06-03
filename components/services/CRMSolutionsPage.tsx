"use client";

import Link from "next/link";
import Script from "next/script";
import { useMemo, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import Testimonials from "@/components/Testimonials";

const SITE_URL = "https://socieas.com";
const PAGE_URL = `${SITE_URL}/services/crm-solutions`;

const problemItems = [
  "Slow lead response",
  "Broken follow-ups",
  "Poor pipeline visibility",
  "Disconnected tools",
];

const processSteps = [
  {
    no: "01",
    title: "Audit",
    desc: "Identify workflow gaps, lead leakage, reporting issues, and operational friction.",
  },
  {
    no: "02",
    title: "Build",
    desc: "Set up CRM structure, automation, integrations, and migration with cleaner logic.",
  },
  {
    no: "03",
    title: "Optimize",
    desc: "Refine dashboards, follow-ups, and system performance as your business grows.",
  },
];

const techCategories = [
  {
    title: "CRM Platforms",
    tools: ["Salesforce", "HubSpot", "Zoho CRM", "Pipedrive", "Freshsales", "Dynamics 365"],
  },
  {
    title: "Automation",
    tools: ["Zapier", "Make", "n8n", "Lead Routing", "Lifecycle Flows", "Approval Logic"],
  },
  {
    title: "Analytics",
    tools: ["GA4", "Looker Studio", "Power BI", "Attribution Reports", "Sales Dashboards", "Forecasting"],
  },
  {
    title: "Integrations",
    tools: ["REST APIs", "Webhooks", "ERP Sync", "Marketing Tools", "Custom APIs", "Data Pipelines"],
  },
];

const capabilities = [
  "CRM implementation",
  "CRM migration",
  "Pipeline automation",
  "Lead routing setup",
  "Sales dashboards",
  "Follow-up automation",
  "CRM integrations",
  "Reporting infrastructure",
];

const faqs = [
  {
    q: "How long does CRM implementation take?",
    a: "Most CRM implementation projects take 4 to 12 weeks depending on migration size, workflow complexity, reporting needs, and integrations.",
  },
  {
    q: "Can Socieas migrate our existing CRM or spreadsheet setup?",
    a: "Yes. We handle data migration, cleanup, mapping, workflow recreation, and rollout planning.",
  },
  {
    q: "Do you work with more than a few CRM platforms?",
    a: "Yes. We work across multiple CRM platforms, automation systems, reporting tools, and integration layers based on business needs.",
  },
  {
    q: "Can you automate lead management and follow-ups?",
    a: "Yes. We build routing, assignments, reminders, lifecycle flows, and conversion-focused automation.",
  },
];

export default function CRMSolutionsClient() {
  const [activeTech, setActiveTech] = useState(0);
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
              name: "CRM Solutions",
              item: PAGE_URL,
            },
          ],
        },
        {
          "@type": "Service",
          name: "CRM Implementation Services",
          serviceType:
            "CRM Implementation, CRM Automation, CRM Migration, CRM Integration, CRM Consulting",
          description:
            "Socieas provides CRM implementation services, CRM automation, CRM migration, CRM integration, and reporting dashboards for growing businesses.",
          provider: {
            "@type": "Organization",
            name: "Socieas",
            url: SITE_URL,
          },
          areaServed: ["India", "United States", "United Kingdom", "United Arab Emirates", "Australia"],
          audience: {
            "@type": "Audience",
            audienceType: "Business owners, sales teams, founders, scaling companies",
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
        id="crm-schema"
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
                CRM Implementation Services
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                CRM Systems Designed to Remove Workflow Chaos and Improve Revenue Visibility
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Socieas helps businesses implement CRM systems, automate lead operations,
                connect fragmented tools, and create better reporting across the customer journey.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-800"
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
                {["CRM Setup", "Automation", "Migration", "Dashboards", "Integrations"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-[var(--surface)] px-4 py-2 text-[var(--muted)] shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FadeUp>

            <FadeUp>
              <div className="rounded-[32px] border border-slate-200 bg-[var(--surface)] p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:p-8">
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">Before</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      Customer data, lead follow-ups, and reporting stay fragmented across tools.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-violet-50 p-5">
                    <p className="text-sm font-medium text-violet-700">After</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      One connected CRM system with automation, visibility, and scalable execution.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-[var(--surface)] p-4 text-center text-sm font-semibold text-slate-700">
                      Faster response
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-[var(--surface)] p-4 text-center text-sm font-semibold text-slate-700">
                      Clearer pipeline
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
                CRM Problems That Quietly Hurt Growth
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Small workflow gaps often become missed leads, weak follow-ups, and poor reporting.
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
                Our CRM Solution Approach
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                We replace fragmented workflows with one connected CRM system built for speed, visibility, and control.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-[32px] border border-rose-200 bg-[var(--surface)] p-7 shadow-sm md:p-8">
                <div className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                  Before
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Leads scattered across channels",
                    "Manual handoffs between teams",
                    "No clear view of pipeline progress",
                    "Reporting that is delayed or incomplete",
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
                    "Centralized CRM and lead flow",
                    "Automated routing and follow-ups",
                    "Clear stages, ownership, and tracking",
                    "Dashboards with decision-ready visibility",
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
                How Socieas Delivers CRM Transformation
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                A simple process from identifying the gap to building a CRM system your team can actually use.
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
                CRM Tech Stack, Automation, Analytics, and Integrations
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                A broader technology ecosystem for CRM implementation, reporting, automation, and operational sync.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {techCategories.map((category, index) => (
                <button
                  key={category.title}
                  onClick={() => setActiveTech(index)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    activeTech === index
                      ? "bg-slate-950 text-white"
                      : "border border-slate-300 bg-[var(--surface)] text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-[32px] border border-slate-200 bg-[var(--surface)] p-6 shadow-sm md:p-8">
              <h3 className="text-2xl font-bold text-slate-950">
                {techCategories[activeTech].title}
              </h3>
              <p className="mt-2 text-[var(--muted)]">
                Flexible tools tailored to CRM implementation, automation, reporting, and integrations.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {techCategories[activeTech].tools.map((tool) => (
                  <div
                    key={tool}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center font-medium text-slate-800 transition hover:-translate-y-0.5 hover:bg-violet-50"
                  >
                    {tool}
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
                CRM Capabilities Built for Growth Teams
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Core CRM services designed to improve execution, visibility, and team coordination.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-slate-200 bg-[var(--surface)] px-5 py-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <Testimonials />
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Explore More from Socieas
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Clear internal paths to contact, services, and insights.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Contact",
                  desc: "Talk to Socieas about CRM implementation, migration, automation, and process cleanup.",
                  href: "/contact",
                },
                {
                  title: "Services",
                  desc: "Explore broader service capabilities across CRM, automation, development, and growth.",
                  href: "/services",
                },
                {
                  title: "Insights",
                  desc: "Read practical implementation and business insights from Socieas.",
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

        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                CRM FAQs
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Simple answers before users contact Socieas.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-[var(--surface)] shadow-sm"
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
                    <div id={`faq-${index}`} className="px-6 pb-6 leading-7 text-[var(--muted)]">
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
                Build a CRM System That Solves the Right Operational Problems First
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                Get CRM implementation, automation, migration, and reporting support tailored to your workflows, tools, and customer journey.
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
