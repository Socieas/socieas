import FadeUp from "./FadeUp";

export default function StickyStory() {
  return (
    <FadeUp>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F7F5] to-white py-24 md:py-32">

        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute left-[-120px] top-[10%] h-[300px] w-[300px] rounded-full bg-violet-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* TOP */}
          <div className="max-w-5xl">

            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              Modern Founder Reality
            </div>

            <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
              The internet rewards
              <br />
              founders people remember.
            </h2>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-600">
              Visibility influences trust before conversations begin.
              Strong positioning compounds faster than most founders realize.
            </p>

          </div>

          {/* CONTENT */}
          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            {/* CARD 1 */}
            <div className="hover-card rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)]">

              <div className="flex items-center justify-between">

                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                  Visibility
                </div>

                <div className="text-3xl text-violet-300">
                  ✦
                </div>

              </div>

              <h3 className="mt-8 text-3xl font-black leading-tight text-[#111111]">
                People trust
                what they repeatedly see.
              </h3>

              <div className="mt-10 space-y-3">

                <div className="h-3 rounded-full bg-violet-100" />

                <div className="h-3 w-[85%] rounded-full bg-violet-200" />

                <div className="h-3 w-[65%] rounded-full bg-violet-300" />

              </div>

            </div>

            {/* UPDATED CARD 2 */}
            <div className="group relative overflow-hidden rounded-[36px] border border-violet-100 bg-[#F6F0FF] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(124,58,237,0.14)]">

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100/60 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
                    Positioning
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <span className="text-3xl">
                      🚀
                    </span>
                  </div>

                </div>

                <h3 className="mt-8 text-4xl font-black leading-tight text-[#111111]">
                  Strong positioning lowers acquisition friction.
                </h3>

                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  Familiarity creates trust.
                  Trust creates inbound leverage.
                </p>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-3">

                  <div className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
                    Authority
                  </div>

                  <div className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
                    Trust
                  </div>

                  <div className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
                    Growth
                  </div>

                </div>

                {/* Accent Line */}
                <div className="mt-10 h-[3px] w-24 rounded-full bg-violet-500" />

              </div>

            </div>

            {/* CARD 3 */}
            <div className="hover-card rounded-[36px] border border-slate-200 bg-[var(--soft-surface)] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)]">

              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                Momentum Loop
              </div>

              <div className="mt-10 space-y-5">

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <span className="font-semibold text-[#111111]">
                    Content → Attention
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <span className="font-semibold text-[#111111]">
                    Attention → Familiarity
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <span className="font-semibold text-[#111111]">
                    Familiarity → Inbound Growth
                  </span>
                </div>

              </div>

              <div className="mt-10 text-5xl font-black text-violet-600">
                +340%
              </div>

            </div>

          </div>

        </div>
      </section>
    </FadeUp>
  );
}