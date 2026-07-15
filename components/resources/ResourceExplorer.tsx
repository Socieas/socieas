"use client";

// components/resources/ResourceExplorer.tsx
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Resource, ResourceCategory } from "@/types/resource";
import { categories } from "@/data/resources";

const typeBadge: Record<string, string> = {
  Checklist: "✅ Checklist",
  "Swipe File": "🧲 Swipe File",
  Worksheet: "📝 Worksheet",
  "Prompt Pack": "🤖 Prompt Pack",
  Template: "📋 Template",
};

export default function ResourceExplorer({
  resources,
}: {
  resources: Resource[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<"all" | ResourceCategory>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesCategory = active === "all" || r.category === active;
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.promise.toLowerCase().includes(q) ||
        r.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [resources, query, active]);

  return (
    <div>
      {/* SEARCH */}
      <div className="mx-auto max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search systems: LinkedIn, CRM, AI, hiring..."
          className="w-full rounded-[18px] border border-[#E5E7EB] bg-white px-6 py-4 text-[15px] outline-none transition-shadow focus:shadow-[0_10px_40px_rgba(124,58,237,0.12)]"
        />
      </div>

      {/* CATEGORY PILLS */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
            active === "all"
              ? "bg-violet-600 text-white shadow-lg"
              : "border border-black/5 bg-white text-slate-600 hover:border-violet-200"
          }`}
        >
          All Systems
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActive(c.slug)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              active === c.slug
                ? "bg-violet-600 text-white shadow-lg"
                : "border border-black/5 bg-white text-slate-600 hover:border-violet-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <div className="mt-16 rounded-[24px] border border-black/5 bg-white p-12 text-center">
          <p className="text-lg font-bold text-[#111111]">
            No systems match that search.
          </p>
          <p className="mt-2 text-slate-600">
            Try a broader term, or pick a category above.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Link
              key={r.slug}
              href={`/resources/${r.slug}`}
              className="group flex flex-col rounded-[24px] border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                  {categories.find((c) => c.slug === r.category)?.label}
                </span>
                <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-semibold text-slate-600">
                  ⏱ {r.time}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-black leading-snug tracking-tight text-[#111111]">
                {r.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                {r.promise}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-5">
                <span className="text-xs font-semibold text-slate-500">
                  {typeBadge[r.type]}
                </span>
                <span className="text-sm font-bold text-violet-600 transition-transform duration-300 group-hover:translate-x-1">
                  Get it free →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
