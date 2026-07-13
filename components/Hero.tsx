import Link from "next/link";
import Image from "next/image";
import FadeUp from "./FadeUp";

export default function Hero() {
  return (
    <FadeUp>
      <section
        id="home"
        className="relative overflow-hidden bg-[#F8F8F6] pt-24 pb-20 md:pt-32 md:pb-28"
      >
        {/* Ambient Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/25 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-fuchsia-100/30 blur-[140px]" />
          <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-100/40 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* LEFT */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-medium text-violet-700 shadow-sm">
                Personal Branding · AI Growth Systems
              </div>

              {/* Heading */}
              <h1 className="mt-8 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-[#111111] sm:text-6xl lg:text-7xl">
                Personal branding
                <br />
                that makes founders
                <br />
                impossible to ignore.
              </h1>

              {/* Description */}
              <p className="mt-8 max-w-lg text-lg leading-8 text-slate-600 md:text-xl">
                Socieas helps founders and B2B businesses across India, the
                USA, UK, Australia, and UAE build authority through strategic
                content, CRM, and AI automation — so growth comes to you.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(109,40,217,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
                >
                  Book a Free Strategy Call
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50"
                >
                  Explore Services
                </Link>
              </div>

              {/* Bottom Cards */}
              <div className="mt-14 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-[#111111]">Brand</h3>

                  <p className="mt-1 text-sm text-slate-500">Be remembered</p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-[#111111]">Content</h3>

                  <p className="mt-1 text-sm text-slate-500">Stay visible</p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-[#111111]">
                    Authority
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">Build trust</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex items-center justify-center">
              {/* Soft Glow */}
              <div className="absolute inset-0 rounded-[42px] bg-gradient-to-r from-violet-500/15 via-fuchsia-300/10 to-violet-300/15 blur-3xl" />

              {/* Image */}
              <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white p-2 shadow-[0_40px_120px_rgba(15,23,42,0.10)]">
                <div className="overflow-hidden rounded-[30px]">
                  <Image
                    src="/images/home/hero-founder.webp"
                    alt="Personal branding for founders by Socieas"
                    width={1600}
                    height={1800}
                    priority
                    className="h-auto w-full max-w-[560px] object-cover transition-transform duration-700 hover:scale-[1.01]"
                  />
                </div>
              </div>

              {/* Bottom Left Chip */}
              <div className="absolute -left-6 bottom-10 hidden rounded-2xl border border-slate-200 bg-white/95 px-5 py-3 shadow-xl backdrop-blur lg:flex lg:items-center">
                <span className="text-sm font-semibold text-slate-700">
                  ⭐ Rated on Trustpilot & Google
                </span>
              </div>

              {/* Top Right Chip */}
              <div className="absolute -right-4 top-10 hidden rounded-2xl border border-slate-200 bg-white/95 px-5 py-3 shadow-xl backdrop-blur xl:flex xl:items-center">
                <span className="text-sm font-semibold text-slate-700">
                  🌍 Serving Clients in 5 Countries
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
