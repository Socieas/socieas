import FadeUp from "./FadeUp";

export default function FounderProblem() {
  return (
    <FadeUp>
      <section className="bg-[var(--surface)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* TOP CONTENT */}
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">

            {/* LEFT */}
            <div>
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                Founder Visibility Problem
              </div>

              <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
                The internet rewards
                positioning before
                capability.
              </h2>
            </div>

            {/* RIGHT */}
            <div className="flex items-center">
              <p className="max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
                Great founders are ignored every day because
                visibility is treated as optional.

                <br />
                <br />

                Modern growth is no longer just about building
                better products.

                <br />
                <br />

                It&apos;s about becoming impossible to ignore.
              </p>
            </div>
          </div>

          {/* FEATURE PANEL */}
          <div className="relative mt-24 overflow-hidden rounded-[40px] bg-[#070B14] px-8 py-16 shadow-[0_30px_120px_rgba(2,6,23,0.45)] md:px-16 md:py-24">

            {/* Soft Glow */}
            <div className="pointer-events-none absolute inset-0">

              <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

              <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

            </div>

            {/* Content */}
            <div className="relative max-w-5xl">

              {/* Quote */}
              <div className="text-6xl font-black leading-none text-violet-500/30 md:text-7xl">
                &rdquo;
              </div>

              {/* Main Statement */}
              <h3 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] !text-white md:text-6xl">
                Visibility compounds.
                <br />
                Obscurity destroys momentum.
              </h3>

              {/* Accent */}
              <div className="mt-10 h-[3px] w-28 rounded-full bg-violet-500" />

            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}