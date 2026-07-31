"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/lens/supabase/client";
import { LENS_BASE } from "@/lib/lens/routes";

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

        <h1 className="mt-6 text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sign in to see what moved across your clients today.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
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
    </main>
  );
}