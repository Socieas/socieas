import Link from "next/link";

export default function InsightsPreview() {
  return (
    <section className="bg-[#F7F7F5] py-24 md:py-32">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* TOP */}
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

          <div className="max-w-4xl">

            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              Founder Insights
            </div>

            <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
              Ideas shaping modern founder visibility.
            </h2>

          </div>

          {/* BUTTON */}
          <Link
            href="/insights/articles"
            className="inline-flex items-center justify-center rounded-2xl bg-[#111111] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-[0_20px_50px_rgba(15,23,42,0.18)]"
          >
            Explore All Articles
          </Link>

        </div>

        {/* CARDS */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {/* CARD 1 */}
          <div className="hover-card group rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_15px_50px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(15,23,42,0.08)]">

            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
              Personal Branding
            </div>

            <h3 className="mt-6 text-3xl font-black leading-tight text-[#111111]">
              Why founders with strong positioning grow faster online.
            </h3>

            <p className="mt-6 leading-8 text-slate-600">
              Visibility compounds trust,
              opportunities, and inbound leverage.
            </p>

            <div className="mt-10 h-[3px] w-24 rounded-full bg-violet-500" />

          </div>

          {/* UPDATED CARD 2 */}
          <div className="group relative overflow-hidden rounded-[36px] border border-violet-100 bg-[#F6F0FF] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(124,58,237,0.14)]">

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-100/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
                  Attention Economy
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <span className="text-3xl">
                    ⚡
                  </span>
                </div>

              </div>

              <h3 className="mt-8 text-3xl font-black leading-tight text-[#111111]">
                The internet rewards consistency more than talent.
              </h3>

              <p className="mt-6 leading-8 text-slate-600">
                Repetition creates familiarity.
                Familiarity creates trust.
              </p>

              <div className="mt-10 flex gap-3">

                <div className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
                  Visibility
                </div>

                <div className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
                  Trust
                </div>

              </div>

            </div>

          </div>

          {/* UPDATED CARD 3 */}
          <div className="group relative overflow-hidden rounded-[36px] bg-[#070B14] p-8 shadow-[0_20px_80px_rgba(2,6,23,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_100px_rgba(2,6,23,0.45)]">

            {/* Glow */}
            <div className="pointer-events-none absolute inset-0">

              <div className="absolute bottom-[-100px] right-[-100px] h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

            </div>

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="text-sm font-semibold uppercase tracking-[0.2em] !text-violet-300">
                  Founder Growth
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="text-3xl">
                    🚀
                  </span>
                </div>

              </div>

              <h3 className="mt-8 text-3xl font-black leading-tight !text-white">
                Strong brands reduce acquisition friction dramatically.
              </h3>

              <p className="mt-6 leading-8 !text-slate-300">
                Modern growth is increasingly trust-driven.
              </p>

              <div className="mt-10 h-[3px] w-24 rounded-full bg-violet-500" />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}