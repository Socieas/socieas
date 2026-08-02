"use client";

import Link from "next/link";
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

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
  { value: 48, suffix: "h", label: "Plan Delivery" },
  { value: 30, suffix: "", label: "Days Planned Ahead" },
  { value: 90, suffix: "", label: "Days To Full System" },
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

const hookWords = ["clients", "trust", "authority", "reach", "freedom"];

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

const oldWay = [
  "Cold messages strangers ignore",
  "Posting whenever you remember",
  "Leads scattered across spreadsheets",
  "Growth stops the moment you stop",
];

const newWay = [
  "Buyers arrive already convinced",
  "Content shipped daily, on schedule",
  "Every lead tracked and followed up",
  "Growth compounds while you deliver",
];

const funnel = [
  { label: "Strangers see your content", width: "w-full", tone: "bg-violet-700" },
  { label: "Followers start to trust you", width: "w-2/3", tone: "bg-violet-600" },
  { label: "Buyers book a call", width: "w-1/3", tone: "bg-violet-500" },
];

const auditItems = [
  "Buyers can find me by name on Google",
  "I publish content at least 3 times a week",
  "My last 10 leads came inbound",
  "Every lead I get is tracked in a CRM",
  "Enquiries get a reply within one business day",
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

const yearStages = [
  { from: 1, to: 2, text: "Foundations. Positioning and publishing rhythm lock in." },
  { from: 3, to: 4, text: "Familiar faces. Your name starts ringing bells in your niche." },
  { from: 5, to: 6, text: "Warm replies. Comments and DMs turn friendly and specific." },
  { from: 7, to: 9, text: "Inbound trickle. Strangers start booking calls on their own." },
  { from: 10, to: 12, text: "Compounding. Your content keeps selling while you deliver." },
];

const formats = [
  {
    name: "LinkedIn",
    headline: "Where B2B decisions start.",
    points: [
      "Daily posts written in your voice",
      "Comment strategy that builds real relationships",
      "A profile optimized to convert visits into calls",
    ],
  },
  {
    name: "Instagram",
    headline: "Reach beyond your network.",
    points: [
      "Reels scripted from your core story",
      "Carousels people save and share",
      "Stories that build daily familiarity",
    ],
  },
  {
    name: "YouTube",
    headline: "Depth builds authority.",
    points: [
      "Long form videos that answer real buyer questions",
      "Each video cut into weeks of short clips",
      "Titles and descriptions built for search",
    ],
  },
  {
    name: "Newsletter & Blog",
    headline: "Own your audience.",
    points: [
      "Articles built to rank on Google and AI search",
      "Emails your list actually opens",
      "An asset you own forever, not rented reach",
    ],
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

const yourPart = [
  "Approve content in minutes, not hours",
  "Record raw thoughts on your phone",
  "Show up to warm calls",
];

const ourPart = [
  "Strategy, writing, design, and publishing",
  "Comments, DMs, and engagement",
  "CRM setup and lead tracking",
  "Automated follow ups",
  "Reporting you can read in 5 minutes",
];

const countries = [
  { name: "India", zone: "IST" },
  { name: "United States", zone: "EST to PST" },
  { name: "United Kingdom", zone: "GMT" },
  { name: "Australia", zone: "AEST" },
  { name: "UAE", zone: "GST" },
];

const principles = [
  {
    number: "01",
    title: "Systems over hacks",
    text: "Nothing we build depends on luck, trends, or one viral post.",
  },
  {
    number: "02",
    title: "Consistency over intensity",
    text: "Daily beats viral, every single quarter. We engineer the daily.",
  },
  {
    number: "03",
    title: "Evidence over hype",
    text: "If we cannot measure it, we do not sell it. You see every number.",
  },
  {
    number: "04",
    title: "Ownership over rented reach",
    text: "Your audience, your data, your asset. It stays yours forever.",
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

const nextSteps = [
  {
    number: "01",
    title: "Book the call",
    text: "Thirty minutes about your goals. Not a sales pitch.",
  },
  {
    number: "02",
    title: "Get your plan",
    text: "A written visibility plan for your brand within 48 hours.",
  },
  {
    number: "03",
    title: "You decide",
    text: "Build it with us, or take the plan and run it yourself.",
  },
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

function auditMessage(score: number) {
  if (score <= 1) return "You are invisible right now. That means massive upside.";
  if (score <= 3) return "You have sparks, but no system. This is fixable fast.";
  if (score === 4) return "Close. One or two gaps are costing you leads.";
  return "Strong. Now let us make it scale without you.";
}

function stageForMonth(month: number) {
  const stage = yearStages.find((item) => month >= item.from && month <= item.to);
  return stage ? stage.text : yearStages[0].text;
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

function Expertise() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
          >
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Everything you need to be seen.{" "}
              <span className="text-violet-600">Nothing you do not.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Personal branding, content, CRM, and AI automation, engineered as
              one connected system. You bring the expertise. We turn it into
              demand. These are our working commitments on every engagement.
            </p>
          </motion.div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6 text-center"
              >
                <div className="text-4xl font-black text-[#111111] md:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-12 grid gap-4 md:grid-cols-3"
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

function RotatingHook() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % hookWords.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-6xl">
          A strong personal brand brings you{" "}
          <motion.span
            key={hookWords[index]}
            variants={fadeVariants}
            initial="hidden"
            animate="show"
            className="inline-block text-violet-600"
          >
            {hookWords[index]}.
          </motion.span>
        </h2>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
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
              className="rounded-3xl border border-slate-200 bg-[#F8F8F6] p-7 transition-colors duration-300 hover:border-violet-300"
            >
              <div className="text-sm font-black tracking-widest text-violet-600">
                {pain.number}
              </div>
              <h3 className="mt-3 text-2xl font-black text-[#111111]">{pain.title}</h3>
              <p className="mt-3 text-lg leading-7 text-slate-600">{pain.line}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Shift() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="space-y-10 md:space-y-14">
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

function OldWayNewWay() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Two ways to grow.{" "}
            <span className="text-violet-600">Only one compounds.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <motion.div
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="rounded-3xl border border-slate-200 bg-[#F8F8F6] p-8"
          >
            <h3 className="text-xl font-black text-slate-500">Without a system</h3>
            <ul className="mt-5 space-y-4">
              {oldWay.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-500">
                  <span className="font-black text-slate-400">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={slideRightVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="rounded-3xl border-2 border-violet-300 bg-white p-8 shadow-[0_20px_60px_rgba(139,92,246,0.12)]"
          >
            <h3 className="text-xl font-black text-[#111111]">With Socieas</h3>
            <ul className="mt-5 space-y-4">
              {newWay.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-700">
                  <span className="font-black text-violet-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Funnel() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
          >
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Attention becomes <span className="text-violet-600">revenue.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Most of your market will never buy. The system exists to find
              the ones who will, and to make you unmissable when they are
              ready.
            </p>
          </motion.div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col items-center gap-4"
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
        </div>
      </div>
    </section>
  );
}

function SelfAudit() {
  const [checks, setChecks] = useState([false, false, false, false, false]);

  const toggle = (target: number) => {
    setChecks((current) =>
      current.map((value, index) => (index === target ? !value : value))
    );
  };

  const score = checks.filter(Boolean).length;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Score your visibility in{" "}
              <span className="text-violet-600">20 seconds.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Tap every statement that is true for you today.
            </p>

            <div className="mt-8 space-y-3">
              {auditItems.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggle(index)}
                  className={
                    checks[index]
                      ? "flex w-full items-center gap-4 rounded-2xl border-2 border-violet-400 bg-violet-50 p-4 text-left font-semibold text-[#111111] transition-all duration-300"
                      : "flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-[#F8F8F6] p-4 text-left font-medium text-slate-600 transition-all duration-300 hover:border-violet-300"
                  }
                >
                  <span
                    className={
                      checks[index]
                        ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white"
                        : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-black text-transparent"
                    }
                  >
                    ✓
                  </span>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="rounded-[32px] border border-slate-200 bg-[#F8F8F6] p-10 text-center">
              <div className="text-7xl font-black text-violet-600 md:text-8xl">
                {score}
                <span className="text-3xl text-slate-400 md:text-4xl">/5</span>
              </div>
              <motion.p
                key={score}
                variants={fadeVariants}
                initial="hidden"
                animate="show"
                className="mt-4 text-xl font-bold text-[#111111]"
              >
                {auditMessage(score)}
              </motion.p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-violet-700 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
              >
                Fix the gaps
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
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
                <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-violet-300">
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

function YearSlider() {
  const [month, setMonth] = useState(3);
  const barStyle = { width: `${(month / 12) * 100}%` };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
          Drag through your <span className="text-violet-600">first year.</span>
        </h2>

        <div className="mt-10 rounded-[32px] border border-slate-200 bg-[#F8F8F6] p-8 md:p-10">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-black uppercase tracking-widest text-violet-600">
              Month {month}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Slide me
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={12}
            value={month}
            onChange={(event) => setMonth(Number(event.target.value))}
            aria-label="Month of your first year"
            className="mt-4 w-full accent-violet-600"
          />
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-violet-600 transition-all duration-300"
              style={barStyle}
            />
          </div>
          <motion.p
            key={stageForMonth(month)}
            variants={fadeVariants}
            initial="hidden"
            animate="show"
            className="mt-6 text-xl font-bold leading-9 text-[#111111] md:text-2xl"
          >
            {stageForMonth(month)}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function ContentFormats() {
  const [active, setActive] = useState(0);
  const current = formats[active];

  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              One story. <span className="text-violet-600">Every platform.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We turn your positioning into content built for how each
              platform actually works. Tap a channel to see what ships.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {formats.map((format, index) => (
                <button
                  key={format.name}
                  type="button"
                  onClick={() => setActive(index)}
                  className={
                    active === index
                      ? "rounded-full bg-violet-700 px-6 py-3 text-sm font-bold text-white transition-all duration-300"
                      : "rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-violet-300 hover:text-violet-700"
                  }
                >
                  {format.name}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={active}
            variants={fadeVariants}
            initial="hidden"
            animate="show"
            className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10"
          >
            <h3 className="text-2xl font-black text-[#111111] md:text-3xl">
              {current.headline}
            </h3>
            <ul className="mt-6 space-y-4">
              {current.points.map((point) => (
                <li key={point} className="flex gap-3 text-lg leading-8 text-slate-700">
                  <span className="font-black text-violet-600">✓</span>
                  {point}
                </li>
              ))}
            </ul>
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
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Start with one system.{" "}
            <span className="text-violet-600">Stack the rest.</span>
          </h2>
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
              className="group min-w-[300px] max-w-[340px] shrink-0 snap-start rounded-3xl border border-slate-200 bg-[#F8F8F6] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:bg-white hover:shadow-xl"
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

function YouVsUs() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Your part is small. <span className="text-violet-600">By design.</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The system only asks for what nobody else can give: your voice.
            Everything else is our job.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <motion.div
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="rounded-3xl border border-slate-200 bg-white p-8"
          >
            <h3 className="text-xl font-black text-[#111111]">You</h3>
            <ul className="mt-5 space-y-4">
              {yourPart.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-700">
                  <span className="font-black text-violet-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={slideRightVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="rounded-3xl border-2 border-violet-300 bg-white p-8 shadow-[0_20px_60px_rgba(139,92,246,0.12)]"
          >
            <h3 className="text-xl font-black text-[#111111]">Socieas</h3>
            <ul className="mt-5 space-y-4">
              {ourPart.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-700">
                  <span className="font-black text-violet-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GlobalReach() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            One team. <span className="text-violet-600">Five markets.</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Async first, with calls scheduled in your timezone.
          </p>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {countries.map((country) => (
            <motion.div
              key={country.name}
              variants={itemVariants}
              whileHover={hoverLift}
              className="rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6 text-center transition-colors duration-300 hover:border-violet-300"
            >
              <span className="mx-auto flex h-3 w-3 items-center justify-center">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-violet-600" />
              </span>
              <div className="mt-3 font-black text-[#111111]">{country.name}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {country.zone}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              How we <span className="text-violet-600">work.</span>
            </h2>
          </div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="grid gap-5 sm:grid-cols-2 lg:col-span-2"
          >
            {principles.map((principle) => (
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

function Manifesto() {
  return (
    <section className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-4xl font-black tracking-tight text-[#111111] md:text-6xl"
        >
          People buy from people.
        </motion.h2>
        <motion.div
          variants={growXVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-6 h-1.5 w-40 origin-left rounded-full bg-violet-600 md:w-56"
        />
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-slate-600 md:text-2xl md:leading-10"
        >
          Your buyers are not searching for another agency. They are searching
          for someone they can trust. We make sure that someone is you.
        </motion.p>
      </div>
    </section>
  );
}

function CostOfWaiting() {
  const [waiting, setWaiting] = useState(false);

  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
          Six months from now, <span className="text-violet-600">where are you?</span>
        </h2>

        <div className="mt-8 inline-flex rounded-full border border-slate-300 bg-white p-1.5">
          <button
            type="button"
            onClick={() => setWaiting(false)}
            className={
              waiting
                ? "rounded-full px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-300"
                : "rounded-full bg-violet-700 px-6 py-3 text-sm font-bold text-white transition-all duration-300"
            }
          >
            Start this quarter
          </button>
          <button
            type="button"
            onClick={() => setWaiting(true)}
            className={
              waiting
                ? "rounded-full bg-violet-700 px-6 py-3 text-sm font-bold text-white transition-all duration-300"
                : "rounded-full px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-300"
            }
          >
            Wait six months
          </button>
        </div>

        <motion.div
          key={String(waiting)}
          variants={fadeVariants}
          initial="hidden"
          animate="show"
          className="mx-auto mt-8 max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 md:p-10"
        >
          {waiting ? (
            <p className="text-xl font-bold leading-9 text-slate-500 md:text-2xl">
              You are exactly where you are today, watching competitors become
              the obvious choice in your market.
            </p>
          ) : (
            <p className="text-xl font-bold leading-9 text-[#111111] md:text-2xl">
              You have roughly 180 pieces of content working for you, a warm
              audience that knows your name, and a pipeline that fills itself.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function NinetyDays() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Your first 90 days, <span className="text-violet-600">mapped.</span>
            </h2>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6">
              <p className="text-base leading-7 text-slate-600">
                We will not promise you leads by a fixed date. Nobody honest
                can. We promise the system, the consistency, and reporting so
                clear you can see it working.
              </p>
            </div>
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
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            This only works for <span className="text-violet-600">some people.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <motion.div
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
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
            variants={slideRightVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
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
        </div>
      </div>
    </section>
  );
}

function NextSteps() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            What happens when <span className="text-violet-600">you reach out.</span>
          </h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {nextSteps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              whileHover={hoverLift}
              className="rounded-3xl border border-slate-200 bg-[#F8F8F6] p-7 transition-colors duration-300 hover:border-violet-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-lg font-black text-white">
                {step.number}
              </div>
              <h3 className="mt-4 text-xl font-black text-[#111111]">{step.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactStrip() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@socieas.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
          Talk to a <span className="text-violet-600">human.</span>
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Replies within one business day. No bots, no scripts.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400"
          >
            {copied ? "Copied ✓" : "hello@socieas.com"}
          </button>
          <a
            href="https://wa.me/919142874636"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400"
          >
            WhatsApp us
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-violet-700 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
          >
            Book a Free Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQBlock() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Questions, <span className="text-violet-600">answered.</span>
            </h2>
          </div>

          <div className="space-y-3 lg:col-span-2">
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
      <Expertise />
      <RotatingHook />
      <Problem />
      <Shift />
      <OldWayNewWay />
      <Funnel />
      <SelfAudit />
      <Method />
      <YearSlider />
      <ContentFormats />
      <ServicesCarousel />
      <YouVsUs />
      <GlobalReach />
      <Principles />
      <Manifesto />
      <CostOfWaiting />
      <NinetyDays />
      <FitCheck />
      <NextSteps />
      <ContactStrip />
      <FAQBlock />
    </>
  );
}