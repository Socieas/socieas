"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { motion, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ================= ANIMATION CONSTANTS ================= */

const stepVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const cardHover = { y: -4 };

/* ================= DATA ================= */

const goals = [
  {
    name: "Personal Branding",
    line: "Become the founder your market recognizes.",
  },
  {
    name: "CRM Implementation",
    line: "One clean pipeline for every lead.",
  },
  {
    name: "AI Automation",
    line: "Follow ups that never sleep.",
  },
  {
    name: "Lead Generation",
    line: "Qualified buyers, coming to you.",
  },
  {
    name: "Website Development",
    line: "A site that converts, not just exists.",
  },
  {
    name: "SEO Optimization",
    line: "Get found on Google and AI search.",
  },
];

const stages = [
  {
    name: "Just getting started",
    line: "Building from zero. Perfect timing.",
  },
  {
    name: "Running on referrals only",
    line: "Good work, invisible brand.",
  },
  {
    name: "Have an audience, no leads",
    line: "Attention that never converts.",
  },
  {
    name: "Scaling and need systems",
    line: "Growth is outpacing your tools.",
  },
];

const promises = [
  "A real person replies within one business day",
  "Thirty minute call about your goals, not a sales pitch",
  "A written visibility plan within 48 hours of the call",
];

const honeypotStyle = {
  position: "absolute",
  left: "-9999px",
  opacity: 0,
  height: 0,
  width: 0,
} as React.CSSProperties;

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://socieas.com/contact#webpage",
  name: "Contact Socieas",
  description:
    "Book a free strategy call with Socieas for personal branding, CRM implementation, AI automation, digital marketing, and full stack development services.",
  url: "https://socieas.com/contact",
  isPartOf: { "@id": "https://socieas.com/#website" },
  mainEntity: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@socieas.com",
    availableLanguage: ["English", "Hindi"],
  },
};

const inputCls =
  "mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-0 transition";

/* ================= LIVE BRIEF PANEL ================= */

