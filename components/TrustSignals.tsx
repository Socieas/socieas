"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const viewportOnce = { once: true, amount: 0.3 };

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stats = [
  { value: 5, suffix: "", label: "Countries Served" },
  { value: 10, suffix: "M+", label: "Content Reach" },
  { value: 500, suffix: "+", label: "Posts Published" },
  { value: 24, suffix: "h", label: "Response Time" },
];

const platforms = [
  {
    name: "Trustpilot",
    subtitle: "Verified Reviews",
    href: "https://www.trustpilot.com/review/socieas.com",
  },
  {
    name: "Google Reviews",
    subtitle: "Customer Feedback",
    href: "https://g.page/r/CZRSUSQ4ceKYEBM/review",
  },
  {
    name: "Sitejabber",
    subtitle: "Public Reputation",
    href: "https://www.smartcustomer.com/reviews/socieas.com",
  },
];

function Counter(props: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, viewportOnce);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * props.value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, props.value]);

  return (
    <span ref={ref}>
      {display}
      {props.suffix}
    </span>
  );
}

export default function TrustSignals() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0F] py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {platforms.map((platform) => (
            <motion.a
              key={platform.name}
              variants={itemVariants}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(139,92,246,0.25)]"
            >
              <div>
                <div className="font-bold text-white">{platform.name}</div>
                <div className="mt-0.5 text-xs text-slate-400">
                  {platform.subtitle}
                </div>
              </div>
              <span className="text-sm tracking-widest text-amber-400">
                ★★★★★
              </span>
            </motion.a>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Every review is public. Click any platform and read them yourself.
        </p>
      </div>
    </section>
  );
}
