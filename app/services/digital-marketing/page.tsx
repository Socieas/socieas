import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import InsightsEcosystem from "@/components/InsightsEcosystem";
import FadeUp from "@/components/FadeUp";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema/service";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Digital Marketing Services for B2B Growth",
  description:
    "Socieas builds digital marketing systems for founders and B2B businesses worldwide. SEO, AI search visibility, content engines, and campaigns that turn attention into pipeline.",
  path: "/services/digital-marketing",
});

const pageStyles = `
@keyframes riseIn {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes floaty {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}
@keyframes marqueeMove {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes growBar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.rise { animation: riseIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
.rise-2 { animation-delay: 0.15s; }
.rise-3 { animation-delay: 0.3s; }
.rise-4 { animation-delay: 0.45s; }
.floaty { animation: floaty 6s ease-in-out infinite; }
.floaty-late { animation: floaty 7s ease-in-out infinite; animation-delay: 1.4s; }
.marquee-track { display: flex; width: max-content; animation: marqueeMove 26s linear infinite; }
.bar-fill { transform-origin: left; animation: growBar 1.6s ease-out 0.3s both; }
`;

const pains = [
  { icon: "📉", label: "Posting without a plan" },
  { icon: "👻", label: "Traffic without trust" },
  { icon: "🕳️", label: "Leads without follow up" },
];

const capabilities = [
  { icon: "🔍", title: "SEO Systems", text: "Rank for searches your buyers actually make." },
  { icon: "🤖", title: "AI Search Visibility", text: "Get cited by ChatGPT, Gemini, and AI Overviews." },
  { icon: "🧠", title: "Content Strategy", text: "One idea becomes twenty pieces, every week." },
  { icon: "📣", title: "Social Campaigns", text: "LinkedIn led campaigns that start conversations." },
  { icon: "🎯", title: "Conversion Systems", text: "Pages and funnels that turn clicks into calls." },
  { icon: "📊", title: "Analytics & Reporting", text: "Every click tracked. Zero guesswork." },
];

const growthLoop = [
  { step: "01", icon: "🧲", title: "Attract", text: "Be visible where buyers search" },
  { step: "02", icon: "⚡", title: "Capture", text: "Turn attention into conversations" },
  { step: "03", icon: "💜", title: "Nurture", text: "Stay present until they are ready" },
  { step: "04", icon: "📈", title: "Compound", text: "Scale only what the data proves" },
];

const marqueeWords = [
  "Visibility",
  "Trust",
  "Pipeline",
  "Authority",
  "Growth",
  "Compounding",
];

const marketStats = [
  { value: "48%", width: "w-[48%]", label: "of Google searches now show an AI Overview above the results" },
  { value: "25%", width: "w-[25%]", label: "projected drop in traditional search as buyers shift to AI assistants" },
  { value: "62%", width: "w-[62%]", label: "lower cost per lead with content marketing, generating 3x more leads" },
];

const proof = [
  { value: "+340%", label: "Audience Growth" },
  { value: "10M+", label: "Organic Impressions" },
  { value: "3X", label: "Inbound Opportunities" },
];

const ecosystem = [
  {
    href: "/services/personal-branding",
    icon: "👤",
    label: "Personal Branding",
    text: "Marketing brings the audience. Your founder brand earns their trust.",
  },
  {
    href: "/services/crm-solutions",
    icon: "🗂️",
    label: "CRM Solutions",
    text: "Every lead lands in a pipeline that follows up automatically.",
  },
  {
    href: "/services/ai-automation",
    icon: "🤖",
    label: "AI Automation",
    text: "Routing, reporting, and busywork handled by intelligent systems.",
  },
  {
    href: "/services/full-stack-development",
    icon: "🌐",
    label: "Full Stack Development",
    text: "A fast website that turns campaign clicks into conversions.",
  },
];

const audience = [
  { icon: "🚀", title: "Founders & Consultants", text: "Your visibility does not match your skill yet." },
  { icon: "🏢", title: "B2B Service Companies", text: "You want an inbound channel you control." },
  { icon: "🌱", title: "Growing Startups", text: "You need marketing tied to revenue, not vanity." },
];

const roadmap = [
  { phase: "Days 1 to 15", title: "Foundation", text: "Audit, positioning, and visibility map" },
  { phase: "Days 16 to 45", title: "Build", text: "Content engine, funnels, and campaigns live" },
  { phase: "Days 46 to 90", title: "Scale", text: "Double down on what the data proves" },
];

