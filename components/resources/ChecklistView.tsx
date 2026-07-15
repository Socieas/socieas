"use client";

// components/resources/ChecklistView.tsx
import { useMemo, useState } from "react";
import type { ResourceContent } from "@/data/resource-content";

export default function ChecklistView({
  content,
}: {
  content: ResourceContent;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const total = useMemo(
    () =>
      content.sections.reduce(
        (n, s) => n + (s.checklist ? s.checklist.length : 0),
        0
      ),
    [content]
  );
  const done = Object.values(checked).filter(Boolean).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div>
      {/* PROGRESS BAR */}
      {total > 0 && (
        <div className="sticky top-20 z-10 rounded-[20px] border border-violet-100 bg-white/90 p-5 shadow-sm backdrop-blur print:hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#111111]">
              Your progress: {done} of {total}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-violet-600">
                {percent}%
              </span>
              <button
                onClick={() => window.print()}
                className="rounded-full border border-violet-200 bg-white px-4 py-1.5 text-xs font-semibold text-violet-700 transition-colors hover:bg-violet-50"
              >
                🖨 Save as PDF
              </button>
            </div>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-violet-100">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}

      {/* INTRO */}
      <div className="mt-10 space-y-4">
        {content.intro.map((p) => (
          <p key={p} className="text-lg leading-8 text-slate-600">
            {p}
          </p>
        ))}
      </div>

      {/* SECTIONS */}
      {content.sections.map((section, sIndex) => (
        <section key={section.title} className="mt-12">
          <h2 className="text-2xl font-black tracking-tight text-[#111111] md:text-3xl">
            {section.title}
          </h2>

          {section.intro && (
            <p className="mt-3 text-lg leading-8 text-slate-600">
              {section.intro}
            </p>
          )}

          {section.numbered && (
            <ol className="mt-5 space-y-3">
              {section.numbered.map((item, i) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-black text-violet-700">
                    {i + 1}
                  </span>
                  <p className="pt-1 leading-7 text-slate-700">{item}</p>
                </li>
              ))}
            </ol>
          )}

          {section.checklist && (
            <div className="mt-6 space-y-3">
              {section.checklist.map((item, i) => {
                const key = `${sIndex}-${i}`;
                const isChecked = Boolean(checked[key]);
                return (
                  <button
                    key={item.title}
                    onClick={() => toggle(key)}
                    className={`block w-full rounded-[20px] border p-6 text-left transition-all duration-200 ${
                      isChecked
                        ? "border-violet-300 bg-violet-50"
                        : "border-black/5 bg-white hover:border-violet-200"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors ${
                          isChecked
                            ? "border-violet-600 bg-violet-600 text-white"
                            : "border-slate-300 bg-white text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <div>
                        <h3
                          className={`text-lg font-bold ${
                            isChecked
                              ? "text-violet-900 line-through decoration-violet-300"
                              : "text-[#111111]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-1.5 leading-7 text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      ))}

      {/* SCORING */}
      {content.scoring && (
        <section className="mt-14 rounded-[28px] border border-violet-100 bg-white p-8 md:p-10">
          <h2 className="text-2xl font-black tracking-tight text-[#111111] md:text-3xl">
            {content.scoring.title}
          </h2>
          <p className="mt-3 text-lg text-slate-600">{content.scoring.intro}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.scoring.bands.map((band) => (
              <div
                key={band.label}
                className="rounded-[20px] bg-violet-50 p-6"
              >
                <div className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
                  {band.range}
                </div>
                <h3 className="mt-2 text-xl font-black text-[#111111]">
                  {band.label}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">{band.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
