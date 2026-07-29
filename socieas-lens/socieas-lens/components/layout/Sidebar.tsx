"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Plug,
  Telescope,
  Gauge,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const lensNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/integrations", label: "Integrations", icon: Plug },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface px-4 py-6 lg:flex">
      {/* Wordmark */}
      <Link href="/dashboard" className="px-3">
        <span className="text-2xl font-black tracking-tight">
          Socieas<span className="text-brand">.</span>
        </span>
      </Link>

      {/* Product switcher: Lens and Score share one shell */}
      <div className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-raised p-1">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition",
            !pathname.startsWith("/score")
              ? "bg-surface text-ink shadow-card"
              : "text-muted hover:text-ink",
          )}
        >
          <Telescope className="h-4 w-4 text-brand" /> Lens
        </Link>
        <Link
          href="/score"
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition",
            pathname.startsWith("/score")
              ? "bg-surface text-ink shadow-card"
              : "text-muted hover:text-ink",
          )}
        >
          <Gauge className="h-4 w-4 text-brand" /> Score
        </Link>
      </div>

      {/* Nav */}
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {lensNav.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition",
                active
                  ? "bg-brand-soft font-semibold text-brand-dark dark:text-brand-light"
                  : "text-muted hover:bg-raised hover:text-ink",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/settings"
        className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted transition hover:bg-raised hover:text-ink"
      >
        <Settings className="h-4 w-4" />
        Workspace settings
      </Link>
    </aside>
  );
}
