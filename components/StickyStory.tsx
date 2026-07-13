"use client";

import { motion, type Variants } from "framer-motion";

const viewportOnce = { once: true, amount: 0.2 };

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const hoverLift = { y: -8 };

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
    <section className="bg-[#F8F8F6] py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Your personal brand becomes your{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              unfair advantage.
            </span>
          </h2>
        </div>

        <div className="relative mt-12">
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="absolute left-0 top-6 hidden h-1 w-full origin-left rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 lg:block"
          />

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {journey.map((item) => (
              <motion.div
                key={item.number}
                variants={itemVariants}
                whileHover={hoverLift}
                className="relative"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-black text-white shadow-lg">
                  {item.number}
                </div>
                <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-violet-200">
                  <h3 className="text-xl font-black text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
