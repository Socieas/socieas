"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/lens/supabase/client";
import { LENS_BASE } from "@/lib/lens/routes";

type Mode = "signin" | "signup";

export function AuthForm({ initialMode }: { initialMode: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
    window.history.replaceState(
      null,
      "",
      next === "signup" ? "?mode=signup" : "?mode=signin",
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setNotice(null);
    const supabase = createClient();

    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) {
        setSaving(false);
        setError("Wrong email or password. Please try again.");
        return;
      }
      router.push(`${LENS_BASE}/clients`);
      router.refresh();
      return;
    }

    const { data, error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: name.trim() } },
    });
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    if (data.session) {
      router.push(`${LENS_BASE}/clients`);
      router.refresh();
      return;
    }
    setNotice(
      "Account created. Please check your inbox, confirm your email, then sign in here.",
    );
    setMode("signin");
  }

  return (
    <div className="rounded-card border border-line bg-surface p-8 shadow-card">
      <div className="flex gap-1 rounded-xl border border-line bg-raised p-1">
        <button
          type="button"
          onClick={() => switchMode("signin")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            mode === "signin" ? "bg-brand text-white" : "text-muted"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            mode === "signup" ? "bg-brand text-white" : "text-muted"
          }`}
        >
          Start free
        </button>
      </div>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">
        {mode === "signin" ? "Welcome back" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {mode === "signin"
          ? "Sign in to see what moved across your clients today."
          : "Free while in beta. Connect your first client in minutes."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {mode === "signup" ? (
          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              Your name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-line bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-brand"
            />
          </div>
        ) : null}
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
            minLength={8}
            className="w-full rounded-xl border border-line bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-brand"
          />
        </div>

        {error ? (
          <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-medium text-negative">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p className="rounded-xl bg-brand-soft px-4 py-2.5 text-sm font-medium text-brand-dark">
            {notice}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          className="mt-2 w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {saving
            ? "Please wait..."
            : mode === "signin"
              ? "Sign in"
              : "Create free account"}
        </button>
      </form>
    </div>
  );
}