const countries = [
  { flag: "🇮🇳", name: "India" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇦🇪", name: "UAE" },
];

const faqs = [
  {
    question: "What is included in your digital marketing service?",
    answer:
      "Strategy, SEO, AI search optimization, content systems, social campaigns, conversion funnels, and transparent reporting. One connected growth system, not disconnected tasks.",
  },
  {
    question: "Do you optimize for AI search like ChatGPT and Google AI Overviews?",
    answer:
      "Yes. We structure your content and data so AI engines can read, trust, and cite your brand when buyers ask for recommendations.",
  },
  {
    question: "Which countries do you work with?",
    answer:
      "We work with founders and businesses worldwide. Our systems are built for global visibility rather than one city or region.",
  },
  {
    question: "How long before we see results?",
    answer:
      "Campaigns show movement within weeks. Search and AI visibility compound over three to six months. Weekly reports keep progress visible.",
  },
  {
    question: "How is Socieas different from a typical marketing agency?",
    answer:
      "Most agencies sell activity. We build systems that connect marketing to your brand, your CRM, and your revenue, so results compound instead of resetting every month.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Page() {
  return (
    <main className="overflow-x-hidden bg-[#F7F7F5] text-[#111111]">
      <style>{pageStyles}</style>

      <JsonLd
        schema={[
          serviceSchema({
            name: "Digital Marketing Services",
            description:
              "Socieas builds digital marketing systems for founders and B2B businesses worldwide, covering SEO, AI search visibility, content strategy, social campaigns, and conversion funnels.",
            url: "https://socieas.com/services/digital-marketing",
            serviceType: "Digital Marketing",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Services", url: "https://socieas.com/services" },
            {
              name: "Digital Marketing",
              url: "https://socieas.com/services/digital-marketing",
            },
          ]),
          faqSchema,
        ]}
        id="digital-marketing-page-schema"
      />

      <Navbar />

      {/* SECTION 1 · HERO WITH BANNER + MOTION */}
      <section className="relative overflow-hidden bg-[#F8F8F6] pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-fuchsia-100/40 blur-[140px]" />
          <div className="absolute inset-0 premium-grid opacity-60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <div className="rise inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-600" />
                </span>
                Digital Marketing Systems
              </div>

              <h1 className="rise rise-2 mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#111111] md:text-6xl lg:text-7xl">
                Marketing that makes you the{" "}
                <span className="text-violet-600">obvious choice.</span>
              </h1>

              <p className="rise rise-3 mt-6 max-w-lg text-lg leading-8 text-slate-600">
                Search, AI visibility, content, and campaigns working as one
                system that turns strangers into pipeline.
              </p>

              <div className="rise rise-4 mt-9 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(109,40,217,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
                >
                  Book a Free Strategy Call
                </Link>
                <Link
                  href="/insights/case-studies"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50"
                >
                  See Our Work
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-violet-100/50 blur-2xl" />
              <Image
                src="/images/services/digital-marketing-banner.webp"
                alt="Socieas digital marketing growth system connecting search, AI visibility, content, and pipeline"
                width={1600}
                height={1100}
                priority
                className="relative rounded-[36px] border border-white/60 shadow-[0_30px_80px_rgba(109,40,217,0.15)]"
              />

              <div className="floaty glass-premium absolute -left-4 top-8 hidden rounded-2xl px-5 py-3 md:block">
                <div className="text-sm font-bold text-violet-700">🔍 SEO & AI Search</div>
              </div>
              <div className="floaty-late glass-premium absolute -right-4 bottom-10 hidden rounded-2xl px-5 py-3 md:block">
                <div className="text-sm font-bold text-violet-700">📈 Pipeline Growth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 · GLOBAL TRUST STRIP */}
      <FadeUp>
        <section className="border-y border-black/5 bg-white px-6 py-14 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {countries.map((item) => (
                <div
                  key={item.name}
                  className="magnetic-hover flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-5 py-2 text-sm font-semibold text-violet-800"
                >
                  <span className="text-lg">{item.flag}</span>
                  {item.name}
                </div>
              ))}
              <div className="rounded-full border border-dashed border-violet-300 px-5 py-2 text-sm font-semibold text-violet-500">
                + expanding worldwide
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Rated by clients on
              </span>
              <a
                href="https://www.trustpilot.com/review/socieas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-hover rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800"
              >
                Trustpilot <span className="text-amber-400">★★★★★</span>
              </a>
              <a
                href="https://g.page/r/CZRSUSQ4ceKYEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-hover rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800"
              >
                Google Reviews <span className="text-amber-400">★★★★★</span>
              </a>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 3 · THE PROBLEM AS CHIPS */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              The Real Problem
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Random marketing does not compound.
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {pains.map((item) => (
                <div
                  key={item.label}
                  className="magnetic-hover rounded-3xl border border-slate-200 bg-white p-8"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <div className="mt-4 text-lg font-bold text-[#111111]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 4 · WHERE SEARCH IS GOING (ANIMATED BARS) */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Where Search Is Going
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Your buyers now ask AI before they ask Google.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {marketStats.map((item) => (
                <div
                  key={item.value}
                  className="premium-card magnetic-hover"
                >
                  <div className="text-5xl font-black text-violet-600">
                    {item.value}
                  </div>
                  <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-violet-100">
                    <div
                      className={`bar-fill h-2 rounded-full bg-violet-600 ${item.width}`}
                    />
                  </div>
                  <p className="mt-5 text-base leading-7 text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-slate-600">
              So we optimize for search everywhere. Google, AI answers, and the
              feeds where buyers decide.
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 5 · CAPABILITIES GRID */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What We Build
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                One team. Every layer of visibility.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[32px] border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-[0_25px_70px_rgba(124,58,237,0.12)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {item.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 6 · GROWTH LOOP FLOW DIAGRAM */}
      <FadeUp>
        <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/40 blur-[140px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                The Socieas Growth Loop
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Four moves. Repeated until you win.
              </h2>
            </div>

            <div className="mx-auto mt-14 flex justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border-2 border-dashed border-violet-300" />
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-600 text-4xl shadow-[0_18px_45px_rgba(109,40,217,0.3)]">
                  🔁
                </div>
              </div>
            </div>

            <div className="relative mt-12 grid gap-6 md:grid-cols-4">
              <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-0.5 bg-violet-200 md:block" />
              {growthLoop.map((item) => (
                <div key={item.step} className="relative text-center">
                  <div className="magnetic-hover relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-violet-50 text-3xl shadow-lg">
                    {item.icon}
                  </div>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-500">
                    Step {item.step}
                  </div>
                  <h3 className="mt-2 text-2xl font-black text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 7 · MOTION MARQUEE RIBBON */}
      <section className="overflow-hidden border-y border-violet-100 bg-violet-50 py-10">
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={`mx-8 whitespace-nowrap text-5xl font-black tracking-tight md:text-6xl ${
                index % 2 === 0 ? "text-violet-600" : "text-violet-200"
              }`}
            >
              {word} ✦
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 8 · PROOF METRICS */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Proof & Momentum
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Systems we run for ourselves and our clients.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {proof.map((item) => (
                <div
                  key={item.label}
                  className="premium-card magnetic-hover text-center"
                >
                  <div className="text-6xl font-black text-violet-600">
                    {item.value}
                  </div>
                  <div className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/insights/case-studies"
                className="inline-flex items-center gap-2 font-semibold text-violet-600 transition hover:gap-4 hover:opacity-70"
              >
                Explore the case studies →
              </Link>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 9 · CONNECTED ECOSYSTEM */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Connected Growth Ecosystem
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Marketing works harder when everything connects.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {ecosystem.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[32px] border border-black/5 bg-[#F7F7F5] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:bg-white hover:shadow-[0_25px_70px_rgba(124,58,237,0.12)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-2xl transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                      {item.label}
                    </div>
                  </div>
                  <p className="mt-5 text-lg leading-8 text-slate-700">
                    {item.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-violet-600 transition-all duration-300 group-hover:gap-4">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 10 · WHO THIS IS FOR */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Who This Is For
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Built for people playing the long game.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {audience.map((item) => (
                <div
                  key={item.title}
                  className="magnetic-hover rounded-[32px] border border-violet-100 bg-violet-50 p-8 text-center"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="mt-4 text-xl font-bold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 11 · 90 DAY TIMELINE */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                How It Starts
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Your first 90 days with Socieas.
              </h2>
            </div>

            <div className="relative mt-16 grid gap-10 md:grid-cols-3">
              <div className="pointer-events-none absolute left-[16%] right-[16%] top-3 hidden h-0.5 bg-violet-200 md:block" />
              {roadmap.map((item) => (
                <div key={item.title} className="relative text-center">
                  <div className="relative mx-auto flex h-6 w-6 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />
                    <span className="relative inline-flex h-4 w-4 rounded-full border-4 border-white bg-violet-600 shadow" />
                  </div>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-violet-500">
                    {item.phase}
                  </div>
                  <h3 className="mt-2 text-2xl font-black text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[260px] text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 12 · REVIEWS */}
      <Testimonials />

      {/* SECTION 13 · FAQ */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Common Questions
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Answers before you even ask.
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-[24px] border border-black/5 bg-white p-6 transition-all duration-300 open:border-violet-200 open:shadow-[0_20px_60px_rgba(124,58,237,0.1)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-[#111111]">
                    {item.question}
                    <span className="ml-4 text-violet-500 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>

            <p className="mt-10 text-center text-base text-slate-600">
              Still curious?{" "}
              <Link
                href="/contact"
                className="font-semibold text-violet-600 hover:opacity-70"
              >
                Ask us directly
              </Link>{" "}
              or learn more{" "}
              <Link
                href="/about"
                className="font-semibold text-violet-600 hover:opacity-70"
              >
                about Socieas
              </Link>
              .
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 14 · RECENT INSIGHTS */}
      <InsightsEcosystem />

      {/* SECTION 15 · FINAL CTA */}
      <FadeUp>
        <section className="px-6 pb-24 pt-4 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[40px] border border-violet-100 bg-white px-8 py-16 text-center shadow-[0_30px_90px_rgba(124,58,237,0.1)] md:px-16 md:py-20">
              <div className="pointer-events-none absolute inset-0 premium-grid" />
              <div className="floaty pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-violet-100 blur-2xl" />
              <div className="floaty-late pointer-events-none absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-fuchsia-100 blur-2xl" />

              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-[#111111] md:text-6xl">
                  Be found everywhere{" "}
                  <span className="text-violet-600">your buyers look.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
                  One call. A clear plan. A marketing system that compounds.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(109,40,217,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
                  >
                    Book a Free Strategy Call
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50"
                  >
                    Explore All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      <Footer />
    </main>
  );
}
