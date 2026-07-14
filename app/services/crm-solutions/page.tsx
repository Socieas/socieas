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
  title: "CRM Solutions and Salesforce Implementation Services",
  description:
    "Socieas implements Salesforce, HubSpot, and Zoho CRM systems for businesses worldwide. Sales Cloud, Service Cloud, Marketing Cloud, pipeline design, workflow automation, and team adoption.",
  path: "/services/crm-solutions",
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

const pipelineStages = [
  { step: "01", label: "New Enquiry", note: "Captured automatically" },
  { step: "02", label: "Qualified", note: "Scored and assigned" },
  { step: "03", label: "Proposal Sent", note: "Follow up scheduled" },
  { step: "04", label: "Won", note: "Handed to delivery" },
];

const salesforceClouds = [
  {
    name: "Sales Cloud",
    text: "Pipeline, forecasting, and follow up automation so your sales team closes more with less admin.",
  },
  {
    name: "Service Cloud",
    text: "Cases, routing, and knowledge so every customer issue is tracked and resolved fast.",
  },
  {
    name: "Marketing Cloud",
    text: "Journeys, segmentation, and email automation connected to real pipeline data.",
  },
  {
    name: "Custom Development",
    text: "Flows, Apex, and integrations when your process needs more than standard setup.",
  },
];

const leaks = [
  { number: "01", label: "Leads come in but follow ups quietly slip" },
  { number: "02", label: "Quotes go out and nobody chases them" },
  { number: "03", label: "Client history lives in one person's inbox" },
];

const crmStats = [
  { value: "91%", width: "w-[91%]", label: "of companies with more than ten employees already run on a CRM" },
  { value: "37%", width: "w-[37%]", label: "of businesses report revenue loss caused by poor CRM data quality" },
  { value: "27%", width: "w-[27%]", label: "average lift in customer retention after proper CRM adoption" },
];

const buildBlocks = [
  { badge: "A", title: "Pipeline Architecture", text: "Deal stages that mirror how you actually sell." },
  { badge: "B", title: "Lead Capture", text: "Forms, chat, and ads flowing into one clean record." },
  { badge: "C", title: "Follow Up Automation", text: "Reminders and sequences so no deal goes cold." },
  { badge: "D", title: "Data Migration", text: "Spreadsheets and old tools moved in, deduplicated." },
  { badge: "E", title: "Dashboards", text: "Pipeline value and conversion visible at a glance." },
  { badge: "F", title: "Team Adoption", text: "Training and simple workflows people actually follow." },
];

const comparison = [
  { without: "Leads tracked in memory and inboxes", with: "Every lead captured with full history" },
  { without: "Follow ups depend on someone remembering", with: "Follow ups fire automatically on schedule" },
  { without: "Quotes and proposals slip through cracks", with: "Defined stages keep every deal moving" },
  { without: "Revenue forecast is a guess", with: "Pipeline and conversion visible in real time" },
];

const platforms = [
  { name: "Salesforce", role: "The world's leading CRM for 13 straight years" },
  { name: "HubSpot", role: "Fast to adopt CRM for growing service teams" },
  { name: "Zoho", role: "Full business suite at a practical price point" },
  { name: "Pipedrive", role: "Simple visual pipelines for small sales teams" },
  { name: "n8n", role: "Custom automations wired into your CRM" },
  { name: "WhatsApp API", role: "Conversations logged where deals live" },
  { name: "Google Workspace", role: "Mail and sheets synced with every record" },
  { name: "Slack", role: "Deal alerts where your team already talks" },
];

const marqueeWords = [
  "Capture",
  "Qualify",
  "Follow Up",
  "Close",
  "Retain",
  "Grow",
];

const process = [
  { step: "01", title: "Audit", text: "We map how leads enter, move, and leak out of your business today" },
  { step: "02", title: "Architect", text: "We design stages, fields, and automations around your sales reality" },
  { step: "03", title: "Migrate", text: "We move your data in clean, deduplicated, and organized" },
  { step: "04", title: "Adopt", text: "We train your team and refine until the CRM runs your revenue" },
];

