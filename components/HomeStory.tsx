"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, useScroll, type Variants } from "framer-motion";
import JsonLd from "@/components/seo/JsonLd";

/* ================= ANIMATION CONSTANTS ================= */

const viewportOnce = { once: true, amount: 0.25 };
const viewportSoft = { once: true, amount: 0.1 };

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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

const marqueeAnimation = { x: ["0%", "-50%"] };
const marqueeTransition = {
  duration: 40,
  repeat: Infinity,
  ease: "linear",
} as const;

/* ================= DATA ================= */

const marqueeItems = [
  "Personal Branding",
  "AI Automation",
  "CRM Systems",
  "Content Engines",
  "Digital Marketing",
  "Full Stack Development",
  "Staffing Solutions",
];

const stats = [
  { value: 5, suffix: "", label: "Countries Served" },
  { value: 6, suffix: "", label: "Growth Systems" },
  { value: 24, suffix: "h", label: "Response Time" },
  { value: 7, suffix: "", label: "Days a Week" },
];

const platforms = [
  {
    name: "Trustpilot",
    subtitle: "Verified Reviews",
    href: "https://www.trustpilot.com/review/socieas.com",
  },
  {
    name: "Google Reviews",
    subtitle: "Customer Feedback",
    href: "https://g.page/r/CZRSUSQ4ceKYEBM/review",
  },
  {
    name: "Sitejabber",
    subtitle: "Public Reputation",
    href: "https://www.smartcustomer.com/reviews/socieas.com",
  },
];

const pains = [
  {
    number: "01",
    title: "Nobody sees you",
    line: "You do great work. The market has no idea it exists.",
  },
  {
    number: "02",
    title: "You post at random",
    line: "Consistency builds memory. Random posting builds nothing.",
  },
  {
    number: "03",
    title: "Referrals have a ceiling",
    line: "Word of mouth built you. It cannot scale you.",
  },
];

const storyLines = [
  { text: "Imagine posting once a day, with a plan.", highlight: false },
  { text: "The right people start to recognize your name.", highlight: false },
  { text: "They trust you before the first call.", highlight: false },
  { text: "Clients come to you.", highlight: true },
];

const funnel = [
  { label: "Strangers see your content", width: "w-full", tone: "bg-violet-700" },
  { label: "Followers start to trust you", width: "w-2/3", tone: "bg-violet-600" },
  { label: "Buyers book a call", width: "w-1/3", tone: "bg-violet-500" },
];

const method = [
  {
    number: "01",
    title: "Position",
    description: "We find the one story only you can tell, and the offer behind it.",
  },
  {
    number: "02",
    title: "Publish",
    description: "Daily content built from that story, planned a month ahead.",
  },
  {
    number: "03",
    title: "Capture",
    description: "CRM and automation record every visit, reply, and signal.",
  },
  {
    number: "04",
    title: "Convert",
    description: "You take warm calls with people who already trust you.",
  },
];

const services = [
  {
    number: "01",
    title: "Personal Branding",
    desc: "Positioning, content, and daily publishing that turn your expertise into inbound demand.",
    href: "/services/personal-branding",
  },
  {
    number: "02",
    title: "AI Automation",
    desc: "Follow ups, replies, and workflows that keep running while you sleep.",
    href: "/services/ai-automation",
  },
  {
    number: "03",
    title: "CRM Solutions",
    desc: "One clean pipeline for every lead, so nothing slips through.",
    href: "/services/crm-solutions",
  },
  {
    number: "04",
    title: "Full Stack Development",
    desc: "Fast, search ready websites built to convert visitors into enquiries.",
    href: "/services/full-stack-development",
  },
  {
    number: "05",
    title: "Digital Marketing",
    desc: "Search and social campaigns that bring qualified traffic to your door.",
    href: "/services/digital-marketing",
  },
  {
    number: "06",
    title: "Staffing Solutions",
    desc: "Vetted talent to scale your delivery without the hiring overhead.",
    href: "/services/staffing-solutions",
  },
];

const timeline = [
  {
    period: "Week 1",
    text: "Positioning locked. Story, offer, and content pillars defined.",
  },
  {
    period: "Weeks 2 to 4",
    text: "Content engine goes live. You show up daily without touching a calendar.",
  },
  {
    period: "Month 2",
    text: "Recognition compounds. Profile visits, followers, and replies climb.",
  },
  {
    period: "Month 3",
    text: "Capture switches on. CRM and automation start collecting real demand.",
  },
];

