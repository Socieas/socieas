"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AccountPicker({
  provider,
  clientId,
  selected,
}: {
  provider: string;
  clientId: string;
  selected: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Array<{ id: string; label: string }>>(
    [],
  );
  const [choice, setChoice] = useState(selected ?? "");
  const [message, setMessage] = useState<string | null>(null);

  async function loadOptions() {
    setLoading(true);
    setMessage(null);
    const res = await fetch(
      `/api/lens/integrations/${provider}/accounts?clientId=${clientId}`,
    );
    const json = await res.json().catch(() => null);
    setLoading(false);
    if (!res.ok) {
      setMessage(json?.error ?? "Could not load account list");
      return;
    }
    setOptions(json?.options ?? []);
    setChoice(json?.selected ?? json?.options?.[0]?.id ?? "");
    setOpen(true);
  }

  async function save() {
    setLoading(true);
    setMessage(null);
    const res = await fetch(`/api/lens/integrations/${provider}/accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, accountId: choice }),
    });
    const json = await res.json().catch(() => null);
    setLoading(false);
    if (!res.ok) {
      setMessage(json?.error ?? "Could not save the selection");
      return;
    }
    setOpen(false);
    setMessage("Saved. Click Sync now to pull fresh data from this source.");
    router.refresh();
  }

  return (
    <div className="mt-3 flex flex-col gap-2">
      {!open ? (
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="max-w-full truncate">
            {selected ? `Source: ${selected}` : "Source: auto-detected"}
          </span>
          <button
            type="button"
            onClick={loadOptions}
            disabled={loading}
            className="font-semibold text-brand hover:underline disabled:opacity-50"
          >
            {loading ? "Loading..." : "Change"}
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
            className="max-w-full rounded-lg border border-line bg-surface px-2 py-1.5 text-xs"
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={save}
            disabled={loading || !choice}
            className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs text-muted hover:underline"
          >
            Cancel
          </button>
        </div>
      )}
      {message ? <p className="text-xs text-muted">{message}</p> : null}
    </div>
  );
}