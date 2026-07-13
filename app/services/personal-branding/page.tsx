"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import InsightsEcosystem from "@/components/InsightsEcosystem";
import JsonLd from "@/components/seo/JsonLd";

/* ================= ANIMATION CONSTANTS ================= */

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

const hoverLift = { y: -6 };

/* ================= DATA ================= */

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

const visibilityModes = [
  {
    label: "The invisible expert",
    heading: "Works and waits.",
    points: [
      "Depends on referrals and hopes the phone rings",
      "Competes on price because nobody knows the difference",
      "Explains their value from zero in every conversation",
      "Watches louder, less skilled competitors win the market",
    ],
  },
  {
    label: "The visible authority",
    heading: "Builds and attracts.",
    points: [
      "Publishes consistently and educates the market",
      "Gets compared on trust, not on price",
      "Walks into calls where the selling is already done",
      "Becomes the first name people think of when they need help",
    ],
  },
];

const flywheel = [
  { step: "01", label: "Create" },
  { step: "02", label: "Visibility" },
  { step: "03", label: "Trust" },
  { step: "04", label: "Inbound Growth" },
  { step: "05", label: "Create Again" },
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
      "Most founders see meaningful visibility and engagement growth within 60 to 90 days of consistent publishing, with authority and inbound leads compounding after that.",
  },
  {
    question: "Which countries does Socieas serve?",
    answer:
      "Socieas works with founders and businesses in India, the USA, the UK, Australia, and the UAE, with remote collaboration across time zones.",
  },
  {
    question: "Do I have to write the content myself?",
    answer:
      "No. We extract your ideas and stories through structured interviews, then our team turns them into content in your voice. You review and approve, we handle the rest.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/* ================= SECTIONS ================= */

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-40">
      <div className="pointer-events-none absolute left-[-100px] top-0 h-[320px] w-[320px] rounded-full bg-violet-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div variants={listVariants} initial="hidden" animate="show">
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-black leading-[1.02] tracking-tight text-[#111111] sm:text-6xl lg:text-7xl"
            >
              Be known before{" "}
              <span className="text-violet-600">you walk in the room.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-lg leading-8 text-slate-600"
            >
              Socieas turns founders and experts into recognized authorities
              through positioning, storytelling, and content systems that
              compound. Trusted by clients across India, USA, UK, Australia,
              and UAE.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(109,40,217,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
              >
                Book a Free Brand Strategy Call
              </Link>

              <a
                href="#brand-system"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50"
              >
                See The Brand System
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeVariants}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="overflow-hidden rounded-[30px]">
              <Image
                src="/images/personal-branding-banner.webp"
                alt="Personal branding services for founders by Socieas"
                width={1600}
                height={1400}
                priority
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>

            <div className="absolute -left-6 bottom-10 hidden rounded-2xl border border-slate-200 bg-white/95 px-5 py-3 shadow-xl backdrop-blur lg:flex lg:items-center lg:gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-black text-white">
                ✓
              </span>
              <span className="text-sm font-semibold text-slate-700">
                Rated on Trustpilot & Google
              </span>
            </div>

            <div className="absolute -right-4 top-10 hidden rounded-2xl border border-slate-200 bg-white/95 px-5 py-3 shadow-xl backdrop-blur xl:flex xl:items-center xl:gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-black text-white">
                ✓
              </span>
              <span className="text-sm font-semibold text-slate-700">
                Serving Clients in 5 Countries
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HardTruth() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Being great is not enough.{" "}
            <span className="text-violet-600">Being seen is.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Your best clients are already searching, comparing, and deciding
            online. If your expertise is invisible, they choose whoever they
            remember. Not whoever is best.
          </p>
        </div>
      </div>
    </section>
  );
}

