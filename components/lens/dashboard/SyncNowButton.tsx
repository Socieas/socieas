"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SyncNowButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSync() {
    setBusy(true);
    setMessage(null);
    const res = await fetch("/api/lens/sync", { method: "POST" });
    const json = await res.json().catch(() => null);
    setBusy(false);
    if (!res.ok) {
      setMessage(json?.error ?? "Sync failed. Please try again.");
      return;
    }
    const parts = (json?.results ?? []).map(
      (r: { provider: string; saved?: number; error?: string }) =>
        r.error ? `${r.provider}: ${r.error}` : `${r.provider}: ${r.saved} data points saved`,
    );
    setMessage(
      parts.length
        ? parts.join(" · ")
        : "Nothing to sync yet — connect a platform first.",
    );
    router.refresh();
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleSync}
        disabled={busy}
        className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {busy ? "Syncing..." : "Sync now"}
      </button>
      {message ? (
        <p className="max-w-md text-right text-sm text-muted">{message}</p>
      ) : null}
    </div>
  );
}