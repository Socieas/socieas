"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import InsightsEcosystem from "@/components/InsightsEcosystem";

/* ================= ANIMATION CONSTANTS ================= */

const viewportOnce = { once: true, amount: 0.25 };
const viewportSoft = { once: true, amount: 0.1 };

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const bannerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const growXVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: "easeOut" } },
};

const growYVariants: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.4, ease: "easeOut" } },
};

const hoverLift = { y: -6 };

/* ================= DATA ================= */

const chapters = [
  {
    number: "01",
    name: "Personal Branding",
    slug: "/services/personal-branding",
    hook: "Every growth story starts with being seen.",
    description:
      "We position you as the founder your market recognizes and trusts, with content systems that work every day.",
    items: [
      "LinkedIn Positioning",
      "Founder Content",
      "Audience Growth",
      "Thought Leadership",
    ],
  },
  {
    number: "02",
    name: "Digital Marketing",
    slug: "/services/digital-marketing",
    hook: "Then the right people start finding you.",
    description:
      "Search and social campaigns that attract qualified attention and turn it into pipeline, not vanity metrics.",
    items: [
      "Social Campaigns",
      "SEO Systems",
      "Content Strategy",
      "Paid Visibility",
    ],
  },
  {
    number: "03",
    name: "Full Stack Development",
    slug: "/services/full-stack-development",
    hook: "Your website turns visitors into enquiries.",
    description:
      "Fast, search ready websites and platforms engineered to convert, not just look pretty.",
    items: ["Web Platforms", "Funnels", "Applications", "Scalable Systems"],
  },
  {
    number: "04",
    name: "CRM Systems",
    slug: "/services/crm-solutions",
    hook: "And no lead ever slips through again.",
    description:
      "Clean pipelines, tracked leads, and follow up workflows so every enquiry gets the attention it deserves.",
    items: [
      "Lead Pipelines",
      "Client Tracking",
      "Sales Workflows",
      "Follow Up Systems",
    ],
  },
  {
    number: "05",
    name: "AI Automation",
    slug: "/services/ai-automation",
    hook: "The busywork starts running itself.",
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
    number: "06",
    name: "Staffing Solutions",
    slug: "/services/staffing-solutions",
    hook: "And when demand outgrows you, we scale your team.",
    description:
      "Vetted talent and hiring systems that grow your execution capacity on demand, without hiring overhead.",
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

const stackCategories = [
  {
    name: "Websites & Platforms",
    line: "The same stack powering the fastest sites on the internet.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Sanity CMS", "Node.js"],
  },
  {
    name: "CRM & Sales",
    line: "We build on the platforms your future team already knows.",
    tools: ["Salesforce", "HubSpot", "Zoho CRM", "Pipedrive"],
  },
  {
    name: "AI & Automation",
    line: "Modern AI tooling, wired into your real workflows.",
    tools: ["OpenAI", "Make", "Zapier", "n8n"],
  },
  {
    name: "Infrastructure & Analytics",
    line: "Version controlled, protected, and measured from day one.",
    tools: ["GitHub", "Cloudflare", "Google Analytics", "Search Console"],
  },
];

const engineeringPrinciples = [
  {
    number: "01",
    title: "Speed first",
    text: "Slow sites lose buyers and rankings. We build for fast loads on real phones, not just office wifi.",
  },
  {
    number: "02",
    title: "Search ready",
    text: "Structured data, clean markup, and sitemaps on every page, so Google and AI search can read you perfectly.",
  },
  {
    number: "03",
    title: "Secure by default",
    text: "Spam protection, security headers, and safe forms ship with every build. Not as an upsell.",
  },
  {
    number: "04",
    title: "Built to scale",
    text: "Clean, documented code that grows with you instead of collapsing at your first traffic spike.",
  },
];

const deliverySteps = [
  {
    step: "01",
    title: "Discover",
    text: "We map your goals, market, and current systems before touching anything.",
  },
  {
    step: "02",
    title: "Blueprint",
    text: "You get a written plan with scope, sequence, and what success looks like.",
  },
  {
    step: "03",
    title: "Build",
    text: "We build in short cycles and show you progress as it happens.",
  },
  {
    step: "04",
    title: "Launch",
    text: "Tested on real devices, wired to analytics, and live without drama.",
  },
  {
    step: "05",
    title: "Improve",
    text: "We watch the data and keep tuning what the numbers tell us to tune.",
  },
];

const buildChecklist = [
  "Structured data on every page",
  "Speed optimization for real world devices",
  "Mobile first responsive design",
  "SEO titles, descriptions, and sitemaps",
  "AI search readiness for ChatGPT and Gemini",
  "Analytics and conversion tracking",
  "Security headers and spam protection",
  "Documentation and handover training",
];

const ownership = [
  "Full ownership of your code, content, and design",
  "CRM and data live in accounts under your name",
  "No lock in contracts, leave whenever you want",
  "Documentation any developer can pick up and continue",
];

/* ================= SECTIONS ================= */

function ServicesHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pt-40">
      <div className="pointer-events-none absolute left-[-100px] top-0 h-[320px] w-[320px] rounded-full bg-violet-100 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div variants={listVariants} initial="hidden" animate="show">
          <motion.h1
            variants={itemVariants}
            className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-[#111111] md:text-7xl"
          >
            Six systems.
            <br />
            One growth <span className="text-violet-600">engine.</span>
          </motion.h1>
          <motion.div
            variants={growXVariants}
            className="mt-6 h-1.5 w-32 origin-left rounded-full bg-violet-600 md:w-44"
          />
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-600"
          >
            Every service here exists for one reason: to turn attention into
            revenue. Start with the one that removes your biggest bottleneck,
            then stack the rest as results compound.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-2xl bg-violet-700 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
            >
              Book a Free Strategy Call
            </Link>
            <a
              href="#story"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-7 py-4 font-semibold text-[#111111] transition-all duration-300 hover:border-violet-400"
            >
              See How It Works
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="show"
          className="relative mt-14 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-[0_20px_80px_rgba(124,58,237,0.12)] md:rounded-[40px]"
        >
          <Image
            src="/images/services/services-hero.webp"
            alt="Six connected growth systems rising step by step"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

function ServicesStory() {
  const [open, setOpen] = useState(0);

  return (
    <section id="story" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Read it like <span className="text-violet-600">a story.</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Because that is how growth actually happens. Six chapters, in the
            order that makes results compound.
          </p>
        </div>

        <div className="mt-10 border-t border-slate-200">
          {chapters.map((chapter, index) => (
            <div key={chapter.number} className="border-b border-slate-200">
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center gap-5 py-6 text-left md:gap-8"
              >
                <span
                  className={
                    open === index
                      ? "text-2xl font-black text-violet-600 md:text-3xl"
                      : "text-2xl font-black text-slate-300 md:text-3xl"
                  }
                >
                  {chapter.number}
                </span>
                <span className="flex-1">
                  <span className="block text-2xl font-black tracking-tight text-[#111111] md:text-3xl">
                    {chapter.name}
                  </span>
                  <span className="mt-1 block text-slate-500 md:text-lg">
                    {chapter.hook}
                  </span>
                </span>
                <span
                  className={
                    open === index
                      ? "flex h-10 w-10 shrink-0 rotate-45 items-center justify-center rounded-full bg-violet-600 text-xl font-black text-white transition-transform duration-300"
                      : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xl font-black text-slate-500 transition-transform duration-300"
                  }
                >
                  +
                </span>
              </button>

              {open === index && (
                <motion.div
                  variants={fadeVariants}
                  initial="hidden"
                  animate="show"
                  className="pb-8 pl-12 md:pl-20"
                >
                  <p className="max-w-2xl text-lg leading-8 text-slate-600">
                    {chapter.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {chapter.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={chapter.slug}
                    className="mt-6 inline-flex items-center rounded-2xl bg-violet-700 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
                  >
                    Explore {chapter.name}
                  </Link>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottleneckPicker() {
  const [selected, setSelected] = useState(-1);
  const pick = selected >= 0 ? bottlenecks[selected] : null;

  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
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
            className="mt-8 rounded-[32px] border-2 border-violet-300 bg-white p-8 md:p-10"
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

function TechStack() {
  const [active, setActive] = useState(0);
  const current = stackCategories[active];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              The stack behind <span className="text-violet-600">the systems.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              No mystery tools, no proprietary traps. We build on the same
              technology the best product teams in the world use, so anything
              we ship for you is fast, provable, and portable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {stackCategories.map((category, index) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActive(index)}
                  className={
                    active === index
                      ? "rounded-full bg-violet-700 px-6 py-3 text-sm font-bold text-white transition-all duration-300"
                      : "rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-violet-300 hover:text-violet-700"
                  }
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={active}
            variants={fadeVariants}
            initial="hidden"
            animate="show"
            className="rounded-3xl border border-slate-200 bg-[#F8F8F6] p-8 md:p-10"
          >
            <p className="text-lg font-bold text-[#111111]">{current.line}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {current.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-[#111111]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EngineeringPrinciples() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              How we <span className="text-violet-600">build.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Marketing gets you seen. Engineering decides whether that
              attention converts. We take both seriously.
            </p>
          </div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="grid gap-5 sm:grid-cols-2 lg:col-span-2"
          >
            {engineeringPrinciples.map((principle) => (
              <motion.div
                key={principle.number}
                variants={itemVariants}
                whileHover={hoverLift}
                className="rounded-3xl border-t-4 border-violet-600 bg-white p-7 shadow-sm"
              >
                <div className="text-sm font-black tracking-widest text-violet-600">
                  {principle.number}
                </div>
                <h3 className="mt-3 text-xl font-black text-[#111111]">
                  {principle.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">{principle.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DeliveryProcess() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              From first call <span className="text-violet-600">to launch.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              No black box. You see the plan before we build, and you see the
              build while it happens.
            </p>
          </div>

          <div className="relative pl-8 md:pl-10">
            <motion.div
              variants={growYVariants}
              initial="hidden"
              whileInView="show"
              viewport={viewportSoft}
              className="absolute bottom-2 left-2 top-2 w-1 origin-top rounded-full bg-violet-600 md:left-3"
            />
            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={viewportSoft}
              className="space-y-8"
            >
              {deliverySteps.map((step) => (
                <motion.div key={step.step} variants={itemVariants} className="relative">
                  <div className="absolute -left-8 top-1.5 h-4 w-4 rounded-full border-4 border-white bg-violet-600 shadow md:-left-9" />
                  <div className="text-sm font-black uppercase tracking-widest text-violet-600">
                    {step.step} {step.title}
                  </div>
                  <p className="mt-1 text-lg font-medium leading-8 text-[#111111]">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildChecklist() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Every build <span className="text-violet-600">ships with this.</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Not add ons. Not upsells. This is the baseline on every project we
            deliver.
          </p>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-10 grid gap-4 sm:grid-cols-2"
        >
          {buildChecklist.map((item) => (
            <motion.div
              key={item}
              variants={itemVariants}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-colors duration-300 hover:border-violet-300"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">
                ✓
              </span>
              <span className="font-medium text-[#111111]">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Ownership() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
          You own <span className="text-violet-600">everything we build.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Agencies that lock you in are betting on your exit being painful. We
          bet on results instead.
        </p>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-10 grid gap-4 text-left sm:grid-cols-2"
        >
          {ownership.map((item) => (
            <motion.div
              key={item}
              variants={itemVariants}
              whileHover={hoverLift}
              className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">
                ✓
              </span>
              <span className="font-medium leading-7 text-[#111111]">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        <Link
          href="/contact"
          className="mt-10 inline-flex items-center rounded-2xl bg-violet-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
        >
          Book a Free Strategy Call
        </Link>
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
      <ServicesStory />
      <BottleneckPicker />
      <TechStack />
      <EngineeringPrinciples />
      <DeliveryProcess />
      <BuildChecklist />
      <Ownership />
      <Testimonials />
      <InsightsEcosystem />
      <Footer />
    </main>
  );
}
