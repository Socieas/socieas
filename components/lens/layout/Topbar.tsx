"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LogOut } from "lucide-react";

const RANGES = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
];

export function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeRange = searchParams.get("range") ?? "30";
  const isCustom = Boolean(searchParams.get("from") && searchParams.get("to"));
  const [showCustom, setShowCustom] = useState(false);
  const [from, setFrom] = useState(searchParams.get("from") ?? "");
  const [to, setTo] = useState(searchParams.get("to") ?? "");
  const isDashboard = Boolean(pathname?.includes("/dashboard"));

  function setRange(days: number) {
    setShowCustom(false);
    router.push(`${pathname}?range=${days}`);
  }

  function applyCustom() {
    if (!from || !to || from > to) return;
    setShowCustom(false);
    router.push(`${pathname}?from=${from}&to=${to}`);
  }

  return (
    <header className="flex flex-col gap-4 border-b border-line bg-surface px-6 py-5 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isDashboard ? (
            <div className="flex items-center gap-1 rounded-xl border border-line bg-raised p-1">
              {RANGES.map((r) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setRange(r.days)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    !isCustom && activeRange === String(r.days)
                      ? "bg-brand text-white"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {r.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowCustom((v) => !v)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  isCustom ? "bg-brand text-white" : "text-muted hover:text-ink"
                }`}
              >
                Custom
              </button>
            </div>
          ) : null}
          <form action="/api/lens/auth/signout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl border border-line px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-negative"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          </form>
        </div>
      </div>
      {isDashboard && showCustom ? (
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs"
          />
          <span className="text-xs text-muted">to</span>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs"
          />
          <button
            type="button"
            onClick={applyCustom}
            className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white"
          >
            Apply
          </button>
        </div>
      ) : null}
    </header>
  );
}