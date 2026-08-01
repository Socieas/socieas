"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ClientSettingsForm({
  clientId,
  initialName,
  initialWebsite,
  initialColor,
  initialSecondary,
  initialAccent,
  initialLogoUrl,
}: {
  clientId: string;
  initialName: string;
  initialWebsite: string;
  initialColor: string;
  initialSecondary: string;
  initialAccent: string;
  initialLogoUrl: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [website, setWebsite] = useState(initialWebsite);
  const [color, setColor] = useState(initialColor);
  const [secondary, setSecondary] = useState(initialSecondary);
  const [accent, setAccent] = useState(initialAccent);
  const [logoUrl, setLogoUrl] = useState(initialLogoUrl);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/lens/clients/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        name: name.trim(),
        websiteUrl: website.trim(),
        brandColor: color,
        brandColorSecondary: secondary,
        brandColorAccent: accent,
        logoUrl: logoUrl.trim(),
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const json = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setMessage(json?.error ?? "Saving failed. Please try again.");
      return;
    }
    setMessage("Saved.");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-line bg-surface p-5 shadow-card"
    >
      <div className="flex items-center gap-3">
        {logoUrl.trim() ? (
          <img
            src={logoUrl.trim()}
            alt="Client logo preview"
            className="h-10 w-10 rounded-lg border border-line object-contain"
          />
        ) : (
          <span
            aria-hidden
            className="h-10 w-10 rounded-lg"
            style={{ backgroundColor: color }}
          />
        )}
        <div>
          <p className="font-bold">{name || "Client"}</p>
          <div className="mt-1 flex gap-1.5">
            {[color, secondary, accent].map((c, i) => (
              <span
                key={i}
                aria-hidden
                className="h-3 w-6 rounded-full border border-line"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold">
            Client name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold">Website</label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-xl border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold">
            Primary color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-xl border border-line bg-transparent px-1"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold">
            Secondary color
          </label>
          <input
            type="color"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-xl border border-line bg-transparent px-1"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold">
            Supporting color
          </label>
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-xl border border-line bg-transparent px-1"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold">
            Logo image link
          </label>
          <input
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="/lens/img/clients/socieas.webp"
            className="w-full rounded-xl border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        {message ? <span className="text-sm text-muted">{message}</span> : null}
      </div>
    </form>
  );
}