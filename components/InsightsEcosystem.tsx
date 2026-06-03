import Link from "next/link";
import FadeUp from "./FadeUp";

export default function InsightsEcosystem() {
  return (
    <FadeUp>
      <section className="bg-[var(--soft-surface)] py-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* TOP */}
          <div className="max-w-5xl">
            <div className="text-sm uppercase tracking-[0.25em] text-violet-600">
              Insights Ecosystem
            </div>
            <h2 className="mt-8 text-5xl font-bold leading-[1.02] text-[var(--text)] md:text-6xl">
              Visibility grows faster
              <br />
              when expertise is documented publicly.
            </h2>
          </div>

          {/* GRID */}
          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            {/* ARTICLE CARD */}
            <div className="hover-card rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--card-shadow)] flex flex-col justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-violet-600">
                  Recent Article
                </div>
                <h3 className="mt-8 text-3xl font-semibold leading-tight text-[var(--text)]">
                  Why founder visibility compounds faster than paid attention.
                </h3>
              </div>
              <Link
                href="/insights/articles"
                className="mt-10 inline-flex items-center gap-2 text-violet-600 font-semibold transition hover:opacity-70"
              >
                Read Article →
              </Link>
            </div>

            {/* CASE STUDY CARD */}
            <div className="hover-card rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--card-shadow)] flex flex-col justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-violet-600">
                  Case Study
                </div>
                <h3 className="mt-8 text-3xl font-semibold leading-tight text-[var(--text)]">
                  How positioning transformed inbound lead quality for a B2B founder.
                </h3>
              </div>
              <Link
                href="/insights/case-studies"
                className="mt-10 inline-flex items-center gap-2 text-violet-600 font-semibold transition hover:opacity-70"
              >
                View Case Study →
              </Link>
            </div>

            {/* BLOG / CTA CARD */}
            <div className="hover-card rounded-[36px] bg-violet-600 p-8 text-white flex flex-col justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-violet-200">
                  Explore All
                </div>
                <h3 className="mt-8 text-3xl font-semibold leading-tight">
                  Blogs, articles, and case studies — all in one place.
                </h3>
              </div>
              <Link
                href="/insights"
                className="mt-10 inline-flex items-center justify-center rounded-2xl bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                Explore Insights
              </Link>
            </div>

          </div>
        </div>
      </section>
    </FadeUp>
  );
}
