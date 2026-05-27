import FadeUp from "./FadeUp";

export default function BrandFlywheel() {
  return (
    <FadeUp>
      <section className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32">

        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute right-[-120px] top-[10%] h-[320px] w-[320px] rounded-full bg-violet-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* TOP */}
          <div className="max-w-5xl">

            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              Growth Flywheel
            </div>

            <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
              Visibility compounds
              <br />
              faster when systems
              <br />
              work together.
            </h2>

          </div>

          {/* MAIN LAYOUT */}
          <div className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              {/* BLOCK 1 */}
              <div className="hover-card rounded-[36px] border border-slate-200 bg-[var(--soft-surface)] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)]">

                <div className="flex items-center justify-between">

                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                    Step 01
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
                    <span className="text-3xl">
                      ✍️
                    </span>
                  </div>

                </div>

                <h3 className="mt-8 text-3xl font-black leading-tight text-[#111111]">
                  Strategic content attracts attention.
                </h3>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                  Strong ideas consistently placed in front of the right audience
                  create visibility momentum.
                </p>

                <div className="mt-8 h-[3px] w-24 rounded-full bg-violet-500" />

              </div>

              {/* BLOCK 2 */}
              <div className="hover-card rounded-[36px] border border-violet-100 bg-[#F6F0FF] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(124,58,237,0.12)]">

                <div className="flex items-center justify-between">

                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
                    Step 02
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <span className="text-3xl">
                      🚀
                    </span>
                  </div>

                </div>

                <h3 className="mt-8 text-3xl font-black leading-tight text-[#111111]">
                  Visibility creates familiarity and trust.
                </h3>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                  Repeated exposure changes how founders are perceived online,
                  making trust easier to establish before conversations even begin.
                </p>

                <div className="mt-8 h-[3px] w-24 rounded-full bg-violet-500" />

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-8">

              {/* BLOCK 3 */}
              <div className="hover-card rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)]">

                <div className="flex items-center justify-between">

                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                    Step 03
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
                    <span className="text-3xl">
                      👀
                    </span>
                  </div>

                </div>

                <h3 className="mt-8 text-3xl font-black leading-tight text-[#111111]">
                  Positioning increases perceived authority.
                </h3>

                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  Strong positioning lowers trust friction dramatically.
                </p>

                <div className="mt-8 h-[3px] w-24 rounded-full bg-violet-500" />

              </div>

              {/* BLOCK 4 */}
              <div className="hover-card rounded-[36px] border border-violet-100 bg-violet-50 p-8 shadow-[0_20px_50px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(124,58,237,0.10)]">

                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
                  Momentum Loop
                </div>

                <div className="mt-10 space-y-5">

                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <span className="font-semibold text-[#111111]">
                      Content → Visibility
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <span className="font-semibold text-[#111111]">
                      Visibility → Trust
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <span className="font-semibold text-[#111111]">
                      Trust → Inbound Growth
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
    </FadeUp>
  );
}