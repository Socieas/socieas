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
  title: "Personal Branding Services for Founders",
  description:
    "Socieas builds founder personal brands that compound. Positioning, brand story, LinkedIn systems, and content engines that turn your expertise into trust, audience, and inbound clients worldwide.",
  path: "/services/personal-branding",
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
@keyframes pulseLine {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
}
.rise { animation: riseIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
.rise-2 { animation-delay: 0.15s; }
.rise-3 { animation-delay: 0.3s; }
.rise-4 { animation-delay: 0.45s; }
.floaty { animation: floaty 6s ease-in-out infinite; }
.floaty-late { animation: floaty 7s ease-in-out infinite; animation-delay: 1.4s; }
.marquee-track { display: flex; width: max-content; animation: marqueeMove 26s linear infinite; }
.bar-fill { transform-origin: left; animation: growBar 1.6s ease-out 0.3s both; }
.pulse-line { animation: pulseLine 2.4s ease-in-out infinite; }
.gradient-text { background-image: linear-gradient(90deg, #7C3AED, #D946EF); -webkit-background-clip: text; background-clip: text; color: transparent; }
`;

const flywheel = [
  { step: "01", label: "Position", note: "Own one clear category" },
  { step: "02", label: "Publish", note: "Content that compounds" },
  { step: "03", label: "Attract", note: "The right audience finds you" },
  { step: "04", label: "Convert", note: "Trust becomes inbound clients" },
];

const pains = [
  { number: "01", label: "You are the best kept secret in your industry while louder rivals win" },
  { number: "02", label: "Growth depends on referrals you do not control and cannot predict" },
  { number: "03", label: "You post randomly, nothing compounds, and the feed forgets you by morning" },
];

const brandStats = [
  { value: "82%", width: "w-[82%]", label: "of people trust a company more when its leadership is active on social media" },
  { value: "74%", width: "w-[74%]", label: "of B2B buyers say executive thought leadership shapes who they trust" },
  { value: "60%", width: "w-[60%]", label: "of decision makers say thought leadership directly contributed to awarding business" },
];

const buildBlocks = [
  { badge: "A", title: "Positioning and Category", text: "Narrow until you are the obvious choice for one clear person." },
  { badge: "B", title: "Brand Story", text: "The journey no competitor can copy, told so people root for you." },
  { badge: "C", title: "Signature Framework", text: "Your method, named and packaged, so your ideas travel without you." },
  { badge: "D", title: "Content Engine", text: "One strong idea becomes twenty pieces across formats and weeks." },
  { badge: "E", title: "LinkedIn Profile Funnel", text: "A profile that works like a landing page, not a resume." },
  { badge: "F", title: "Voice and Approval Flow", text: "Content that sounds like you, reviewed by you, never generic." },
];

const results = [
  { value: "+340%", label: "Audience growth" },
  { value: "10M+", label: "Organic impressions" },
  { value: "3X", label: "Inbound opportunities" },
];

const comparison = [
  { without: "A polished logo nobody feels anything about", with: "A founder face people recognize and trust" },
  { without: "Random posts that vanish in a day", with: "Content pillars that compound for years" },
  { without: "Chasing referrals and cold outreach", with: "Inbound leads arriving from your content" },
  { without: "Generic ghostwritten corporate speak", with: "Your voice, your stories, your framework" },
];

const brandSystem = [
  { name: "Positioning Statement", role: "One line that makes you the obvious choice" },
  { name: "Brand Story", role: "Your journey turned into a trust asset" },
  { name: "Content Pillars", role: "Three to five themes you become known for" },
  { name: "Signature Framework", role: "A named method people can repeat and share" },
  { name: "Content Waterfall", role: "One idea repurposed into twenty pieces" },
  { name: "Profile Funnel", role: "LinkedIn profile built to convert visitors" },
  { name: "Idea Bank and Calendar", role: "Never stare at a blank page again" },
  { name: "Performance Tracker", role: "Double down on what the data proves" },
];

const marqueeWords = [
  "Position",
  "Publish",
  "Attract",
  "Trust",
  "Convert",
  "Compound",
];

const process = [
  { step: "01", title: "Discover", text: "We dig into your story, expertise, and the audience you want to reach" },
  { step: "02", title: "Position", text: "We define your category, message map, and three to five content themes" },
  { step: "03", title: "Build", text: "We set up your profile funnel, idea bank, calendar, and approval flow" },
  { step: "04", title: "Compound", text: "We produce, publish, and refine as your authority stacks month over month" },
];

const ecosystem = [
  {
    href: "/services/digital-marketing",
    label: "Digital Marketing",
    text: "Your brand earns the attention. Marketing systems scale it.",
  },
  {
    href: "/services/crm-solutions",
    label: "CRM Solutions",
    text: "Inbound leads from your content land in a pipeline that converts.",
  },
  {
    href: "/services/ai-automation",
    label: "AI Automation",
    text: "Automate the follow up so no conversation your brand starts goes cold.",
  },
  {
    href: "/services/full-stack-development",
    label: "Full Stack Development",
    text: "A fast personal site that ranks for your name and your method.",
  },
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
    question: "What is founder personal branding?",
    answer:
      "It is the system that turns your expertise into a compounding business asset. Clear positioning, a brand story, content pillars, and a publishing engine that builds trust and inbound demand under your own name.",
  },
  {
    question: "Why build the founder brand instead of the company page?",
    answer:
      "Because people buy from people. Executive posts earn about twice the engagement of company page posts, and 82% of people trust a company more when its leadership is visible. The founder is the fastest trust shortcut a business has.",
  },
  {
    question: "Will the content actually sound like me?",
    answer:
      "Yes. We start with a discovery deep dive into your story and voice, define themes you genuinely own, and run every piece through your approval flow. If it does not sound like you, it does not go out.",
  },
  {
    question: "How long until a personal brand shows results?",
    answer:
      "Expect visible momentum in about ninety days of consistent publishing and meaningful inbound in four to six months. A personal brand is an appreciating asset. It compounds, so the earlier you start, the bigger the gap you build.",
  },
  {
    question: "Is LinkedIn the only platform you work with?",
    answer:
      "LinkedIn comes first for most founders because that is where B2B trust is built, but the system repurposes every idea across platforms. One strong idea becomes posts, carousels, newsletters, and video scripts.",
  },
  {
    question: "Do you work with founders outside India?",
    answer:
      "Yes. We build founder brands for clients worldwide. Positioning, content, and publishing all run remotely on a system you can see and approve from anywhere.",
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
            name: "Personal Branding Services",
            description:
              "Socieas builds founder personal brands for clients worldwide. Positioning and category design, brand story, signature frameworks, LinkedIn profile funnels, and content systems that compound into trust, audience, and inbound clients.",
            url: "https://socieas.com/services/personal-branding",
            serviceType: "Personal Branding",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Services", url: "https://socieas.com/services" },
            {
              name: "Personal Branding",
              url: "https://socieas.com/services/personal-branding",
            },
          ]),
          faqSchema,
        ]}
        id="personal-branding-page-schema"
      />

      <Navbar />

      {/* SECTION 1 · HERO WITH BANNER AND GRADIENT TITLE */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />
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
                Founder Personal Branding · Built On Systems
              </div>

              <h1 className="rise rise-2 mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#111111] md:text-6xl lg:text-7xl">
                Nobody buys from a logo.{" "}
                <span className="gradient-text">They buy from you.</span>
              </h1>

              <p className="rise rise-3 mt-6 max-w-lg text-lg leading-8 text-slate-600">
                Your expertise is real. Your visibility is not. We build the
                positioning, story, and content system that turns your name
                into an asset that compounds and brings clients to you.
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
                  See Real Results
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-violet-100/50 blur-2xl" />
              <Image
                src="/images/services/personal-branding-banner.webp"
                alt="Socieas founder personal branding illustration showing a profile at the center of a flywheel of engagement, audience growth, and inbound opportunities"
                width={1600}
                height={1100}
                priority
                className="relative w-full rounded-[36px] border border-white/60 shadow-[0_30px_80px_rgba(109,40,217,0.15)]"
              />

              <div className="floaty glass-premium absolute -left-4 top-8 hidden items-center gap-2 rounded-2xl px-5 py-3 md:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-bold text-violet-700">
                  Inbound, not outreach
                </span>
              </div>
              <div className="floaty-late glass-premium absolute -right-4 bottom-10 hidden rounded-2xl px-5 py-3 md:block">
                <span className="text-sm font-bold text-violet-700">
                  Compounds while you sleep
                </span>
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

      {/* SECTION 3 · THE BRAND FLYWHEEL (INFOGRAPHIC) */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                The Brand Flywheel
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                A personal brand is an asset, not an activity.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Treated as a system, your brand appreciates like an asset.
                Every piece of content builds on the last, and the flywheel
                spins faster the longer you run it. Win your audience, win
                your category.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-4 md:gap-4">
              {flywheel.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="magnetic-hover h-full rounded-[28px] border border-slate-200 bg-white p-7">
                    <div className="text-sm font-black text-violet-300">
                      {item.step}
                    </div>
                    <div className="mt-3 text-xl font-black text-[#111111]">
                      {item.label}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                      {item.note}
                    </div>
                  </div>
                  {index < flywheel.length - 1 && (
                    <div className="pulse-line absolute -bottom-7 left-1/2 -translate-x-1/2 rotate-90 text-2xl font-black text-violet-400 md:-right-4 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:rotate-0">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 4 · THE INVISIBILITY PROBLEM */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              The Invisibility Problem
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Being great is not enough. People must know.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              The market does not reward the best expert. It rewards the most
              trusted one.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {pains.map((item) => (
                <div
                  key={item.number}
                  className="magnetic-hover rounded-3xl border border-slate-200 bg-[#F7F7F5] p-8 text-left"
                >
                  <div className="text-4xl font-black text-violet-200">
                    {item.number}
                  </div>
                  <div className="mt-3 text-lg font-bold text-[#111111]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 5 · TRUST DATA (ANIMATED BARS) */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What The Data Says
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Buyers trust faces, not logos.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {brandStats.map((item) => (
                <div key={item.value} className="premium-card magnetic-hover">
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
          </div>
        </section>
      </FadeUp>

      {/* SECTION 6 · THE 2X TRUTH (LIGHT DESIGN) */}
      <FadeUp>
        <section className="px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[40px] border border-violet-100 bg-white px-8 py-14 text-center shadow-[0_30px_90px_rgba(124,58,237,0.08)] md:px-16">
              <div className="pointer-events-none absolute inset-0 premium-grid" />
              <div className="floaty pointer-events-none absolute -left-10 top-6 h-32 w-32 rounded-full bg-violet-100 blur-xl" />
              <div className="floaty-late pointer-events-none absolute -right-8 bottom-4 h-32 w-32 rounded-full bg-fuchsia-100 blur-xl" />
              <div className="relative">
                <div className="gradient-text text-7xl font-black md:text-8xl">
                  2x
                </div>
                <p className="mx-auto mt-4 max-w-2xl text-xl font-bold leading-8 text-[#111111]">
                  Posts from executives earn about twice the engagement of
                  company page posts, and nearly half of a company's market
                  value is tied to the reputation of its leader.
                </p>
                <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
                  Your face is the most underpriced marketing channel your
                  business owns.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 7 · WHAT WE BUILD */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What We Build
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Six pieces of a brand that compounds.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {buildBlocks.map((item) => (
                <div
                  key={item.badge}
                  className="group rounded-[32px] border border-black/5 bg-[#F7F7F5] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:bg-white hover:shadow-[0_25px_70px_rgba(124,58,237,0.12)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-lg font-black text-white transition-transform duration-300 group-hover:scale-110">
                    {item.badge}
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

      {/* SECTION 8 · PROOF */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Real Outcomes
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                What compounding looks like in numbers.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {results.map((item) => (
                <div
                  key={item.value}
                  className="magnetic-hover rounded-[32px] border border-violet-100 bg-white p-10 text-center shadow-[0_20px_60px_rgba(124,58,237,0.08)]"
                >
                  <div className="gradient-text text-5xl font-black md:text-6xl">
                    {item.value}
                  </div>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-base text-slate-600">
              See how these numbers happened in our{" "}
              <Link
                href="/insights/case-studies"
                className="font-semibold text-violet-600 hover:opacity-70"
              >
                case studies
              </Link>
              .
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 9 · WITHOUT VS WITH */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                The Difference
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                A faceless business. A founder brand.
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {comparison.map((item) => (
                <div
                  key={item.without}
                  className="magnetic-hover grid items-center gap-3 rounded-[24px] border border-slate-200 bg-white p-5 sm:grid-cols-[1fr_auto_1fr]"
                >
                  <div className="rounded-2xl bg-[#F7F7F5] px-5 py-3 text-center font-semibold text-slate-500 line-through decoration-slate-300">
                    {item.without}
                  </div>
                  <div className="pulse-line rotate-90 text-center text-2xl font-black text-violet-500 sm:rotate-0">
                    →
                  </div>
                  <div className="rounded-2xl border-2 border-violet-600 bg-violet-50 px-5 py-3 text-center font-bold text-violet-800">
                    {item.with}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-base text-slate-600">
              Someone can copy your offer and your words. Nobody can copy
              your story.
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 10 · THE BRAND SYSTEM STACK */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                The Brand System Stack
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Eight assets.{" "}
                <span className="gradient-text">Zero guesswork.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                This is the same system we use to build our own brand, turned
                into deliverables you own forever.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {brandSystem.map((item) => (
                <div
                  key={item.name}
                  className="magnetic-hover rounded-[28px] border border-black/5 bg-white p-6"
                >
                  <div className="inline-flex rounded-full bg-violet-50 px-4 py-1.5 text-sm font-black text-violet-700">
                    {item.name}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 11 · MOTION MARQUEE */}
      <section className="overflow-hidden border-y border-violet-100 py-10">
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={`mx-8 whitespace-nowrap text-4xl font-black tracking-tight md:text-6xl ${
                index % 2 === 0 ? "text-violet-600" : "text-violet-200"
              }`}
            >
              {word} ✦
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 12 · HOW WE BUILD IT */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                How We Build It
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                From unknown expert to obvious choice.
              </h2>
            </div>

            <div className="relative mt-16 grid gap-10 md:grid-cols-4">
              <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-0.5 bg-violet-200 md:block" />
              {process.map((item) => (
                <div key={item.step} className="relative text-center">
                  <div className="magnetic-hover relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-violet-600 text-lg font-black text-white shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[240px] text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 13 · CONNECTED ECOSYSTEM */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Connected Growth Ecosystem
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Your brand opens the door. Systems close it.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {ecosystem.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[32px] border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-[0_25px_70px_rgba(124,58,237,0.12)]"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                    {item.label}
                  </div>
                  <p className="mt-4 text-lg leading-8 text-slate-700">
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

      {/* SECTION 14 · REVIEWS */}
      <Testimonials />

      {/* SECTION 15 · FAQ */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Common Questions
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Everything founders ask about personal branding.
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
              Still deciding?{" "}
              <Link
                href="/contact"
                className="font-semibold text-violet-600 hover:opacity-70"
              >
                Talk to us
              </Link>{" "}
              or read more{" "}
              <Link
                href="/insights/articles"
                className="font-semibold text-violet-600 hover:opacity-70"
              >
                strategic articles
              </Link>
              .
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 16 · RECENT INSIGHTS */}
      <InsightsEcosystem />

      {/* SECTION 17 · FINAL CTA */}
      <FadeUp>
        <section className="px-6 pb-24 pt-4 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[40px] border border-violet-100 bg-white px-8 py-16 text-center shadow-[0_30px_90px_rgba(124,58,237,0.1)] md:px-16 md:py-20">
              <div className="pointer-events-none absolute inset-0 premium-grid" />
              <div className="floaty pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-violet-100 blur-2xl" />
              <div className="floaty-late pointer-events-none absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-fuchsia-100 blur-2xl" />

              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-[#111111] md:text-6xl">
                  Stop being the best kept secret{" "}
                  <span className="gradient-text">in your industry.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
                  One call. A brand audit. A ninety day plan to make your name
                  the reason clients come to you.
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
