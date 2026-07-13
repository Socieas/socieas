"use client";

import { useState } from "react";
import Link from "next/link";
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

const growXVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: "easeOut" } },
};

const growYVariants: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.4, ease: "easeOut" } },
};

const hoverLift = { y: -6 };

const tileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

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

const heroTiles = [
  { number: "01", name: "Personal Branding" },
  { number: "02", name: "Digital Marketing" },
  { number: "03", name: "CRM Systems" },
  { number: "04", name: "AI Automation" },
  { number: "05", name: "Development" },
  { number: "06", name: "Staffing" },
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

const integrationFlow = [
  {
    step: "01",
    title: "Website captures",
    text: "Every enquiry lands with context: goal, stage, and source.",
  },
  {
    step: "02",
    title: "CRM logs it",
    text: "The lead is tracked and scored the second it arrives.",
  },
  {
    step: "03",
    title: "Automation responds",
    text: "Follow up goes out in minutes, not days.",
  },
  {
    step: "04",
    title: "You close",
    text: "You step in for the one thing machines cannot do: the relationship.",
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
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div variants={listVariants} initial="hidden" animate="show">
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-black leading-[0.98] tracking-tight text-[#111111] md:text-7xl"
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
              className="mt-8 max-w-xl text-xl leading-relaxed text-slate-600"
            >
              Every service here exists for one reason: to turn attention into
              revenue. Start with the one that removes your biggest
              bottleneck, then stack the rest as results compound.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-2xl bg-violet-700 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
              >
                Book a Free Strategy Call
              </Link>
              <a
                href="#explore"
                className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-7 py-4 font-semibold text-[#111111] transition-all duration-300 hover:border-violet-400"
              >
                Explore the Systems
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {heroTiles.map((tile) => (
              <motion.div
                key={tile.number}
                variants={tileVariants}
                whileHover={hoverLift}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-violet-300"
              >
                <div className="text-sm font-black tracking-widest text-violet-600">
                  {tile.number}
                </div>
                <div className="mt-2 font-black leading-tight text-[#111111]">
                  {tile.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceExplorer() {
  const [activeService, setActiveService] = useState(0);
  const current = services[activeService];

  return (
    <section id="explore" className="pb-20 md:pb-24">
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

function IntegrationFlow() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Your tools, <span className="text-violet-600">finally talking.</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Most businesses run disconnected tools. We wire yours into one
            pipeline where nothing gets lost between systems.
          </p>
        </div>

        <div className="relative mt-12">
          <motion.div
            variants={growXVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="absolute left-0 top-6 hidden h-1 w-full origin-left rounded-full bg-violet-600 lg:block"
          />
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {integrationFlow.map((node) => (
              <motion.div key={node.step} variants={itemVariants} className="relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-lg font-black text-white shadow-md">
                  {node.step}
                </div>
                <div className="mt-4 rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6 transition-colors duration-300 hover:border-violet-300">
                  <h3 className="text-xl font-black text-[#111111]">{node.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{node.text}</p>
                </div>
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
    <section className="bg-[#F8F8F6] py-12 md:py-16">
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
    <section className="bg-white py-12 md:py-16">
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
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#F8F8F6] px-6 py-5 transition-colors duration-300 hover:border-violet-300"
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
    <section className="bg-[#F8F8F6] py-12 md:py-16">
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
              className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
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
      <ServiceExplorer />
      <BottleneckPicker />
      <StackLadder />
      <TechStack />
      <EngineeringPrinciples />
      <IntegrationFlow />
      <DeliveryProcess />
      <BuildChecklist />
      <Ownership />
      <Testimonials />
      <InsightsEcosystem />
      <Footer />
    </main>
  );
}
