"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Plug,
  FileText,
  Telescope,
  Settings,
} from "lucide-react";
import { LENS_BASE } from "@/lib/lens/routes";
import { cn } from "@/lib/lens/utils";

export function Sidebar({
  portal,
  portalClientId,
}: {
  portal?: boolean;
  portalClientId?: string;
}) {
  const pathname = usePathname();

  const nav =
    portal && portalClientId
      ? [
          {
            href: `${LENS_BASE}/clients/` + portalClientId,
            label: "My dashboard",
            icon: LayoutDashboard,
          },
          { href: `${LENS_BASE}/reports`, label: "Reports", icon: FileText },
        ]
      : [
          { href: `${LENS_BASE}/clients`, label: "Clients", icon: Users },
          {
            href: `${LENS_BASE}/dashboard`,
            label: "Dashboard",
            icon: LayoutDashboard,
          },
          { href: `${LENS_BASE}/reports`, label: "Reports", icon: FileText },
          { href: `${LENS_BASE}/integrations`, label: "Integrations", icon: Plug },
        ];

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface px-4 py-6 lg:flex">
      <Link
        href={portal && portalClientId ? `${LENS_BASE}/clients/` + portalClientId : `${LENS_BASE}/clients`}
        className="px-3"
      >
        <span className="block text-2xl font-black tracking-tight">
          Socieas<span className="text-brand">.</span>
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-muted">
          <Telescope className="h-3.5 w-3.5 text-brand" />
          Lens — Growth Intelligence
        </span>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== `${LENS_BASE}/dashboard` && pathname.startsWith(href));
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

      {portal ? null : (
       <Link
  href={`${LENS_BASE}/settings`}
  className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted transition hover:bg-raised hover:text-ink"
>
  <Settings className="h-4 w-4" />
  Workspace settings
</Link>
      )}
    </aside>
  );
}