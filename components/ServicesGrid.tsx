import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FadeUp from "./FadeUp";

const services = [
  {
    icon: "👤",
    title: "Personal Branding",
    desc: "Founder visibility systems that turn your expertise into inbound clients.",
    href: "/services/personal-branding",
  },
  {
    icon: "🤖",
    title: "AI Automation",
    desc: "Workflows that capture, follow up, and nurture every lead automatically.",
    href: "/services/ai-automation",
  },
  {
    icon: "📊",
    title: "CRM Solutions",
    desc: "Sales pipelines that make sure no opportunity ever slips through.",
    href: "/services/crm-solutions",
  },
  {
    icon: "🌐",
    title: "Full Stack Development",
    desc: "Fast, SEO-ready websites and digital products built to convert.",
    href: "/services/full-stack-development",
  },
  {
    icon: "📈",
    title: "Digital Marketing",
    desc: "Search and social growth systems that bring qualified traffic.",
    href: "/services/digital-marketing",
  },
  {
    icon: "🤝",
    title: "Staffing Solutions",
    desc: "Vetted talent to scale your team without the hiring overhead.",
    href: "/services/staffing-solutions",
  },
];

export default function ServicesGrid() {
  return (
    <FadeUp>
      <section className="bg-[#F8F8F6] py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* TOP */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-medium uppercase tracking-[0.25em] text-violet-600">
              What We Build
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Six systems. One connected growth engine.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Every service works together — visibility attracts attention,
              systems capture it, and automation turns it into growth.
            </p>
          </div>

          {/* GRID */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-[28px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{service.icon}</div>

                  <ArrowUpRight
                    size={18}
                    className="translate-y-1 text-violet-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#111111]">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {service.desc}
                </p>
              </Link>
            ))}
          </div>

          {/* BOTTOM LINK */}
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50"
            >
              Explore All Services
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
