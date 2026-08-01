"use client";

import { usePathname, useRouter } from "next/navigation";

export function ClientSwitcher({
  clients,
  selectedId,
  extraQuery,
}: {
  clients: { id: string; name: string }[];
  selectedId: string;
  extraQuery?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  if (clients.length <= 1) return null;

  return (
    <select
      value={selectedId}
      onChange={(e) => {
        router.push(pathname + "?client=" + e.target.value + (extraQuery ?? ""));
      }}
      className="rounded-xl border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-brand print:hidden"
    >
      {clients.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}