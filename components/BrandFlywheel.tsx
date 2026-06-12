import FadeUp from "./FadeUp";

const steps = [
  {
    step: "01",
    title: "Create",
    description:
      "Publish valuable ideas that consistently showcase your expertise and perspective.",
  },
  {
    step: "02",
    title: "Be Seen",
    description:
      "Strategic distribution keeps your brand visible where decision makers spend time.",
  },
  {
    step: "03",
    title: "Build Trust",
    description:
      "Repeated exposure creates familiarity, credibility, and stronger relationships.",
  },
  {
    step: "04",
    title: "Grow",
    description:
      "Trust leads to inbound opportunities, partnerships, referrals, and business growth.",
  },
];

export default function BrandFlywheel() {
  return (
    <FadeUp>
      <section className="relative overflow-hidden bg-[#F8F8F6] py-24 md:py-28">

        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/40 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
              Small actions.
              <br />
              Compounding results.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600">
              Consistent visibility creates trust.
              Trust creates conversations.
              Conversations create long term growth.
            </p>

          </div>

          {/* Flywheel Layout */}
          <div className="mt-20 grid gap-6 lg:grid-cols-2">

            {steps.map((item) => (
              <div
                key={item.step}
                className="group rounded-[32px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-between">

                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
                    Step {item.step}
                  </span>

                  <div className="h-3 w-3 rounded-full bg-violet-600 transition-transform duration-300 group-hover:scale-125" />

                </div>

                <h3 className="mt-6 text-3xl font-black text-[#111111]">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

          {/* Bottom Flow */}
          <div className="mt-14 rounded-[32px] border border-violet-100 bg-white p-8 shadow-sm">

            <div className="flex flex-wrap items-center justify-center gap-4 text-center text-lg font-semibold text-[#111111]">

              <span>Create</span>

              <span className="text-violet-500">→</span>

              <span>Visibility</span>

              <span className="text-violet-500">→</span>

              <span>Trust</span>

              <span className="text-violet-500">→</span>

              <span>Growth</span>

              <span className="text-violet-500">→</span>

              <span>Create Again</span>

            </div>

          </div>

        </div>
      </section>
    </FadeUp>
  );
}