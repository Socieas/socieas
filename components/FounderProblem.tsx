import Image from "next/image";
import FadeUp from "./FadeUp";

export default function FounderProblem() {
  return (
    <FadeUp>
      <section className="bg-[var(--surface)] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Top Content */}
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            {/* Left */}
            <div>
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                The Visibility Problem
              </div>

              <h2 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-[#111111] md:text-6xl">
                The internet rewards positioning before capability.
              </h2>
            </div>

            {/* Right */}
            <div className="flex items-center">
              <div className="max-w-xl space-y-4 text-lg leading-8 text-slate-600 md:text-xl">
                <p>
                  Great founders get ignored every day because visibility is
                  treated as optional.
                </p>
                <p>
                  Growth is no longer just about building a better product. It
                  is about becoming impossible to ignore.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative mt-14">
            {/* Glow */}
            <div className="absolute inset-0 rounded-[40px] bg-violet-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-black shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
              <Image
                src="/images/home/visibility-compoundsv2.webp"
                alt="How founder visibility compounds over time"
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
