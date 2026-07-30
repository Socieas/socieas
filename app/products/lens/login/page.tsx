"use client";
import { useState } from "react";
import { createClient } from "@/lib/lens/supabase/client";
import { buildAppUrl } from "@/lib/lens/integrations/oauth";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else window.location.assign(buildAppUrl("/products/lens"));
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Sign in to Lens</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="input" />
        {error && <div className="text-sm text-negative">{error}</div>}
        <button className="btn btn-primary" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
      </form>
      <p className="mt-4 text-sm">New here? <Link href="/products/lens/signup" className="text-primary">Create an account</Link></p>
    </main>
  );
}
