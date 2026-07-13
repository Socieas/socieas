"use client";

import { motion } from "framer-motion";

const items = [
  "Personal Branding",
  "Founder Positioning",
  "Thought Leadership",
  "Content Systems",
  "AI Automation",
  "CRM Solutions",
  "Digital Marketing",
  "Inbound Growth",
  "Full Stack Development",
  "Staffing Solutions",
  "Salesforce Consulting",
  "Modern Authority",
];

const marqueeAnimation = {
  x: ["0%", "-50%"],
};

const marqueeTransition = {
  duration: 40,
  repeat: Infinity,
  ease: "linear",
} as const;

export default function ScrollingProof() {
  const marqueeItems = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-white py-5">
      {/* Soft fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

      <motion.div
        className="flex w-max items-center gap-10"
        animate={marqueeAnimation}
        transition={marqueeTransition}
      >
        {marqueeItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-4 whitespace-nowrap"
          >
            <span className="text-lg text-violet-600">✦</span>
            <span className="text-base font-medium tracking-wide text-slate-700 md:text-lg">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
