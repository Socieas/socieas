export default function ResultsSection() {
  return (
    <section className="bg-[var(--surface)] py-24">

      <div className="mx-auto max-w-7xl px-6">

        {/* TOP */}
        <div className="max-w-4xl">

          <div className="text-sm uppercase tracking-[0.25em] text-violet-600">

            Proof & Momentum

          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-[#111111] md:text-6xl">

            Visibility changes how people perceive your business.

          </h2>

        </div>

        {/* GRID */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {/* CARD 1 */}
          <div className="rounded-[36px] bg-[#F7F7F5] p-10">

            <div className="text-5xl font-bold text-violet-600">

              +340%

            </div>

            <h3 className="mt-8 text-2xl font-semibold text-[#111111]">

              Audience Growth

            </h3>

            <p className="mt-4 leading-relaxed text-[var(--muted)]">

              Consistent positioning compounds reach
              and founder recognition.

            </p>

          </div>

          {/* CARD 2 */}
          <div className="rounded-[36px] bg-violet-600 p-10 text-white">

            <div className="text-5xl font-bold">

              10M+

            </div>

            <h3 className="mt-8 text-2xl font-semibold">

              Organic Impressions

            </h3>

            <p className="mt-4 leading-relaxed text-violet-100">

              Strategic content systems create scalable visibility.

            </p>

          </div>

          {/* CARD 3 */}
          <div className="rounded-[36px] bg-[#111111] p-10 text-white">

            <div className="text-5xl font-bold">

              3X

            </div>

            <h3 className="mt-8 text-2xl font-semibold">

              Inbound Opportunities

            </h3>

            <p className="mt-4 leading-relaxed text-gray-400">

              Strong positioning lowers trust friction significantly.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}