import FadeUp from "./FadeUp";

const ecosystem = [
  {
    title: "LinkedIn Authority",
    description:
      "Thought leadership that keeps your expertise visible to decision makers.",
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
      <section className="relative overflow-hidden bg-[#F8F8F6] py-12 md:py-16">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/30 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Every digital touchpoint should tell the same story.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Your content, website, search presence, and personal brand should
              work together to create one consistent perception: you are the
              trusted expert.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
              <div className="text-center">
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
                  Your Personal Brand
                </div>
                <h3 className="mt-2 text-3xl font-black text-[#111111]">
                  One Message. Everywhere.
                </h3>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {ecosystem.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-[#F8F8F6] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                  >
                    <h4 className="text-xl font-black text-[#111111]">
                      {item.title}
                    </h4>
                    <p className="mt-2 leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="rounded-[32px] border border-violet-200 bg-violet-50 p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                  Consistency
                </div>
                <h3 className="mt-3 text-2xl font-black leading-tight text-[#111111]">
                  Every post should reinforce your positioning.
                </h3>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-700 shadow-sm">
                    Founder Insights
                  </div>
                  <div className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-700 shadow-sm">
                    Client Success Stories
                  </div>
                  <div className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-700 shadow-sm">
                    Industry Expertise
                  </div>
                </div>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                  Outcome
                </div>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#111111]">
                  Recognition becomes trust.
                </h3>
                <p className="mt-3 leading-8 text-slate-600">
                  When your website, social presence, AI content, and search
                  visibility work together, prospects arrive already confident
                  in your expertise.
                </p>
                <div className="mt-5 h-1 w-24 rounded-full bg-violet-600" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
