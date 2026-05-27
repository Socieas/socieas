import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-[var(--surface)] py-24 md:py-32">

      <div className="mx-auto max-w-5xl px-6 text-center">

        {/* LABEL */}
        <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
          Build Your Presence
        </div>

        {/* HEADING */}
        <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
          Strong founder brands
          <br />
          create long-term leverage.
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-slate-600">
          Visibility compounds trust.
          <br />
          Trust compounds growth.
        </p>

        {/* BUTTON */}
        <Link
          href="/contact"
          className="inline-flex items-center justify-center mt-12 rounded-2xl bg-violet-600 px-10 py-5 text-lg font-semibold text-white shadow-[0_20px_50px_rgba(124,58,237,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-[0_30px_70px_rgba(124,58,237,0.24)]"
        >
          Book a Strategy Call
        </Link>

      </div>

    </section>
  );
}