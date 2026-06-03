import FadeUp from "./FadeUp";

const testimonials = [
  {
    text: "Socieas completely improved our founder positioning and inbound quality through strategic visibility.",
    name: "SaaS Founder",
    location: "United States",
  },

  {
    text: "The CRM and automation systems drastically improved operational efficiency for our team.",
    name: "Agency Owner",
    location: "UAE",
  },

  {
    text: "The entire growth ecosystem finally started working together instead of operating independently.",
    name: "Tech Consultant",
    location: "United Kingdom",
  },

  {
    text: "Their positioning strategy helped us build stronger credibility online consistently.",
    name: "Startup Founder",
    location: "Australia",
  },
];

export default function Testimonials() {
  return (
    <FadeUp>

      <section className="overflow-hidden bg-[var(--background)] py-24">

        <div className="mx-auto max-w-7xl px-6">

          {/* TOP */}
          <div className="max-w-5xl">

            <div className="text-sm uppercase tracking-[0.25em] text-violet-600">

              Client Experience

            </div>

            <h2 className="mt-8 text-5xl font-bold leading-[1.02] text-[var(--text)] md:text-6xl">

              Strategic execution
              creates long-term trust.

            </h2>

          </div>

          {/* SCROLLING REVIEWS */}
          <div className="relative mt-20 overflow-hidden">

            <div className="marquee flex gap-8">

              {[...testimonials, ...testimonials].map((item, index) => (

                <div
                  key={index}
                  className="min-w-[380px] rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--card-shadow)]"
                >

                  <div className="text-violet-600">
                    ★★★★★
                  </div>

                  <p className="mt-8 text-lg leading-relaxed text-[var(--muted)]">

                    &ldquo;{item.text}&rdquo;

                  </p>

                  <div className="mt-10">

                    <div className="font-semibold text-[var(--text)]">

                      {item.name}

                    </div>

                    <div className="text-sm text-[var(--muted)]">

                      {item.location}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </FadeUp>
  );
}
