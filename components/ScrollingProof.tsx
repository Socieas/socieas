"use client";

import { motion } from "framer-motion";

export default function ScrollingProof() {
  return (
    <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-6">

      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-max gap-16 whitespace-nowrap"
      >

        {[
          "Founder Branding",
          "Visibility Systems",
          "Audience Trust",
          "Strategic Positioning",
          "Personal Branding",
          "Thought Leadership",
          "Inbound Growth",
          "Modern Authority",
          "Digital Presence",
          "Founder Influence",
          "Content Systems",
          "Attention Economy",
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 text-2xl font-semibold text-violet-600"
          >
            <span>✦</span>
            <span>{item}</span>
          </div>
        ))}

      </motion.div>

    </section>
  );
}