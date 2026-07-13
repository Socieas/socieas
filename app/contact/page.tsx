"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import JsonLd from "@/components/seo/JsonLd";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ================= DATA ================= */

const growthNeeds = [
  "Personal Branding",
  "CRM Implementation",
  "SEO Visibility",
  "AI Automation",
  "Lead Generation",
  "Website Systems",
  "LinkedIn Positioning",
  "Content Marketing",
];

const nextSteps = [
  {
    number: "01",
    title: "We reply within one business day",
    text: "A real person reads your message and answers it. No bots.",
  },
  {
    number: "02",
    title: "We talk for thirty minutes",
    text: "A call about your goals and your market. Not a sales pitch.",
  },
  {
    number: "03",
    title: "You get a written plan in 48 hours",
    text: "A visibility plan for your brand. Yours to keep either way.",
  },
];

const chipHover = { y: -2 };

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

/* ================= STYLES ================= */

const inputCls =
  "mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-0 transition";

/* ================= INFO PANEL ================= */

function InfoPanel() {
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
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-[#111111] sm:text-5xl">
          Book your free <span className="text-violet-600">strategy call.</span>
        </h1>
        <p className="mt-6 text-base leading-relaxed text-slate-600">
          Thirty minutes, straight answers, and a written visibility plan
          within 48 hours of the call. Whether we end up working together or
          not.
        </p>
      </div>

      <div className="space-y-4">
        {nextSteps.map((step) => (
          <div key={step.number} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-black text-white">
              {step.number}
            </div>
            <div>
              <p className="font-bold text-[#111111]">{step.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
            </div>
          </div>
        ))}
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

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          We help with
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {growthNeeds.map((need) => (
            <motion.span
              key={need}
              whileHover={chipHover}
              className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
            >
              {need}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= FORM PANEL ================= */

function FormPanel() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const hasTurnstile = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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

    const payload: any = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: formData.get("service"),
      message: formData.get("message"),
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
      <FadeUp>
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-sm md:p-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-2xl font-black text-white">
            ✓
          </div>
          <h2 className="mt-6 text-3xl font-black text-[#111111]">
            Message received.
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
            You will hear from us within one business day. After your call,
            your written visibility plan follows within 48 hours.
          </p>
          <Link
            href="/insights"
            className="mt-8 inline-flex items-center rounded-2xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400"
          >
            Read our insights while you wait
          </Link>
        </div>
      </FadeUp>
    );
  }

  return (
    <FadeUp>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={honeypotStyle}
        />

        <div>
          <h2 className="text-2xl font-black text-[#111111]">
            Start the conversation
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Fill in the details below. A real person replies within one
            business day.
          </p>
        </div>

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
              Primary Goal
            </label>
            <select name="service" className={inputCls}>
              <option value="">Select a goal</option>
              <option>Personal Branding</option>
              <option>CRM Implementation</option>
              <option>SEO Optimization</option>
              <option>Lead Generation</option>
              <option>AI Automation</option>
              <option>Website Development</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#111111]">
            What is your biggest challenge right now?{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            name="message"
            required
            placeholder="Tell us what you are working on..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {hasTurnstile && (
          <div className="mt-6">
            <div
              ref={turnstileRef}
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-callback="onTurnstileSuccess"
            />
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-violet-700 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Book My Free Strategy Call"}
        </button>

        <p className="mt-4 text-center text-xs text-slate-500">
          No spam. We respect your privacy.
        </p>
      </form>
    </FadeUp>
  );
}

/* ================= PAGE ================= */

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F8F6] px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <InfoPanel />
            <FormPanel />
          </div>
        </div>
        <JsonLd id="contact-page-schema" schema={contactSchema} />
      </main>
      <Footer />
    </>
  );
}
