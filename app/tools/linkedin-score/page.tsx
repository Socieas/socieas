// app/tools/linkedin-score/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LinkedInScoreTool from "@/components/tools/LinkedInScoreTool";

export const metadata: Metadata = {
  title: "The Socieas Score | Free LinkedIn Profile Audit",
  description:
    "Get your Socieas Score: your LinkedIn profile rated out of 100 in 60 seconds. A 20 point AI audit with honest verdicts on your headline and about section, ready to paste rewrites, and your 3 highest impact fixes. Free, no sign up.",
};

const steps = [
  {
    number: "1",
    title: "Enter your details",
    text: "Your name, email, and profile link. Your full report is emailed to you, so use a real address.",
  },
  {
    number: "2",
    title: "Paste your profile once",
    text: "Open your LinkedIn profile, press Ctrl+A to select the whole page, copy it, and paste it in. That one paste is everything we need.",
  },
  {
    number: "3",
    title: "Get your score and verdict",
    text: "Your score out of 100 appears instantly. Seconds later, our AI strategist delivers an honest verdict with rewrites you can paste today.",
  },
];

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.5" />
      </svg>
    ),
    title: "A score you can trust",
    text: "20 checks across 5 pillars: first impression, positioning, content engine, social proof, and conversion. The same audit we run for paying clients.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
      </svg>
    ),
    title: "Honest verdicts, not compliments",
    text: "If your headline is weak, the tool says it is weak and explains exactly why, quoting your own words. No sugarcoating.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M17 3l4 4L7 21H3v-4L17 3z" />
      </svg>
    ),
    title: "Rewrites, ready to paste",
    text: "Two stronger headline options and a complete rewritten about section, built from the real facts in your profile. Copy, paste, done.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M9 6h12" />
        <path d="M9 12h12" />
        <path d="M9 18h12" />
        <path d="M4 6h.5" />
        <path d="M4 12h.5" />
        <path d="M4 18h.5" />
      </svg>
    ),
    title: "Prioritized, not generic",
    text: "Every fix shows exactly how many points it is costing you, ranked from biggest to smallest, so you always know what to do first.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
    title: "Private by design",
    text: "Your paste is analyzed to build your report and your report belongs to you. No spam, ever.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    title: "Built by an agency, not a toy",
    text: "The scoring model and rewrite formulas come from Socieas, the team that builds personal brands that actually convert.",
  },
];

const samplePillars = [
  { label: "First Impression", pts: "18 of 20", pct: 90 },
  { label: "Positioning", pts: "21 of 25", pct: 84 },
  { label: "Content Engine", pts: "18 of 25", pct: 72 },
  { label: "Social Proof", pts: "12 of 15", pct: 80 },
  { label: "Conversion", pts: "13 of 15", pct: 87 },
];

const faqs = [
  {
    q: "How do I paste my profile?",
    a: "Open your LinkedIn profile in another tab, click anywhere on the page, press Ctrl+A to select everything, then Ctrl+C to copy. Come back and paste it into the box. On a phone: tap and hold, choose Select All, then Copy. It takes about 10 seconds.",
  },
  {
    q: "Is the Socieas Score really free?",
    a: "Yes. The full score, the pillar breakdown, the AI verdicts, the rewrites, and the emailed report are all free. No account, no trial clock, no card. We ask for your email only so we can send your report.",
  },
  {
    q: "How is the score calculated?",
    a: "We run 20 checks across 5 pillars: First Impression, Positioning, Content Engine, Social Proof, and Conversion. Each check has a fixed point value and the results combine into a single score out of 100. The AI never changes your numbers, it only explains them.",
  },
  {
    q: "What happens to my data?",
    a: "Your paste is analyzed to build your report. We keep your score and contact details so we can send your report and improve the tool. We never sell your data and we never spam you.",
  },
  {
    q: "Can I run it on another profile?",
    a: "Yes. If you can open a public profile and copy the page, you can score it. It is a great way to benchmark yourself against people you admire in your field.",
  },
  {
    q: "Is Socieas affiliated with LinkedIn?",
    a: "No. Socieas is an independent company. The Socieas Score is not affiliated with, endorsed by, or connected to LinkedIn.",
  },
];

