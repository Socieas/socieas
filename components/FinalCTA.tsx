import Link from "next/link";
import Image from "next/image";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#F8F8F6] py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-fuchsia-200/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.08)]">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="px-8 py-8 md:px-12 md:py-10 lg:px-14">
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                Free Strategy Call
              </div>

              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
                Stop being the best kept secret in your industry.
              </h2>

              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                One call. A clear plan to get you seen, whether we work
                together or not.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Personal Branding",
                  "AI Automation",
                  "CRM",
                  "Content",
                  "Growth Systems",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
                >
                  Book a Free Strategy Call
                </Link>
              </div>
            </div>

            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-l from-violet-500/10 to-transparent" />
              <Image
                src="/images/home/final-cta-mascot.webp"
                alt="Socieas AI Assistant"
                width={1200}
                height={1200}
                className="h-full w-full object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