function BriefPanel(props: { goal: string; stage: string; step: number }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@socieas.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-[#111111] sm:text-5xl">
          Book your free <span className="text-violet-600">strategy call.</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-600">
          Answer three quick questions. Watch your brief build itself.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Your brief
        </p>

        <div className="mt-4 space-y-4">
          <div className="flex items-start gap-3">
            <span
              className={
                props.goal
                  ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white"
                  : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-black text-slate-300"
              }
            >
              1
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Goal
              </p>
              <motion.p
                key={props.goal || "goal-empty"}
                variants={fadeVariants}
                initial="hidden"
                animate="show"
                className={
                  props.goal
                    ? "font-bold text-[#111111]"
                    : "font-medium text-slate-400"
                }
              >
                {props.goal || "Waiting for you..."}
              </motion.p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span
              className={
                props.stage
                  ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white"
                  : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-black text-slate-300"
              }
            >
              2
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Where you are
              </p>
              <motion.p
                key={props.stage || "stage-empty"}
                variants={fadeVariants}
                initial="hidden"
                animate="show"
                className={
                  props.stage
                    ? "font-bold text-[#111111]"
                    : "font-medium text-slate-400"
                }
              >
                {props.stage || "Coming up next"}
              </motion.p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span
              className={
                props.step === 3
                  ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white"
                  : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-black text-slate-300"
              }
            >
              3
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Your details
              </p>
              <p
                className={
                  props.step === 3
                    ? "font-bold text-[#111111]"
                    : "font-medium text-slate-400"
                }
              >
                {props.step === 3 ? "Last step" : "Almost there"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          What happens after you hit send
        </p>
        <ul className="mt-4 space-y-3">
          {promises.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
              <span className="font-black text-violet-600">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyEmail}
          className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400"
        >
          {copied ? "Copied ✓" : "hello@socieas.com"}
        </button>
        <a
          href="https://wa.me/919142874636"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400"
        >
          WhatsApp us
        </a>
      </div>
    </div>
  );
}

/* ================= WIZARD ================= */

function ContactWizard(props: {
  goal: string;
  stage: string;
  step: number;
  setGoal: (value: string) => void;
  setStage: (value: string) => void;
  setStep: (value: number) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const hasTurnstile = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const progressStyle = { width: `${(props.step / 3) * 100}%` };

  useEffect(() => {
    if (!hasTurnstile) return;
    const script = document.createElement("script");
    (window as any).onTurnstileSuccess = setTurnstileToken;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [hasTurnstile]);

  const chooseGoal = (value: string) => {
    props.setGoal(value);
    props.setStep(2);
  };

  const chooseStage = (value: string) => {
    props.setStage(value);
    props.setStep(3);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    if (formData.get("website")) {
      setSubmitted(true);
      return;
    }

    const challenge = String(formData.get("message") || "");

    const payload: any = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: props.goal,
      message: `Current stage: ${props.stage}\n\n${challenge}`,
    };

    if (turnstileToken) {
      payload.turnstileToken = turnstileToken;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }
      formEl.reset();
      setSubmitted(true);
    } catch (err: any) {
      console.error("Form submit error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        variants={fadeVariants}
        initial="hidden"
        animate="show"
        className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-sm md:p-14"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-2xl font-black text-white">
          ✓
        </div>
        <h2 className="mt-6 text-3xl font-black text-[#111111]">
          Message received.
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
          You will hear from us within one business day. After your call, your
          written visibility plan follows within 48 hours.
        </p>
        <Link
          href="/insights"
          className="mt-8 inline-flex items-center rounded-2xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400"
        >
          Read our insights while you wait
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Step {props.step} of 3
        </p>
        {props.step > 1 && (
          <button
            type="button"
            onClick={() => props.setStep(props.step - 1)}
            className="text-xs font-semibold text-violet-600 transition-colors hover:text-violet-800"
          >
            Go back
          </button>
        )}
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-violet-600 transition-all duration-500"
          style={progressStyle}
        />
      </div>

      {props.step === 1 && (
        <motion.div
          key="step-1"
          variants={stepVariants}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <h2 className="text-2xl font-black text-[#111111] md:text-3xl">
            What do you want to grow?
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {goals.map((goal) => (
              <motion.button
                key={goal.name}
                type="button"
                whileHover={cardHover}
                onClick={() => chooseGoal(goal.name)}
                className={
                  props.goal === goal.name
                    ? "rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 text-left transition-colors duration-300"
                    : "rounded-2xl border border-slate-200 bg-[#F8F8F6] p-5 text-left transition-colors duration-300 hover:border-violet-300"
                }
              >
                <p className="font-black text-[#111111]">{goal.name}</p>
                <p className="mt-1 text-sm text-slate-600">{goal.line}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {props.step === 2 && (
        <motion.div
          key="step-2"
          variants={stepVariants}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <h2 className="text-2xl font-black text-[#111111] md:text-3xl">
            Where are you right now?
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {stages.map((stage) => (
              <motion.button
                key={stage.name}
                type="button"
                whileHover={cardHover}
                onClick={() => chooseStage(stage.name)}
                className={
                  props.stage === stage.name
                    ? "rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 text-left transition-colors duration-300"
                    : "rounded-2xl border border-slate-200 bg-[#F8F8F6] p-5 text-left transition-colors duration-300 hover:border-violet-300"
                }
              >
                <p className="font-black text-[#111111]">{stage.name}</p>
                <p className="mt-1 text-sm text-slate-600">{stage.line}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {props.step === 3 && (
        <motion.div
          key="step-3"
          variants={stepVariants}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <h2 className="text-2xl font-black text-[#111111] md:text-3xl">
            Last step. Where do we send the plan?
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={honeypotStyle}
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#111111]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#111111]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#111111]">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="Your company (optional)"
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#111111]">
                What is your biggest challenge right now?{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                name="message"
                required
                placeholder="Tell us what you are working on..."
                className={`${inputCls} resize-none`}
              />
            </div>

            {hasTurnstile && (
              <div className="mt-4">
                <div
                  ref={turnstileRef}
                  className="cf-turnstile"
                  data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  data-callback="onTurnstileSuccess"
                />
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-violet-700 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Book My Free Strategy Call"}
            </button>

            <p className="text-center text-xs text-slate-500">
              No spam. We respect your privacy.
            </p>
          </form>
        </motion.div>
      )}
    </div>
  );
}

/* ================= PAGE ================= */

export default function ContactPage() {
  const [goal, setGoal] = useState("");
  const [stage, setStage] = useState("");
  const [step, setStep] = useState(1);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F8F6] px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <BriefPanel goal={goal} stage={stage} step={step} />
            <ContactWizard
              goal={goal}
              stage={stage}
              step={step}
              setGoal={setGoal}
              setStage={setStage}
              setStep={setStep}
            />
          </div>
        </div>
        <JsonLd id="contact-page-schema" schema={contactSchema} />
      </main>
      <Footer />
    </>
  );
}
