import { cn } from "@/lib/lens/utils";

type Tone = "brand" | "positive" | "negative" | "neutral" | "attention";

const tones: Record<Tone, string> = {
  brand: "bg-brand-soft text-brand-dark dark:text-brand-light",
  positive: "bg-green-600/10 text-green-700 dark:text-green-400",
  negative: "bg-red-600/10 text-red-700 dark:text-red-400",
  attention: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  neutral: "bg-raised text-muted",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
