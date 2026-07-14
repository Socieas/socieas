import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import InsightsEcosystem from "@/components/InsightsEcosystem";
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

const trustStats = [
  { value: "5+", label: "Countries Served" },
  { value: "500+", label: "Posts Published" },
  { value: "24h", label: "Response Time" },
];

const capabilities = [
  {
    icon: "🔍",
    title: "SEO Systems",
    text: "Technical foundations and topical authority that rank for the searches your buyers actually make.",
  },
  {
    icon: "🤖",
    title: "AI Search Visibility",
    text: "Structured data and quotable content so ChatGPT, Gemini, and AI Overviews cite your brand.",
  },
  {
    icon: "🧠",
    title: "Content Strategy",
    text: "One strong idea becomes twenty pieces. Pillars, calendars, and an engine that never runs dry.",
  },
  {
    icon: "📣",
    title: "Social Campaigns",
    text: "LinkedIn led campaigns that build audience, trust, and inbound conversations.",
  },
  {
    icon: "🎯",
    title: "Conversion Systems",
    text: "Landing pages and funnels designed to turn traffic into booked calls.",
  },
  {
    icon: "📊",
    title: "Analytics & Reporting",
    text: "Every click and every conversion tracked. You always know what is working and why.",
  },
];

const growthLoop = [
  {
    step: "01",
    title: "Attract",
    text: "Show up in Google, AI answers, and social feeds where your buyers already spend their time.",
  },
  {
    step: "02",
    title: "Capture",
    text: "Clear offers and fast pages convert attention into real conversations.",
  },
  {
    step: "03",
    title: "Nurture",
    text: "Content, email, and retargeting keep you present until the buyer is ready.",
  },
  {
    step: "04",
    title: "Compound",
    text: "Data decides what scales. Authority builds. Results stop resetting every month.",
  },
];

const ecosystem = [
  {
    href: "/services/personal-branding",
    label: "Personal Branding",
    text: "Marketing brings the audience. Your founder brand makes them trust you.",
  },
  {
    href: "/services/crm-solutions",
    label: "CRM Solutions",
    text: "Every lead lands in a pipeline that follows up automatically.",
  },
  {
    href: "/services/ai-automation",
    label: "AI Automation",
    text: "Routing, reporting, and repetitive work handled by intelligent systems.",
  },
  {
    href: "/services/full-stack-development",
    label: "Full Stack Development",
    text: "A fast website that turns campaign clicks into conversions.",
  },
];

const roadmap = [
  {
    phase: "Days 1 to 15",
    title: "Foundation",
    text: "Deep audit, positioning, keyword and AI visibility map, and a plan tied to revenue.",
  },
  {
    phase: "Days 16 to 45",
    title: "Build",
    text: "Content engine live, funnels shipped, campaigns running on your priority channels.",
  },
  {
    phase: "Days 46 to 90",
    title: "Scale",
    text: "Double down on what the data proves. Weekly reporting keeps everything visible.",
  },
];

const audience = [
  {
    title: "Founders & Consultants",
    text: "You have the proof and the expertise, but your visibility does not match your skill yet.",
  },
  {
    title: "B2B Service Companies",
    text: "You depend on referrals and want a predictable inbound channel that you control.",
  },
  {
    title: "Growing Startups",
    text: "You need marketing connected to CRM and revenue, not vanity metrics.",
  },
];

