import FadeUp from "./FadeUp";

const principles = [
  {
    title: "Visibility",
    description: "People trust founders they see consistently.",
  },
  {
    title: "Credibility",
    description: "Authority is earned long before the first meeting.",
  },
  {
    title: "Momentum",
    description: "Strong positioning creates compounding opportunities.",
  },
];

export default function AttentionEconomy() {
  return (
    <FadeUp>
      <section className="bg-[#F8F8F6] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-start gap-16 lg:grid-cols-[1fr_0.95fr] lg:gap-24">

            {/* LEFT */}
            <div>
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
                The Attention Economy
              </div>

              <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
                Attention is earned.
                <br />
                Trust is repeated.
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
                The founders who consistently share ideas, educate their
                audience, and stay visible become the ones people remember when
                opportunities arise.
              </p>

              <div className="mt-10 h-1 w-24 rounded-full bg-violet-600" />
            </div>

            {/* RIGHT */}
            <div className="space-y-5">

              {principles.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#111111]">
                      {item.title}
                    </h3>

                    <div className="h-3 w-3 rounded-full bg-violet-600" />
                  </div>

                  <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>
    </FadeUp>
  );
}
