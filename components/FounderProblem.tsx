import Image from "next/image";
import FadeUp from "./FadeUp";

export default function FounderProblem() {
  return (
    <FadeUp>
      <section className="bg-[var(--surface)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Top Content */}
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">

            {/* Left */}
            <div>
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                Founder Visibility Problem
              </div>

              <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
                The internet rewards
                <br />
                positioning before
                <br />
                capability.
              </h2>
            </div>

            {/* Right */}
            <div className="flex items-center">
              <p className="max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
                Great founders are ignored every day because visibility is
                treated as optional.
                <br />
                <br />
                Modern growth is no longer just about building better products.
                <br />
                <br />
                It is about becoming impossible to ignore.
              </p>
            </div>

          </div>

          {/* Featured Image */}
          <div className="relative mt-20">

            {/* Glow */}
            <div className="absolute inset-0 rounded-[40px] bg-violet-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-black shadow-[0_30px_80px_rgba(15,23,42,0.18)]">

              <Image
                src="/images/home/visibility-compoundsv2.webp"
                alt="Visibility Compounds"
                width={1600}
                height={900}
                priority={false}
                className="h-auto w-full object-cover transition duration-700 hover:scale-[1.01]"
              />

            </div>

          </div>

        </div>
      </section>
    </FadeUp>
  );
}

