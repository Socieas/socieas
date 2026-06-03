"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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

const pillars = ["Authority", "Trust", "Positioning"];

const recentUpdates = [
  {
    title: "Why Most Personal Brands Never Build Authority",
    category: "Personal Branding",
    link: "/insights/blogs/personal-brand-authority",
  },
  {
    title: "CRM Systems That Actually Improve Conversion",
    category: "CRM Strategy",
    link: "/insights/articles/crm-conversion-systems",
  },
  {
    title: "How Businesses Lose Leads Without Automation",
    category: "AI Automation",
    link: "/insights/case-studies/lead-automation",
  },
];

// —— STYLES ———————————————————————————————————————————————————————————————
const inputCls =
  "mt-2 block w-full rounded-2xl border border-black/10 bg-[#F9FAFB] px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-black/30 focus:outline-none focus:ring-0 transition";

// —— INFO PANEL ———————————————————————————————————————————————————————————————
function InfoPanel() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted/60">
          Get In Touch
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Let&apos;s Build <br />
          Something <br />
          <span className="italic"> That Lasts</span>
        </h1>
        <p className="mt-6 text-base text-muted/70 leading-relaxed">
          Whether you&apos;re scaling a business, building a personal brand, or
          systemising your growth — we&apos;re here to help you move with clarity
          and precision.
        </p>
      </div>

      {/* Pillars */}
      <div className="flex gap-3">
        {pillars.map((p) => (
          <span
            key={p}
            className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold text-foreground"
          >
            {p}
          </span>
        ))}
      </div>

      {/* Growth Needs */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted/60">
          We help with
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {growthNeeds.map((n) => (
            <motion.span
              key={n}
              whileHover={{ scale: 1.04 }}
              className="rounded-xl bg-foreground/5 px-3 py-1.5 text-sm text-foreground"
            >
              {n}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted/60">
          Recent Insights
        </p>
        <ul className="mt-4 space-y-3">
          {recentUpdates.map((u) => (
            <li key={u.title}>
              <Link
                href={u.link}
                className="group flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-4 transition hover:border-black/20"
              >
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:underline">
                    {u.title}
                  </p>
                  <p className="mt-1 text-xs text-muted/60">{u.category}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// —— FORM PANEL ———————————————————————————————————————————————————————————————
function FormPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);

  useEffect(() => {
    // Load Cloudflare Turnstile script
    const script = document.createElement("script");
    (window as any).onTurnstileSuccess = setTurnstileToken;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) {
      setError("Please complete the security check.");
      return;
    }
    setLoading(true);
    setError("");
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Honeypot spam check
    if (formData.get("website")) {
      router.push("/insights");
      return;
    }

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: formData.get("service"),
      message: formData.get("message"),
      turnstileToken,
    };

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
      router.push("/insights");
    } catch (err: any) {
      console.error("Form submit error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FadeUp>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Start a Conversation
          </h2>
          <p className="mt-2 text-sm text-muted/60">
            Fill in the details below and we&apos;ll get back to you within 1–2
            business days.
          </p>
        </div>

        {/* Two-column on md+, single column on mobile */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className={inputCls}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
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
            <label className="text-sm font-medium text-foreground">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              placeholder="Your Company (optional)"
              className={inputCls}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Primary Goal
            </label>
            <select name="service" className={inputCls}>
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
        <div>
          <label className="text-sm font-medium text-foreground">
            What&apos;s Your Biggest Challenge Right Now?{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            name="message"
            required
            placeholder="Tell us what you're working on..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Cloudflare Turnstile */}
        <div className="mt-6">
          <div
            ref={turnstileRef}
            className="cf-turnstile"
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            data-callback="onTurnstileSuccess"
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500">{error}</p>
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
