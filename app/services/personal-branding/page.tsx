"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import InsightsEcosystem from "@/components/InsightsEcosystem";
import TrustSignals from "@/components/TrustSignals";

const brandSystem = [
  {
    step: "01",
    title: "Position",
    text: "We define your audience, category, promise, and point of view so people instantly understand what you stand for.",
  },
  {
    step: "02",
    title: "Story",
    text: "We shape your journey into a human narrative that builds trust long before the first call.",
  },
  {
    step: "03",
    title: "Signal",
    text: "We build content themes that repeat the right ideas until your audience remembers your name.",
  },
  {
    step: "04",
    title: "System",
    text: "We turn your expertise into a repeatable content engine connected to your funnel, CRM, and offers.",
  },
];

const expertise = [
  {
    title: "Founder Positioning",
    text: "Category design, audience mapping, and messaging that makes you the obvious choice in your niche.",
  },
  {
    title: "LinkedIn Growth",
    text: "Profile optimization, content strategy, and engagement systems built for decision makers.",
  },
  {
    title: "Content Engines",
    text: "Hooks, formats, calendars, and repurposing systems that keep you visible without burnout.",
  },
  {
    title: "Authority Assets",
    text: "Signature frameworks, founder stories, and thought leadership that competitors cannot copy.",
  },
  {
    title: "Profile to Lead Funnels",
    text: "Lead magnets, resources, and conversion paths that turn attention into booked calls.",
  },
  {
    title: "Brand Infrastructure",
    text: "CRM, automation, and tracking behind your brand so every opportunity is captured.",
  },
];

const deliverables = [
  "Personal brand positioning",
  "Founder story and authority narrative",
  "LinkedIn profile optimization",
  "Content pillars and message map",
  "Signature framework development",
  "Thought leadership content",
  "Monthly content calendar",
  "Profile to lead funnel strategy",
];

const audience = [
  {
    title: "Founders",
    text: "Your name builds trust for your company faster than any logo can.",
  },
  {
    title: "Consultants",
    text: "Attract better clients through authority instead of cold outreach.",
  },
  {
    title: "B2B Leaders",
    text: "Become the recognized voice in your industry and category.",
  },
  {
    title: "Professionals",
    text: "Turn expertise into visibility, opportunities, and long term positioning.",
  },
];

const faqs = [
  {
    question: "What is personal branding?",
    answer:
      "Personal branding is the process of making your expertise, story, and point of view clear to the people you want to reach, so they trust you before the first conversation.",
  },
  {
    question: "Who needs personal branding services?",
    answer:
      "Founders, consultants, B2B leaders, and professionals who want visibility, authority, and inbound opportunities in the markets they serve.",
  },
  {
    question: "How does Socieas build a personal brand?",
    answer:
      "Socieas combines positioning, founder storytelling, LinkedIn content systems, signature frameworks, and lead funnels into one connected brand system.",
  },
  {
    question: "How long before a personal brand shows results?",
    answer:
      "Most clients see meaningful visibility and engagement growth within 60 to 90 days, with compounding authority and inbound leads as consistency builds.",
  },
];

