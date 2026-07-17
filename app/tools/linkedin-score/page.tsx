// app/tools/linkedin-score/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
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
    title: "A score you can trust",
    text: "20 checks across 5 pillars: first impression, positioning, content engine, social proof, and conversion. The same audit we run for paying clients.",
  },
  {
    title: "Honest verdicts, not compliments",
    text: "If your headline is weak, the tool says it is weak and explains exactly why, quoting your own words. No sugarcoating.",
  },
  {
    title: "Rewrites, ready to paste",
    text: "Two stronger headline options and a complete rewritten about section, built from the real facts in your profile. Copy, paste, done.",
  },
  {
    title: "Prioritized, not generic",
    text: "Every fix shows exactly how many points it is costing you, ranked from biggest to smallest, so you always know what to do first.",
  },
  {
    title: "Private by design",
    text: "Your paste is analyzed to build your report and your report belongs to you. No spam, ever.",
  },
  {
    title: "Built by an agency, not a toy",
    text: "The scoring model and rewrite formulas come from Socieas, the team that builds personal brands that actually convert.",
  },
];

const reportItems = [
  "Your Socieas Score out of 100 on a live score dial",
  "A breakdown of all 5 pillars showing exactly where points leak",
  "What you are already doing right",
  "An honest AI verdict on your headline with 2 stronger options",
  "An honest AI verdict on your about section with a full rewrite",
  "Your 3 highest impact fixes, ranked by points recovered",
  "The complete report delivered to your email",
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
    <main className="overflow-x-hidden bg-[#F8F8F6] text-[#111111]">
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-3xl px-4 pt-32 text-center sm:px-6">
        <span className="inline-block rounded-full border border-violet-200 bg-white px-4 py-1.5 text-sm font-semibold text-violet-700">
          Free tool · 60 seconds · No sign up
        </span>
        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#111111] sm:text-5xl">
          Free LinkedIn Profile Audit:{" "}
          <span className="text-violet-700">The Socieas Score</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
          Run a free AI audit of your LinkedIn profile. Get a score out of 100,
          an honest verdict on your headline and about section, ready to paste
          rewrites, and the exact fixes that raise your score. In 60 seconds.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            "100 percent free",
            "No sign up",
            "Instant score",
            "Works in your browser",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      {/* THE TOOL */}
      <section id="tool" className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        <LinkedInScoreTool />
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-violet-700">
          How it works
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-[#111111] sm:text-4xl">
          From one paste to a full report in three steps
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-slate-600">
          No account, no install, no questionnaire. Works the same on desktop,
          tablet, and phone.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[32px] border border-slate-200 bg-white p-8"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-700 text-base font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-bold text-[#111111]">
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
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-violet-700">
          Why this tool
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-[#111111] sm:text-4xl">
          A real audit, not a surface level checklist
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-[32px] border border-slate-200 bg-white p-8"
            >
              <h3 className="text-lg font-bold text-[#111111]">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-700">
              Your report
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#111111] sm:text-4xl">
              Everything you get, free
            </h2>
            <ul className="mt-8 space-y-3">
              {reportItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-50 text-sm font-bold text-violet-700">
                    ✓
                  </span>
                  <span className="text-[15px] leading-relaxed text-slate-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-slate-200">
            <Image
              src="/images/tools/linkedin-score.webp"
              alt="The Socieas Score, the free LinkedIn profile audit by Socieas"
              width={1600}
              height={1000}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* MORE FREE VALUE */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <div className="rounded-[40px] border border-violet-200 bg-violet-50 p-10 text-center sm:p-14">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-700">
            Not just one tool
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#111111] sm:text-4xl">
            One free tool. A whole library behind it.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
            The Socieas Score is one piece of our free library: 10 resources
            covering LinkedIn checklists, 100 proven hooks, content calendars,
            AI prompt packs, and more. Same deal every time: full access, no
            catch.
          </p>
          <Link
            href="/resources"
            className="mt-8 inline-block rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
          >
            Explore the free resources
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-violet-700">
          FAQ
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-[#111111] sm:text-4xl">
          Everything people ask before they paste
        </h2>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-3xl border border-slate-200 bg-white p-6"
            >
              <summary className="cursor-pointer list-none text-base font-bold text-[#111111]">
                {faq.q}
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto mt-24 max-w-3xl px-4 pb-24 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold text-[#111111] sm:text-4xl">
          Ready to see your real score?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
          60 seconds from now you will know exactly what your profile projects
          and exactly what to fix first.
        </p>
        <a
          href="#tool"
          className="mt-8 inline-block rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
        >
          Get my Socieas Score
        </a>
        <p className="mt-10 text-sm leading-relaxed text-slate-500">
          No spam, ever. Your report is yours to keep. The Socieas Score is
          built by Socieas, the team behind personal brands that actually
          convert.
        </p>
      </section>

      <Footer />
    </main>
  );
}
