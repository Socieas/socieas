"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import InsightsEcosystem from "@/components/InsightsEcosystem";

/* ================= ANIMATION CONSTANTS ================= */

const viewportSoft = { once: true, amount: 0.1 };

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const hoverLift = { y: -6 };

/* ================= DATA ================= */

const services = [
  {
    name: "Personal Branding",
    slug: "/services/personal-branding",
    short: "Become the founder your market recognizes.",
    description:
      "Strategic positioning, content systems, and audience growth that make founders recognizable and trusted online.",
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
    short: "Bring qualified attention to your door.",
    description:
      "Search and social campaigns built to attract the right audience and turn attention into pipeline.",
    items: [
      "Social Campaigns",
      "SEO Systems",
      "Content Strategy",
      "Paid Visibility",
    ],
  },
  {
    name: "CRM Systems",
    slug: "/services/crm-solutions",
    short: "Never lose a lead again.",
    description:
      "Clean pipelines, tracked leads, and follow up workflows so nothing slips through the cracks.",
    items: [
      "Lead Pipelines",
      "Client Tracking",
      "Sales Workflows",
      "Follow Up Systems",
    ],
  },
  {
    name: "AI Automation",
    slug: "/services/ai-automation",
    short: "Work that runs while you sleep.",
    description:
      "AI workflows that answer, follow up, and keep operations moving without adding headcount.",
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
    short: "A website that converts, not just exists.",
    description:
      "Fast, search ready websites and platforms built to turn visitors into enquiries.",
    items: ["Web Platforms", "Funnels", "Applications", "Scalable Systems"],
  },
  {
    name: "Staffing Solutions",
    slug: "/services/staffing-solutions",
    short: "Scale delivery without hiring overhead.",
    description:
      "Vetted talent and hiring systems that grow your execution capacity on demand.",
    items: [
      "Remote Teams",
      "Hiring Systems",
      "Operational Support",
      "Talent Scaling",
    ],
  },
];

const bottlenecks = [
  {
    label: "Nobody knows I exist",
    service: "Personal Branding",
    reason:
      "Your market cannot buy from someone it has never heard of. Visibility comes first.",
    slug: "/services/personal-branding",
  },
  {
    label: "I need more traffic",
    service: "Digital Marketing",
    reason:
      "You have an offer that works. Now it needs qualified attention at scale.",
    slug: "/services/digital-marketing",
  },
  {
    label: "Leads slip through the cracks",
    service: "CRM Systems",
    reason:
      "You do not have a lead problem, you have a tracking problem. Fix the pipeline first.",
    slug: "/services/crm-solutions",
  },
  {
    label: "I repeat the same tasks daily",
    service: "AI Automation",
    reason:
      "Every hour you spend on repeatable work is an hour your competitors spend growing.",
    slug: "/services/ai-automation",
  },
  {
    label: "Visitors never become enquiries",
    service: "Full Stack Development",
    reason:
      "Traffic that does not convert is a website problem. Rebuild the machine, not the ads.",
    slug: "/services/full-stack-development",
  },
  {
    label: "My team cannot keep up",
    service: "Staffing Solutions",
    reason:
      "Demand is outpacing delivery. Add vetted capacity before growth stalls.",
    slug: "/services/staffing-solutions",
  },
];

const ladder = [
  {
    step: "01",
    title: "Get seen",
    text: "Personal branding and digital marketing put you in front of the right people every day.",
    tags: ["Personal Branding", "Digital Marketing"],
  },
  {
    step: "02",
    title: "Capture demand",
    text: "A converting website and a clean CRM make sure attention turns into tracked enquiries.",
    tags: ["Full Stack Development", "CRM Systems"],
  },
  {
    step: "03",
    title: "Scale without breaking",
    text: "Automation and staffing grow your capacity so delivery keeps up with demand.",
    tags: ["AI Automation", "Staffing Solutions"],
  },
];

/* ================= SECTIONS ================= */

function ServicesHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-40">
      <div className="pointer-events-none absolute left-[-100px] top-0 h-[320px] w-[320px] rounded-full bg-violet-100 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-black leading-[0.98] tracking-tight text-[#111111] md:text-7xl"
          >
            Six systems.
            <br />
            One growth engine.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-600"
          >
            Every service here exists for one reason: to turn attention into
            revenue. Start with the one that removes your biggest bottleneck,
            then stack the rest as results compound.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceExplorer() {
  const [activeService, setActiveService] = useState(0);
  const current = services[activeService];

  return (
    <section className="pb-20 md:pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.42fr_1fr] lg:px-8">
        <div className="space-y-4">
          {services.map((service, index) => (
            <button
              key={service.name}
              onClick={() => setActiveService(index)}
              className={
                activeService === index
                  ? "w-full rounded-[28px] border-2 border-violet-400 bg-violet-50 p-6 text-left shadow-md transition-all duration-300"
                  : "w-full rounded-[28px] border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:border-violet-300 hover:bg-violet-50/40"
              }
            >
              <div className="text-2xl font-black leading-tight text-[#111111]">
                {service.name}
              </div>
              <div className="mt-2 leading-relaxed text-slate-600">
                {service.short}
              </div>
            </button>
          ))}
        </div>

        <motion.div
          key={activeService}
          variants={fadeVariants}
          initial="hidden"
          animate="show"
          className="h-fit rounded-[40px] border border-slate-200 bg-white p-10 shadow-[0_20px_80px_rgba(124,58,237,0.08)] md:p-14 lg:sticky lg:top-28"
        >
          <h2 className="text-4xl font-black leading-tight tracking-tight text-[#111111] md:text-5xl">
            {current.name}
          </h2>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-600">
            {current.description}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {current.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-[#F8F8F6] px-6 py-5 font-medium text-[#111111] transition-all duration-300 hover:border-violet-300"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={current.slug}
              className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
            >
              Explore This System
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-7 py-4 font-semibold text-[#111111] transition-all duration-300 hover:border-violet-400"
            >
              Book a Free Strategy Call
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BottleneckPicker() {
  const [selected, setSelected] = useState(-1);
  const pick = selected >= 0 ? bottlenecks[selected] : null;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Not sure where to start?{" "}
            <span className="text-violet-600">Tap your bottleneck.</span>
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {bottlenecks.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setSelected(index)}
              className={
                selected === index
                  ? "rounded-full bg-violet-700 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300"
                  : "rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-violet-300 hover:text-violet-700"
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        {pick && (
          <motion.div
            key={pick.service}
            variants={fadeVariants}
            initial="hidden"
            animate="show"
            className="mt-8 rounded-[32px] border-2 border-violet-300 bg-[#F8F8F6] p-8 md:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              Start here
            </p>
            <h3 className="mt-3 text-3xl font-black text-[#111111]">
              {pick.service}
            </h3>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
              {pick.reason}
            </p>
            <Link
              href={pick.slug}
              className="mt-6 inline-flex items-center rounded-2xl bg-violet-700 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
            >
              See How It Works
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function StackLadder() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            The order <span className="text-violet-600">matters.</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Most businesses buy tools in the wrong order and wonder why nothing
            compounds. This is the sequence that works.
          </p>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {ladder.map((rung) => (
            <motion.div
              key={rung.step}
              variants={itemVariants}
              whileHover={hoverLift}
              className="rounded-3xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-violet-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-lg font-black text-white">
                {rung.step}
              </div>
              <h3 className="mt-4 text-2xl font-black text-[#111111]">
                {rung.title}
              </h3>
              <p className="mt-2 leading-7 text-slate-600">{rung.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {rung.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-2xl bg-violet-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
          >
            Find My Starting Point
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */

export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden bg-[#F7F7F5] text-[#111111]">
      <Navbar />
      <ServicesHero />
      <ServiceExplorer />
      <BottleneckPicker />
      <StackLadder />
      <Testimonials />
      <InsightsEcosystem />
      <Footer />
    </main>
  );
}