const faqs = [
  {
    question: "What is included in your digital marketing service?",
    answer:
      "Strategy, SEO, AI search optimization, content systems, social campaigns, conversion funnels, and transparent reporting. You get one connected growth system, not disconnected tasks.",
  },
  {
    question:
      "Do you optimize for AI search like ChatGPT and Google AI Overviews?",
    answer:
      "Yes. We structure your content and data so AI engines can read, trust, and cite your brand when buyers ask for recommendations. This is built into every engagement by default.",
  },
  {
    question: "Which countries do you work with?",
    answer:
      "We work with founders and businesses worldwide. Our systems are built for global visibility rather than one city or region.",
  },
  {
    question: "How long before we see results?",
    answer:
      "Social and campaigns show movement within weeks. Search and AI visibility compound over three to six months. Clear weekly reports mean progress is never a mystery.",
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

      {/* SECTION 1 · HERO WITH BANNER */}
      <section className="relative overflow-hidden bg-[#F8F8F6] pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/25 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-fuchsia-100/30 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700 shadow-sm">
                Digital Marketing Systems
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#111111] md:text-6xl lg:text-7xl">
                Marketing that makes you the{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                  obvious choice.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                We build the system behind your growth. Search, AI visibility,
                content, and campaigns working together to turn strangers into
                pipeline.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
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

              <div className="mt-10 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
                <div className="text-sm font-semibold text-slate-700">
                  SEO & AI Search
                </div>
                <div className="text-sm font-semibold text-slate-700">
                  Content Engines
                </div>
                <div className="text-sm font-semibold text-slate-700">
                  Growth Campaigns
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-gradient-to-br from-violet-200/40 to-fuchsia-100/40 blur-2xl" />
              <Image
                src="/images/services/digital-marketing-banner.webp"
                alt="Socieas digital marketing growth system connecting search, AI visibility, content, and pipeline"
                width={1600}
                height={1100}
                priority
                className="relative rounded-[36px] border border-white/60 shadow-[0_30px_80px_rgba(109,40,217,0.15)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 · GLOBAL TRUST STRIP */}
      <section className="border-y border-black/5 bg-white px-6 py-14 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 text-center sm:grid-cols-3">
            {trustStats.map((item) => (
              <div key={item.label}>
                <div className="text-5xl font-black text-[#111111]">
                  {item.value}
                </div>
                <div className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Rated by clients on
            </span>
            <a
              href="https://www.trustpilot.com/review/socieas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-violet-300 hover:bg-violet-50"
            >
              Trustpilot
            </a>
            <a
              href="https://g.page/r/CZRSUSQ4ceKYEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-violet-300 hover:bg-violet-50"
            >
              Google Reviews
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3 · THE REAL PROBLEM */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
            The Real Problem
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
            Random acts of marketing do not compound.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            A post here. A campaign there. A website nobody visits. Activity
            feels like progress, but rented attention disappears the moment you
            stop paying for it. Growth comes from a system that owns its
            audience.
          </p>
        </div>
      </section>

      {/* SECTION 4 · WHERE SEARCH IS GOING */}
      <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              Where Search Is Going
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Your buyers now ask AI before they ask Google.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We optimize for search everywhere. Google rankings, AI answers,
              and the feeds where your buyers actually make decisions.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[36px] bg-[#F7F7F5] p-10">
              <div className="text-5xl font-black text-violet-600">48%</div>
              <p className="mt-5 text-base leading-7 text-slate-600">
                of tracked Google searches now show an AI Overview above the
                classic results.
              </p>
            </div>
            <div className="rounded-[36px] bg-violet-600 p-10 text-white">
              <div className="text-5xl font-black">25%</div>
              <p className="mt-5 text-base leading-7 text-violet-100">
                projected drop in traditional search volume as buyers shift to
                AI assistants.
              </p>
            </div>
            <div className="rounded-[36px] bg-[#111111] p-10 text-white">
              <div className="text-5xl font-black">3x</div>
              <p className="mt-5 text-base leading-7 text-gray-400">
                more leads from content marketing than outbound, at 62% lower
                cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 · CAPABILITIES */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              What We Build
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              One team. Every layer of your visibility.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="rounded-[36px] border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_60px_rgba(124,58,237,0.08)]"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-6 text-2xl font-bold text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 · THE GROWTH LOOP */}
      <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              The Socieas Growth Loop
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Four moves. Repeated until you win.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {growthLoop.map((item) => (
              <div
                key={item.step}
                className="group rounded-[32px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                    Step {item.step}
                  </span>
                  <div className="h-3 w-3 rounded-full bg-violet-600 transition-transform duration-300 group-hover:scale-125" />
                </div>
                <h3 className="mt-6 text-3xl font-black text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[32px] border border-violet-100 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-center gap-4 text-center text-lg font-semibold text-[#111111]">
              <span>Attract</span>
              <span className="text-violet-500">→</span>
              <span>Capture</span>
              <span className="text-violet-500">→</span>
              <span>Nurture</span>
              <span className="text-violet-500">→</span>
              <span>Compound</span>
              <span className="text-violet-500">→</span>
              <span>Repeat</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 · PROOF */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              Proof & Momentum
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Systems we run for ourselves and our clients.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[36px] bg-white p-10 shadow-[0_20px_60px_rgba(124,58,237,0.06)]">
              <div className="text-5xl font-black text-violet-600">+340%</div>
              <h3 className="mt-6 text-2xl font-bold text-[#111111]">
                Audience Growth
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Consistent positioning compounds reach and recognition.
              </p>
            </div>
            <div className="rounded-[36px] bg-white p-10 shadow-[0_20px_60px_rgba(124,58,237,0.06)]">
              <div className="text-5xl font-black text-violet-600">10M+</div>
              <h3 className="mt-6 text-2xl font-bold text-[#111111]">
                Organic Impressions
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Strategic content systems create scalable visibility.
              </p>
            </div>
            <div className="rounded-[36px] bg-white p-10 shadow-[0_20px_60px_rgba(124,58,237,0.06)]">
              <div className="text-5xl font-black text-violet-600">3X</div>
              <h3 className="mt-6 text-2xl font-bold text-[#111111]">
                Inbound Opportunities
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Strong positioning lowers trust friction significantly.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/insights/case-studies"
              className="inline-flex items-center gap-2 font-semibold text-violet-600 transition hover:opacity-70"
            >
              Explore the case studies →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 · CONNECTED ECOSYSTEM */}
      <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              Connected Growth Ecosystem
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Marketing works harder when everything connects.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Every Socieas system plugs into the next. That is why our clients
              scale instead of stall.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {ecosystem.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[36px] border border-black/5 bg-[#F7F7F5] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-[0_20px_60px_rgba(124,58,237,0.08)]"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                  {item.label}
                </div>
                <p className="mt-5 text-lg leading-8 text-slate-700">
                  {item.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-violet-600 transition group-hover:gap-3">
                  Explore {item.label} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 · STATEMENT */}
      <section className="bg-[#111111] px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black leading-[1.08] tracking-[-0.04em] text-white md:text-6xl">
            Loud brands get attention.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Trusted brands get revenue.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-gray-400">
            We build both, in every market you sell to.
          </p>
        </div>
      </section>

      {/* SECTION 10 · WHO THIS IS FOR */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
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
                className="rounded-[36px] border border-violet-100 bg-violet-50 p-8"
              >
                <h3 className="text-2xl font-bold text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11 · FIRST 90 DAYS */}
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

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {roadmap.map((item) => (
              <div
                key={item.title}
                className="rounded-[36px] border border-black/5 bg-[#F7F7F5] p-8"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                  {item.phase}
                </div>
                <h3 className="mt-5 text-2xl font-bold text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 · REVIEWS */}
      <Testimonials />

      {/* SECTION 13 · FAQ */}
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
                className="group rounded-[24px] border border-black/5 bg-white p-6 transition-all duration-300 open:shadow-[0_20px_60px_rgba(124,58,237,0.08)]"
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-[#111111]">
                  {item.question}
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

      {/* SECTION 14 · RECENT INSIGHTS */}
      <InsightsEcosystem />

      {/* SECTION 15 · FINAL CTA */}
      <section className="px-6 pb-24 pt-4 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[40px] bg-gradient-to-br from-violet-700 to-fuchsia-600 px-8 py-16 text-center text-white md:px-16 md:py-20">
            <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] md:text-6xl">
              Be found everywhere your buyers look.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-violet-100">
              One call. A clear plan. A marketing system that compounds.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-semibold text-violet-700 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50"
              >
                Book a Free Strategy Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
