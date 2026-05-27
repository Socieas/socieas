"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import Testimonials from "@/components/Testimonials";

const serviceSchema = {
  "@context": "https://schema.org",

  "@type": "Service",

  serviceType: "AI Automation Services",

  provider: {
    "@type": "Organization",

    name: "Socieas",

    url: "https://socieas.com",
  },

  areaServed: "Worldwide",

  description:
    "Socieas helps businesses scale through AI automation systems, workflow infrastructure, reporting systems, lead routing, and operational optimization.",

  url: "https://socieas.com/services/ai-automation",
};

export default function AIAutomationPage() {

  const automationSystems = [
    {
      title: "Workflow Automation",

      description:
        "Automated operational systems that reduce repetitive manual execution and improve business efficiency.",
    },

    {
      title: "AI Lead Routing",

      description:
        "Smart lead qualification and routing systems designed to improve response speed and conversion flow.",
    },

    {
      title: "Reporting Infrastructure",

      description:
        "Centralized reporting systems that improve operational visibility and decision making.",
    },

    {
      title: "AI Communication",

      description:
        "Automated messaging, notifications, and conversational systems designed for scalable interactions.",
    },
  ];

  const process = [
    {
      title: "Operational Analysis",

      description:
        "Understanding workflow inefficiencies, repetitive tasks, and execution bottlenecks.",
    },

    {
      title: "Automation Mapping",

      description:
        "Structuring automation systems around business operations and internal workflows.",
    },

    {
      title: "AI Infrastructure Setup",

      description:
        "Building scalable automation systems with integrations, workflows, and execution layers.",
    },

    {
      title: "Optimization & Scaling",

      description:
        "Monitoring operational performance and continuously improving automation efficiency.",
    },
  ];

  const faqs = [
    {
      question: "Why do businesses need AI automation?",

      answer:
        "AI automation reduces repetitive work, improves operational speed, minimizes manual errors, and creates scalable execution systems.",
    },

    {
      question: "Can AI automation improve lead management?",

      answer:
        "Yes. AI systems can qualify leads, automate routing, improve follow-ups, and create faster operational workflows.",
    },

    {
      question: "What processes can be automated?",

      answer:
        "Lead routing, notifications, reporting, communication, onboarding workflows, and operational tasks can all be automated strategically.",
    },

    {
      question: "Does automation replace teams?",

      answer:
        "No. Strong automation systems enhance operational efficiency while allowing teams to focus on strategic work.",
    },
  ];

  const techStacks = [
    "OpenAI",
    "LangChain",
    "Zapier",
    "Make",
    "n8n",
    "HubSpot",
    "Slack",
    "Notion",
    "Airtable",
    "Python",
    "Next.js",
    "Supabase",
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

          {/* BACKGROUND */}

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(139,92,246,0.05),transparent_30%)]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.92fr] lg:gap-16">

            {/* LEFT */}

            <FadeUp>

              <div className="max-w-4xl">

                <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700 md:text-sm">

                  AI Automation Infrastructure

                </div>

                <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.05em] text-[#111111] md:text-6xl">

                  AI systems that
                  reduce repetitive
                  operational work.

                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">

                  Modern businesses lose time and revenue through fragmented workflows and repetitive operational tasks.

                  <br />
                  <br />

                  AI automation creates scalable systems that improve execution speed, consistency, and operational visibility.

                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <Link
                    href="/contact"
                    className="rounded-2xl bg-violet-600 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 md:text-base"
                  >

                    Build AI Systems

                  </Link>

                  <Link
                    href="/insights/articles"
                    className="rounded-2xl border border-[var(--border)] bg-white px-7 py-4 text-sm font-medium transition-all duration-300 hover:bg-[var(--soft-surface)] md:text-base"
                  >

                    Explore AI Infrastructure

                  </Link>

                </div>

              </div>

            </FadeUp>

            {/* RIGHT */}

            <FadeUp>

              <div className="relative mx-auto w-full max-w-[520px]">

                <div className="relative overflow-hidden rounded-[34px] border border-violet-100 bg-white p-6 shadow-[0_25px_80px_rgba(124,58,237,0.10)] md:p-8">

                  <div className="absolute right-[-50px] top-[-50px] h-[180px] w-[180px] rounded-full bg-violet-100 blur-3xl" />

                  <div className="relative">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <div className="text-xs uppercase tracking-[0.16em] text-[var(--muted)] md:text-sm">

                          Workflow Efficiency

                        </div>

                        <div className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#111111] md:text-5xl">

                          +240%

                        </div>

                      </div>

                      <div className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700 md:text-sm">

                        Automation Active

                      </div>

                    </div>

                    <div className="mt-8 space-y-3">

                      {[
                        "Lead Qualification",
                        "Workflow Routing",
                        "AI Follow Ups",
                        "Reporting Automation",
                      ].map((item, index) => (

                        <div
                          key={index}
                          className="group flex items-center justify-between rounded-2xl border border-violet-100 bg-[var(--soft-surface)] px-5 py-4 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50"
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

        {/* TECH STACK */}

        <section className="pb-14 md:pb-20">

          <div className="mx-auto max-w-7xl px-6">

            <FadeUp>

              <div className="relative overflow-hidden rounded-[36px] border border-violet-100 bg-[linear-gradient(135deg,#FAF5FF_0%,#FFFFFF_55%,#F5F3FF_100%)] p-7 shadow-[0_25px_80px_rgba(124,58,237,0.06)] md:p-10">

                <div className="absolute right-0 top-0 h-[240px] w-[240px] rounded-full bg-violet-100/60 blur-3xl" />

                <div className="relative">

                  <div className="max-w-4xl">

                    <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                      Technology Infrastructure

                    </div>

                    <h2 className="mt-5 text-4xl font-bold leading-[1.02] text-[#111111] md:text-5xl">

                      Modern automation systems require connected technology ecosystems.

                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">

                      We use scalable automation infrastructure, integrations, workflow engines, AI models, and operational systems designed for long term execution efficiency.

                    </p>

                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">

                    {techStacks.map((tech, index) => (

                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_18px_40px_rgba(124,58,237,0.10)]"
                      >

                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.06),transparent)] opacity-0 transition-all duration-300 group-hover:opacity-100" />

                        <div className="relative flex items-center gap-3">

                          <div className="h-3 w-3 rounded-full bg-violet-600" />

                          <div className="text-sm font-semibold text-[#111111] md:text-base">

                            {tech}

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </FadeUp>

          </div>

        </section>

        {/* AUTOMATION SYSTEMS */}

        <section className="py-14 md:py-20">

          <div className="mx-auto max-w-7xl px-6">

            <FadeUp>

              <div className="max-w-5xl">

                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                  Automation Ecosystem

                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                  AI systems work best
                  when infrastructure
                  operates together.

                </h2>

              </div>

            </FadeUp>

            <div className="mt-12 grid gap-6 md:grid-cols-2">

              {automationSystems.map((item, index) => (

                <FadeUp key={index}>

                  <div className="group rounded-[32px] border border-violet-100 bg-white p-6 shadow-[0_20px_60px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 md:p-8">

                    <div className="flex items-center justify-between">

                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">

                        System 0{index + 1}

                      </div>

                      <div className="h-3 w-3 rounded-full bg-violet-600 transition-all duration-300 group-hover:scale-125"></div>

                    </div>

                    <h3 className="mt-6 text-2xl font-bold leading-tight md:text-3xl">

                      {item.title}

                    </h3>

                    <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">

                      {item.description}

                    </p>

                  </div>

                </FadeUp>

              ))}

            </div>

          </div>

        </section>

        {/* PROCESS */}

        <section className="bg-[var(--soft-surface)] py-14 md:py-20">

          <div className="mx-auto max-w-7xl px-6">

            <FadeUp>

              <div className="max-w-5xl">

                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                  Implementation Process

                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                  AI automation requires
                  structured operational planning.

                </h2>

              </div>

            </FadeUp>

            <div className="mt-12 space-y-6">

              {process.map((item, index) => (

                <FadeUp key={index}>

                  <div className="rounded-[32px] border border-violet-100 bg-white p-6 shadow-[0_20px_60px_rgba(124,58,237,0.05)] md:p-8">

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                      <div className="flex gap-5">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">

                          {index + 1}

                        </div>

                        <div>

                          <h3 className="text-2xl font-bold md:text-3xl">

                            {item.title}

                          </h3>

                          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">

                            {item.description}

                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </FadeUp>

              ))}

            </div>

          </div>

        </section>

        {/* TESTIMONIALS */}

        <section className="py-14 md:py-20">

          <Testimonials />

        </section>

        {/* FAQ */}

        <section className="bg-[var(--soft-surface)] py-14 md:py-20">

          <div className="mx-auto max-w-5xl px-6">

            <FadeUp>

              <div className="text-center">

                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                  Frequently Asked Questions

                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                  Common questions
                  about AI automation.

                </h2>

              </div>

            </FadeUp>

            <div className="mt-12 space-y-4">

              {faqs.map((faq, index) => (

                <FadeUp key={index}>

                  <div className="rounded-[28px] border border-violet-100 bg-white p-6 shadow-[0_20px_60px_rgba(124,58,237,0.04)] md:p-8">

                    <h3 className="text-xl font-semibold md:text-2xl">

                      {faq.question}

                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-[var(--muted)] md:text-lg">

                      {faq.answer}

                    </p>

                  </div>

                </FadeUp>

              ))}

            </div>

          </div>

        </section>

        {/* FINAL CTA */}

        <section className="py-14 md:py-20">

          <div className="mx-auto max-w-5xl px-6 text-center">

            <FadeUp>

              <div className="rounded-[32px] border border-violet-100 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(124,58,237,0.05)] md:px-10 md:py-14">

                <div className="text-sm uppercase tracking-[0.28em] text-violet-600">

                  AI Infrastructure

                </div>

                <h2 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">

                  Scalable businesses
                  require scalable
                  operational systems.

                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">

                  AI automation improves consistency, execution speed, operational visibility, and scalable business efficiency.

                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex rounded-2xl bg-violet-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700"
                >

                  Build AI Infrastructure

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