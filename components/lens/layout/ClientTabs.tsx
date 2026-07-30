"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LENS_BASE } from "@/lib/lens/routes";
import { cn } from "@/lib/lens/utils";

const tabs = [
  { slug: "overview", label: "Overview" },
  { slug: "analytics", label: "Analytics" },
  { slug: "social", label: "Social Media" },
  { slug: "seo", label: "SEO" },
  { slug: "ai-visibility", label: "AI Visibility" },
  { slug: "insights", label: "AI Insights" },
  { slug: "reports", label: "Reports" },
  { slug: "settings", label: "Settings" },
];

export function ClientTabs({ clientId }: { clientId: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Client workspace"
      className="mt-5 flex gap-1 overflow-x-auto pb-0"
    >
      {tabs.map((tab) => {
        const href = `${LENS_BASE}/clients/${clientId}/${tab.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={tab.slug}
            href={href}
            className={cn(
              "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition",
              active
                ? "border-brand text-brand-dark dark:text-brand-light"
                : "border-transparent text-muted hover:text-ink",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
