"use client";
import { useState } from "react";
import { createClient } from "@/lib/lens/supabase/client";
import { buildAppUrl } from "@/lib/lens/integrations/oauth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const userId = (data as any)?.user?.id ?? (data as any)?.user_id ?? null;
    if (!userId) {
      setError("Signup was created, but the user id was not returned. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/lens/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email, fullName, agencyName }),
      });

      const body = await response.json().catch(() => null);
      if (!response.ok) {
        const message = body?.error ?? "Signup initialization failed.";
        throw new Error(message);
      }

      setLoading(false);
      window.location.assign(buildAppUrl("/products/lens/login"));
      return;
    } catch (err) {
      console.error("Lens signup initialization failed", err);
      setError(err instanceof Error ? err.message : "Signup initialization failed.");
      setLoading(false);
      return;
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Create a Lens account</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className="input" />
        <input value={agencyName} onChange={(e) => setAgencyName(e.target.value)} placeholder="Agency / Company name" className="input" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="input" />
        {error && <div className="text-sm text-negative">{error}</div>}
        <button className="btn btn-primary" disabled={loading}>{loading ? "Creating…" : "Create account"}</button>
      </form>
    </main>
  );
}
