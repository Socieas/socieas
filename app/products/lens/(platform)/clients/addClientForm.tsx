"use client";
import { useState } from "react";

export default function AddClientForm({ onAdded }: { onAdded?: () => void }) {
  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lens/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, websiteUrl }),
      });
      if (!res.ok) throw new Error("Failed to add client");
      setName("");
      setWebsiteUrl("");
      onAdded?.();
    } catch (err: any) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client name" className="input" />
      <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="Website URL" className="input" />
      {error && <div className="text-negative">{error}</div>}
      <button className="btn btn-primary" disabled={loading}>{loading ? "Adding…" : "Add client"}</button>
    </form>
  );
}
