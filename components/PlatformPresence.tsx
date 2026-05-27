import FadeUp from "./FadeUp";

export default function PlatformPresence() {
  return (
    <FadeUp>

      <section className="bg-[var(--surface)] py-24">

        <div className="mx-auto max-w-7xl px-6">

          {/* TOP */}
          <div className="max-w-4xl">

            <div className="text-sm uppercase tracking-[0.25em] text-violet-600">

              Founder Attention Ecosystem

            </div>

            <h2 className="mt-8 text-5xl font-bold leading-[1.05] text-[var(--text)] md:text-6xl">

              Different platforms
              build different forms
              of trust.

            </h2>

          </div>

          {/* PLATFORM LAYOUT */}
          <div className="mt-20 space-y-20">

            {/* LINKEDIN */}
            <div className="grid gap-10 border-b border-[var(--border)] pb-16 lg:grid-cols-[0.4fr_1fr]">

              <div>

                <div className="text-4xl font-bold text-[#0077B5]">

                  LinkedIn

                </div>

              </div>

              <div>

                <h3 className="text-3xl font-semibold text-[var(--text)]">

                  Build authority where decision-makers already pay attention.

                </h3>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">

                  LinkedIn compounds founder credibility through consistent insights,
                  positioning, and industry visibility.

                </p>

              </div>

            </div>

            {/* INSTAGRAM */}
            <div className="grid gap-10 border-b border-[var(--border)] pb-16 lg:grid-cols-[0.4fr_1fr]">

              <div>

                <div className="text-4xl font-bold text-pink-500">

                  Instagram

                </div>

              </div>

              <div>

                <h3 className="text-3xl font-semibold text-[var(--text)]">

                  Shape perception through visual storytelling and consistency.

                </h3>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">

                  Attention grows faster when founders feel human,
                  recognizable, and consistently present.

                </p>

              </div>

            </div>

            {/* X/TWITTER */}
            <div className="grid gap-10 border-b border-[var(--border)] pb-16 lg:grid-cols-[0.4fr_1fr]">

              <div>

                <div className="text-4xl font-bold text-[#1DA1F2]">

                  X / Twitter

                </div>

              </div>

              <div>

                <h3 className="text-3xl font-semibold text-[var(--text)]">

                  Ideas spread faster when positioning is clear and repeatable.

                </h3>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">

                  Short-form thinking creates visibility loops
                  that amplify founder recognition.

                </p>

              </div>

            </div>

            {/* YOUTUBE */}
            <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr]">

              <div>

                <div className="text-4xl font-bold text-red-500">

                  YouTube

                </div>

              </div>

              <div>

                <h3 className="text-3xl font-semibold text-[var(--text)]">

                  Long-form content builds deep trust at scale.

                </h3>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">

                  Video creates stronger connection,
                  stronger familiarity, and higher conversion intent.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </FadeUp>
  );
}