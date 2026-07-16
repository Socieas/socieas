// components/tools/PremiumPlan.tsx

"use client";

import { generatePremiumPlan } from "@/lib/premium-plan";
import { headlineFormulas, aboutBlueprint } from "@/data/premium-plan";
import type { PillarScore } from "@/types/linkedin-score";

const weekLabels = [
  { label: "Week 1: Fix the foundations", from: 1, to: 7 },
  { label: "Week 2: Build the engine", from: 8, to: 14 },
  { label: "Week 3: Compound the proof", from: 15, to: 21 },
  { label: "Week 4: Convert the attention", from: 22, to: 28 },
  { label: "Final push", from: 29, to: 30 },
];

export default function PremiumPlan({
  pillars,
  name,
}: {
  pillars: PillarScore[];
  name?: string;
}) {
  const plan = generatePremiumPlan(pillars);
  const weakest = [...pillars].sort((a, b) => a.percent - b.percent).slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* HEADER */}
      <div className="rounded-[32px] border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-8 sm:p-10">
        <span className="inline-block rounded-full bg-violet-700 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          Your Premium Plan
        </span>
        <h2 className="mt-4 text-2xl font-bold text-[#111111] sm:text-3xl">
          {name ? name + ", here" : "Here"} is your next 30 days
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          This calendar was built from your exact scores. Your weakest pillars,{" "}
          <strong className="text-[#111111]">
            {weakest.map((w) => w.label).join(" and ")}
          </strong>
          , get the most attention. Most days take under 30 minutes.
        </p>
      </div>

      {/* CALENDAR */}
      {weekLabels.map((week) => {
        const weekDays = plan.filter(
          (d) => d.day >= week.from && d.day <= week.to
        );
        if (weekDays.length === 0) return null;
        return (
          <div
            key={week.label}
            className="mt-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(124,58,237,0.06)] sm:p-10"
          >
            <h3 className="text-xl font-bold text-[#111111]">{week.label}</h3>
            <div className="mt-6 space-y-4">
              {weekDays.map((d) => (
                <div
                  key={d.day}
                  className="rounded-3xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-700 text-sm font-bold text-white">
                      {d.day}
                    </span>
                    <span className="text-[15px] font-bold text-[#111111]">
                      {d.title}
                    </span>
                    <span className="ml-auto flex shrink-0 gap-2">
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                        {d.pillarLabel}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {d.minutes} min
                      </span>
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                    {d.task}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* HEADLINE FORMULAS */}
      <div className="mt-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(124,58,237,0.06)] sm:p-10">
        <h3 className="text-xl font-bold text-[#111111]">
          Headline rewrite formulas
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Three proven structures. Pick the one that fits your voice.
        </p>
        <div className="mt-6 space-y-6">
          {headlineFormulas.map((f) => (
            <div
              key={f.name}
              className="rounded-3xl border border-violet-100 bg-violet-50/50 p-6"
            >
              <h4 className="text-base font-bold text-[#111111]">{f.name}</h4>
              <p className="mt-2 rounded-xl bg-white px-4 py-3 font-mono text-sm text-violet-700">
                {f.formula}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                <strong className="text-slate-600">Before: </strong>
                {f.before}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                <strong className="text-violet-700">After: </strong>
                {f.after}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT BLUEPRINT */}
      <div className="mt-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(124,58,237,0.06)] sm:p-10">
        <h3 className="text-xl font-bold text-[#111111]">
          Your about section blueprint
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Rebuild your about section top to bottom with this 6 part structure.
        </p>
        <ol className="mt-6 space-y-4">
          {aboutBlueprint.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-50 text-sm font-bold text-violet-700">
                {i + 1}
              </span>
              <p className="text-[15px] leading-relaxed text-slate-600">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* STRATEGY CALL */}
      <div className="mt-6 rounded-[32px] border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-8 text-center sm:p-10">
        <h3 className="text-2xl font-bold text-[#111111]">
          Your priority strategy call
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
          Your premium plan includes a priority call with the Socieas team. We
          review your profile live, sharpen your positioning together, and map
          your next 90 days.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-block rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
        >
          Book your priority call
        </a>
      </div>
    </div>
  );
}
