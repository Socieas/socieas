import FadeUp from "./FadeUp";

export default function ServicesJourney() {
  return (
    <FadeUp>

      <section className="relative overflow-hidden bg-[var(--surface)] py-24">

        {/* GLOW */}
        <div className="absolute left-[-120px] top-[20%] h-[300px] w-[300px] rounded-full bg-violet-200/30 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-6">

          {/* TOP */}
          <div className="max-w-4xl">

            <div className="text-sm uppercase tracking-[0.25em] text-violet-600">

              Growth Ecosystem

            </div>

            <h2 className="mt-8 text-5xl font-bold leading-[1.02] text-[var(--text)] md:text-6xl">

              Visibility alone doesn’t scale businesses.

            </h2>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[var(--muted)]">

              Modern founder growth happens when branding,
              infrastructure, systems, and automation work together.

            </p>

          </div>

          {/* JOURNEY */}
          <div className="mt-24 space-y-16">

            {/* STEP 1 */}
            <div className="grid gap-10 lg:grid-cols-[0.3fr_1fr]">

              <div>

                <div className="text-6xl font-bold text-violet-200">

                  01

                </div>

              </div>

              <div className="hover-card rounded-[40px] border border-[var(--border)] bg-[var(--soft-surface)] p-10 shadow-[0_20px_60px_rgba(124,58,237,0.06)]">

                <div className="flex flex-wrap items-center justify-between gap-6">

                  <div>

                    <div className="text-sm uppercase tracking-[0.2em] text-violet-600">

                      Personal Branding

                    </div>

                    <h3 className="mt-5 text-4xl font-semibold text-[var(--text)]">

                      Build attention and founder authority.

                    </h3>

                  </div>

                  <div className="text-5xl">
                    ✦
                  </div>

                </div>

                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">

                  Strategic content and positioning help founders
                  become recognizable, trusted, and consistently visible online.

                </p>

              </div>

            </div>

            {/* STEP 2 */}
            <div className="grid gap-10 lg:grid-cols-[0.3fr_1fr]">

              <div>

                <div className="text-6xl font-bold text-violet-200">

                  02

                </div>

              </div>

              <div className="hover-card rounded-[40px] bg-gradient-to-br from-[#7C3AED]
to-[#A78BFA]-600 to-violet-400 p-10 text-white shadow-[0_25px_60px_rgba(124,58,237,0.2)]">

                <div className="flex flex-wrap items-center justify-between gap-6">

                  <div>

                    <div className="text-sm uppercase tracking-[0.2em] text-violet-100">

                      CRM Infrastructure

                    </div>

                    <h3 className="mt-5 text-4xl font-semibold">

                      Convert audience attention into organized leads.

                    </h3>

                  </div>

                  <div className="text-5xl">
                    ⚡
                  </div>

                </div>

                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-violet-100">

                  Lead systems, pipelines, and automation ensure
                  visibility turns into real business opportunities.

                </p>

              </div>

            </div>

            {/* STEP 3 */}
            <div className="grid gap-10 lg:grid-cols-[0.3fr_1fr]">

              <div>

                <div className="text-6xl font-bold text-violet-200">

                  03

                </div>

              </div>

              <div className="hover-card rounded-[40px] border border-[var(--border)] bg-[var(--surface)] p-10 shadow-[0_20px_60px_rgba(124,58,237,0.06)]">

                <div className="flex flex-wrap items-center justify-between gap-6">

                  <div>

                    <div className="text-sm uppercase tracking-[0.2em] text-violet-600">

                      AI Automation

                    </div>

                    <h3 className="mt-5 text-4xl font-semibold text-[var(--text)]">

                      Reduce repetitive work and scale operations.

                    </h3>

                  </div>

                  <div className="text-5xl">
                    🤖
                  </div>

                </div>

                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">

                  Automated workflows improve speed,
                  consistency, follow-ups, and operational efficiency.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </FadeUp>
  );
}