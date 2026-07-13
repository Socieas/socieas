import Image from "next/image";
import FadeUp from "./FadeUp";

const pains = [
  {
    icon: "🫥",
    title: "Invisible",
    line: "You do great work. Nobody sees it.",
  },
  {
    icon: "🔁",
    title: "Inconsistent",
    line: "You post sometimes. Momentum dies.",
  },
  {
    icon: "🐢",
    title: "Referral Dependent",
    line: "Word of mouth only goes so far.",
  },
];

export default function FounderProblem() {
  return (
    <FadeUp>
      <section className="bg-[var(--surface)] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              The Hard Truth
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Being great is not enough.{" "}
              <span className="text-violet-700">Being seen is.</span>
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {pains.map((pain) => (
              <div
                key={pain.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <div className="text-4xl">{pain.icon}</div>
                <h3 className="mt-3 text-xl font-black text-[#111111]">
                  {pain.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">{pain.line}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-10">
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
