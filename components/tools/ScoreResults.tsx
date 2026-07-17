// components/tools/ScoreResults.tsx

"use client";

import type { AuditInput, ScoreResult } from "@/types/linkedin-score";
import type { AiFeedback } from "@/lib/ai-feedback";

export default function ScoreResults({
  result,
  input,
  onRestart,
  onUnlock,
  ai,
  aiLoading,
}: {
  result: ScoreResult;
  input: AuditInput;
  onRestart: () => void;
  onUnlock?: () => void;
  ai?: AiFeedback | null;
  aiLoading?: boolean;
}) {
  const topThree = result.topFixes.slice(0, 3);
  const lockedCount = Math.max(0, result.topFixes.length - 3);
  const strengths = result.signals
    .filter((s) => s.passed)
    .sort((a, b) => b.maxPoints - a.maxPoints)
    .slice(0, 3);

  /* Circle math for the score dial */
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const dash = (result.total / 100) * circumference;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* SCORE HEADER */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
        <div className="relative mx-auto h-[200px] w-[200px]">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              strokeWidth="14"
              className="stroke-violet-50"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={dash + " " + circumference}
              className="stroke-violet-600 transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold text-[#111111]">
              {result.total}
            </span>
            <span className="text-sm font-medium text-slate-500">of 100</span>
          </div>
        </div>

        <span className="mt-6 inline-block rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-semibold text-violet-700">
          {result.band.label}
        </span>

        <h2 className="mt-4 text-2xl font-bold text-[#111111] sm:text-3xl">
          {result.band.headline}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
          {result.band.message}
        </p>
      </div>

      {/* EXPERT VERDICT (AI) */}
      {aiLoading && (
        <div className="mt-6 animate-pulse rounded-3xl border border-violet-200 bg-violet-50 p-8 sm:p-10">
          <span className="inline-block rounded-full bg-violet-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Expert verdict
          </span>
          <h3 className="mt-4 text-xl font-bold text-[#111111]">
            Our AI strategist is reading your full profile right now
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            Your personalized verdicts, rewrites, and section by section
            upgrade plan will appear here in a few seconds.
          </p>
        </div>
      )}

      {!aiLoading && ai && (
        <div className="mt-6 rounded-3xl border border-violet-200 bg-violet-50 p-8 sm:p-10">
          <span className="inline-block rounded-full bg-violet-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Expert verdict
          </span>

          <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
            {ai.summary}
          </p>

          {/* HEADLINE VERDICT */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#111111]">Your headline</h3>
            <p className="mt-2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-[15px] font-medium text-slate-500">
              "{input.headline}"
            </p>
            {ai.headlineVerdict && (
              <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                <strong className="text-violet-700">The verdict: </strong>
                {ai.headlineVerdict}
              </p>
            )}
            {ai.headlineRewrites.length > 0 && (
              <div className="mt-4 space-y-3">
                <p className="text-sm font-semibold text-[#111111]">
                  Stronger options built for a higher score:
                </p>
                {ai.headlineRewrites.map((h, i) => (
                  <div
                    key={h}
                    className="rounded-xl border border-violet-100 bg-white p-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
                      Option {i + 1}
                    </p>
                    <p className="mt-2 text-[15px] font-semibold leading-relaxed text-[#111111]">
                      {h}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ABOUT VERDICT */}
          {(ai.aboutVerdict || ai.aboutRewrite) && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#111111]">
                Your about section
              </h3>
              {ai.aboutVerdict && (
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                  <strong className="text-violet-700">The verdict: </strong>
                  {ai.aboutVerdict}
                </p>
              )}
              {ai.aboutRewrite && (
                <div className="mt-4 rounded-xl border border-violet-100 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
                    Rewritten for you, ready to paste
                  </p>
                  <p
                    className="mt-3 text-[15px] leading-relaxed text-[#111111]"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {ai.aboutRewrite}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SECTION BY SECTION PLAN */}
          {ai.sectionPlan.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#111111]">
                Your section by section upgrade plan
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Work through these in order. Every step is built from your
                profile, your goal, and your audience.
              </p>
              <div className="mt-4 space-y-4">
                {ai.sectionPlan.map((sec) => (
                  <div
                    key={sec.section}
                    className="rounded-xl border border-violet-100 bg-white p-5"
                  >
                    <h4 className="text-base font-bold text-[#111111]">
                      {sec.section}
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      {sec.verdict}
                    </p>
                    <ol className="mt-3 space-y-2">
                      {sec.steps.map((s, i) => (
                        <li key={s} className="flex gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-50 text-xs font-bold text-violet-700">
                            {i + 1}
                          </span>
                          <span className="text-[15px] leading-relaxed text-slate-700">
                            {s}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POST IDEAS */}
          {ai.postIdeas.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#111111]">
                3 post ideas made for you
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Based on what you like to talk about and what your audience
                needs to hear.
              </p>
              <div className="mt-4 space-y-3">
                {ai.postIdeas.map((idea, i) => (
                  <div
                    key={idea}
                    className="rounded-xl border border-violet-100 bg-white p-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
                      Idea {i + 1}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#111111]">
                      {idea}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PILLAR BREAKDOWN */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
        <h3 className="text-xl font-bold text-[#111111]">
          Your 5 pillar breakdown
        </h3>
        <div className="mt-6 space-y-5">
          {result.pillars.map((p) => (
            <div key={p.pillar}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#111111]">
                  {p.label}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  {p.points} of {p.maxPoints}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-violet-600 transition-all duration-500"
                  style={{ width: p.percent + "%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STRENGTHS */}
      {strengths.length > 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
          <h3 className="text-xl font-bold text-[#111111]">
            What you are already doing right
          </h3>
          <div className="mt-5 space-y-4">
            {strengths.map((s) => (
              <div key={s.id} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-600">
                  ✓
                </span>
                <p className="text-[15px] leading-relaxed text-slate-600">
                  {s.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOP 3 FIXES */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
        <h3 className="text-xl font-bold text-[#111111]">
          Your 3 highest impact fixes
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Ranked by exactly how many points each one is costing you right now.
        </p>
        <div className="mt-6 space-y-6">
          {topThree.map((fix, i) => (
            <div
              key={fix.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h4 className="text-base font-bold text-[#111111]">
                  {fix.title}
                </h4>
                <span className="ml-auto shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-violet-700">
                  +{fix.lostPoints} points
                </span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                <strong className="text-[#111111]">Why it matters: </strong>
                {fix.why}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                <strong className="text-[#111111]">How to fix it: </strong>
                {fix.how}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PREMIUM TEASER */}
      <div className="mt-6 rounded-3xl border border-violet-200 bg-violet-50 p-8 sm:p-10">
        <span className="inline-block rounded-full bg-violet-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          Premium
        </span>
        <h3 className="mt-4 text-2xl font-bold text-[#111111]">
          Turn your score into a 30 day transformation
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
          Your free report shows what is broken. The premium plan hands you the
          exact daily actions to fix it, built from your weakest pillars.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            "A personalized 30 day branding calendar built from your exact weak pillars",
            "Headline and about section rewrite formulas with before and after examples",
            lockedCount > 0
              ? "All " + result.topFixes.length + " of your fixes, not just the top 3"
              : "Your complete fix list with priorities",
            "A priority strategy call slot with the Socieas team",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-violet-700">
                ✓
              </span>
              <span className="text-[15px] leading-relaxed text-slate-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={onUnlock}
          disabled={!onUnlock}
          className={`mt-8 w-full rounded-xl px-8 py-4 text-base font-semibold text-white transition-colors sm:w-auto ${
            onUnlock
              ? "bg-violet-600 hover:bg-violet-700"
              : "cursor-not-allowed bg-slate-400"
          }`}
        >
          {onUnlock ? "Unlock my full plan" : "Premium unlock opening soon"}
        </button>
      </div>

      {/* RESTART */}
      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="text-sm font-semibold text-violet-700 underline underline-offset-4 hover:text-violet-800"
        >
          Take the audit again
        </button>
      </div>
    </div>
  );
}
