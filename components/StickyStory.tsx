import FadeUp from "./FadeUp";

const journey = [
  {
    number: "01",
    title: "Nobody Knows You",
    description:
      "Even exceptional founders struggle to attract opportunities when their expertise stays invisible.",
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
      "Repeated exposure makes prospects confident before the first conversation.",
  },
  {
    number: "04",
    title: "Growth Follows Naturally",
    description:
      "Visibility turns into inbound leads, partnerships, referrals, and lasting authority.",
  },
];

export default function StickyStory() {
  return (
    <FadeUp>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Your personal brand becomes your unfair advantage.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Founders who consistently educate, share, and stay visible create
              momentum that compounds over time.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {journey.map((item) => (
              <div
                key={item.number}
                className="group rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-white text-lg font-black text-violet-700">
                    {item.number}
                  </div>
                  <h3 className="text-2xl font-black text-[#111111]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
