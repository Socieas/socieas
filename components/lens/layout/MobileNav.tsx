"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Plug, FileText } from "lucide-react";
import { LENS_BASE } from "@/lib/lens/routes";
import { cn } from "@/lib/lens/utils";

export function MobileNav({
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
            label: "Dashboard",
            icon: LayoutDashboard,
          },
          { href: `${LENS_BASE}/reports`, label: "Reports", icon: FileText },
        ]
      : [
          {
            href: `${LENS_BASE}/dashboard`,
            label: "Dashboard",
            icon: LayoutDashboard,
          },
          { href: `${LENS_BASE}/clients`, label: "Clients", icon: Users },
          { href: `${LENS_BASE}/reports`, label: "Reports", icon: FileText },
          { href: `${LENS_BASE}/integrations`, label: "Connect", icon: Plug },
        ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-surface lg:hidden">
      {nav.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href ||
          (href !== `${LENS_BASE}/dashboard` && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
              active ? "text-brand" : "text-muted",
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}