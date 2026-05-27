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
              when expertise is documented publicly.

            </h2>

          </div>

          {/* GRID */}
          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            {/* ARTICLE */}
            <div className="hover-card rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--card-shadow)]">

              <div className="text-sm uppercase tracking-[0.2em] text-violet-600">

                Recent Article

              </div>

              <h3 className="mt-8 text-3xl font-semibold leading-tight text-[var(--text)]">

                Why founder visibility compounds faster than paid attention.

              </h3>

              <button className="mt-10 text-violet-600 transition hover:opacity-70">

                Read Article →

              </button>

            </div>

            {/* CASE STUDY */}
            <div className="hover-card rounded-[36px] bg-gradient-to-br from-[#7C3AED]
to-[#A78BFA]-600 to-violet-400 p-8 text-white shadow-[0_25px_60px_rgba(124,58,237,0.2)]">

              <div className="text-sm uppercase tracking-[0.2em] text-violet-100">

                Case Study

              </div>

              <h3 className="mt-8 text-3xl font-semibold leading-tight">

                How positioning transformed inbound lead quality.

              </h3>

              <button className="mt-10 transition hover:opacity-70">

                View Case Study →

              </button>

            </div>

            {/* BLOG */}
            <div className="hover-card rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--card-shadow)]">

              <div className="text-sm uppercase tracking-[0.2em] text-violet-600">

                Founder Insights

              </div>

              <h3 className="mt-8 text-3xl font-semibold leading-tight text-[var(--text)]">

                Building trust through strategic digital presence.

              </h3>

              <button className="mt-10 text-violet-600 transition hover:opacity-70">

                Explore Insights →

              </button>

            </div>

          </div>

        </div>

      </section>

    </FadeUp>
  );
}