// components/tools/ScoreWizard.tsx

"use client";

import { useState } from "react";
import { questions } from "@/data/linkedin-audit";
import { scoreAudit } from "@/lib/linkedin-scoring";
import { parseProfileText } from "@/lib/profile-parser";
import type { AuditInput, ScoreResult } from "@/types/linkedin-score";

type StepId = "details" | "paste";

const steps: StepId[] = ["details", "paste"];

export default function ScoreWizard({
  onComplete,
}: {
  onComplete: (result: ScoreResult, input: AuditInput) => void;
}) {
  const [step, setStep] = useState<StepId>("details");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [pasted, setPasted] = useState("");
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [headlineTouched, setHeadlineTouched] = useState(false);
  const [aboutTouched, setAboutTouched] = useState(false);
  const [bannerAnswer, setBannerAnswer] = useState("");
  const [photoAnswer, setPhotoAnswer] = useState("");
  const [detected, setDetected] = useState<string[]>([]);
  const [autoAnswers, setAutoAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const stepIndex = steps.indexOf(step);
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
  const validUrl = linkedinUrl.trim().toLowerCase().includes("linkedin.com");

  const bannerQuestion = questions.find((q) => q.id === "q-banner");
  const photoQuestion = questions.find((q) => q.id === "q-photo");

  const goToPaste = () => {
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
    setStep("paste");
  };

  const handlePaste = (value: string) => {
    setPasted(value);
    if (value.trim().length < 50) {
      setDetected([]);
      setAutoAnswers({});
      return;
    }
    const parsed = parseProfileText(value, linkedinUrl, name);
    setDetected(parsed.detected);
    setAutoAnswers(parsed.answers);
    if (!headlineTouched && parsed.headline) setHeadline(parsed.headline);
    if (!aboutTouched && parsed.about) setAbout(parsed.about);
  };

  const finish = () => {
    if (pasted.trim().length < 100) {
      setError(
        "The paste looks too short. Open your LinkedIn profile, press Ctrl+A to select the whole page, copy it, and paste it above."
      );
      return;
    }
    if (headline.trim().length === 0) {
      setError(
        "We could not detect your headline automatically. Please type the line that appears under your name on your profile."
      );
      return;
    }
    if (!bannerAnswer || !photoAnswer) {
      setError("Please answer the two quick visual questions. Images cannot be read from pasted text.");
      return;
    }
    setError("");
    const input: AuditInput = {
      name: name.trim(),
      email: email.trim(),
      linkedinUrl: linkedinUrl.trim(),
      headline: headline.trim(),
      about: about.trim(),
      answers: {
        ...autoAnswers,
        "q-banner": bannerAnswer,
        "q-photo": photoAnswer,
      },
      rawProfile: pasted.trim(),
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
              onClick={goToPaste}
              className="mt-8 w-full rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: PASTE AND GO */}
        {step === "paste" && (
          <div>
            <h2 className="text-2xl font-bold text-[#111111]">
              Now paste your profile once
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Open your LinkedIn profile in another tab. Click anywhere on the
              page, press Ctrl+A to select everything, then Ctrl+C to copy.
              On a phone: tap and hold, choose Select All, then Copy. Paste it
              all below and we analyze the rest automatically.
            </p>

            <div className="mt-6">
              <textarea
                value={pasted}
                onChange={(e) => handlePaste(e.target.value)}
                rows={8}
                placeholder="Paste your whole profile page here"
                className={inputClass}
              />
            </div>

            {/* DETECTIONS */}
            {detected.length > 0 && (
              <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/60 p-5">
                <p className="text-sm font-semibold text-violet-700">
                  Detected automatically:
                </p>
                <ul className="mt-2 space-y-1">
                  {detected.map((d) => (
                    <li key={d} className="text-sm text-slate-600">
                      ✓ {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* DETECTED TEXT, EDITABLE */}
            {pasted.trim().length >= 100 && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111111]">
                    Your headline, detected from the paste. Fix it if it looks wrong.
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => {
                      setHeadline(e.target.value);
                      setHeadlineTouched(true);
                    }}
                    placeholder="The line under your name on your profile"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111111]">
                    Your about section, detected from the paste.
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                      setAboutTouched(true);
                    }}
                    rows={5}
                    placeholder="If empty, we treat your about section as missing"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* THE ONLY 2 QUESTIONS: IMAGES */}
            <div className="mt-8">
              <p className="text-[15px] font-semibold text-[#111111]">
                Two things a paste cannot show: your images.
              </p>

              {bannerQuestion && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#111111]">
                    {bannerQuestion.question}
                  </p>
                  <div className="mt-2 space-y-2">
                    {bannerQuestion.options.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => setBannerAnswer(o.value)}
                        className={`block w-full rounded-2xl border px-5 py-3.5 text-left text-sm font-medium transition-all duration-300 ${
                          bannerAnswer === o.value
                            ? "border-violet-600 bg-violet-50 text-violet-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-violet-200"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {photoQuestion && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-[#111111]">
                    {photoQuestion.question}
                  </p>
                  <div className="mt-2 space-y-2">
                    {photoQuestion.options.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => setPhotoAnswer(o.value)}
                        className={`block w-full rounded-2xl border px-5 py-3.5 text-left text-sm font-medium transition-all duration-300 ${
                          photoAnswer === o.value
                            ? "border-violet-600 bg-violet-50 text-violet-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-violet-200"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <p className="mt-6 text-sm font-medium text-red-500">{error}</p>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="rounded-2xl border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-violet-300"
              >
                Back
              </button>
              <button
                onClick={finish}
                className="flex-1 rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
              >
                Get my Socieas Score
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
