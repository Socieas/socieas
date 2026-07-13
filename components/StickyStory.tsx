import FadeUp from "./FadeUp";

const journey = [
  {
    number: "01",
    title: "Nobody Knows You",
    description: "Great work, zero attention.",
  },
  {
    number: "02",
    title: "People Notice You",
    description: "Consistent content builds recall.",
  },
  {
    number: "03",
    title: "Trust Compounds",
    description: "Prospects arrive already sold.",
  },
  {
    number: "04",
    title: "Growth Gets Easier",
    description: "Inbound leads replace cold chasing.",
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
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <div
                key={item.number}
                className="group rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-200 bg-white text-lg font-black text-violet-700">
                  {item.number}
                </div>
                <h3 className="mt-4 text-xl font-black text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">
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
