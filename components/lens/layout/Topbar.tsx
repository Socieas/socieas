"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Bell } from "lucide-react";

const RANGES = ["7D", "30D", "90D", "Custom"] as const;
export type Range = (typeof RANGES)[number];

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [range, setRange] = useState<Range>("30D");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-canvas px-6 py-5 lg:px-10">
      <div>
        <h1 className="display text-2xl md:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-3">
        {/* Date range switcher: drives every chart on the page */}
        <div className="flex rounded-full bg-raised p-1" role="tablist" aria-label="Date range">
          {RANGES.map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={range === r}
              onClick={() => setRange(r)}
              className={
                range === r
                  ? "rounded-full bg-surface px-4 py-1.5 text-sm font-semibold text-ink shadow-card"
                  : "rounded-full px-4 py-1.5 text-sm font-medium text-muted hover:text-ink"
              }
            >
              {r}
            </button>
          ))}
        </div>

        <button
          aria-label="Notifications"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted transition hover:text-ink"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDark((d) => !d)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted transition hover:text-ink"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
