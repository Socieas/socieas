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
  title: "Full Stack Development Services",
  description:
    "Socieas builds fast, scalable web applications with Next.js, React, and Node.js. Frontend systems, backend infrastructure, APIs, CMS integration, and cloud deployment for businesses worldwide.",
  path: "/services/full-stack-development",
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

const stackLayers = [
  { step: "01", label: "Frontend", note: "What your users see and feel" },
  { step: "02", label: "API Layer", note: "How your systems talk" },
  { step: "03", label: "Backend", note: "Where the logic lives" },
  { step: "04", label: "Cloud", note: "Where it all runs, always" },
];

const pains = [
  { number: "01", label: "Your template site looks like everyone else and loads like it too" },
  { number: "02", label: "Every new feature needs a workaround because the foundation cannot scale" },
  { number: "03", label: "Google and AI engines cannot read your site, so buyers never find you" },
];

const speedStats = [
  { value: "53%", width: "w-[53%]", label: "of mobile visitors abandon a site that takes longer than three seconds to load" },
  { value: "33%", width: "w-[33%]", label: "of websites pass all Core Web Vitals, the speed signals Google ranks with" },
  { value: "70%", width: "w-[70%]", label: "of consumers say page speed affects their willingness to buy from a site" },
];

const buildBlocks = [
  { badge: "A", title: "Frontend Systems", text: "Interfaces in React and Next.js that feel instant on every device." },
  { badge: "B", title: "Backend Infrastructure", text: "Node.js services and databases built for scale from day one." },
  { badge: "C", title: "API Development", text: "Clean, documented APIs that connect your product to anything." },
  { badge: "D", title: "CMS Integration", text: "Headless CMS setups so your team edits content without touching code." },
  { badge: "E", title: "Performance Engineering", text: "Core Web Vitals, image optimization, and caching tuned to pass." },
  { badge: "F", title: "Cloud Deployment", text: "Hosting, domains, SSL, and CI pipelines handled end to end." },
];

const comparison = [
  { without: "Template site that looks like a template", with: "Custom product built around your business" },
  { without: "Slow pages bleeding visitors every second", with: "Sub three second loads on real mobile networks" },
  { without: "JavaScript shells invisible to AI crawlers", with: "Server rendered pages AI engines can cite" },
  { without: "Every change waits on an agency ticket", with: "A CMS your team updates in minutes" },
];

const toolStack = [
  { name: "Next.js", role: "The framework behind the fastest sites on the web" },
  { name: "React", role: "Interfaces that respond the moment users act" },
  { name: "TypeScript", role: "Type safe code that catches bugs before launch" },
  { name: "Node.js", role: "Backend services that scale with your traffic" },
  { name: "Tailwind CSS", role: "Design systems shipped fast and kept consistent" },
  { name: "Sanity CMS", role: "Content your team edits without a developer" },
  { name: "PostgreSQL", role: "Reliable structured data your product can trust" },
  { name: "REST APIs", role: "Integrations with CRMs, payments, and AI tools" },
];

const marqueeWords = [
  "Design",
  "Engineer",
  "Ship",
  "Measure",
  "Optimize",
  "Scale",
];

const process = [
  { step: "01", title: "Discover", text: "We map your users, your goals, and what the product must do" },
  { step: "02", title: "Architect", text: "We design the stack, the data model, and the page structure" },
  { step: "03", title: "Build", text: "We engineer in fast sprints with previews you can click every week" },
  { step: "04", title: "Launch", text: "We deploy, monitor, and keep tuning speed after go live" },
];

