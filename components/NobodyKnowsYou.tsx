export default function NobodyKnowsYou() {
  return (
    <section className="relative overflow-hidden bg-[#F8F8F6] pt-8 pb-20 md:pt-10 md:pb-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Top Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          <div>
            <h2 className="text-5xl font-black leading-[1] tracking-[-0.05em] text-[#111111] md:text-6xl">
              The best founder
              <br />
              doesn't always win.
            </h2>
          </div>

          <div>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              In crowded markets, people often choose the founder they know,
              not necessarily the founder who is most capable.
            </p>
          </div>

        </div>

        {/* Comparison */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">

          {/* Left */}
          <div className="rounded-[36px] border border-slate-200 bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Invisible Founder
            </div>

            <h3 className="mt-6 text-4xl font-black leading-tight text-[#111111]">
              Builds quietly.
            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Creates exceptional work but rarely shares it. Opportunities are
              lost because the market never notices.
            </p>

          </div>

          {/* Right */}
          <div className="rounded-[36px] border border-violet-100 bg-violet-50 p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              Visible Founder
            </div>

            <h3 className="mt-6 text-4xl font-black leading-tight text-[#111111]">
              Builds and shares.
            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Publishes consistently, educates the audience, and becomes the
              first name people think of when they need help.
            </p>

          </div>

        </div>
{/* Premium Closing Statement */}
<div className="mt-10 rounded-[40px] border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 px-8 py-14 md:px-12 md:py-16">

  <div className="mx-auto max-w-4xl text-center">

    <span className="inline-flex items-center rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700 shadow-sm">
      The Difference
    </span>

    <h3 className="mt-8 text-4xl font-black leading-[1.08] tracking-[-0.04em] text-[#111111] md:text-5xl">
      Your competitors don't have
      <br />
      to be better.
    </h3>

    <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-slate-600">
      They simply have to stay visible long enough
      to be remembered before you.
    </p>

    <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-violet-600" />

  </div>

</div>

      </div>
    </section>
  );
}