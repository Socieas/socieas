"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/lens/supabase/client";
import { LENS_BASE } from "@/lib/lens/routes";

const DEMO_BARS = [
  { label: "Organic search", value: 72 },
  { label: "Social", value: 54 },
  { label: "Direct", value: 38 },
  { label: "Referral", value: 22 },
];

const FEATURES = [
  {
    title: "All channels, one lens",
    text: "Website analytics, Google Search, Facebook, Instagram and YouTube in a single live dashboard.",
  },
  {
    title: "Client-ready reports",
    text: "Monthly reports with charts, notes and one-click PDF or CSV download.",
  },
  {
    title: "Hands-free syncing",
    text: "Numbers refresh automatically every morning - no exports, no spreadsheets.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      setSaving(false);
      setError("Wrong email or password. Please try again.");
      return;
    }
    router.push(`${LENS_BASE}/dashboard`);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col bg-raised/30">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href={LENS_BASE}>
            <span className="text-xl font-black tracking-tight">
              Socieas<span className="text-brand">.</span>
            </span>
          </Link>
          <Link
            href={LENS_BASE}
            className="text-sm font-semibold text-muted transition hover:text-ink"
          >
            About Lens
          </Link>
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-fuchsia-100/40 blur-[140px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <section>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Socieas Lens
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Every client. Every channel. One dashboard.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Lens pulls your clients&apos; website, search and social numbers
              into live infographics and client-ready monthly reports -
              automatically, every day.
            </p>

            <div className="mt-8 rounded-card border border-line bg-surface p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Traffic by channel</p>
                <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand-dark">
                  +18% this month
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {DEMO_BARS.map((b) => (
                  <div key={b.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted">{b.label}</span>
                      <span className="font-semibold">{b.value}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-raised">
                      <div
                        className="h-full rounded-full bg-brand"
                        style={{ width: `${b.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ul className="mt-8 flex flex-col gap-4">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[11px] font-black text-brand-dark"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-bold">{f.title}</p>
                    <p className="text-sm text-muted">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="w-full max-w-md justify-self-center">
            <div className="rounded-card border border-line bg-surface p-8 shadow-card">
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Sign in to see what moved across your clients today.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full rounded-xl border border-line bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-brand"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-line bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-brand"
                  />
                </div>

                {error ? (
                  <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-medium text-negative">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-2 w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                New to Lens?{" "}
                <Link
                  href={`${LENS_BASE}/signup`}
                  className="font-semibold text-brand hover:underline"
                >
                  Start free
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-muted">
          <span>© 2026 Socieas. All rights reserved.</span>
          <span>Lens — Growth Intelligence</span>
        </div>
      </footer>
    </div>
  );
}