const ecosystem = [
  {
    href: "/services/ai-automation",
    label: "AI Automation",
    text: "An AI layer on your CRM qualifies and routes leads on its own.",
  },
  {
    href: "/services/digital-marketing",
    label: "Digital Marketing",
    text: "Campaign leads land in a pipeline built to convert them.",
  },
  {
    href: "/services/personal-branding",
    label: "Personal Branding",
    text: "Authority brings the leads. The CRM makes sure none are lost.",
  },
  {
    href: "/services/full-stack-development",
    label: "Full Stack Development",
    text: "Custom portals and integrations when your CRM needs more.",
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
    question: "What does a CRM actually do for a service business?",
    answer:
      "A CRM is the operating system for how you win and keep clients. It gives you a visible pipeline, automatic follow ups, complete client history, and real conversion numbers instead of guesses.",
  },
  {
    question: "Do you implement Salesforce?",
    answer:
      "Yes. We deliver end to end Salesforce implementation covering Sales Cloud, Service Cloud, Marketing Cloud, custom development, and workflow automation for businesses worldwide.",
  },
  {
    question: "Which CRM platform is right for us?",
    answer:
      "It depends on your team size, sales process, and budget. We implement Salesforce, HubSpot, Zoho, and Pipedrive, and we recommend the platform that fits you instead of the one with the biggest logo.",
  },
  {
    question: "Why do most CRM implementations fail?",
    answer:
      "Research puts the CRM implementation failure rate around 55%, and the cause is almost always the same. Companies buy a tool but never design the system around how their team actually works. We build for adoption first.",
  },
  {
    question: "Can you migrate our existing data?",
    answer:
      "Yes. We move data from spreadsheets, inboxes, and older tools into your new CRM, cleaned, deduplicated, and structured so your team starts with records they can trust.",
  },
  {
    question: "Do you work with businesses outside India?",
    answer:
      "Yes. We implement CRM systems for businesses worldwide. Everything runs in the cloud, so your location never limits the build.",
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
            name: "CRM Solutions",
            description:
              "Socieas designs and implements CRM systems for businesses worldwide, including end to end Salesforce implementation across Sales Cloud, Service Cloud, and Marketing Cloud, plus HubSpot and Zoho, pipeline architecture, workflow automation, data migration, and team adoption.",
            url: "https://socieas.com/services/crm-solutions",
            serviceType: "CRM Implementation",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Services", url: "https://socieas.com/services" },
            {
              name: "CRM Solutions",
              url: "https://socieas.com/services/crm-solutions",
            },
          ]),
          faqSchema,
        ]}
        id="crm-solutions-page-schema"
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
                Salesforce · HubSpot · Zoho Implementation
              </div>

              <h1 className="rise rise-2 mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#111111] md:text-6xl lg:text-7xl">
                Stop losing deals{" "}
                <span className="gradient-text">you already earned.</span>
              </h1>

              <p className="rise rise-3 mt-6 max-w-lg text-lg leading-8 text-slate-600">
                Most businesses do not have a lead problem. They have a leaky
                bucket. We implement CRM systems that capture every lead, chase
                every follow up, and show you exactly where revenue stands.
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
                src="/images/services/crm-solutions-banner.webp"
                alt="Socieas CRM pipeline dashboard showing deal stages, contact records, follow up reminders, and revenue reporting"
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
                  Pipeline visible
                </span>
              </div>
              <div className="floaty-late glass-premium absolute -right-4 bottom-10 hidden rounded-2xl px-5 py-3 md:block">
                <span className="text-sm font-bold text-violet-700">
                  Zero missed follow ups
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

      {/* SECTION 3 · WHAT IS A CRM (PIPELINE INFOGRAPHIC) */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What A CRM Really Is
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                The operating system for winning clients.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                A CRM is not a fancy contact list. It is a system where every
                lead is captured, every deal has a stage, every follow up has a
                date, and revenue stops depending on memory.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-4 md:gap-4">
              {pipelineStages.map((item, index) => (
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
                  {index < pipelineStages.length - 1 && (
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

      {/* SECTION 4 · SALESFORCE EXPERTISE */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Salesforce Implementation
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Deep expertise in the{" "}
                <span className="gradient-text">world's #1 CRM.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Salesforce has led the global CRM market for 13 consecutive
                years. We implement it end to end, from first login to fully
                automated revenue workflows.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {salesforceClouds.map((item) => (
                <div
                  key={item.name}
                  className="group rounded-[32px] border border-black/5 bg-[#F7F7F5] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:bg-white hover:shadow-[0_25px_70px_rgba(124,58,237,0.12)]"
                >
                  <div className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-black text-violet-700 transition-colors duration-300 group-hover:bg-violet-50">
                    {item.name}
                  </div>
                  <p className="mt-5 text-base leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-base text-slate-600">
              Not sure Salesforce is the right size for you? We also implement
              HubSpot, Zoho, and Pipedrive, and we will tell you honestly which
              one fits.
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 5 · THE LEAKY BUCKET PROBLEM */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              The Leaky Bucket Problem
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              More leads will not fix a leaking pipeline.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Leads come in. Then follow ups slip, conversations get lost, and
              revenue quietly walks out the door.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {leaks.map((item) => (
                <div
                  key={item.number}
                  className="magnetic-hover rounded-3xl border border-slate-200 bg-white p-8 text-left"
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

      {/* SECTION 6 · RESEARCHED STATS (ANIMATED BARS) */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What The Data Says
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                The businesses winning already run on systems.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {crmStats.map((item) => (
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

      {/* SECTION 7 · THE 55% TRUTH (LIGHT DESIGN) */}
      <FadeUp>
        <section className="px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[40px] border border-violet-100 bg-white px-8 py-14 text-center shadow-[0_30px_90px_rgba(124,58,237,0.08)] md:px-16">
              <div className="pointer-events-none absolute inset-0 premium-grid" />
              <div className="floaty pointer-events-none absolute -left-10 top-6 h-32 w-32 rounded-full bg-violet-100 blur-xl" />
              <div className="floaty-late pointer-events-none absolute -right-8 bottom-4 h-32 w-32 rounded-full bg-fuchsia-100 blur-xl" />
              <div className="relative">
                <div className="gradient-text text-7xl font-black md:text-8xl">
                  55%
                </div>
                <p className="mx-auto mt-4 max-w-2xl text-xl font-bold leading-8 text-[#111111]">
                  of CRM implementations fail to hit their objectives. Not
                  because the software is bad, but because nobody designed the
                  system around how the team actually works.
                </p>
                <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
                  That is why we build for adoption first, tools second.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 8 · WHAT WE BUILD */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What We Build
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Six pieces of a CRM that runs itself.
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

      {/* SECTION 9 · WITHOUT VS WITH */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                The Difference
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Without a CRM. With a Socieas CRM.
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
              The best time to implement a CRM is before revenue starts
              leaking, not after.
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 10 · PLATFORM STACK */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Our Platform Stack
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Platform agnostic. Outcome obsessed.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                We recommend the platform that fits your team and budget, then
                wire it into everything else you use.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {platforms.map((item) => (
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

      {/* SECTION 12 · HOW WE IMPLEMENT */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                How We Implement
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                From leaky bucket to revenue engine.
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
                Your CRM is the center of everything.
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
                Everything founders ask us about CRMs.
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
                  Fix the bucket{" "}
                  <span className="gradient-text">before you fill it.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
                  One call. A pipeline audit. A clear CRM roadmap for your
                  business.
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
