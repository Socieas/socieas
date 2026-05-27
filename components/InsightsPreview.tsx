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
            <h2 className="mt-8 text-6xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111]">
              Ideas shaping modern founder visibility.
            </h2>
          </div>

          {/* CTA BUTTON */}
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
          <Link
            href="/insights/articles"
            className="hover-card group rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_15px_50px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(15,23,42,0.08)]"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
              Personal Branding
            </div>
            <h3 className="mt-6 text-3xl font-black leading-tight text-[#111111]">
              Why founders with strong positioning grow faster online.
            </h3>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Visibility compounds trust, opportunities, and inbound leverage.
            </p>
            <div className="mt-8 text-sm font-semibold text-violet-600 group-hover:underline">
              Read Article →
            </div>
          </Link>

          {/* CARD 2 */}
          <Link
            href="/insights/blogs"
            className="hover-card group rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_15px_50px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(15,23,42,0.08)]"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
              Attention Economy
            </div>
            <div className="mt-6 text-4xl">⚡</div>
            <h3 className="mt-4 text-3xl font-black leading-tight text-[#111111]">
              The internet rewards consistency more than talent.
            </h3>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Repetition creates familiarity. Familiarity creates trust.
            </p>
            <div className="mt-8 text-sm font-semibold text-violet-600 group-hover:underline">
              Read Blog →
            </div>
          </Link>

          {/* CARD 3 */}
          <Link
            href="/insights/case-studies"
            className="hover-card group rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_15px_50px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(15,23,42,0.08)]"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
              Founder Growth
            </div>
            <div className="mt-6 text-4xl">🚀</div>
            <h3 className="mt-4 text-3xl font-black leading-tight text-[#111111]">
              Strong brands reduce acquisition friction dramatically.
            </h3>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Modern growth is increasingly trust-driven.
            </p>
            <div className="mt-8 text-sm font-semibold text-violet-600 group-hover:underline">
              View Case Study →
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