export default function PersonalBrandingPage() {
  return (
    <main className="overflow-x-hidden bg-[#F7F7F5] text-[#111111]">
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="pointer-events-none absolute left-[-100px] top-0 h-[320px] w-[320px] rounded-full bg-violet-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                Personal Branding
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-tight text-[#111111] sm:text-6xl lg:text-7xl">
                Be known before{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                  you walk in the room.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                We turn founders and experts into recognized authorities
                through positioning, storytelling, and content systems that
                compound. Trusted by clients across India, USA, UK, Australia,
                and UAE.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(109,40,217,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
                >
                  Book a Free Brand Strategy Call
                </Link>

                <Link
                  href="#brand-system"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50"
                >
                  See The Brand System
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[30px]">
                <Image
                  src="/images/services/personal-branding-banner.webp"
                  alt="Personal branding services for founders by Socieas"
                  width={1600}
                  height={1400}
                  priority
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                />
              </div>

              <div className="absolute -left-6 bottom-10 hidden rounded-2xl border border-slate-200 bg-white/95 px-5 py-3 shadow-xl backdrop-blur lg:flex lg:items-center">
                <span className="text-sm font-semibold text-slate-700">
                  ⭐ Rated on Trustpilot &amp; Google
                </span>
              </div>

              <div className="absolute -right-4 top-10 hidden rounded-2xl border border-slate-200 bg-white/95 px-5 py-3 shadow-xl backdrop-blur xl:flex xl:items-center">
                <span className="text-sm font-semibold text-slate-700">
                  🌍 Serving Clients in 5 Countries
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — GLOBAL TRUST SIGNALS */}
      <TrustSignals />

      {/* SECTION 3 — THE PROBLEM */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              The Hard Truth
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Being great is not enough.{" "}
              <span className="text-violet-700">Being seen is.</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Your best clients are already searching, comparing, and deciding
              online. If your expertise is invisible, they choose whoever they
              remember. Not whoever is best.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — INVISIBLE VS VISIBLE */}
      <section className="pb-14 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[36px] border border-slate-200 bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                Invisible Expert
              </div>
              <h3 className="mt-6 text-4xl font-black leading-tight text-[#111111]">
                Works and waits.
              </h3>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Depends on referrals, competes on price, and keeps explaining
                their value from zero in every conversation.
              </p>
            </div>

            <div className="rounded-[36px] border border-violet-100 bg-violet-50 p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                Visible Authority
              </div>
              <h3 className="mt-6 text-4xl font-black leading-tight text-[#111111]">
                Builds and attracts.
              </h3>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Publishes consistently, educates the market, and becomes the
                first name people think of when they need help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — THE SOCIEAS BRAND SYSTEM */}
      <section id="brand-system" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
              The Socieas Brand System
            </div>
            <h2 className="mt-6 text-4xl font-black leading-tight text-[#111111] md:text-5xl">
              Personal branding is not content. It is trust built in public.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {brandSystem.map((item) => (
              <div
                key={item.step}
                className="rounded-[36px] border border-slate-200 bg-[#F7F7F5] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <div className="text-5xl font-black text-violet-200">
                  {item.step}
                </div>
                <h3 className="mt-6 text-2xl font-black text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — EXPERTISE */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
              Deep Expertise
            </div>
            <h2 className="mt-6 text-4xl font-black leading-tight text-[#111111] md:text-5xl">
              Every layer of your brand, engineered.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We do not just write posts. We build the complete architecture
              behind founder authority, from positioning to pipeline.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <div
                key={item.title}
                className="rounded-[36px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <h3 className="text-xl font-black text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — BRAND FLYWHEEL */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Your personal brand becomes your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                unfair advantage.
              </span>
            </h2>
          </div>

          <div className="mt-14 rounded-[32px] border border-violet-100 bg-[#F7F7F5] p-8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-center text-lg font-semibold text-[#111111]">
              <span>Create</span>
              <span className="text-violet-500">→</span>
              <span>Visibility</span>
              <span className="text-violet-500">→</span>
              <span>Trust</span>
              <span className="text-violet-500">→</span>
              <span>Inbound Growth</span>
              <span className="text-violet-500">→</span>
              <span>Create Again</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — WHAT YOU GET */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
                What You Get
              </div>
              <h2 className="mt-6 text-4xl font-black leading-tight text-[#111111] md:text-5xl">
                A complete brand system, not scattered posts.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                We help you find the ideas only you can own, the stories only
                you can tell, and the message your market needs to hear again
                and again.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-base font-semibold text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FOUNDER QUOTE */}
      <section className="relative overflow-hidden bg-[#111111] py-28 text-white">
        <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
            The Principle
          </p>

          <h2 className="mt-10 text-4xl font-bold leading-tight md:text-6xl">
            People do not connect with perfect brands.
            <br />
            <br />
            They connect with clear humans.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-gray-400">
            Your audience needs to know what you believe, how you think, and
            why you understand their world. That is what makes you easier to
            find, easier to trust, and easier to choose.
          </p>
        </div>
      </section>

      {/* SECTION 10 — WHO THIS IS FOR */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
              Who This Is For
            </div>
            <h2 className="mt-6 text-4xl font-black leading-tight text-[#111111] md:text-5xl">
              Built for people with real expertise.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {audience.map((item) => (
              <div
                key={item.title}
                className="rounded-[36px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <h3 className="text-2xl font-black text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11 — TESTIMONIALS */}
      <Testimonials />

      {/* SECTION 12 — FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
            Questions
          </div>
          <h2 className="mt-6 text-4xl font-black leading-tight text-[#111111] md:text-5xl">
            Personal branding, answered.
          </h2>

          <div className="mt-12 space-y-5">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-[28px] border border-slate-200 bg-[#F7F7F5] p-7"
              >
                <h3 className="text-xl font-black text-[#111111]">
                  {item.question}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS + FINAL CTA */}
      <InsightsEcosystem />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 px-8 py-14 text-center md:px-12 md:py-16">
            <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.04em] text-[#111111] md:text-5xl">
              Ready to become known for the work you want more of?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-slate-600">
              Let us build a brand that earns trust, starts conversations, and
              brings the right people to you.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-10 py-5 text-base font-semibold text-white shadow-[0_18px_45px_rgba(109,40,217,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
              >
                Book a Free Brand Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
