import FadeUp from "./FadeUp";

const platforms = [
  {
    name: "Trustpilot",
    rating: "4.9/5",
  },

  {
    name: "Clutch",
    rating: "Top Rated",
  },

  {
    name: "Sitejabber",
    rating: "Verified",
  },

  {
    name: "Google Reviews",
    rating: "5.0/5",
  },
];

export default function TrustSignals() {
  return (
    <FadeUp>

      <section className="bg-[var(--soft-surface)] py-20">

        <div className="mx-auto max-w-7xl px-6">

          {/* TOP */}
          <div className="text-center">

            <div className="text-sm uppercase tracking-[0.25em] text-violet-600">

              Public Trust Signals

            </div>

            <h2 className="mt-6 text-4xl font-bold text-[var(--text)] md:text-5xl">

              Trusted across multiple review platforms.

            </h2>

          </div>

          {/* LOGOS */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {platforms.map((platform, index) => (

              <div
                key={index}
                className="hover-card rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--card-shadow)]"
              >

                {/* ICON */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl font-bold text-violet-600">

                  {platform.name.charAt(0)}

                </div>

                {/* CONTENT */}
                <div className="mt-8">

                  <div className="text-2xl font-semibold text-[var(--text)]">

                    {platform.name}

                  </div>

                  <div className="mt-3 text-[var(--muted)]">

                    {platform.rating}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </FadeUp>
  );
}