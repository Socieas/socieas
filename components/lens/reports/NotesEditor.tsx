"use client";

import { useState } from "react";

export function NotesEditor(props: {
  clientId: string;
  noteKey: string;
  initialBestTime: string;
  initialNotes: string;
}) {
  const [bestTime, setBestTime] = useState(props.initialBestTime);
  const [notes, setNotes] = useState(props.initialNotes);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );

  async function save() {
    setStatus("saving");
    try {
      const res = await fetch("/api/lens/report-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: props.clientId,
          key: props.noteKey,
          bestTime,
          notes,
        }),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 print:hidden">
      <div>
        <label className="text-xs font-medium text-muted">
          Best time to post
        </label>
        <input
          value={bestTime}
          onChange={(e) => {
            setBestTime(e.target.value);
            setStatus("idle");
          }}
          placeholder="e.g. Weekdays 7-9 PM"
          className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setStatus("idle");
          }}
          rows={3}
          placeholder="Observations, wins, plans for next month..."
          className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={status === "saving"}
          className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {status === "saving" ? "Saving..." : "Save"}
        </button>
        {status === "saved" ? (
          <span className="text-xs font-semibold text-positive">Saved</span>
        ) : null}
        {status === "error" ? (
          <span className="text-xs font-semibold text-negative">
            Could not save. Try again.
          </span>
        ) : null}
      </div>
    </div>
  );
}