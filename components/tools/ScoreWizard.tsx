// components/tools/ScoreWizard.tsx

"use client";

import { useState } from "react";
import { questions } from "@/data/linkedin-audit";
import { scoreAudit } from "@/lib/linkedin-scoring";
import type { AuditInput, ScoreResult } from "@/types/linkedin-score";

type StepId = "details" | "text" | "questions";

const steps: StepId[] = ["details", "text", "questions"];

export default function ScoreWizard({
  onComplete,
}: {
  onComplete: (result: ScoreResult, input: AuditInput) => void;
}) {
  const [step, setStep] = useState<StepId>("details");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const stepIndex = steps.indexOf(step);
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
  const validUrl = linkedinUrl.trim().toLowerCase().includes("linkedin.com");

  const goToText = () => {
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!validEmail) {
      setError("Please enter a valid email so we can send your full report.");
      return;
    }
    if (!validUrl) {
      setError("Please paste your LinkedIn profile link. It should contain linkedin.com.");
      return;
    }
    setError("");
    setStep("text");
  };

  const goToQuestions = () => {
    if (headline.trim().length === 0) {
      setError("Please paste your headline. It is the line under your name on your profile.");
      return;
    }
    setError("");
    setStep("questions");
  };

  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const allAnswered = answeredCount === questions.length;

  const finish = () => {
    if (!allAnswered) {
      setError("Please answer all questions. " + answeredCount + " of " + questions.length + " done.");
      return;
    }
    setError("");
    const input: AuditInput = {
      name: name.trim(),
      email: email.trim(),
      linkedinUrl: linkedinUrl.trim(),
      headline: headline.trim(),
      about: about.trim(),
      answers,
    };
    const result = scoreAudit(input);
    onComplete(result, input);
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-[15px] text-[#111111] outline-none transition-all duration-300 focus:border-violet-400";

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* PROGRESS */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-500">
          <span>Step {stepIndex + 1} of {steps.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-violet-50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500"
            style={{ width: progress + "%" }}
          />
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(124,58,237,0.06)] sm:p-10">
        {/* STEP 1: DETAILS */}
        {step === "details" && (
          <div>
            <h2 className="text-2xl font-bold text-[#111111]">
              First, the basics
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Your full report is emailed to you, so make sure the email is real.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#111111]">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ankit Sharma"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#111111]">
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#111111]">
                  Your LinkedIn profile link
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourname"
                  className={inputClass}
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
            )}

            <button
              onClick={goToText}
              className="mt-8 w-full rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: HEADLINE + ABOUT */}
        {step === "text" && (
          <div>
            <h2 className="text-2xl font-bold text-[#111111]">
              Now, your actual profile text
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              We analyze your real words, not guesses. Open your LinkedIn profile in another tab and copy these two things.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#111111]">
                  Your headline
                </label>
                <p className="mb-2 text-xs text-slate-500">
                  The line that appears directly under your name.
                </p>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Paste your headline here"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#111111]">
                  Your about section
                </label>
                <p className="mb-2 text-xs text-slate-500">
                  Copy the full text. If you have no about section yet, leave this empty and the audit will treat it as missing.
                </p>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={8}
                  placeholder="Paste your about section here"
                  className={inputClass}
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="rounded-2xl border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-violet-300"
              >
                Back
              </button>
              <button
                onClick={goToQuestions}
                className="flex-1 rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: QUESTIONS */}
        {step === "questions" && (
          <div>
            <h2 className="text-2xl font-bold text-[#111111]">
              12 quick questions
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Answer honestly. Your score is only useful if it is true.
            </p>

            <div className="mt-8 space-y-8">
              {questions.map((q, index) => (
                <div key={q.id}>
                  <p className="text-[15px] font-semibold text-[#111111]">
                    {index + 1}. {q.question}
                  </p>
                  {q.helper && (
                    <p className="mt-1 text-xs text-slate-500">{q.helper}</p>
                  )}
                  <div className="mt-3 space-y-2">
                    {q.options.map((o) => (
                      <button
                        key={o.value}
                        onClick={() =>
                          setAnswers({ ...answers, [q.id]: o.value })
                        }
                        className={`block w-full rounded-2xl border px-5 py-3.5 text-left text-sm font-medium transition-all duration-300 ${
                          answers[q.id] === o.value
                            ? "border-violet-600 bg-violet-50 text-violet-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-violet-200"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <p className="mt-6 text-sm font-medium text-red-500">{error}</p>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep("text")}
                className="rounded-2xl border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-violet-300"
              >
                Back
              </button>
              <button
                onClick={finish}
                className={`flex-1 rounded-2xl px-8 py-4 text-base font-semibold text-white transition-all duration-300 ${
                  allAnswered
                    ? "bg-violet-700 hover:-translate-y-0.5 hover:bg-violet-800"
                    : "cursor-not-allowed bg-slate-300"
                }`}
              >
                {allAnswered
                  ? "Get my score"
                  : "Answered " + answeredCount + " of " + questions.length}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
