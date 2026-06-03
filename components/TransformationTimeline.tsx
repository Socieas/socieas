export default function TransformationTimeline() {
  return (
    <section className="bg-[var(--surface)] py-24">

      <div className="mx-auto max-w-7xl px-6">

        {/* TOP */}
        <div className="max-w-4xl">

          <div className="text-sm uppercase tracking-[0.25em] text-violet-600">

            Founder Transformation

          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-[var(--text)] md:text-6xl">

            Strong founder brands compound
            trust long before conversion happens.

          </h2>

        </div>

        {/* TIMELINE */}
        <div className="mt-24 grid gap-12 md:grid-cols-4">

          {/* STEP 1 */}
          <div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-700">

              1

            </div>

            <h3 className="mt-8 text-2xl font-semibold text-[var(--text)]">

              Visibility

            </h3>

            <p className="mt-4 leading-relaxed text-[var(--muted)]">

              Strategic content attracts attention consistently.

            </p>

          </div>

          {/* STEP 2 */}
          <div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white">

              2

            </div>

            <h3 className="mt-8 text-2xl font-semibold text-[var(--text)]">

              Familiarity

            </h3>

            <p className="mt-4 leading-relaxed text-[var(--muted)]">

              Repeated exposure creates recognition and trust.

            </p>

          </div>

          {/* STEP 3 */}
          <div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--text)] text-2xl font-bold text-white">

              3

            </div>

            <h3 className="mt-8 text-2xl font-semibold text-[var(--text)]">

              Authority

            </h3>

            <p className="mt-4 leading-relaxed text-[var(--muted)]">

              Strong positioning changes perceived expertise.

            </p>

          </div>

          {/* STEP 4 */}
          <div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-200 text-2xl font-bold text-violet-700">

              4

            </div>

            <h3 className="mt-8 text-2xl font-semibold text-[var(--text)]">

              Inbound Growth

            </h3>

            <p className="mt-4 leading-relaxed text-[var(--muted)]">

              Trust lowers acquisition friction dramatically.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}