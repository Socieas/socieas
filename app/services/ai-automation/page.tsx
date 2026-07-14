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
  title: "AI Automation Services for Business Growth",
  description:
    "Socieas builds AI automation systems for businesses worldwide. Lead routing, customer responses, CRM sync, and reporting handled by an intelligent layer on top of the tools you already use.",
  path: "/services/ai-automation",
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
`;

const pains = [
  { number: "01", label: "Leads wait hours for a reply" },
  { number: "02", label: "Data lives in five disconnected tools" },
  { number: "03", label: "Your team drowns in copy paste work" },
];

const adoption = [
  { value: "88%", width: "w-[88%]", label: "of enterprises now use AI automation in at least one function" },
  { value: "38%", width: "w-[38%]", label: "of small and mid businesses have already adopted AI automation" },
  { value: "74%", width: "w-[74%]", label: "of employees say automation helps them work faster" },
];

const automations = [
  { badge: "A", title: "Lead Qualification", text: "Every inquiry answered, scored, and routed in seconds." },
  { badge: "B", title: "Customer Responses", text: "Common questions handled instantly, around the clock." },
  { badge: "C", title: "CRM Sync", text: "Every contact and deal updated without human typing." },
  { badge: "D", title: "Smart Follow Up", text: "No lead forgotten. Sequences fire at the right moment." },
  { badge: "E", title: "Reporting", text: "Numbers land on one dashboard before you even ask." },
  { badge: "F", title: "Content Operations", text: "Drafting, scheduling, and repurposing on autopilot." },
];

const caseResults = [
  { value: "70%", label: "Less repetitive manual work" },
  { value: "80%", label: "Faster customer response times" },
  { value: "100%", label: "Centralized operational visibility" },
  { value: "24/7", label: "Automation running in the background" },
];

const transformation = [
  { before: "Manual replies", after: "AI qualification" },
  { before: "Spreadsheet updates", after: "Automatic CRM sync" },
  { before: "Slow email follow ups", after: "Smart routing" },
  { before: "Scattered systems", after: "One unified dashboard" },
];

const toolStack = [
  { name: "n8n", role: "Complex custom workflows with full control" },
  { name: "Make", role: "Visual automation for multi step operations" },
  { name: "Zapier", role: "Fast connections across 7000+ everyday apps" },
  { name: "OpenAI", role: "Language intelligence for replies and scoring" },
  { name: "HubSpot", role: "CRM where every lead and follow up lives" },
  { name: "Google Workspace", role: "Sheets, docs, and mail wired into flows" },
  { name: "Slack", role: "Instant alerts where your team already talks" },
  { name: "WhatsApp API", role: "Customer conversations answered instantly" },
];

const marqueeWords = [
  "Automate",
  "Integrate",
  "Accelerate",
  "Measure",
  "Scale",
  "Repeat",
];

const process = [
  { step: "01", title: "Map", text: "We audit your workflows and find the hours you are losing" },
  { step: "02", title: "Design", text: "We blueprint an automation ecosystem around your tools" },
  { step: "03", title: "Build", text: "We connect, test, and launch every flow with safeguards" },
  { step: "04", title: "Optimize", text: "We measure results and expand what proves its value" },
];

const ecosystem = [
  {
    href: "/services/digital-marketing",
    label: "Digital Marketing",
    text: "Automation scales the campaigns marketing launches.",
  },
  {
    href: "/services/crm-solutions",
    label: "CRM Solutions",
    text: "Your automations live inside a CRM built for follow up.",
  },
  {
    href: "/services/personal-branding",
    label: "Personal Branding",
    text: "Win hours back, then invest them in your authority.",
  },
  {
    href: "/services/full-stack-development",
    label: "Full Stack Development",
    text: "Custom systems when off the shelf tools hit limits.",
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
    question: "What is AI automation for business?",
    answer:
      "AI automation is an intelligent layer that connects the tools you already use, handles repetitive work like lead replies, data entry, and reporting automatically, and keeps humans in control of the decisions that matter.",
  },
  {
    question: "Do we need to replace our current tools?",
    answer:
      "No. We build on top of what you already use. Your CRM, email, spreadsheets, and chat tools stay. The automation layer connects them so they finally work as one system.",
  },
  {
    question: "Which tools do you build with?",
    answer:
      "We work with n8n, Make, Zapier, OpenAI models, HubSpot, Google Workspace, Slack, and the WhatsApp API. The stack is chosen to fit your business, not the other way around.",
  },
  {
    question: "Will AI replace my team?",
    answer:
      "No. AI handles the repetitive work and your team keeps control of every business critical decision. The goal is a team focused on high value work, not a smaller team.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Simple workflows go live in two to three weeks. Full automation ecosystems take sixty to ninety days. Most businesses see full return on investment within three to six months.",
  },
  {
    question: "Which countries do you work with?",
    answer:
      "We work with founders and businesses worldwide. Automations run in the cloud, so location is never a barrier.",
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
            name: "AI Automation Services",
            description:
              "Socieas builds AI automation systems for businesses worldwide, covering lead qualification, customer responses, CRM sync, smart follow up, reporting, and workflow infrastructure.",
            url: "https://socieas.com/services/ai-automation",
            serviceType: "AI Automation",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Services", url: "https://socieas.com/services" },
            {
              name: "AI Automation",
              url: "https://socieas.com/services/ai-automation",
            },
          ]),
          faqSchema,
        ]}
        id="ai-automation-page-schema"
      />

      <Navbar />

      {/* SECTION 1 · HERO WITH BANNER */}
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
                AI Automation Systems · Live 24/7
              </div>

              <h1 className="rise rise-2 mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#111111] md:text-6xl lg:text-7xl">
                Your operations on{" "}
                <span className="text-violet-600">intelligent autopilot.</span>
              </h1>

              <p className="rise rise-3 mt-6 max-w-lg text-lg leading-8 text-slate-600">
                We build an AI layer on top of the tools you already use so
                leads get answered, data stays synced, and your team focuses on
                work that actually needs a human.
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
                src="/images/services/ai-automation-banner.webp"
                alt="Socieas AI automation hub connecting CRM, email, chat, spreadsheets, and reporting into one intelligent system"
                width={1600}
                height={1100}
                priority
                className="relative rounded-[36px] border border-white/60 shadow-[0_30px_80px_rgba(109,40,217,0.15)]"
              />

              <div className="floaty glass-premium absolute -left-4 top-8 hidden items-center gap-2 rounded-2xl px-5 py-3 md:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-bold text-violet-700">
                  Workflows running
                </span>
              </div>
              <div className="floaty-late glass-premium absolute -right-4 bottom-10 hidden rounded-2xl px-5 py-3 md:block">
                <span className="text-sm font-bold text-violet-700">
                  70% less manual work
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

      {/* SECTION 3 · WHAT IS AI AUTOMATION (LAYER DIAGRAM) */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What Is AI Automation
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                An intelligent layer on top of your tools.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                AI automation connects the tools you already use, handles the
                repetitive work automatically, and keeps humans in control of
                the decisions that matter.
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-3xl">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Your Existing Tools
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {["CRM", "Email", "Sheets", "Chat", "Calendar", "Forms"].map(
                    (tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-[#F7F7F5] px-4 py-1.5 text-sm font-semibold text-slate-700"
                      >
                        {tool}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="pulse-line mx-auto h-10 w-0.5 bg-violet-400" />

              <div className="rounded-[28px] bg-violet-600 p-8 text-center shadow-[0_25px_70px_rgba(109,40,217,0.25)]">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-200">
                  The Socieas AI Layer
                </div>
                <div className="mt-3 text-2xl font-black text-white">
                  Qualifies · Routes · Syncs · Reports · Follows Up
                </div>
              </div>

              <div className="pulse-line mx-auto h-10 w-0.5 bg-violet-400" />

              <div className="rounded-[28px] border border-violet-200 bg-violet-50 p-6 text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
                  The Outcome
                </div>
                <div className="mt-3 text-xl font-black text-[#111111]">
                  Faster responses. Clean data. A team free to do real work.
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 4 · THE PROBLEM */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              The Real Problem
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Growth should not mean more busywork.
            </h2>

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

      {/* SECTION 5 · ADOPTION STATS (ANIMATED BARS) */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                The Shift Is Already Here
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Your competitors are not waiting.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {adoption.map((item) => (
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

            <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-slate-600">
              McKinsey pegs the average return at 250% within eighteen months.
              The question is no longer if, it is how well.
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 6 · WHAT WE AUTOMATE (WORKFLOW NODES) */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What We Automate
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Six workflows that eat your team's week.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {automations.map((item) => (
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
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Runs automatically
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 7 · REAL CASE STUDY RESULTS */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Real Client Results
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                What one automation ecosystem changed.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                A fast growing service business wanted to scale without hiring
                just to keep up. We built an AI layer on their existing tools.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {caseResults.map((item) => (
                <div
                  key={item.label}
                  className="premium-card magnetic-hover text-center"
                >
                  <div className="text-5xl font-black text-violet-600">
                    {item.value}
                  </div>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/insights/case-studies/how-ai-reduced-manual-work"
                className="inline-flex items-center gap-2 font-semibold text-violet-600 transition-all duration-300 hover:gap-4 hover:opacity-70"
              >
                Read the full case study →
              </Link>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 8 · BEFORE VS AFTER */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                The Transformation
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Same tools. Completely different business.
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {transformation.map((item) => (
                <div
                  key={item.before}
                  className="magnetic-hover grid items-center gap-3 rounded-[24px] border border-slate-200 bg-[#F7F7F5] p-5 sm:grid-cols-[1fr_auto_1fr]"
                >
                  <div className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-slate-500 line-through decoration-slate-300">
                    {item.before}
                  </div>
                  <div className="pulse-line text-center text-2xl font-black text-violet-500">
                    →
                  </div>
                  <div className="rounded-2xl bg-violet-600 px-5 py-3 text-center font-bold text-white">
                    {item.after}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-base text-slate-600">
              Humans stayed in control of every business critical decision. The
              AI just removed the repetition.
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 9 · TOOL STACK */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Our Tool Stack
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Built with the best. Chosen for you.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                We are not married to one platform. The stack is chosen to fit
                your business, your budget, and your team.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {toolStack.map((item) => (
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

      {/* SECTION 10 · MOTION MARQUEE */}
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

      {/* SECTION 11 · HOW WE BUILD */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                How We Build
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                From audit to autopilot in four steps.
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
                Automation works harder when everything connects.
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
                  Stop doing work{" "}
                  <span className="text-violet-600">a system can do better.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
                  One call. A workflow audit. A clear automation roadmap.
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
