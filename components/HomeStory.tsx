"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";
import JsonLd from "@/components/seo/JsonLd";

/* ================= ANIMATION CONSTANTS ================= */

const viewportOnce = { once: true, amount: 0.25 };
const viewportSoft = { once: true, amount: 0.1 };

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const growVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: "easeOut" } },
};

const hoverLift = { y: -8 };

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
  { value: 10, suffix: "M+", label: "Content Reach" },
  { value: 500, suffix: "+", label: "Posts Published" },
  { value: 24, suffix: "h", label: "Response Time" },
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
    icon: "🫥",
    title: "Invisible",
    line: "You do great work. Nobody sees it.",
  },
  {
    icon: "🔁",
    title: "Inconsistent",
    line: "You post sometimes. Momentum dies.",
  },
  {
    icon: "🐢",
    title: "Referral Dependent",
    line: "Word of mouth only goes so far.",
  },
];

const storyLines = [
  { text: "You show up once a day.", highlight: false },
  { text: "The right people start to notice.", highlight: false },
  { text: "They trust you before the first call.", highlight: false },
  { text: "Clients come to you.", highlight: true },
];

const funnel = [
  { label: "Thousands see you", width: "w-full", tone: "from-violet-600 to-violet-500" },
  { label: "Hundreds trust you", width: "w-2/3", tone: "from-violet-600 to-fuchsia-500" },
  { label: "The right ones buy", width: "w-1/3", tone: "from-fuchsia-600 to-fuchsia-500" },
];

const journey = [
  { number: "01", title: "Nobody Knows You", description: "Great work, zero attention." },
  { number: "02", title: "People Notice You", description: "Consistent content builds recall." },
  { number: "03", title: "Trust Compounds", description: "Prospects arrive already sold." },
  { number: "04", title: "Growth Gets Easier", description: "Inbound leads replace cold chasing." },
];

const services = [
  {
    icon: "👤",
    title: "Personal Branding",
    desc: "Turn expertise into inbound clients.",
    href: "/services/personal-branding",
  },
  {
    icon: "🤖",
    title: "AI Automation",
    desc: "Every lead followed up, automatically.",
    href: "/services/ai-automation",
  },
  {
    icon: "📊",
    title: "CRM Solutions",
    desc: "No opportunity slips through.",
    href: "/services/crm-solutions",
  },
  {
    icon: "🌐",
    title: "Full Stack Development",
    desc: "Fast websites built to convert.",
    href: "/services/full-stack-development",
  },
  {
    icon: "📈",
    title: "Digital Marketing",
    desc: "Qualified traffic that compounds.",
    href: "/services/digital-marketing",
  },
  {
    icon: "🤝",
    title: "Staffing Solutions",
    desc: "Vetted talent, zero hiring overhead.",
    href: "/services/staffing-solutions",
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

function Eyebrow(props: { children: string }) {
  return (
    <div className="text-sm font-medium uppercase tracking-[0.25em] text-violet-600">
      {props.children}
    </div>
  );
}

function GradientSpan(props: { children: string }) {
  return (
    <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
      {props.children}
    </span>
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
            <span className="text-violet-500">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function ProofBand() {
  return (
    <section className="bg-gradient-to-b from-violet-50 via-white to-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Eyebrow>Proof, Not Promises</Eyebrow>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
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
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_15px_50px_rgba(139,92,246,0.15)]"
            >
              <div>
                <div className="font-bold text-[#111111]">{platform.name}</div>
                <div className="mt-0.5 text-xs text-slate-500">{platform.subtitle}</div>
              </div>
              <span className="text-sm tracking-widest text-amber-500">★★★★★</span>
            </motion.a>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Every review is public. Click any platform and read them yourself.
        </p>
      </div>
    </section>
  );
}

function HardTruth() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
            The Hard Truth
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Being great is not enough. <GradientSpan>Being seen is.</GradientSpan>
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
              key={pain.title}
              variants={itemVariants}
              whileHover={hoverLift}
              className="rounded-3xl border border-slate-200 bg-[#F8F8F6] p-7 text-center shadow-sm transition-colors duration-300 hover:border-violet-200"
            >
              <div className="text-5xl">{pain.icon}</div>
              <h3 className="mt-4 text-2xl font-black text-[#111111]">{pain.title}</h3>
              <p className="mt-2 text-lg leading-7 text-slate-600">{pain.line}</p>
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
          <div className="absolute inset-0 rounded-[40px] bg-violet-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[40px] border border-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
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

function StoryLines() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Eyebrow>Now Imagine This</Eyebrow>
        <div className="mt-10 space-y-10 md:space-y-14">
          {storyLines.map((line) => (
            <motion.p
              key={line.text}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="text-4xl font-black tracking-tight md:text-6xl"
            >
              {line.highlight ? (
                <GradientSpan>{line.text}</GradientSpan>
              ) : (
                <span className="text-[#111111]">{line.text}</span>
              )}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Funnel() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Eyebrow>The Math</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Attention becomes <GradientSpan>revenue.</GradientSpan>
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
              variants={growVariants}
              className={`${stage.width} origin-center rounded-2xl bg-gradient-to-r ${stage.tone} px-6 py-5 text-center shadow-lg`}
            >
              <span className="text-base font-bold text-white md:text-lg">
                {stage.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-lg text-slate-600">
          Content creates the attention. Systems catch the buyers.
        </p>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Your personal brand becomes your{" "}
            <GradientSpan>unfair advantage.</GradientSpan>
          </h2>
        </div>

        <div className="relative mt-12">
          <motion.div
            variants={growVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="absolute left-0 top-6 hidden h-1 w-full origin-left rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 lg:block"
          />

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {journey.map((item) => (
              <motion.div
                key={item.number}
                variants={itemVariants}
                whileHover={hoverLift}
                className="relative"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-black text-white shadow-lg">
                  {item.number}
                </div>
                <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-violet-200">
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

function Services() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>What We Build</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Six systems. <GradientSpan>One growth engine.</GradientSpan>
          </h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Link
                href={service.href}
                className="group block rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:bg-white hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="translate-y-1 text-violet-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#111111]">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
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

function FAQBlock() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Eyebrow>Questions, Answered</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-violet-200 open:shadow-lg"
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
  return (
    <>
      <Marquee />
      <ProofBand />
      <HardTruth />
      <StoryLines />
      <Funnel />
      <Journey />
      <Services />
      <FAQBlock />
    </>
  );
}