function VisibilityToggle() {
  const [mode, setMode] = useState(1);
  const current = visibilityModes[mode];

  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
          Two experts. Same skill.{" "}
          <span className="text-violet-600">Different futures.</span>
        </h2>

        <div className="mt-8 inline-flex rounded-full border border-slate-300 bg-white p-1.5">
          {visibilityModes.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setMode(index)}
              className={
                mode === index
                  ? "rounded-full bg-violet-700 px-6 py-3 text-sm font-bold text-white transition-all duration-300"
                  : "rounded-full px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-300 hover:text-violet-700"
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        <motion.div
          key={mode}
          variants={fadeVariants}
          initial="hidden"
          animate="show"
          className={
            mode === 1
              ? "mt-8 rounded-[32px] border-2 border-violet-300 bg-white p-8 md:p-12"
              : "mt-8 rounded-[32px] border border-slate-200 bg-white p-8 md:p-12"
          }
        >
          <h3 className="text-3xl font-black text-[#111111] md:text-4xl">
            {current.heading}
          </h3>
          <ul className="mt-6 space-y-4">
            {current.points.map((point) => (
              <li key={point} className="flex gap-4 text-lg leading-8 text-slate-700">
                <span
                  className={
                    mode === 1
                      ? "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white"
                      : "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-300 text-xs font-black text-white"
                  }
                >
                  {mode === 1 ? "✓" : "✕"}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function BrandSystem() {
  return (
    <section id="brand-system" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-[#111111] md:text-5xl">
            Personal branding is not content.{" "}
            <span className="text-violet-600">It is trust built in public.</span>
          </h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {brandSystem.map((item) => (
            <motion.div
              key={item.step}
              variants={itemVariants}
              whileHover={hoverLift}
              className="rounded-3xl border-t-4 border-violet-600 bg-[#F8F8F6] p-8 transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="text-5xl font-black text-violet-200">{item.step}</div>
              <h3 className="mt-5 text-2xl font-black text-[#111111]">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl font-black leading-tight tracking-tight text-[#111111] md:text-5xl">
              Every layer of your brand, <span className="text-violet-600">engineered.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We do not just write posts. We build the complete architecture
              behind founder authority, from positioning to pipeline.
            </p>
          </div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="grid gap-5 sm:grid-cols-2 lg:col-span-2"
          >
            {expertise.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={hoverLift}
                className="rounded-3xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-violet-300"
              >
                <h3 className="text-xl font-black text-[#111111]">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Flywheel() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Your personal brand becomes your{" "}
            <span className="text-violet-600">unfair advantage.</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Every piece of content feeds the next stage. That is why it
            compounds while ads stop the day you stop paying.
          </p>
        </div>

        <div className="relative mt-12">
          <motion.div
            variants={growXVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="absolute left-0 top-6 hidden h-1 w-full origin-left rounded-full bg-violet-600 lg:block"
          />
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
          >
            {flywheel.map((node) => (
              <motion.div key={node.step} variants={itemVariants} className="relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-lg font-black text-white shadow-md">
                  {node.step}
                </div>
                <div className="mt-4 rounded-3xl border border-slate-200 bg-[#F8F8F6] p-5 text-lg font-black text-[#111111] transition-colors duration-300 hover:border-violet-300">
                  {node.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Deliverables() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl font-black leading-tight tracking-tight text-[#111111] md:text-5xl">
              A complete brand system, <span className="text-violet-600">not scattered posts.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We help you find the ideas only you can own, the stories only you
              can tell, and the message your market needs to hear again and
              again.
            </p>
          </div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="grid gap-4 sm:grid-cols-2"
          >
            {deliverables.map((item) => (
              <motion.div
                key={item}
                variants={itemVariants}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition-colors duration-300 hover:border-violet-300"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">
                  ✓
                </span>
                <span className="font-semibold text-slate-800">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Principle() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-black leading-tight tracking-tight text-[#111111] md:text-6xl"
          >
            People do not connect with perfect brands.
            <br />
            <span className="text-violet-600">They connect with clear humans.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600"
          >
            Your audience needs to know what you believe, how you think, and
            why you understand their world. That is what makes you easier to
            find, easier to trust, and easier to choose.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-[#111111] md:text-5xl">
            Built for people with <span className="text-violet-600">real expertise.</span>
          </h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {audience.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={hoverLift}
              className="rounded-3xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-violet-300"
            >
              <h3 className="text-2xl font-black text-[#111111]">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="text-4xl font-black leading-tight tracking-tight text-[#111111] md:text-5xl">
          Personal branding, <span className="text-violet-600">answered.</span>
        </h2>

        <div className="mt-10 border-t border-slate-200">
          {faqs.map((item, index) => (
            <div key={item.question} className="border-b border-slate-200">
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-xl font-black text-[#111111]">
                  {item.question}
                </span>
                <span
                  className={
                    open === index
                      ? "flex h-9 w-9 shrink-0 rotate-45 items-center justify-center rounded-full bg-violet-600 text-lg font-black text-white transition-transform duration-300"
                      : "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-lg font-black text-slate-500 transition-transform duration-300"
                  }
                >
                  +
                </span>
              </button>
              {open === index && (
                <motion.p
                  variants={fadeVariants}
                  initial="hidden"
                  animate="show"
                  className="pb-6 pr-12 leading-8 text-slate-600"
                >
                  {item.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[40px] border-2 border-violet-200 bg-violet-50 px-8 py-14 text-center md:px-12 md:py-16">
          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-[#111111] md:text-5xl">
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
  );
}

/* ================= PAGE ================= */

export default function PersonalBrandingPage() {
  return (
    <main className="overflow-x-hidden bg-[#F7F7F5] text-[#111111]">
      <Navbar />
      <Hero />
      <HardTruth />
      <VisibilityToggle />
      <BrandSystem />
      <Expertise />
      <Flywheel />
      <Deliverables />
      <Principle />
      <Audience />
      <Testimonials />
      <FAQ />
      <InsightsEcosystem />
      <FinalCta />
      <JsonLd id="personal-branding-faq-schema" schema={faqSchema} />
      <Footer />
    </main>
  );
}
