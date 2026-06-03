"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import Testimonials from "@/components/Testimonials";

const SITE_URL = "https://socieas.com";
const PAGE_URL = `${SITE_URL}/services/full-stack-development`;

const pillars = [
  {
    title: "Frontend Engineering",
    label: "Experience layer",
    intro:
      "Interfaces designed for speed, responsiveness, usability, and better product interaction across devices.",
    points: [
      "Next.js and React builds",
      "Responsive interface systems",
      "Design system implementation",
      "Performance-focused UI structure",
    ],
  },
  {
    title: "Backend Development",
    label: "Application layer",
    intro:
      "Structured backend systems built around workflows, permissions, data control, maintainability, and scalability.",
    points: [
      "Business logic architecture",
      "Authentication and access control",
      "Database design",
      "Workflow-focused backend systems",
    ],
  },
  {
    title: "API Communication",
    label: "Connected systems layer",
    intro:
      "Reliable communication between platforms, tools, CRMs, dashboards, internal software, and external services.",
    points: [
      "REST API development",
      "Third-party integrations",
      "Webhook flows",
      "Data and workflow synchronization",
    ],
  },
  {
    title: "Cloud Operations",
    label: "Deployment layer",
    intro:
      "Infrastructure and deployment systems that improve launch confidence, uptime, monitoring, and operational stability.",
    points: [
      "Cloud deployment setup",
      "Environment configuration",
      "Release workflows",
      "Performance monitoring",
    ],
  },
];

const process = [
  {
    no: "01",
    title: "Plan",
    text: "We align business goals, product requirements, user journeys, workflows, and technical priorities before building starts.",
  },
  {
    no: "02",
    title: "Build",
    text: "We develop the frontend, backend, APIs, and database structure as one connected product system.",
  },
  {
    no: "03",
    title: "Launch",
    text: "We improve quality, reduce release risk, and prepare the infrastructure for cleaner production readiness.",
  },
  {
    no: "04",
    title: "Scale",
    text: "We refine workflows, support feature evolution, improve maintainability, and strengthen the system as usage grows.",
  },
];

const fitCards = [
  {
    title: "MVP Development",
    desc: "Launch with a cleaner technical foundation instead of rushing into avoidable rework.",
  },
  {
    title: "Custom Web Apps",
    desc: "Build internal tools, dashboards, portals, and platforms around how your business operates.",
  },
  {
    title: "Product Rebuilds",
    desc: "Fix unstable applications, weak backend systems, and disconnected product architecture.",
  },
  {
    title: "Growth Infrastructure",
    desc: "Support product expansion with stronger APIs, cleaner workflows, and more reliable operations.",
  },
];

const stack = [
  {
    title: "Next.js Applications",
    desc: "Modern app architecture for fast product experiences, routing, scalability, and cleaner frontend delivery.",
    tone: "from-violet-50 to-fuchsia-50",
    accent: "bg-violet-600",
  },
  {
    title: "React Frontend Systems",
    desc: "Reusable interface systems designed for usability, modular growth, and responsive product behavior.",
    tone: "from-sky-50 to-cyan-50",
    accent: "bg-sky-600",
  },
  {
    title: "Node.js Backend Development",
    desc: "Server-side logic, workflows, permissions, and product operations built for maintainability and scale.",
    tone: "from-emerald-50 to-teal-50",
    accent: "bg-emerald-600",
  },
  {
    title: "API Development & Integrations",
    desc: "Reliable data flow between products, CRMs, payment tools, analytics layers, and business systems.",
    tone: "from-amber-50 to-orange-50",
    accent: "bg-orange-500",
  },
  {
    title: "Database Architecture",
    desc: "Structured data models that improve application stability, reporting logic, and future development flexibility.",
    tone: "from-rose-50 to-pink-50",
    accent: "bg-rose-500",
  },
  {
    title: "Authentication Systems",
    desc: "User roles, access control, account security, and permission-aware product workflows.",
    tone: "from-indigo-50 to-blue-50",
    accent: "bg-indigo-600",
  },
  {
    title: "Cloud Deployment",
    desc: "Production-ready deployment systems with better release confidence, environment control, and uptime support.",
    tone: "from-teal-50 to-cyan-50",
    accent: "bg-teal-600",
  },
  {
    title: "Performance Optimization",
    desc: "Speed, stability, and technical efficiency improvements across both frontend and backend product layers.",
    tone: "from-lime-50 to-green-50",
    accent: "bg-lime-600",
  },
  {
    title: "Admin Dashboards",
    desc: "Operational dashboards and management interfaces designed for internal control and workflow visibility.",
    tone: "from-purple-50 to-violet-50",
    accent: "bg-purple-600",
  },
  {
    title: "Custom Workflow Systems",
    desc: "Purpose-built logic that reflects how your business actually runs instead of forcing generic operations.",
    tone: "from-slate-50 to-zinc-100",
    accent: "bg-slate-700",
  },
];

