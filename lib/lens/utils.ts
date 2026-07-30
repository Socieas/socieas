import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isMockMode = () => process.env.NEXT_PUBLIC_MOCK_MODE !== "false";

/** 12400 -> "12.4K", 1200000 -> "1.2M" */
export function formatNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${Math.round(value)}`;
}

/** 0.223 -> "+22.3%" */
export function formatDelta(ratio: number): string {
  const pct = (ratio * 100).toFixed(1);
  return `${ratio >= 0 ? "+" : ""}${pct}%`;
}

/** seconds -> "2m 41s" */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}
