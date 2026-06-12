import FadeUp from "./FadeUp";

export default function InfrastructureGrid() {
  return (
    <FadeUp>

      <section className="bg-[var(--soft-surface)] py-24">

        <div className="mx-auto max-w-7xl px-6">

          {/* TOP */}
          <div className="max-w-4xl">

            <div className="text-sm uppercase tracking-[0.25em] text-violet-600">

              Infrastructure Layer

            </div>

            <h2 className="mt-8 text-5xl font-bold leading-[1.02] text-[var(--text)] md:text-6xl">

              Every growth system
              should work together.

            </h2>

          </div>

          {/* GRID */}
          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            {/* CARD */}
            <div className="hover-card rounded-[36px] bg-[var(--surface)] p-8 shadow-[var(--card-shadow)]">

              <div className="text-5xl">
                🌐
              </div>

              <h3 className="mt-8 text-3xl font-semibold text-[var(--text)]">

                Website Systems

              </h3>

              <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">

                High-conversion websites designed for positioning and lead flow.

              </p>

            </div>

            {/* CARD */}
            <div className="hover-card rounded-[36px] bg-gradient-to-br from-[#7C3AED]
to-[#A78BFA]-600 to-violet-400 p-8 text-white shadow-[0_25px_60px_rgba(124,58,237,0.2)]">

              <div className="text-5xl">
                📈
              </div>

              <h3 className="mt-8 text-3xl font-semibold">

                Content Systems

              </h3>

              <p className="mt-6 text-lg leading-relaxed text-violet-100">

                Consistent strategic content across multiple platforms.

              </p>

            </div>

            {/* CARD */}
            <div className="hover-card rounded-[36px] bg-[var(--surface)] p-8 shadow-[var(--card-shadow)]">

              <div className="text-5xl">
                ⚙️
              </div>

              <h3 className="mt-8 text-3xl font-semibold text-[var(--text)]">

                Automation Flows

              </h3>

              <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">

                Smart operational systems that reduce manual effort and delays.

              </p>

            </div>

          </div>

        </div>

      </section>

    </FadeUp>
  );
}