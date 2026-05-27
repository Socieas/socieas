import Link from "next/link";
import FadeUp from "./FadeUp";

export default function Hero() {
  return (
    <FadeUp>
      <section
        id="home"
        className="relative overflow-hidden bg-[#F8F8F6] pt-24 pb-20 sm:pt-28 sm:pb-24"
      >
        {/* Background Accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-120px] top-[-90px] h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />

          <div className="absolute right-[-100px] top-1/3 h-80 w-80 rounded-full bg-fuchsia-100/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            {/* LEFT CONTENT */}
            <div className="max-w-2xl">
              {/* Label */}
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                Founder Visibility Systems
              </div>

              {/* Heading */}
              <h1 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-[#111111] sm:text-6xl lg:text-7xl">
                Build authority before people ever book a call.
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Socieas helps founders grow through strategic positioning,
                personal branding, and modern content systems that create trust,
                visibility, and inbound demand.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-7 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(109,40,217,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
                >
                  Build Your Brand
                </Link>

                <Link
                  href="/insights"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50"
                >
                  Explore Insights
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-14 grid grid-cols-1 gap-5 border-t border-slate-200 pt-8 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-3xl font-black tracking-tight text-[#111111]">
                    50+
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Brands scaled
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-3xl font-black tracking-tight text-[#111111]">
                    10M+
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Organic reach
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-3xl font-black tracking-tight text-[#111111]">
                    3X
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Visibility growth
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="relative">
              <div className="rounded-[36px] border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.06)] sm:p-6 lg:p-7">
                {/* Main Card */}
                <div className="rounded-[30px] border border-violet-100 bg-[#F6F0FF] p-8 sm:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-600">
                    Founder Authority
                  </p>

                  <h3 className="mt-5 text-5xl font-black tracking-tight text-[#111111] sm:text-6xl">
                    +340%
                  </h3>

                  <p className="mt-6 max-w-sm text-base leading-7 text-slate-600 sm:text-lg">
                    Strategic positioning builds trust, sharpens brand
                    perception, and increases qualified inbound demand.
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-violet-100">
                    <div className="h-full w-[78%] rounded-full bg-violet-600" />
                  </div>
                </div>

                {/* Bottom Cards */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {/* Card 1 */}
                  <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                    <h4 className="text-3xl font-black tracking-tight text-[#111111]">
                      24/7
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                      Content systems that keep working even when you are off
                      the call.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-[26px] border border-violet-100 bg-[#FAF7FF] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                    <h4 className="text-3xl font-black tracking-tight text-[#111111]">
                      Systems
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                      Brand, content, and positioning aligned into one growth
                      engine.
                    </p>
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