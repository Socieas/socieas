"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const viewportOnce = { once: true, amount: 0.2 };

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const hoverLift = { y: -8, scale: 1.02 };

const pains = [
  {
    icon: "🫥",
    title: "Invisible",
    line: "You do great work. Nobody sees it.",
  },
  {
    icon: "🔁",
    title: "Inconsistent",
    line: "You post sometimes. Momentum dies.",
  },
  {
    icon: "🐢",
    title: "Referral Dependent",
    line: "Word of mouth only goes so far.",
  },
];

export default function FounderProblem() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
            The Hard Truth
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Being great is not enough.{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Being seen is.
            </span>
          </h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {pains.map((pain) => (
            <motion.div
              key={pain.title}
              variants={itemVariants}
              whileHover={hoverLift}
              className="rounded-3xl border border-slate-200 bg-[#F8F8F6] p-7 text-center shadow-sm transition-colors duration-300 hover:border-violet-200"
            >
              <div className="text-5xl">{pain.icon}</div>
              <h3 className="mt-4 text-2xl font-black text-[#111111]">
                {pain.title}
              </h3>
              <p className="mt-2 text-lg leading-7 text-slate-600">
                {pain.line}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-700 via-violet-600 to-fuchsia-600 p-8 md:p-10"
        >
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="text-3xl font-black text-white md:text-4xl">
                The fix? Become impossible to ignore.
              </h3>
              <p className="mt-2 text-lg text-violet-100">
                Visibility solves all three. We build it for you.
              </p>
            </div>
            <Link
              href="/services/personal-branding"
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-bold text-violet-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              See How We Do It
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
