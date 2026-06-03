"use client";

import { useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import FadeUp from "@/components/FadeUp";
import InsightsEcosystem from "@/components/InsightsEcosystem";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function ServicesPage() {

  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      name: "Personal Branding",
      slug: "/services/personal-branding",

      short: "Build visibility and founder authority.",

      description:
        "Strategic positioning, content systems, and audience visibility designed to make founders recognizable and trusted online.",

      items: [
        "LinkedIn Positioning",
        "Founder Content",
        "Audience Growth",
        "Thought Leadership",
      ],
    },

    {
      name: "Digital Marketing",
      slug: "/services/digital-marketing",

      short: "Create scalable digital attention.",

      description:
        "Performance-focused growth systems across content, campaigns, and audience acquisition.",

      items: [
        "Social Campaigns",
        "SEO Systems",
        "Content Strategy",
        "Audience Growth",
      ],
    },

    {
      name: "CRM Systems",
      slug: "/services/crm-solutions",

      short: "Organize and manage lead infrastructure.",

      description:
        "Smart CRM ecosystems that simplify pipelines and automate follow-ups.",

      items: [
        "Lead Pipelines",
        "Client Tracking",
        "Sales Workflows",
        "Follow-Up Systems",
      ],
    },

    {
      name: "AI Automation",
      slug: "/services/ai-automation",

      short: "Reduce repetitive operational work.",

      description:
        "AI-powered workflows designed to improve speed and operational scalability.",

      items: [
        "Workflow Automation",
        "AI Agents",
        "Smart Operations",
        "Business Systems",
      ],
    },

    {
      name: "Full Stack Development",
      slug: "/services/full-stack-development",

      short: "Build modern digital infrastructure.",

      description:
        "Web platforms and scalable systems designed for growth-focused businesses.",

      items: [
        "Web Platforms",
        "Funnels",
        "Applications",
        "Scalable Systems",
      ],
    },

    {
      name: "Staffing Solutions",
      slug: "/services/staffing-solutions",

      short: "Build stronger execution teams.",

      description:
        "Talent systems and staffing support designed to improve operational scalability.",

      items: [
        "Remote Teams",
        "Hiring Systems",
        "Operational Support",
        "Talent Scaling",
      ],
    },
  ];

  return (
    <main className="overflow-x-hidden bg-[var(--background)] text-[var(--text)]">

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pb-24 pt-40 md:pb-28">

        {/* GLOW */}
        <div className="pointer-events-none absolute left-[-100px] top-0 h-[320px] w-[320px] rounded-full bg-violet-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <FadeUp>

            <div className="max-w-6xl">

              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">

                Connected Growth Ecosystem

              </div>

              <h1 className="mt-8 text-5xl font-black leading-[0.98] tracking-[-0.05em] text-[var(--text)] md:text-7xl">

                Modern businesses
                <br />
                scale through
                <br />
                connected systems.

              </h1>

              <p className="mt-10 max-w-4xl text-xl leading-relaxed text-[var(--muted)]">

                Visibility attracts attention.
                Infrastructure converts opportunities.
                Automation enables scale.

              </p>

            </div>

          </FadeUp>

        </div>

      </section>

      {/* INTERACTIVE SERVICES */}
      <section className="pb-24 md:pb-28">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.42fr_1fr] lg:px-8">

          {/* LEFT */}
          <FadeUp>

            <div className="space-y-4">

              {services.map((service, index) => (

                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`w-full rounded-[28px] border p-6 text-left transition-all duration-300 ${
                    activeService === index
                      ? "border-violet-200 bg-[#F6F0FF] shadow-md"
                      : "border-slate-200 bg-[var(--surface)] hover:border-violet-200 hover:bg-violet-50/40"
                  }`}
                >

                  <div className="text-2xl font-black leading-tight text-[var(--text)]">

                    {service.name}

                  </div>

                  <div className="mt-3 leading-relaxed text-[var(--muted)]">

                    {service.short}

                  </div>

                </button>

              ))}

            </div>

          </FadeUp>

          {/* RIGHT */}
          <FadeUp>

            <div className="rounded-[48px] border border-slate-200 bg-[#F6F0FF] p-10 shadow-[0_20px_80px_rgba(124,58,237,0.08)] md:p-14">

              <div className="flex flex-wrap items-center justify-between gap-8">

                <div>

                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">

                    Growth Infrastructure

                  </div>

                  <h2 className="mt-6 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[var(--text)]">

                    {services[activeService].name}

                  </h2>

                </div>

                <div className="rounded-full border border-violet-200 bg-[var(--surface)] px-5 py-3 text-sm font-medium text-violet-700 shadow-sm">

                  Connected System

                </div>

              </div>

              <p className="mt-10 max-w-3xl text-xl leading-relaxed text-[var(--muted)]">

                {services[activeService].description}

              </p>

              {/* ITEMS */}
              <div className="mt-14 grid gap-5 md:grid-cols-2">

                {services[activeService].items.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-[var(--surface)] px-6 py-5 font-medium text-[var(--text)] transition-all duration-300 hover:border-violet-200 hover:shadow-sm"
                  >

                    {item}

                  </div>

                ))}

              </div>

              {/* CTA */}
              <div className="mt-14 flex flex-wrap gap-5">

                <Link
                  href={services[activeService].slug}
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-7 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(124,58,237,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-[0_30px_70px_rgba(124,58,237,0.24)]"
                >

                  Explore Service

                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-violet-200 bg-[var(--surface)] px-7 py-4 font-semibold text-[var(--text)] transition-all duration-300 hover:bg-violet-50"
                >

                  Book Consultation

                </Link>

              </div>

            </div>

          </FadeUp>

        </div>

      </section>

      <Testimonials />

      <InsightsEcosystem />

      <Footer />

    </main>
  );
}