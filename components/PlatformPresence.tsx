import FadeUp from "./FadeUp";

const platforms = [
  {
    name: "LinkedIn",
    color: "text-[#0077B5]",
    headline: "Build authority where decision makers already pay attention.",
    description:
      "LinkedIn compounds founder credibility through consistent insights, positioning, and industry visibility.",
  },
  {
    name: "Instagram",
    color: "text-pink-500",
    headline: "Shape perception through visual storytelling and consistency.",
    description:
      "Attention grows faster when founders feel human, recognizable, and consistently present.",
  },
  {
    name: "X / Twitter",
    color: "text-[#1DA1F2]",
    headline: "Ideas spread faster when positioning is clear and repeatable.",
    description:
      "Short form thinking creates visibility loops that amplify founder recognition.",
  },
  {
    name: "YouTube",
    color: "text-red-500",
    headline: "Long form content builds deep trust at scale.",
    description:
      "Video creates stronger connection, stronger familiarity, and higher conversion intent.",
  },
];

export default function PlatformPresence() {
  return (
    <FadeUp>
      <section className="bg-[var(--surface)] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="text-sm font-medium uppercase tracking-[0.25em] text-violet-600">
              Founder Attention Ecosystem
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[var(--text)] md:text-5xl">
              Different platforms build different forms of trust.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <div className={`text-2xl font-black ${platform.color}`}>
                  {platform.name}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[#111111]">
                  {platform.headline}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
