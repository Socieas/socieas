"use client";

import { useRouter } from "next/navigation";
import FadeUp from "@/components/FadeUp";
import { useState, useEffect, useRef } from "react";

const inputCls =
  "mt-2 block w-full rounded-2xl border border-black/10 bg-[#F9FAFB] px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-black/30 focus:outline-none focus:ring-0 transition";

export default function FormPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Cloudflare Turnstile script
    const script = document.createElement("script");
    (window as any).onTurnstileSuccess = setTurnstileToken;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
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
      goal: formData.get("goal"),
      message: formData.get("message"),
      turnstileToken,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          service: payload.goal, // API expects 'service'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      formEl.reset();
      router.push("/insights");
    } catch (err: any) {
      console.error("Form submit error:", err);
      setError(err.message || "Something went wrong. Please try again.");
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
