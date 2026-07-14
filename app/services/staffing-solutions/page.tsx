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
  title: "IT Staffing Solutions and Remote Tech Teams",
  description:
    "Socieas builds vetted tech teams for businesses worldwide. IT staff augmentation, dedicated remote developers, Salesforce specialists, AI engineers, and direct hire recruitment with structured vetting.",
  path: "/services/staffing-solutions",
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

const talentPipeline = [
  { step: "01", label: "Define", note: "Role, stage, and outcomes" },
  { step: "02", label: "Source", note: "Networks before job boards" },
  { step: "03", label: "Vet", note: "Skills tested, not claimed" },
  { step: "04", label: "Deploy", note: "Onboarded and producing" },
];

const pains = [
  { number: "01", label: "Roles stay open for months while projects stall and revenue waits" },
  { number: "02", label: "A wrong hire burns cash, morale, and six months you cannot get back" },
  { number: "03", label: "Your core team covers the gap until your best people start burning out" },
];

const talentStats = [
  { value: "74%", width: "w-[74%]", label: "of employers worldwide say they cannot find the skilled talent they need" },
  { value: "72%", width: "w-[72%]", label: "of tech leaders report a skills gap inside their own department" },
  { value: "90%", width: "w-[90%]", label: "of organizations will be hit by the IT skills shortage by 2026, per IDC" },
];

const roles = [
  { badge: "A", title: "Full Stack Developers", text: "React, Next.js, and Node.js engineers who ship production code." },
  { badge: "B", title: "Salesforce Specialists", text: "Admins, developers, and consultants across the Salesforce clouds." },
  { badge: "C", title: "AI and Automation Engineers", text: "The most contested skill set of 2026, sourced and vetted for you." },
  { badge: "D", title: "DevOps and Cloud Engineers", text: "Infrastructure, pipelines, and uptime your product depends on." },
  { badge: "E", title: "Data Engineers", text: "Pipelines and models that turn your data into decisions." },
  { badge: "F", title: "Digital Marketing Talent", text: "Performance marketers and content operators who own outcomes." },
];

const models = [
  {
    name: "Staff Augmentation",
    stage: "Contract to test",
    text: "Vetted specialists join your team on flexible contracts. Ship fast, stay lean, no fixed payroll cost.",
  },
  {
    name: "Dedicated Remote Teams",
    stage: "Scale with control",
    text: "A full remote pod sourced, managed, and supported by us, working as an extension of your company.",
  },
  {
    name: "Direct Hire",
    stage: "Hire in house to scale",
    text: "We run the search, vetting, and offer process, then the hire joins your payroll permanently.",
  },
];

const comparison = [
  { without: "Job post, then three hundred random resumes", with: "A shortlist of vetted, tested candidates" },
  { without: "Months of interviews while work piles up", with: "Talent deployed in weeks, not quarters" },
  { without: "Skills taken on faith from a resume", with: "Live technical rounds before you meet anyone" },
  { without: "Hire quits and the search starts over", with: "Onboarding support and replacement cover" },
];

const vettingStack = [
  { name: "Role Scorecards", role: "Every search starts with defined outcomes" },
  { name: "Network Sourcing", role: "Referrals and communities before job boards" },
  { name: "Portfolio Review", role: "Real shipped work, not claimed experience" },
  { name: "Live Technical Rounds", role: "Skills proven in real problem solving" },
  { name: "Structured Interviews", role: "Same bar for every candidate, no gut calls" },
  { name: "Reference Verification", role: "Past managers confirm what resumes claim" },
  { name: "Onboarding SOPs", role: "New talent productive in the first two weeks" },
  { name: "30 Day Check Ins", role: "We stay accountable after the placement" },
];

const marqueeWords = [
  "Define",
  "Source",
  "Vet",
  "Deploy",
  "Support",
  "Scale",
];

const process = [
  { step: "01", title: "Define", text: "We lock the role, seniority, budget, and what success looks like" },
  { step: "02", title: "Source", text: "We tap networks, communities, and referrals before job boards" },
  { step: "03", title: "Vet", text: "Portfolio review, live technical rounds, and structured interviews" },
  { step: "04", title: "Deploy", text: "Onboarding support and check ins until the hire is producing" },
];

