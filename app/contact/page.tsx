"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import { motion } from "framer-motion";
import { useState } from "react";

// —— DATA ————————————————————————————————————————————————————————————————————

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

const pillars = [
  "Authority",
  "Trust",
  "Positioning",
];

const recentUpdates = [
  {
    title:
      "Why Most Personal Brands Never Build Authority",
    category: "Personal Branding",
    link: "/insights/blogs/personal-brand-authority",
  },
  {
    title:
      "CRM Systems That Actually Improve Conversion",
    category: "CRM Strategy",
    link: "/insights/articles/crm-conversion-systems",
  },
  {
    title:
      "How Businesses Lose Leads Without Automation",
    category: "AI Automation",
    link: "/insights/case-studies/lead-automation",
  },
];

// —— STYLES ————————————————————————————————————————————————————————————————

const inputCls =
  "mt-2 block w-full rounded-2xl border border-black/10 bg-[#F9FAFB] px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-black/30 focus:outline-none focus:ring-0 transition";

// —— INFO PANEL ———————————————————————————————————————————————————————————————

function InfoPanel() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <FadeUp>
        <div>
          <span className="mb-4 inline-block rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium tracking-widest text-muted uppercase">
            Get In Touch
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Let&rsquo;s Build
            <br />
            Something
            <br />
            <span className="text-muted/50">That Lasts</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Whether you&rsquo;re scaling a business,
            building a personal brand, or systemising
            your growth — we&rsquo;re here to help you
            move with clarity and precision.
          </p>
        </div>
      </FadeUp>

      {/* Pillars */}
      <FadeUp delay={0.1}>
        <div className="flex flex-wrap gap-2">
          {pillars.map((p) => (
            <span
              key={p}
              className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm font-medium text-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      </FadeUp>

      {/* Growth Needs */}
      <FadeUp delay={0.15}>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
            We help with
          </p>
          <div className="flex flex-wrap gap-2">
            {growthNeeds.map((n) => (
              <span
                key={n}
                className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-foreground"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Recent Updates */}
      <FadeUp delay={0.2}>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
            Recent Insights
          </p>
          <div className="flex flex-col gap-3">
            {recentUpdates.map((u) => (
              <Link
                key={u.link}
                href={u.link}
                className="group flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-4 transition hover:border-black/15"
              >
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-black/20 group-hover:bg-black/60 transition" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {u.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {u.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

// —— FORM PANEL ———————————————————————————————————————————————————————————————

function FormPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Honeypot spam check — bots fill hidden fields, humans don't
    if (formData.get("website")) {
      router.push("/insights");
      return;
    }

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      goal: formData.get("goal"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed");

      formEl.reset();
      router.push("/insights");
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <FadeUp delay={0.05}>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
      >
        {/* Honeypot — hidden from real users, catches bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />

        <div className="p-6 sm:p-10">
          <h2 className="mb-1 text-2xl font-bold tracking-tight text-foreground">
            Start a Conversation
          </h2>
          <p className="mb-8 text-sm text-muted">
            Fill in the details below and we&rsquo;ll
            get back to you within 1–2 business days.
          </p>

          {/* Two-column on md+, single column on mobile */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-muted">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-muted">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-muted">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="Your Company (optional)"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-muted">
                Primary Goal
              </label>
              <select name="goal" className={inputCls}>
                <option value="">Select a goal…</option>
                <option>Personal Branding</option>
                <option>CRM Implementation</option>
                <option>SEO Optimization</option>
                <option>Lead Generation</option>
                <option>AI Automation</option>
                <option>Website Development</option>
              </select>
            </div>
          </div>

          {/* Message — full width */}
          <div className="mt-5 flex flex-col">
            <label className="mb-1 text-sm font-medium text-muted">
              What&rsquo;s Your Biggest Challenge Right Now?{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={5}
              name="message"
              required
              placeholder="Tell us what you're working on..."
              className={`${inputCls} resize-none`}
            />
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-foreground px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send Inquiry →"}
          </button>

          <p className="mt-4 text-center text-xs text-muted/60">
            No spam. We respect your privacy.
          </p>
        </div>
      </form>
    </FadeUp>
  );
}

// —— PAGE ——————————————————————————————————————————————————————————————————————

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9FAFB] px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <InfoPanel />
            <FormPanel />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