const ecosystem = [
  {
    href: "/services/digital-marketing",
    label: "Digital Marketing",
    text: "A fast site converts the traffic your campaigns bring in.",
  },
  {
    href: "/services/crm-solutions",
    label: "CRM Solutions",
    text: "Every form and enquiry flows straight into your pipeline.",
  },
  {
    href: "/services/ai-automation",
    label: "AI Automation",
    text: "Your product connects to AI workflows that work while you sleep.",
  },
  {
    href: "/services/personal-branding",
    label: "Personal Branding",
    text: "Authority content needs a platform built to rank and load.",
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
    question: "What does full stack development actually mean?",
    answer:
      "It means one team builds everything your product needs. The frontend your users see, the backend logic, the database, the APIs, and the cloud infrastructure it all runs on. No handoffs between separate vendors.",
  },
  {
    question: "What technology stack do you build with?",
    answer:
      "Our core stack is Next.js, React, TypeScript, and Node.js with Tailwind CSS for design systems and Sanity as a headless CMS. We choose supporting tools like PostgreSQL and cloud hosting based on what your product needs.",
  },
  {
    question: "Can you rebuild or fix our existing website?",
    answer:
      "Yes. We audit your current site, keep what works, and rebuild what holds you back. Many projects start as a performance and SEO rescue and grow into a full product rebuild.",
  },
  {
    question: "How long does a typical build take?",
    answer:
      "A marketing site with CMS usually ships in three to six weeks. Larger web applications run in phased sprints so you see working previews every week instead of waiting months for a reveal.",
  },
  {
    question: "Why does site speed matter so much?",
    answer:
      "Because 53% of mobile visitors leave a site that takes longer than three seconds, and B2B sites loading in one second convert around three times higher than sites taking five. Speed is a revenue metric, not a technical detail.",
  },
  {
    question: "Do you handle hosting and maintenance after launch?",
    answer:
      "Yes. We set up hosting, domains, SSL, and deployment pipelines, then stay on for monitoring, updates, and improvements. We build for businesses worldwide, so everything runs in the cloud.",
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
            name: "Full Stack Development Services",
            description:
              "Socieas builds fast, scalable web applications for businesses worldwide. Frontend systems in React and Next.js, backend infrastructure in Node.js, API development, headless CMS integration, performance engineering, and cloud deployment.",
            url: "https://socieas.com/services/full-stack-development",
            serviceType: "Full Stack Development",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Services", url: "https://socieas.com/services" },
            {
              name: "Full Stack Development",
              url: "https://socieas.com/services/full-stack-development",
            },
          ]),
          faqSchema,
        ]}
        id="full-stack-development-page-schema"
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
                Next.js · React · Node.js Engineering
              </div>

              <h1 className="rise rise-2 mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#111111] md:text-6xl lg:text-7xl">
                Websites that load fast{" "}
                <span className="gradient-text">and sell faster.</span>
              </h1>

              <p className="rise rise-3 mt-6 max-w-lg text-lg leading-8 text-slate-600">
                More than half of your visitors leave if a page takes over
                three seconds. We engineer web products that pass Core Web
                Vitals, rank in search and AI engines, and turn traffic into
                revenue.
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
                src="/images/services/full-stack-development-banner.webp"
                alt="Socieas full stack development illustration showing frontend interface, code, database, APIs, and cloud infrastructure connected as one system"
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
                  Core Web Vitals passing
                </span>
              </div>
              <div className="floaty-late glass-premium absolute -right-4 bottom-10 hidden rounded-2xl px-5 py-3 md:block">
                <span className="text-sm font-bold text-violet-700">
                  Built to scale worldwide
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

      {/* SECTION 3 · THE FULL STACK (LAYER INFOGRAPHIC) */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What Full Stack Means
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                One team. Every layer of your product.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                A website is not one thing. It is four layers that must work
                as one system. When separate vendors build separate layers,
                things break. We own the whole stack.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-4 md:gap-4">
              {stackLayers.map((item, index) => (
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
                  {index < stackLayers.length - 1 && (
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

      {/* SECTION 4 · THE PROBLEM */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              The Slow Site Problem
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Your website is losing deals silently.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Visitors do not complain about a slow or generic site. They just
              leave and buy from someone else.
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

      {/* SECTION 5 · SPEED DATA (ANIMATED BARS) */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What The Data Says
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Speed is a revenue metric.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {speedStats.map((item) => (
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

      {/* SECTION 6 · THE 3X TRUTH (LIGHT DESIGN) */}
      <FadeUp>
        <section className="px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[40px] border border-violet-100 bg-white px-8 py-14 text-center shadow-[0_30px_90px_rgba(124,58,237,0.08)] md:px-16">
              <div className="pointer-events-none absolute inset-0 premium-grid" />
              <div className="floaty pointer-events-none absolute -left-10 top-6 h-32 w-32 rounded-full bg-violet-100 blur-xl" />
              <div className="floaty-late pointer-events-none absolute -right-8 bottom-4 h-32 w-32 rounded-full bg-fuchsia-100 blur-xl" />
              <div className="relative">
                <div className="gradient-text text-7xl font-black md:text-8xl">
                  3x
                </div>
                <p className="mx-auto mt-4 max-w-2xl text-xl font-bold leading-8 text-[#111111]">
                  B2B websites that load in one second convert around three
                  times higher than sites that take five. Your fastest
                  competitor is winning deals you never saw.
                </p>
                <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
                  That is why performance is engineered in from day one, not
                  patched in later.
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
                Six capabilities. One engineering partner.
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

      {/* SECTION 8 · TEMPLATE VS ENGINEERED */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                The Difference
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                A template. An engineered product.
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
              Server rendered pages are also what search and AI engines can
              actually read, which is why our builds are structured for SEO
              and AI discovery from the first commit.
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 9 · TOOL STACK */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Our Engineering Stack
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Modern tools.{" "}
                <span className="gradient-text">Proven in production.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                The same stack running the fastest products on the web,
                chosen for speed today and maintainability years from now.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {toolStack.map((item) => (
                <div
                  key={item.name}
                  className="magnetic-hover rounded-[28px] border border-black/5 bg-[#F7F7F5] p-6"
                >
                  <div className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-black text-violet-700">
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

      {/* SECTION 10 · MOTION MARQUEE */}
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

      {/* SECTION 11 · HOW WE SHIP */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                How We Ship
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                From idea to live product, in sprints.
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

      {/* SECTION 12 · CONNECTED ECOSYSTEM */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Connected Growth Ecosystem
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Your product powers everything else.
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

      {/* SECTION 13 · REVIEWS */}
      <Testimonials />

      {/* SECTION 14 · FAQ */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Common Questions
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Everything founders ask us about builds.
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

      {/* SECTION 15 · RECENT INSIGHTS */}
      <InsightsEcosystem />

      {/* SECTION 16 · FINAL CTA */}
      <FadeUp>
        <section className="px-6 pb-24 pt-4 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[40px] border border-violet-100 bg-white px-8 py-16 text-center shadow-[0_30px_90px_rgba(124,58,237,0.1)] md:px-16 md:py-20">
              <div className="pointer-events-none absolute inset-0 premium-grid" />
              <div className="floaty pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-violet-100 blur-2xl" />
              <div className="floaty-late pointer-events-none absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-fuchsia-100 blur-2xl" />

              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-[#111111] md:text-6xl">
                  Build the product{" "}
                  <span className="gradient-text">your business deserves.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
                  One call. A technical audit of your current site. A clear
                  build roadmap with timelines.
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
