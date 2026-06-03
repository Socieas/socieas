export default function NobodyKnowsYou() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] py-24 md:py-32">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-[-120px] top-[-80px] h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-fuchsia-100/40 blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* TOP CONTENT */}
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-24">

          {/* LEFT */}
          <div>

            {/* Label */}
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              Hard Truth
            </div>

            {/* Heading */}
            <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[var(--text)] md:text-6xl">
              Nobody buys from founders they forget instantly.
            </h2>

            {/* Accent Line */}
            <div className="mt-10 h-[3px] w-28 rounded-full bg-violet-500" />

          </div>

          {/* RIGHT */}
          <div>

            <p className="max-w-xl text-lg leading-8 text-[var(--muted)] md:text-xl">
              Most founders focus only on operations,
              delivery, and execution.

              <br />
              <br />

              But modern growth depends heavily on
              visibility, positioning, and repeated trust.

              <br />
              <br />

              Great businesses lose opportunities every day
              because nobody remembers who they are.
            </p>

          </div>

        </div>

        {/* INTERACTIVE CARDS */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">

          {/* CARD 1 */}
          <div className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-[var(--surface)] p-8 shadow-[0_15px_50px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(124,58,237,0.10)]">

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

            <div className="relative">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-3xl">
                📉
              </div>

              <h3 className="mt-8 text-3xl font-black leading-tight text-[var(--text)]">
                Low visibility creates lost opportunities.
              </h3>

              <p className="mt-5 text-base leading-7 text-[var(--muted)]">
                Great work alone no longer guarantees attention in crowded digital markets.
              </p>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="group relative overflow-hidden rounded-[32px] border border-violet-100 bg-[#F6F0FF] p-8 shadow-[0_15px_50px_rgba(124,58,237,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(124,58,237,0.14)]">

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-100/60 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

            <div className="relative">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface)] shadow-sm text-3xl">
                🧠
              </div>

              <h3 className="mt-8 text-3xl font-black leading-tight text-[var(--text)]">
                Familiarity builds trust before conversations happen.
              </h3>

              <p className="mt-5 text-base leading-7 text-[var(--muted)]">
                Consistent positioning changes how founders are perceived online.
              </p>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="group relative overflow-hidden rounded-[32px] bg-[#070B14] p-8 shadow-[0_20px_80px_rgba(2,6,23,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_100px_rgba(2,6,23,0.45)]">

            {/* Glow */}
            <div className="pointer-events-none absolute inset-0">

              <div className="absolute bottom-[-100px] right-[-100px] h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

            </div>

            <div className="relative">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[var(--surface)]/5 text-3xl backdrop-blur-sm">
                🚀
              </div>

              <h3 className="mt-8 text-3xl font-black leading-tight !text-white">
                Strong positioning compounds long-term growth.
              </h3>

              <p className="mt-5 text-base leading-7 !text-slate-300">
                Visibility creates momentum that strengthens inbound trust, authority, and growth.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}