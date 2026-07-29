import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "gradient-cta text-white shadow-glow hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand",
  secondary:
    "border border-line bg-surface text-ink hover:bg-raised focus-visible:ring-2 focus-visible:ring-brand",
  ghost: "text-brand hover:bg-brand-soft focus-visible:ring-2 focus-visible:ring-brand",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all outline-none";

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, styles[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  href,
  children,
}: {
  variant?: Variant;
  className?: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {children}
    </Link>
  );
}
