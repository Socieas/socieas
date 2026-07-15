"use client";

// components/resources/LeadForm.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";

const CHALLENGES = [
  "Low visibility, nobody sees me",
  "Not enough leads",
  "Messy systems & CRM",
  "Can't stay consistent with content",
  "Hiring & scaling the team",
];

export default function LeadForm({
  resourceSlug,
  resourceTitle,
}: {
  resourceSlug: string;
  resourceTitle: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [challenge, setChallenge] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — bots fill it, humans never see it
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.includes("@") || !firstName.trim() || !challenge) {
      setError("Please fill in all three fields.");
      return;
    }
    if (website) return; // bot caught — silently drop

    setLoading(true);
    try {
      const res = await fetch("/api/resources/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          firstName: firstName.trim(),
          challenge,
          resourceSlug,
          resourceTitle,
        }),
      });
      if (!res.ok) throw new Error();
      router.push(
        `/resources/thank-you/${resourceSlug}?email=${encodeURIComponent(
          email.trim().toLowerCase()
        )}`
      );
    } catch {
      setError("Something went wrong. Please try again in a moment.");
      setLoading(false);
    }
  }

  return (
    <div
      id="get-resource"
      className="rounded-[32px] border border-violet-100 bg-white p-8 shadow-[0_20px_60px_rgba(124,58,237,0.08)] md:p-10"
    >
      <h3 className="text-2xl font-black tracking-tight text-[#111111]">
        Get {resourceTitle} — free.
      </h3>
      <p className="mt-2 text-[15px] leading-7 text-slate-600">
        Instant delivery to your inbox. No spam, ever.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          className="w-full rounded-[16px] border border-[#E5E7EB] px-5 py-4 text-[15px] outline-none focus:border-violet-400"
          required
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="w-full rounded-[16px] border border-[#E5E7EB] px-5 py-4 text-[15px] outline-none focus:border-violet-400"
          required
        />
        <select
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          className="w-full rounded-[16px] border border-[#E5E7EB] bg-white px-5 py-4 text-[15px] text-slate-700 outline-none focus:border-violet-400"
          required
        >
          <option value="" disabled>
            Your biggest challenge right now
          </option>
          {CHALLENGES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Honeypot — hidden from humans */}
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {error && (
          <p className="text-sm font-semibold text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-violet-700 to-fuchsia-600 px-8 py-4 text-base font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send me the system →"}
        </button>

        <p className="text-center text-xs text-slate-500">
          Instant delivery · Unsubscribe anytime · We never share your data
        </p>
      </form>
    </div>
  );
}