export default function LinkedInScorePage() {
  return (
    <main className="overflow-x-hidden bg-white text-[#111111]">
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-3xl px-4 pt-32 text-center sm:px-6">
        <p className="text-sm text-slate-500">
          Free Tools <span className="text-slate-300">/</span>{" "}
          <span className="font-medium text-violet-600">The Socieas Score</span>
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#111111] sm:text-5xl">
          Free LinkedIn Profile Audit
          <br />
          <span className="text-violet-600">The Socieas Score</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
          Run a free AI audit of your LinkedIn profile. Get a score out of 100,
          honest verdicts on your headline and about section, and rewrites you
          can paste today.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            "100 percent free",
            "No sign up",
            "Instant results",
            "Works in your browser",
          ].map((chip) => (
            <span
              key={chip}
              className="flex items-center gap-1.5 text-sm text-slate-600"
            >
              <span className="font-bold text-emerald-500">✓</span>
              {chip}
            </span>
          ))}
        </div>
      </section>

      {/* THE TOOL */}
      <section id="tool" className="mx-auto mt-14 max-w-3xl px-4 sm:px-6">
        <LinkedInScoreTool />
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto mt-28 max-w-5xl px-4 sm:px-6">
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          How it works
        </p>
        <h2 className="mx-auto mt-4 max-w-lg text-center text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
          From one paste to a full report in three steps
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-slate-600">
          No account, no install. Works the same on desktop, tablet, and phone.
        </p>
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <p className="text-sm font-bold text-violet-600">{step.number}</p>
              <h3 className="mt-3 text-lg font-semibold text-[#111111]">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY THIS TOOL */}
      <section className="mx-auto mt-28 max-w-4xl px-4 sm:px-6">
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Why this tool
        </p>
        <h2 className="mx-auto mt-4 max-w-md text-center text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
          A real audit, not a surface level checklist
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-7"
            >
              <span className="text-violet-600">{f.icon}</span>
              <h3 className="mt-4 text-base font-semibold text-[#111111]">
                {f.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOUR REPORT LOOKS LIKE */}
      <section className="mx-auto mt-28 max-w-4xl px-4 sm:px-6">
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Your report
        </p>
        <h2 className="mx-auto mt-4 max-w-md text-center text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
          See what comes back
        </h2>
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {/* SAMPLE SCORE CARD */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                Sample report
              </p>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                Strong foundation
              </span>
            </div>
            <div className="mt-5 flex items-end gap-2">
              <span className="text-5xl font-extrabold text-[#111111]">82</span>
              <span className="pb-1.5 text-sm text-slate-500">of 100</span>
            </div>
            <div className="mt-6 space-y-4">
              {samplePillars.map((row) => (
                <div key={row.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-[#111111]">
                      {row.label}
                    </span>
                    <span className="text-slate-500">{row.pts}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-violet-600"
                      style={{ width: row.pct + "%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SAMPLE VERDICT CARD */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                Sample verdict
              </p>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                Headline · Weak
              </span>
            </div>
            <p className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500">
              "Marketing Enthusiast | Dreamer | Hustler"
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              <strong className="text-violet-700">The verdict:</strong> This
              headline could belong to a million people. It names no audience,
              no outcome, and no proof, so visitors have no reason to stay.
            </p>
            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Rewrite · Ready to paste
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#111111]">
                I help D2C brands turn content into revenue with proven
                marketing systems | 40 plus campaigns shipped
              </p>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Plus a complete about section rewrite in every report.
            </p>
          </div>
        </div>
      </section>

      {/* NOT JUST ONE TOOL */}
      <section className="mx-auto mt-28 max-w-4xl px-4 sm:px-6">
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Not just a free tool
        </p>
        <h2 className="mx-auto mt-4 max-w-md text-center text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
          One free tool. A whole library behind it.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-slate-600">
          Checklists, 100 proven hooks, content calendars, AI prompt packs, and
          more. Same deal every time: full access, no catch.
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="space-y-2.5">
              {["Profile photo and banner", "Headline formula applied", "Featured section filled"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-500 text-[10px] font-bold text-white">
                    ✓
                  </span>
                  <span className="text-xs text-slate-600">{item}</span>
                </div>
              ))}
            </div>
            <h3 className="mt-5 text-base font-semibold text-[#111111]">
              LinkedIn Checklist
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Every box your profile needs ticked, in order.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="space-y-2.5">
              <div className="h-2 w-11/12 rounded bg-slate-100" />
              <div className="h-2 w-3/4 rounded bg-violet-200" />
              <div className="h-2 w-10/12 rounded bg-slate-100" />
              <div className="h-2 w-2/3 rounded bg-slate-100" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-[#111111]">
              100 Proven Hooks
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Opening lines that stop the scroll, ready to use.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 21 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-4 rounded ${
                    i % 3 === 0 ? "bg-violet-500" : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
            <h3 className="mt-5 text-base font-semibold text-[#111111]">
              30 Day Calendar
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              A full month of posts planned for you.
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/resources"
            className="inline-block rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#111111] transition-colors hover:border-violet-400"
          >
            View all free resources
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-28 max-w-3xl px-4 sm:px-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          FAQ
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
          How the scoring actually works
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          What we check, what we store, and how the verdicts are built.
        </p>
        <div className="mt-8 border-t border-slate-200">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border-b border-slate-200 py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-[#111111]">
                {faq.q}
                <span className="ml-4 text-xl font-light text-slate-400 group-open:hidden">
                  +
                </span>
                <span className="ml-4 hidden text-xl font-light text-slate-400 group-open:inline">
                  ×
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto mt-28 max-w-3xl px-4 pb-28 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
          Start with your real score today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
          60 seconds from now you will know exactly what your profile projects
          and exactly what to fix first.
        </p>
        <a
          href="#tool"
          className="mt-8 inline-block rounded-xl bg-violet-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-violet-700"
        >
          Get my Socieas Score
        </a>
        <p className="mt-10 text-sm leading-relaxed text-slate-500">
          No spam, ever. Your report is yours to keep. The Socieas Score is not
          affiliated with, endorsed by, or connected to LinkedIn.
        </p>
      </section>

      <Footer />
    </main>
  );
}
