"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddClientForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/lens/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        websiteUrl: websiteUrl.trim() || undefined,
      }),
    });
    const json = await res.json().catch(() => null);
    setSaving(false);
    if (!res.ok) {
      setError(json?.error ?? "Something went wrong. Please try again.");
      return;
    }
    setName("");
    setWebsiteUrl("");
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex min-h-40 items-center justify-center rounded-card border-2 border-dashed border-line text-sm font-semibold text-muted transition hover:border-brand hover:text-brand"
      >
        + Add a client workspace
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-40 flex-col gap-3 rounded-card border-2 border-dashed border-line p-4"
    >
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Client name (e.g. Socieas)"
        required
        className="rounded-xl border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
      />
      <input
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        placeholder="Website (e.g. https://socieas.com)"
        className="rounded-xl border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
      />
      {error ? <p className="text-sm text-negative">{error}</p> : null}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving || !name.trim()}
          className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "Adding..." : "Add client"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl border border-line px-4 py-2 text-sm font-semibold text-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}