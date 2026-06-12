"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

export default function EditorialTimeline() {
  const [activeTab, setActiveTab] = useState(0);

  const content = [
    {
      step: "01",
      title: "Visibility",
      description:
        "Consistent founder content creates recognition before conversations ever begin.",

      visual: (
        <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">

          {/* LinkedIn Header */}
          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A66C2] text-xl font-bold text-white">
              in
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#111111]">
                LinkedIn Presence
              </h3>

              <p className="text-sm text-slate-500">
                Founder Personal Brand
              </p>
            </div>

          </div>

          {/* Analytics */}
          <div className="mt-10 grid grid-cols-3 gap-4">

            <div className="rounded-2xl bg-[#F8F8F6] p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Reach
              </p>

              <p className="mt-2 text-2xl font-black text-[#111111]">
                10M+
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F8F6] p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Posts
              </p>

              <p className="mt-2 text-2xl font-black text-[#111111]">
                500+
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F8F6] p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Growth
              </p>

              <p className="mt-2 text-2xl font-black text-violet-700">
                ↑ 340%
              </p>
            </div>

          </div>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Showing up consistently makes your expertise easier to discover and
            remember.
          </p>

        </div>
      ),
    },

    {
      step: "02",
      title: "Familiarity",
      description:
        "People trust founders they repeatedly encounter across different touchpoints.",

      visual: (
        <div className="rounded-[36px] border border-violet-200 bg-violet-50 p-8">

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
            Content Ecosystem
          </p>

          <h3 className="mt-6 text-3xl font-black text-[#111111]">
            One message.
            <br />
            Multiple platforms.
          </h3>

          <div className="mt-8 grid grid-cols-2 gap-4">

            {[
              "LinkedIn",
              "Instagram",
              "YouTube",
              "Website",
              "Newsletter",
              "Google",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-violet-200 bg-white px-5 py-4 text-center font-semibold text-slate-700"
              >
                {item}
              </div>
            ))}

          </div>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Familiarity grows when audiences repeatedly see consistent,
            high-quality content.
          </p>

        </div>
      ),
    },

    {
      step: "03",
      title: "Authority",
      description:
        "Visibility evolves into trust, and trust becomes long-term business growth.",

      visual: (
        <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
            Compounding Effect
          </p>

          <div className="mt-8 space-y-4">

            <div className="rounded-2xl bg-[#F8F8F6] px-6 py-5 font-semibold text-[#111111]">
              Visibility → Recognition
            </div>

            <div className="rounded-2xl bg-[#F8F8F6] px-6 py-5 font-semibold text-[#111111]">
              Recognition → Trust
            </div>

            <div className="rounded-2xl bg-[#F8F8F6] px-6 py-5 font-semibold text-[#111111]">
              Trust → Inbound Opportunities
            </div>

            <div className="rounded-2xl bg-violet-600 px-6 py-5 font-semibold text-white">
              Authority → Sustainable Growth
            </div>

          </div>

        </div>
      ),
    },
  ];

  return (
    <FadeUp>
      <section className="bg-[#F8F8F6] py-20 md:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-4xl">

            <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
              Visibility becomes
              <br />
              familiarity.
              <br />
              Familiarity becomes trust.
            </h2>

          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[420px_1fr]">

            {/* Left Navigation */}
            <div className="space-y-5">

              {content.map((item, index) => (
                <button
                  key={item.step}
                  onClick={() => setActiveTab(index)}
                  className={`w-full rounded-[30px] border p-7 text-left transition-all duration-300 ${
                    activeTab === index
                      ? "border-violet-300 bg-white shadow-xl"
                      : "border-slate-200 bg-white hover:border-violet-200"
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                    Step {item.step}
                  </p>

                  <h3 className="mt-4 text-3xl font-black text-[#111111]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-lg leading-7 text-slate-600">
                    {item.description}
                  </p>
                </button>
              ))}

            </div>

            {/* Right Panel */}
            <div>
              {content[activeTab].visual}
            </div>

          </div>

        </div>

      </section>
    </FadeUp>
  );
}