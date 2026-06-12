import FadeUp from "./FadeUp";

const ecosystem = [
  {
    title: "LinkedIn Authority",
    description:
      "Thought leadership that keeps your expertise visible to decision-makers.",
  },
  {
    title: "Personal Website",
    description:
      "A premium digital presence that reinforces credibility and trust.",
  },
  {
    title: "AI Content Engine",
    description:
      "Consistent content systems that keep your brand active and relevant.",
  },
  {
    title: "Search Presence",
    description:
      "Own your narrative across Google, AI search, and branded queries.",
  },
];

export default function EditorialProof() {
  return (
    <FadeUp>
      <section className="relative overflow-hidden bg-[#F8F8F6] py-20 md:py-24">

        {/* Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/30 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* Heading */}
          <div className="mx-auto max-w-4xl text-center">

            <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
              Every digital touchpoint
              <br />
              should tell the same story.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-600">
              Your content, website, search presence, and personal brand should
              work together to create one consistent perception:
              you are the trusted expert.
            </p>

          </div>

          {/* Ecosystem */}
          <div className="mt-20 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

            {/* Left Side */}
            <div className="rounded-[40px] border border-slate-200 bg-white p-10 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">

              <div className="text-center">

                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
                  Your Personal Brand
                </div>

                <h3 className="mt-4 text-4xl font-black text-[#111111]">
                  One Message.
                  <br />
                  Everywhere.
                </h3>

              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2">

                {ecosystem.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[28px] border border-slate-200 bg-[#F8F8F6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                  >
                    <h4 className="text-2xl font-black text-[#111111]">
                      {item.title}
                    </h4>

                    <p className="mt-4 leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}

              </div>

            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-6">

              {/* Consistency Card */}
              <div className="rounded-[36px] border border-violet-200 bg-violet-50 p-8">

                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                  Consistency
                </div>

                <h3 className="mt-6 text-3xl font-black leading-tight text-[#111111]">
                  Every post should reinforce your positioning.
                </h3>

                <div className="mt-8 space-y-4">

                  <div className="rounded-2xl bg-white px-5 py-4 font-medium text-slate-700 shadow-sm">
                    Founder Insights
                  </div>

                  <div className="rounded-2xl bg-white px-5 py-4 font-medium text-slate-700 shadow-sm">
                    Client Success Stories
                  </div>

                  <div className="rounded-2xl bg-white px-5 py-4 font-medium text-slate-700 shadow-sm">
                    Industry Expertise
                  </div>

                </div>

              </div>

              {/* Result Card */}
              <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">

                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                  Outcome
                </div>

                <h3 className="mt-6 text-4xl font-black leading-tight text-[#111111]">
                  Recognition
                  <br />
                  becomes trust.
                </h3>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  When your website, social presence, AI content, and search
                  visibility work together, prospects arrive already confident
                  in your expertise.
                </p>

                <div className="mt-8 h-1 w-24 rounded-full bg-violet-600" />

              </div>

            </div>

          </div>

        </div>

      </section>
    </FadeUp>
  );
}