const fitYes = [
  "You have real results your market does not know about.",
  "You can give us two hours a month.",
  "You think in quarters, not days.",
  "You want inbound demand, not cold outreach.",
];

const fitNo = [
  "You want to go viral by Friday.",
  "You want bought followers and inflated numbers.",
  "You are not ready to publish consistently.",
  "You expect a magic button instead of a system.",
];

const faqs = [
  {
    q: "What does Socieas do?",
    a: "Socieas is a growth agency that builds personal brands for founders and installs the systems behind them: strategic content, CRM, AI automation, websites, and digital marketing. We serve clients in India, the USA, UK, Australia, and UAE.",
  },
  {
    q: "How long does personal branding take to show results?",
    a: "Most founders see meaningful visibility growth within 60 to 90 days of consistent publishing, and inbound leads typically start between months 3 and 6. Authority compounds, so the system gets stronger every month.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. Socieas works remotely with founders and businesses in India, the United States, United Kingdom, Australia, and the UAE, with async communication and calls scheduled across time zones.",
  },
  {
    q: "What makes Socieas different from a social media agency?",
    a: "Social media agencies post content. Socieas builds the full growth system: positioning, content, the CRM that captures interest, and the AI automation that follows up. That way visibility actually converts into revenue.",
  },
  {
    q: "How much do Socieas services cost?",
    a: "Engagements are scoped to your goals after a free strategy call. Most clients start with a single system such as personal branding, CRM, or automation, and expand as results compound.",
  },
  {
    q: "How do I get started with Socieas?",
    a: "Book a free strategy call through the contact page. You will get a clear assessment of your current visibility and a prioritized plan, whether or not you decide to work with us.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

/* ================= HELPERS ================= */

function Counter(props: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, viewportOnce);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * props.value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, props.value]);

  return (
    <span ref={ref}>
      {display}
      {props.suffix}
    </span>
  );
}

function Eyebrow(props: { children: string }) {
  return (
    <div className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
      {props.children}
    </div>
  );
}

/* ================= SECTIONS ================= */

