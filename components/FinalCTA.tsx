import Link from "next/link";
import Image from "next/image";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#F8F8F6] py-24 md:py-32">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-fuchsia-200/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.08)]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* LEFT CONTENT */}
            <div className="px-8 py-10 md:px-12 md:py-14 lg:px-14">
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                Ready to Stand Out?
              </div>

              <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
                Build a brand
                <br />
                people remember.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Personal branding, AI automation, CRM, content systems, and
                digital strategy working together to create sustainable business
                growth.
              </p>

              {/* Services */}
              <div className="mt-8 flex flex-wrap gap-3">
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

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
                >
                  Book a Strategy Call
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
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
    </section>
  );
}