"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/lens/supabase/client";
import { LENS_BASE } from "@/lib/lens/routes";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch("/api/lens/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        password,
        name: name.trim(),
        agencyName: name.trim(),
        agency_name: name.trim(),
        fullName: name.trim(),
        full_name: name.trim(),
      }),
    });
    const json = await res.json().catch(() => null);

    if (!res.ok || json?.error) {
      setSaving(false);
      setError(json?.error ?? "Could not create your account. Please try again.");
      return;
    }

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      router.push(`${LENS_BASE}/login`);
      return;
    }
    router.push(`${LENS_BASE}/dashboard`);
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-fuchsia-100/40 blur-[140px]" />
      </div>

      <div className="relative w-full max-w-md rounded-card border border-line bg-surface p-8 shadow-card">
        <Link href={LENS_BASE} className="inline-block">
          <span className="text-2xl font-black tracking-tight">
            Socieas<span className="text-brand">.</span>
          </span>
        </Link>

        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Every metric, one lens. Free while in beta — no card needed.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              Agency or brand name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Socieas"
              required
              className="w-full rounded-xl border border-line bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-brand"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Email</label>
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
              placeholder="At least 8 characters"
              required
              minLength={8}
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
            {saving ? "Creating your workspace..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href={`${LENS_BASE}/login`}
            className="font-semibold text-brand hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}