const ecosystem = [
  {
    href: "/services/ai-automation",
    label: "AI Automation",
    text: "Automate the repetitive work first, then hire only for what remains.",
  },
  {
    href: "/services/crm-solutions",
    label: "CRM Solutions",
    text: "Salesforce talent and Salesforce systems from the same partner.",
  },
  {
    href: "/services/full-stack-development",
    label: "Full Stack Development",
    text: "Need the product built, not the team? We engineer it end to end.",
  },
  {
    href: "/services/digital-marketing",
    label: "Digital Marketing",
    text: "Marketing talent backed by the systems that make them effective.",
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
    question: "What is IT staff augmentation and how does it work?",
    answer:
      "Staff augmentation means vetted specialists join your existing team on flexible contracts. You get the skills without the fixed payroll, and you scale the engagement up or down as your workload changes.",
  },
  {
    question: "Which engagement model is right for my stage?",
    answer:
      "Match the hire to the stage, not the trend. Contract talent to test and ship fast while staying lean. Build a dedicated remote team when you need sustained capacity. Hire in house when a function becomes core to how you scale.",
  },
  {
    question: "How do you vet candidates?",
    answer:
      "Every candidate goes through portfolio review of real shipped work, live technical rounds, structured interviews with a consistent scorecard, and reference verification. You only meet people who have already proven the skills.",
  },
  {
    question: "How fast can you place someone?",
    answer:
      "Most roles receive a vetted shortlist within one to two weeks and a deployed hire within three to five weeks. Compare that with the months a typical open role sits unfilled while projects stall.",
  },
  {
    question: "Why not just hire directly ourselves?",
    answer:
      "You can, but the risk is expensive. SHRM research puts the cost of a bad technical hire at 100 to 150% of annual salary once you count lost productivity and restarting the search. Structured vetting exists to remove that gamble.",
  },
  {
    question: "Do you place talent outside India?",
    answer:
      "Yes. We build remote teams for businesses worldwide. Talent works in your time zone overlap, on your tools, with onboarding and check ins handled by us.",
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
            name: "IT Staffing Solutions",
            description:
              "Socieas builds vetted tech teams for businesses worldwide through IT staff augmentation, dedicated remote teams, and direct hire recruitment. Full stack developers, Salesforce specialists, AI engineers, DevOps, data engineers, and marketing talent with structured vetting and onboarding.",
            url: "https://socieas.com/services/staffing-solutions",
            serviceType: "IT Staffing",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Services", url: "https://socieas.com/services" },
            {
              name: "Staffing Solutions",
              url: "https://socieas.com/services/staffing-solutions",
            },
          ]),
          faqSchema,
        ]}
        id="staffing-solutions-page-schema"
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
                IT Staffing · Vetted Global Talent
              </div>

              <h1 className="rise rise-2 mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#111111] md:text-6xl lg:text-7xl">
                Scale your team{" "}
                <span className="gradient-text">without the hiring gamble.</span>
              </h1>

              <p className="rise rise-3 mt-6 max-w-lg text-lg leading-8 text-slate-600">
                74% of employers cannot find the skills they need, and a wrong
                hire costs more than a year of salary. We source, vet, and
                deploy tech talent that starts producing in weeks.
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
                src="/images/services/staffing-solutions-banner.webp"
                alt="Socieas IT staffing illustration showing vetted talent profiles connected to a central team hub with skill and schedule cards"
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
                  Vetted before you meet
                </span>
              </div>
              <div className="floaty-late glass-premium absolute -right-4 bottom-10 hidden rounded-2xl px-5 py-3 md:block">
                <span className="text-sm font-bold text-violet-700">
                  Deployed in weeks
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

      {/* SECTION 3 · TALENT PIPELINE INFOGRAPHIC */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Staffing As A System
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                We do not forward resumes. We run a pipeline.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Great hires are not found by luck. They come out of a
                repeatable system that defines the role, sources beyond job
                boards, tests skills, and supports the landing.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-4 md:gap-4">
              {talentPipeline.map((item, index) => (
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
                  {index < talentPipeline.length - 1 && (
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

      {/* SECTION 4 · THE TALENT CRUNCH */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              The Talent Crunch
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Open roles cost more than salaries.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Every week a role stays open, the cost compounds somewhere you
              are not measuring.
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

      {/* SECTION 5 · MARKET DATA (ANIMATED BARS) */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                What The Data Says
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                The skills gap is not slowing down.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {talentStats.map((item) => (
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

      {/* SECTION 6 · THE 150% TRUTH (LIGHT DESIGN) */}
      <FadeUp>
        <section className="px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[40px] border border-violet-100 bg-white px-8 py-14 text-center shadow-[0_30px_90px_rgba(124,58,237,0.08)] md:px-16">
              <div className="pointer-events-none absolute inset-0 premium-grid" />
              <div className="floaty pointer-events-none absolute -left-10 top-6 h-32 w-32 rounded-full bg-violet-100 blur-xl" />
              <div className="floaty-late pointer-events-none absolute -right-8 bottom-4 h-32 w-32 rounded-full bg-fuchsia-100 blur-xl" />
              <div className="relative">
                <div className="gradient-text text-7xl font-black md:text-8xl">
                  150%
                </div>
                <p className="mx-auto mt-4 max-w-2xl text-xl font-bold leading-8 text-[#111111]">
                  of annual salary. That is what a bad technical hire costs
                  once you count lost productivity, onboarding time, and
                  restarting the search, per SHRM research.
                </p>
                <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
                  That is why every candidate is tested before you ever meet
                  them.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 7 · ROLES WE STAFF */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Roles We Staff
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                The skills every company is fighting for.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((item) => (
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

      {/* SECTION 8 · ENGAGEMENT MODELS */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Engagement Models
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Match the hire{" "}
                <span className="gradient-text">to the stage.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Most founders hire based on cost. The smart ones hire based on
                stage. Contract to test. Hire in house to scale.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {models.map((item) => (
                <div
                  key={item.name}
                  className="group rounded-[32px] border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-[0_25px_70px_rgba(124,58,237,0.12)]"
                >
                  <div className="inline-flex rounded-full bg-violet-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                    {item.stage}
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-[#111111]">
                    {item.name}
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

      {/* SECTION 9 · OLD WAY VS SOCIEAS WAY */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                The Difference
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Old way hiring. System driven staffing.
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
              We use the same hiring system internally, so every step below
              has been tested on our own team first.
            </p>
          </div>
        </section>
      </FadeUp>

      {/* SECTION 10 · VETTING STACK */}
      <FadeUp>
        <section className="px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Our Vetting Stack
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                Eight filters between a resume and your team.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {vettingStack.map((item) => (
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

      {/* SECTION 12 · HOW WE PLACE */}
      <FadeUp>
        <section className="bg-white px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                How We Place
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-5xl">
                From open role to producing hire.
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
                People plus systems. That is the unlock.
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
                Everything founders ask us about staffing.
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
                  Stop gambling{" "}
                  <span className="gradient-text">on your next hire.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
                  One call. Your open roles mapped. A vetted shortlist plan
                  with timelines.
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