const faqs = [
  {
    question: "What does full stack development include?",
    answer:
      "Full stack development includes frontend interfaces, backend systems, APIs, databases, integrations, authentication, and deployment infrastructure needed to build and run a modern application.",
  },
  {
    question: "Do you build both frontend and backend systems?",
    answer:
      "Yes. Socieas handles frontend development, backend engineering, APIs, databases, integrations, and deployment support as part of a connected product build.",
  },
  {
    question: "Can you improve or rebuild an existing application?",
    answer:
      "Yes. Existing applications can be modernized through interface improvements, backend restructuring, API cleanup, database optimization, infrastructure upgrades, and performance improvements.",
  },
  {
    question: "Why is scalable product architecture important?",
    answer:
      "Scalable architecture improves maintainability, reliability, product performance, release confidence, and future growth without constant technical rework.",
  },
  {
    question: "Do you support deployment and post-launch improvements?",
    answer:
      "Yes. We support deployment setup, release readiness, infrastructure planning, monitoring, and iterative improvements after launch.",
  },
];

export default function FullStackDevelopmentPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const stackRef = useRef<HTMLDivElement | null>(null);

  const scrollStack = (direction: "left" | "right") => {
    if (!stackRef.current) return;
    const container = stackRef.current;
    const amount = Math.min(container.clientWidth * 0.82, 420);
    container.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const handleStackScroll = () => {
    if (!stackRef.current) return;
    const container = stackRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const distance = Math.abs(child.offsetLeft - container.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveStackIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    if (!stackRef.current) return;
    const container = stackRef.current;
    const card = container.children[index] as HTMLElement | undefined;
    if (!card) return;

    container.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });
    setActiveStackIndex(index);
  };

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
            {
              "@type": "ListItem",
              position: 3,
              name: "Full Stack Development",
              item: PAGE_URL,
            },
          ],
        },
        {
          "@type": "Service",
          name: "Full Stack Development Services",
          serviceType:
            "Full stack web development, custom web application development, backend development, frontend engineering, API development",
          description:
            "Socieas provides full stack development services covering frontend systems, backend architecture, APIs, databases, cloud deployment, and scalable digital product engineering.",
          provider: {
            "@type": "Organization",
            name: "Socieas",
            url: SITE_URL,
          },
          audience: {
            "@type": "Audience",
            audienceType:
              "Startups, founders, product teams, SaaS businesses, and growing companies",
          },
          areaServed: [
            "India",
            "United States",
            "United Kingdom",
            "United Arab Emirates",
            "Australia",
          ],
          url: PAGE_URL,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/contact-us/`,
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
        id="full-stack-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="overflow-x-hidden bg-[var(--surface)] text-slate-900">
        <Navbar />

        <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.10),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.08),_transparent_28%),linear-gradient(to_bottom,_#ffffff,_#f8fafc)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-22 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <FadeUp>
              <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                Full Stack Development
              </span>

              <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                Full Stack Development for Products That Need Stronger Systems
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Socieas builds full stack product systems across frontend, backend, APIs,
                databases, and cloud deployment for businesses that need scalability,
                stability, and better operational flow.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact-us/"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
                >
                  Start Your Product Build
                </Link>

                <Link
                  href="/blogs/it-staffing/it-staffing-case-study/"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  View Success Stories
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                {["Next.js", "React", "Node.js", "APIs", "Databases", "Cloud Deployment"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-[var(--surface)] px-4 py-2"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </FadeUp>

            <FadeUp>
              <div className="rounded-[32px] border border-slate-200 bg-[var(--surface)] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] md:p-8">
                <div className="grid gap-4">
                  <div className="rounded-[24px] bg-violet-50 p-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-violet-700">
                      Product Stack
                    </p>
                    <div className="mt-4 rounded-2xl bg-[var(--surface)] p-4 text-center font-semibold text-slate-900 shadow-sm">
                      Frontend Experience
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[var(--surface)] p-4 text-center shadow-sm">
                        Backend Logic
                      </div>
                      <div className="rounded-2xl bg-[var(--surface)] p-4 text-center shadow-sm">
                        API Flows
                      </div>
                    </div>
                    <div className="mt-3 rounded-2xl bg-violet-600 p-5 text-center font-semibold text-white">
                      Scalable Deployment Infrastructure
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                        Build Focus
                      </div>
                      <div className="mt-2 text-lg font-semibold text-slate-950">
                        Stable engineering systems
                      </div>
                    </div>
                    <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
                      <div className="text-xs uppercase tracking-[0.16em] text-violet-700">
                        Ideal For
                      </div>
                      <div className="mt-2 text-lg font-semibold text-slate-950">
                        Apps, platforms, dashboards
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
              <FadeUp>
                <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-8">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                    Products get harder to manage when systems are not connected well.
                  </h2>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Slow interfaces reduce trust and clarity.",
                    "Weak backend planning creates bottlenecks.",
                    "Disconnected APIs break operations and data flow.",
                    "Poor deployment systems increase release anxiety.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[24px] border border-slate-200 bg-[var(--surface)] p-6 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-3 w-3 rounded-full bg-violet-600" />
                        <p className="text-base leading-7 text-slate-700">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Full Stack Development Works Best as One Connected System
                </h2>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                  Frontend, backend, APIs, and deployment should support each other instead of being built in isolation.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {pillars.map((pillar, index) => (
                  <button
                    key={pillar.title}
                    onClick={() => setActivePillar(index)}
                    className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                      activePillar === index
                        ? "bg-violet-700 text-white"
                        : "border border-slate-300 bg-[var(--surface)] text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {pillar.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <FadeUp>
                <div className="rounded-[32px] border border-slate-200 bg-[var(--surface)] p-6 shadow-sm md:p-8">
                  <div className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
                    {pillars[activePillar].label}
                  </div>

                  <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                    {pillars[activePillar].title}
                  </h3>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
                    {pillars[activePillar].intro}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {pillars[activePillar].points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-800 md:text-base"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="grid gap-4">
                  <div className="rounded-[32px] border border-slate-200 bg-[var(--surface)] p-6">
                    <div className="text-sm uppercase tracking-[0.18em] text-violet-700">
                      Layer Strength
                    </div>

                    <div className="mt-6 flex h-[210px] items-end gap-3">
                      {[26, 42, 64, 90].map((height, index) => (
                        <div
                          key={index}
                          className={`w-full rounded-t-[18px] transition-all duration-500 ${
                            index === activePillar ? "bg-violet-500" : "bg-violet-200"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[32px] border border-slate-200 bg-violet-50 p-6">
                    <div className="text-sm uppercase tracking-[0.18em] text-violet-700">
                      Why this matters
                    </div>
                    <p className="mt-4 text-lg leading-8 text-slate-700">
                      Better product systems improve usability, reduce technical friction,
                      support cleaner releases, and make growth easier to manage.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                A Structured Development Process
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Good execution becomes easier when the product journey is mapped clearly from planning through scale.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {process.map((item) => (
                <FadeUp key={item.no}>
                  <article className="group rounded-[28px] border border-slate-200 bg-[var(--surface)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-violet-700">{item.no}</span>
                      <div className="h-2 w-16 rounded-full bg-slate-100">
                        <div className="h-2 w-8 rounded-full bg-violet-500 transition-all duration-500 group-hover:w-16" />
                      </div>
                    </div>
                    <h3 className="mt-5 text-2xl font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-3 leading-7 text-[var(--muted)]">{item.text}</p>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Where This Service Fits Best
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                Full stack development helps when the product needs both strong interfaces and dependable systems underneath.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {fitCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`rounded-[28px] border p-6 shadow-sm ${
                    index === 1 ? "border-violet-200 bg-violet-50" : "border-slate-200 bg-[var(--surface)]"
                  }`}
                >
                  <div className="text-sm uppercase tracking-[0.18em] text-violet-700">
                    Use case
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-slate-950">{card.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Technology Areas We Commonly Support
                </h2>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                  Explore the product stack through a horizontal system view built to feel more interactive and easier to scan.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollStack("left")}
                  aria-label="Scroll left"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-[var(--surface)] text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  ←
                </button>
                <button
                  onClick={() => scrollStack("right")}
                  aria-label="Scroll right"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-[var(--surface)] text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  →
                </button>
              </div>
            </div>

            <div className="relative mt-10">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-white to-transparent" />

              <div
                ref={stackRef}
                onScroll={handleStackScroll}
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {stack.map((item) => (
                  <article
                    key={item.title}
                    className={`min-w-[290px] max-w-[290px] snap-start rounded-[30px] border border-slate-200 bg-gradient-to-br ${item.tone} p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md md:min-w-[330px] md:max-w-[330px]`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Tech Area
                      </span>
                      <span className={`h-3 w-14 rounded-full ${item.accent}`} />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold leading-tight text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-base leading-7 text-[var(--muted)]">{item.desc}</p>

                    <div className="mt-8 inline-flex rounded-full border border-white/70 bg-[var(--surface)]/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
                      Product-ready systems
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {stack.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => scrollToCard(index)}
                  aria-label={`Go to ${item.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeStackIndex === index ? "w-10 bg-violet-600" : "w-2.5 bg-violet-200"
                  }`}
                />
              ))}
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
                Move directly into product, systems, and related service pathways.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Contact Socieas",
                  desc: "Discuss your application, platform, MVP, or rebuild project.",
                  href: "/contact-us/",
                },
                {
                  title: "CRM Solutions",
                  desc: "Explore CRM and automation systems that can connect with your product workflows.",
                  href: "/services/crm-solutions",
                },
                {
                  title: "Insights & Case Studies",
                  desc: "Read supporting business, systems, and implementation content from Socieas.",
                  href: "/blogs/",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[28px] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-violet-200 hover:bg-[var(--surface)] hover:shadow-md"
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

        <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-18">
          <div className="mx-auto max-w-5xl px-6">
            <FadeUp>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Full Stack Development FAQs
                </h2>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                  Common questions around scope, architecture, and delivery.
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
            <div className="rounded-[40px] border border-violet-100 bg-violet-50 p-10 text-center shadow-lg md:p-16">
              <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
                Build Full Stack Systems That Scale
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-xl text-[var(--muted)]">
                Transform fragmented product infrastructure into a scalable, connected system built for performance, reliability, and long-term growth.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact-us/"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
                >
                  Start Your Product Development
                </Link>

                <Link
                  href="/blogs/"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Explore Insights
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