function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <section className="overflow-hidden border-y border-slate-200 bg-white py-4">
      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        animate={marqueeAnimation}
        transition={marqueeTransition}
      >
        {doubled.map((item, index) => (
          <span
            key={item + index}
            className="mx-6 flex items-center gap-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            {item}
            <span className="text-violet-500">•</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function Today() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Today</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            We are early. That is{" "}
            <span className="text-violet-600">your advantage.</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            No layers. No junior handoffs. The people who plan your growth are
            the people who build it. Here is what we can prove today, and
            nothing we cannot.
          </p>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="text-center">
              <div className="text-4xl font-black text-[#111111] md:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {platforms.map((platform) => (
            <motion.a
              key={platform.name}
              variants={itemVariants}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
            >
              <div>
                <div className="font-bold text-[#111111]">{platform.name}</div>
                <div className="mt-0.5 text-xs text-slate-500">{platform.subtitle}</div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-slate-400 transition-colors duration-300 group-hover:text-violet-600"
              />
            </motion.a>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Every review is public. Read them yourself before you trust us.
        </p>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>The Problem</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Being great is not enough.{" "}
            <span className="text-violet-600">Being seen is.</span>
          </h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {pains.map((pain) => (
            <motion.div
              key={pain.number}
              variants={itemVariants}
              whileHover={hoverLift}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-colors duration-300 hover:border-violet-300"
            >
              <div className="text-sm font-black tracking-widest text-violet-600">
                {pain.number}
              </div>
              <h3 className="mt-3 text-2xl font-black text-[#111111]">{pain.title}</h3>
              <p className="mt-3 text-lg leading-7 text-slate-600">{pain.line}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="relative mt-10"
        >
          <div className="relative overflow-hidden rounded-[40px] border border-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
            <Image
              src="/images/home/visibility-compoundsv2.webp"
              alt="How founder visibility compounds over time"
              width={1600}
              height={900}
              priority={false}
              className="h-auto w-full object-cover transition duration-700 hover:scale-[1.01]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Shift() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Eyebrow>The Shift</Eyebrow>
        <div className="mt-10 space-y-10 md:space-y-14">
          {storyLines.map((line) => (
            <motion.p
              key={line.text}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className={
                line.highlight
                  ? "text-4xl font-black tracking-tight text-violet-600 md:text-6xl"
                  : "text-4xl font-black tracking-tight text-[#111111] md:text-6xl"
              }
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Funnel() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Eyebrow>The Math</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Attention becomes <span className="text-violet-600">revenue.</span>
          </h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 flex flex-col items-center gap-4"
        >
          {funnel.map((stage) => (
            <motion.div
              key={stage.label}
              variants={growXVariants}
              className={`${stage.width} ${stage.tone} origin-center rounded-2xl px-6 py-5 text-center shadow-md`}
            >
              <span className="text-base font-bold text-white md:text-lg">
                {stage.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-8 text-slate-600">
          Most of your market will never buy. The system exists to find the
          ones who will, and to make you unmissable when they are ready.
        </p>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>The Method</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            One system. <span className="text-violet-600">Four stages.</span>
          </h2>
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
            {method.map((item) => (
              <motion.div
                key={item.number}
                variants={itemVariants}
                whileHover={hoverLift}
                className="relative"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-lg font-black text-white shadow-md">
                  {item.number}
                </div>
                <div className="mt-4 rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6 transition-colors duration-300 hover:border-violet-300">
                  <h3 className="text-xl font-black text-[#111111]">{item.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const slide = (direction: number) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>What We Build</Eyebrow>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Start with one system.{" "}
              <span className="text-violet-600">Stack the rest.</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => slide(-1)}
              aria-label="Scroll services left"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:border-violet-400 hover:text-violet-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => slide(1)}
              aria-label="Scroll services right"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:border-violet-400 hover:text-violet-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="group min-w-[300px] max-w-[340px] shrink-0 snap-start rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div className="text-sm font-black tracking-widest text-violet-600">
                  {service.number}
                </div>
                <ArrowUpRight
                  size={20}
                  className="translate-y-1 text-violet-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-0 group-hover:opacity-100"
                />
              </div>
              <h3 className="mt-4 text-2xl font-black text-[#111111]">{service.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{service.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
          >
            Explore All Services
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function NinetyDays() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Eyebrow>The Timeline</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Your first 90 days, <span className="text-violet-600">mapped.</span>
          </h2>
        </div>

        <div className="relative mt-12 pl-8 md:pl-10">
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
            {timeline.map((step) => (
              <motion.div key={step.period} variants={itemVariants} className="relative">
                <div className="absolute -left-8 top-1.5 h-4 w-4 rounded-full border-4 border-white bg-violet-600 shadow md:-left-9" />
                <div className="text-sm font-black uppercase tracking-widest text-violet-600">
                  {step.period}
                </div>
                <p className="mt-1 text-lg font-medium leading-8 text-[#111111]">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6 text-center">
          <p className="text-base leading-7 text-slate-600">
            We will not promise you leads by a fixed date. Nobody honest can.
            We promise the system, the consistency, and reporting so clear you
            can see it working.
          </p>
        </div>
      </div>
    </section>
  );
}

function FitCheck() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <Eyebrow>Fit Check</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            This only works for <span className="text-violet-600">some people.</span>
          </h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-10 grid gap-5 md:grid-cols-2"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-violet-200 bg-white p-8"
          >
            <h3 className="text-xl font-black text-[#111111]">Work with us if</h3>
            <ul className="mt-5 space-y-4">
              {fitYes.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-700">
                  <span className="font-black text-violet-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-slate-200 bg-white p-8"
          >
            <h3 className="text-xl font-black text-[#111111]">Skip us if</h3>
            <ul className="mt-5 space-y-4">
              {fitNo.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-500">
                  <span className="font-black text-slate-400">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQBlock() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-3xl border border-slate-200 bg-[#F8F8F6] p-5 transition-all duration-300 hover:border-violet-300 open:bg-white open:shadow-lg"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-[#111111]">
                {faq.q}
                <ChevronDown
                  size={20}
                  className="shrink-0 text-violet-600 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd id="faq-schema" schema={faqSchema} />
    </section>
  );
}

/* ================= EXPORT ================= */

export default function HomeStory() {
  const scrollData = useScroll();
  const progressStyle = { scaleX: scrollData.scrollYProgress };

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-violet-600"
        style={progressStyle}
      />
      <Marquee />
      <Today />
      <Problem />
      <Shift />
      <Funnel />
      <Method />
      <ServicesCarousel />
      <NinetyDays />
      <FitCheck />
      <FAQBlock />
    </>
  );
}
