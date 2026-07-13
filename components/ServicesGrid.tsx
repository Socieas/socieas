"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const viewportOnce = { once: true, amount: 0.15 };

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const services = [
  {
    icon: "👤",
    title: "Personal Branding",
    desc: "Turn expertise into inbound clients.",
    href: "/services/personal-branding",
  },
  {
    icon: "🤖",
    title: "AI Automation",
    desc: "Every lead followed up, automatically.",
    href: "/services/ai-automation",
  },
  {
    icon: "📊",
    title: "CRM Solutions",
    desc: "No opportunity slips through.",
    href: "/services/crm-solutions",
  },
  {
    icon: "🌐",
    title: "Full Stack Development",
    desc: "Fast websites built to convert.",
    href: "/services/full-stack-development",
  },
  {
    icon: "📈",
    title: "Digital Marketing",
    desc: "Qualified traffic that compounds.",
    href: "/services/digital-marketing",
  },
  {
    icon: "🤝",
    title: "Staffing Solutions",
    desc: "Vetted talent, zero hiring overhead.",
    href: "/services/staffing-solutions",
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-violet-600">
            What We Build
          </div>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Six systems.{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              One growth engine.
            </span>
          </h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Link
                href={service.href}
                className="group block rounded-3xl border border-slate-200 bg-[#F8F8F6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:bg-white hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="translate-y-1 text-violet-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#111111]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
          >
            Explore All Services
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
