import FadeUp from "./FadeUp";

const journey = [
  {
    number: "01",
    title: "Nobody Knows You",
    description:
      "Even exceptional founders struggle to attract opportunities when their expertise remains invisible.",
  },
  {
    number: "02",
    title: "People Start Seeing You",
    description:
      "Consistent content and strategic positioning create familiarity across your audience.",
  },
  {
    number: "03",
    title: "Trust Begins to Compound",
    description:
      "Repeated exposure makes prospects more confident before the first conversation.",
  },
  {
    number: "04",
    title: "Growth Follows Naturally",
    description:
      "Visibility turns into inbound leads, partnerships, referrals, and long-term authority.",
  },
];

export default function StickyStory() {
  return (
    <FadeUp>
      <section className="bg-white py-20 md:py-24">

        <div className="mx-auto max-w-6xl px-6">

          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
              Your personal brand
              <br />
              becomes your unfair advantage.
            </h2>

            <p className="mt-8 text-xl leading-9 text-slate-600">
              The founders who consistently educate, share, and stay visible
              create momentum that compounds over time.
            </p>

          </div>

          {/* Journey */}
          <div className="mt-20 space-y-6">

            {journey.map((item, index) => (
              <div
                key={item.number}
                className="group rounded-[36px] border border-slate-200 bg-[#F8F8F6] p-8 transition-all duration-300 hover:border-violet-200 hover:shadow-xl"
              >
                <div className="grid gap-8 md:grid-cols-[100px_1fr] md:items-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-violet-200 bg-white text-2xl font-black text-violet-700">
                    {item.number}
                  </div>

                  <div>

                    <h3 className="text-3xl font-black text-[#111111]">
                      {item.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                      {item.description}
                    </p>

                  </div>

                </div>

                {index !== journey.length - 1 && (
                  <div className="mt-6 ml-10 h-10 w-px bg-violet-200" />
                )}

              </div>
            ))}

          </div>

        </div>

      </section>
    </FadeUp>
  );
}