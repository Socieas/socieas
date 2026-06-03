export default function AttentionEconomy() {
  return (
    <section className="bg-[var(--background)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-24">

          {/* LEFT CONTENT */}
          <div>

            {/* Label */}
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              Modern Attention Economy
            </div>

            {/* Heading */}
            <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] !text-[var(--text)] md:text-6xl">
              The internet has become
              <br />
              a trust distribution system.
            </h2>

            {/* Paragraph */}
            <p className="mt-8 max-w-2xl text-lg leading-8 !text-[var(--muted)] md:text-xl">
              People buy from founders they repeatedly
              see, trust, and remember.

              <br />
              <br />

              Consistent visibility now influences hiring,
              partnerships, investor trust, and inbound leads.
            </p>

            {/* Accent Line */}
            <div className="mt-10 h-[3px] w-28 rounded-full bg-violet-500" />

          </div>

          {/* RIGHT SIDE */}
          <div className="grid gap-5">

            {/* CARD 1 */}
            <div className="group rounded-[32px] border border-slate-200 bg-[var(--surface)] p-8 shadow-[0_10px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

              <div className="flex items-start justify-between">

                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                    Visibility
                  </div>

                  <h3 className="mt-5 text-3xl font-black leading-tight !text-[var(--text)]">
                    People trust what
                    they repeatedly see.
                  </h3>
                </div>

                <div className="rounded-2xl bg-violet-50 p-3 transition duration-300 group-hover:bg-violet-100">
                  <div className="h-3 w-3 rounded-full bg-violet-600" />
                </div>

              </div>
            </div>

            {/* CARD 2 */}
            <div className="group rounded-[32px] border border-violet-100 bg-[#F6F0FF] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(124,58,237,0.08)]">

              <div className="flex items-start justify-between">

                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                    Authority
                  </div>

                  <h3 className="mt-5 text-3xl font-black leading-tight !text-[var(--text)]">
                    Consistency creates
                    perceived expertise.
                  </h3>
                </div>

                <div className="rounded-2xl bg-[var(--surface)]/70 p-3 backdrop-blur-sm">
                  <div className="h-3 w-3 rounded-full bg-violet-700" />
                </div>

              </div>
            </div>

            {/* CARD 3 */}
            <div className="group relative overflow-hidden rounded-[32px] bg-[#070B14] p-8 shadow-[0_20px_80px_rgba(2,6,23,0.35)]">

              {/* Glow */}
              <div className="pointer-events-none absolute inset-0">

                <div className="absolute bottom-[-80px] right-[-80px] h-56 w-56 rounded-full bg-violet-600/20 blur-3xl" />

              </div>

              <div className="relative flex items-start justify-between">

                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] !text-violet-300">
                    Leverage
                  </div>

                  <h3 className="mt-5 text-3xl font-black leading-tight !text-white">
                    Strong positioning lowers acquisition friction.
                  </h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[var(--surface)]/5 p-3 backdrop-blur-sm">
                  <div className="h-3 w-3 rounded-full bg-violet-400" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}