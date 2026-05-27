"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

export default function EditorialTimeline() {

  const [activeTab, setActiveTab] = useState(0);

  const content = [
    {
      title: "Visibility",
      description:
        "Strategic content attracts consistent attention from the right audience.",

      visual: (
        <div className="rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.08)]">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0077B5] text-white font-bold">

              in

            </div>

            <div>

              <div className="font-semibold text-[var(--text)]">

                LinkedIn Presence

              </div>

              <div className="text-sm text-gray-500">

                Founder Authority

              </div>

            </div>

          </div>

          <div className="mt-10 space-y-4">

            <div className="h-3 rounded-full bg-violet-100"></div>

            <div className="h-3 w-[85%] rounded-full bg-violet-200"></div>

            <div className="h-3 w-[65%] rounded-full bg-violet-300"></div>

          </div>

          <div className="mt-10 text-lg leading-relaxed text-[var(--muted)]">

            Consistent visibility increases recognition across decision-makers.

          </div>

        </div>
      ),
    },

    {
      title: "Familiarity",
      description:
        "Repeated exposure builds trust naturally over time.",

      visual: (
        <div className="rounded-[36px] bg-gradient-to-br from-[#7C3AED]
to-[#A78BFA]-600 to-violet-400 p-8 text-white shadow-[0_25px_60px_rgba(124,58,237,0.18)]">

          <div className="text-sm uppercase tracking-[0.2em] text-violet-100">

            Content Ecosystem

          </div>

          <h3 className="mt-8 text-3xl font-semibold leading-tight">

            Strong founders stay visible across platforms.

          </h3>

          <div className="mt-10 flex flex-wrap gap-3">

            <div className="rounded-full bg-[var(--surface)]/20 px-4 py-2 text-sm">

              Instagram

            </div>

            <div className="rounded-full bg-[var(--surface)]/20 px-4 py-2 text-sm">

              LinkedIn

            </div>

            <div className="rounded-full bg-[var(--surface)]/20 px-4 py-2 text-sm">

              YouTube

            </div>

          </div>

          <p className="mt-10 text-violet-100 leading-relaxed">

            Familiarity compounds when audiences repeatedly see valuable content.

          </p>

        </div>
      ),
    },

    {
      title: "Authority",
      description:
        "Positioning changes how expertise is perceived online.",

      visual: (
        <div className="rounded-[36px] border border-[var(--border)] bg-violet-50 p-8 shadow-[0_20px_50px_rgba(124,58,237,0.08)]">

          <div className="text-sm uppercase tracking-[0.2em] text-violet-600">

            Positioning Loop

          </div>

          <div className="mt-10 space-y-5">

            <div className="rounded-2xl bg-[var(--surface)] px-5 py-4 shadow-sm">

              Expertise → Visibility

            </div>

            <div className="rounded-2xl bg-[var(--surface)] px-5 py-4 shadow-sm">

              Visibility → Trust

            </div>

            <div className="rounded-2xl bg-[var(--surface)] px-5 py-4 shadow-sm">

              Trust → Inbound Opportunities

            </div>

          </div>

          <p className="mt-10 leading-relaxed text-[var(--muted)]">

            Strong positioning reduces acquisition friction dramatically.

          </p>

        </div>
      ),
    },
  ];

  return (
    <FadeUp>

      <section className="bg-[var(--surface)] py-24 overflow-hidden">

        <div className="mx-auto max-w-7xl px-6">

          {/* TOP */}
          <div className="max-w-4xl">

            <div className="text-sm uppercase tracking-[0.25em] text-violet-600">

              Founder Momentum

            </div>

            <h2 className="mt-8 text-5xl font-bold leading-[1.05] text-[var(--text)] md:text-6xl">

              Strong brands compound trust over time.

            </h2>

          </div>

          {/* CONTENT */}
          <div className="mt-20 grid gap-16 lg:grid-cols-[0.8fr_1fr]">

            {/* LEFT */}
            <div className="space-y-6">

              {content.map((item, index) => (

                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-full rounded-[28px] border p-8 text-left transition-all duration-300 ${
                    activeTab === index
                      ? "border-violet-300 bg-violet-50 shadow-lg"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-violet-200"
                  }`}
                >

                  <div className="text-sm uppercase tracking-[0.2em] text-violet-600">

                    Step 0{index + 1}

                  </div>

                  <h3 className="mt-5 text-3xl font-semibold text-[var(--text)]">

                    {item.title}

                  </h3>

                  <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">

                    {item.description}

                  </p>

                </button>

              ))}

            </div>

            {/* RIGHT */}
            <div className="flex items-center">

              <div className="w-full transition-all duration-500">

                {content[activeTab].visual}

              </div>

            </div>

          </div>

        </div>

      </section>

    </FadeUp>
  );
}