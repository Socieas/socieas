"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
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
        <p className="mt-4 text-sm leading-relaxed text-muted/80">
          Whether you&apos;re scaling a business, building a personal brand, or
          systemising your growth &mdash; we&apos;re here to help you move with
          clarity and precision.
        </p>
      </div>

      {/* Pillars */}
      <div className="flex flex-wrap gap-2">
        {pillars.map((p) => (
          <span
            key={p}
            className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-medium text-foreground"
          >
            {p}
          </span>
        ))}
      </div>

      {/* Growth Needs */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted/60">
          We help with
        </p>
        <div className="flex flex-wrap gap-2">
          {growthNeeds.map((n) => (
            <span
              key={n}
              className="rounded-xl bg-black/5 px-3 py-1 text-xs text-foreground"
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted/60">
          Recent Insights
        </p>
        <ul className="space-y-3">
          {recentUpdates.map((u) => (
            <li key={u.title}>
              <Link
                href={u.link}
                className="group flex flex-col gap-0.5 rounded-xl p-3 transition hover:bg-black/5"
              >
                <span className="text-sm font-medium text-foreground group-hover:underline">
                  {u.title}
                </span>
                <span className="text-xs text-muted/60">{u.category}</span>
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
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Cloudflare Turnstile script
    const script = document.createElement("script");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).onTurnstileSuccess = (token: string) => setTurnstileToken(token);

    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";

    script.async = true;
    script.defer = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).onTurnstileSuccess;
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
      service: formData.get("goal"),
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
    } catch (err: unknown) {
      console.error("Form submit error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FadeUp>
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-sm">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />

        <h2 className="text-2xl font-bold text-foreground">Start a Conversation</h2>
        <p className="mt-1 text-sm text-muted/70">
          Fill in the details below and we&apos;ll get back to you within 1&ndash;2 business days.
        </p>

        {/* Two-column on md+, single column on mobile */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted/60">
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
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted/60">
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
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted/60">
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
            <label className="text-xs font-semibold uppercase tracking-wide text-muted/60">
              Primary Goal
            </label>
            <select name="goal" className={inputCls}>
              <option value="">Select a goal&hellip;</option>
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
        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted/60">
            What&apos;s Your Biggest Challenge Right Now?{" "}
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
