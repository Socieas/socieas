"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {

  const router = useRouter();

  const [activeCard, setActiveCard] = useState(0);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const philosophyCards = [
    {
      title: "Visibility",
      content:
        "People trust brands they repeatedly remember.",
    },

    {
      title: "Trust",
      content:
        "Trust compounds through consistency and honesty.",
    },

    {
      title: "Positioning",
      content:
        "Strong positioning creates authority before conversations begin.",
    },

    {
      title: "Systems",
      content:
        "Disconnected execution creates chaos instead of scalable growth.",
    },
  ];

  const ecosystemItems = [
    "Visibility",
    "Trust",
    "Identity",
    "Positioning",
    "Authority",
    "Connection",
    "Consistency",
    "Systems",
    "Growth",
  ];

  const toggleSelection = (item: string) => {

    if (selectedItems.includes(item)) {

      setSelectedItems(
        selectedItems.filter((i) => i !== item)
      );

    } else {

      setSelectedItems([...selectedItems, item]);

    }

  };

  const handleSubmit = () => {

    router.push("/contact");

  };

  return (
    <main className="overflow-x-hidden bg-[#F8F7F4] text-[#151515]">

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-40 pb-32">

        {/* BG */}
        <div className="absolute left-[-120px] top-0 h-[340px] w-[340px] rounded-full bg-violet-100 blur-3xl"></div>

        <div className="absolute right-[-120px] top-20 h-[320px] w-[320px] rounded-full bg-violet-50 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-6">

          {/* TITLE */}
          <FadeUp>

            <div className="max-w-6xl">

              <div className="text-sm uppercase tracking-[0.35em] text-violet-600">

                About Socieas

              </div>

              <h1 className="mt-8 text-6xl font-bold leading-[0.9] md:text-8xl">

                Built for brands
                people actually
                remember.

              </h1>

            </div>

          </FadeUp>

          {/* NEW INFOGRAPHIC EXPERIENCE */}
          <FadeUp>

            <div className="relative mt-20 overflow-hidden rounded-[56px] border border-violet-100 bg-white shadow-2xl">

              {/* BACKGROUND */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#f3e8ff,transparent_35%),radial-gradient(circle_at_bottom_right,#ede9fe,transparent_35%)]"></div>

              {/* FOUNDERS HIDDEN */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div className="absolute left-[8%] top-[14%] rotate-[-16deg] text-[10px] uppercase tracking-[0.5em] text-violet-200">

                  Ankit

                </div>

                <div className="absolute right-[10%] top-[16%] rotate-[12deg] text-[10px] uppercase tracking-[0.5em] text-violet-200">

                  Mansi

                </div>

                <div className="absolute bottom-[10%] left-[44%] rotate-[-10deg] text-[10px] uppercase tracking-[0.5em] text-violet-200">

                  Tanushree

                </div>

              </div>

              <div className="relative grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">

                {/* LEFT */}
                <div className="relative overflow-hidden p-10 md:p-14">

                  {/* TOP */}
                  <div className="flex flex-wrap items-center justify-between gap-6">

                    <div>

                      <div className="text-sm uppercase tracking-[0.35em] text-violet-600">

                        Build Your Brand System

                      </div>

                      <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-[0.95] text-[#151515] md:text-6xl">

                        Select the
                        ingredients
                        your brand
                        actually needs.

                      </h2>

                    </div>

                    <div className="rounded-full border border-violet-200 bg-violet-50 px-5 py-3 text-sm font-medium text-violet-700">

                      Pick • Build • Submit

                    </div>

                  </div>

                  {/* INTERACTIVE AREA */}
                  <div className="relative mt-20 flex min-h-[540px] items-center justify-center">

                    {/* OUTER RING */}
                    <div className="absolute h-[480px] w-[480px] rounded-full border border-dashed border-violet-300"></div>

                    {/* MIDDLE RING */}
                    <div className="absolute h-[340px] w-[340px] rounded-full border border-violet-200 bg-violet-50/50 backdrop-blur-xl"></div>

                    {/* CENTER */}
                    <motion.div
                      animate={{
                        scale: [1, 1.03, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                      }}
                      className="absolute z-10 flex h-[220px] w-[220px] items-center justify-center rounded-full bg-violet-600 text-center text-white shadow-[0_40px_120px_rgba(124,58,237,0.35)]"
                    >

                      <div>

                        <div className="text-xs uppercase tracking-[0.4em] text-violet-100">

                          Socieas

                        </div>

                        <div className="mt-4 px-4 text-3xl font-bold leading-[0.95]">

                          Brand
                          Memory

                        </div>

                      </div>

                    </motion.div>

                    {/* SELECTABLE CARDS */}
                    <div className="absolute inset-0 z-20">

                      {ecosystemItems.map((item, index) => (

                        <motion.button
                          key={index}
                          drag
                          dragMomentum={false}
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileDrag={{
                            scale: 1.08,
                          }}
                          onClick={() => toggleSelection(item)}
                          className={`absolute flex h-[88px] w-[170px] cursor-grab items-center justify-center rounded-[26px] border px-4 text-center text-sm font-semibold transition-all duration-300 md:text-base ${
                            selectedItems.includes(item)
                              ? "border-violet-600 bg-violet-600 text-white shadow-2xl"
                              : "border-violet-200 bg-white text-[#151515] shadow-lg"
                          } ${
                            index === 0
                              ? "left-[0%] top-[12%]"
                              : index === 1
                              ? "right-[0%] top-[14%]"
                              : index === 2
                              ? "left-[6%] bottom-[22%]"
                              : index === 3
                              ? "right-[6%] bottom-[20%]"
                              : index === 4
                              ? "left-[34%] top-[0%]"
                              : index === 5
                              ? "right-[30%] bottom-[4%]"
                              : index === 6
                              ? "left-[30%] bottom-[2%]"
                              : index === 7
                              ? "right-[30%] top-[0%]"
                              : "left-[38%] top-[72%]"
                          }`}
                        >

                          {item}

                        </motion.button>

                      ))}

                    </div>

                  </div>

                </div>

                {/* RIGHT PANEL */}
                <div className="relative overflow-hidden border-l border-violet-100 bg-[#faf7ff] p-10 md:p-14">

                  {/* GRADIENT */}
                  <div className="absolute right-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-violet-200 blur-3xl opacity-50"></div>

                  <div className="relative z-10 flex h-full flex-col justify-between">

                    {/* TOP */}
                    <div>

                      <div className="text-right text-xl font-medium uppercase tracking-[0.15em] text-violet-700 md:text-3xl">

                        Enhanced Brand Visibility

                      </div>

                      <div className="mt-4 text-right text-[110px] font-bold leading-none text-[#151515] md:text-[180px]">

                        {Math.min(selectedItems.length * 20, 100)}%

                      </div>

                    </div>

                    {/* BOTTOM */}
                    <div>

                      <div className="grid grid-cols-2 gap-4">

                        {selectedItems.slice(0, 4).map((item, index) => (

                          <div
                            key={index}
                            className="rounded-2xl border border-violet-200 bg-white px-5 py-4 text-sm font-medium text-[#151515] shadow-sm"
                          >

                            {item}

                          </div>

                        ))}

                      </div>

                      <p className="mt-10 text-lg leading-relaxed text-[#555] md:text-xl">

                        Your selected ecosystem creates stronger positioning, deeper trust, higher memorability, and sustainable long term visibility.

                      </p>

                      {/* BUTTON */}
                      {selectedItems.length >= 4 && (

                        <motion.button
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          onClick={handleSubmit}
                          className="mt-10 rounded-2xl bg-violet-600 px-8 py-5 text-lg font-medium text-white shadow-xl transition hover:scale-[1.03]"
                        >

                          Submit Your Brand Stack

                        </motion.button>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </FadeUp>

        </div>

      </section>

      {/* FOUNDER STORY */}
      <section className="pb-36">

        <div className="mx-auto max-w-7xl px-6">

          <FadeUp>

            <div className="space-y-16">

              {[
                "We kept seeing talented people getting ignored online.",
                "Not because they lacked skill.",
                "Not because they lacked ambition.",
                "The internet slowly became too noisy.",
                "That frustration eventually became Socieas.",
              ].map((line, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    x: 15,
                  }}
                  className="group border-b border-violet-100 pb-10"
                >

                  <div className="flex items-center justify-between gap-10">

                    <h2 className="max-w-5xl text-4xl font-bold leading-[1.08] text-[#1A1A1A] md:text-6xl">

                      {line}

                    </h2>

                    <div className="text-5xl text-violet-200 transition-all duration-300 group-hover:translate-x-2 group-hover:text-violet-500">

                      →

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          </FadeUp>

        </div>

      </section>

      {/* ONE WORD FROM FOUNDER */}
      <section className="pb-36">

        <div className="mx-auto max-w-7xl px-6">

          <FadeUp>

            <div className="relative overflow-hidden rounded-[56px] border border-violet-100 bg-[#151515] shadow-2xl">

              {/* GLOW */}
              <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-600/20 blur-3xl"></div>

              <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-violet-600/20 blur-3xl"></div>

              {/* GRID */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

              <div className="relative grid items-center gap-10 px-10 py-16 lg:grid-cols-[0.65fr_1fr]">

                {/* LEFT */}
                <div className="flex items-center justify-center">

                  <motion.div
                    whileHover={{
                      rotate: -5,
                      scale: 1.03,
                    }}
                    className="relative flex h-[260px] w-[260px] items-center justify-center overflow-hidden rounded-[42px] border border-violet-500/20 bg-white/5 backdrop-blur-xl"
                  >

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]"></div>

                    <div className="relative z-10 text-center text-white">

                      <div className="text-xs uppercase tracking-[0.35em] text-violet-300">

                        One Word

                      </div>

                      <div className="mt-5 text-7xl font-bold">

                        Real.

                      </div>

                    </div>

                  </motion.div>

                </div>

                {/* RIGHT */}
                <div>

                  <div className="text-4xl font-bold leading-[1.05] text-white md:text-5xl">

                    We wanted Socieas
                    to feel human.

                  </div>

                  <div className="mt-10 max-w-3xl space-y-6 text-xl leading-relaxed text-violet-100">

                    <p>

                      Not another agency hiding behind polished presentations and empty promises.

                    </p>

                    <p>

                      Something thoughtful. Honest. Emotional. Real.

                    </p>

                    <p className="font-medium text-white">

                      Because people remember what feels real.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </FadeUp>

        </div>

      </section>

      {/* MEMORY EXPERIENCE */}
      <section className="relative overflow-hidden pb-36">

        <div className="mx-auto max-w-7xl px-6">

          <FadeUp>

            <div className="rounded-[52px] border border-violet-100 bg-white p-16 shadow-2xl">

              <div className="text-center">

                <h2 className="text-5xl font-bold leading-[1.02] md:text-7xl">

                  What people
                  actually remember.

                </h2>

              </div>

              <div className="mt-24 flex flex-wrap items-center justify-center gap-8">

                {[
                  "Noise",
                  "Trends",
                  "Algorithms",
                  "Reach",
                  "Trust",
                  "Identity",
                  "Consistency",
                  "Connection",
                ].map((item, index) => (

                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.1,
                    }}
                    className={`cursor-pointer rounded-full px-8 py-5 text-2xl font-semibold transition-all duration-300 ${
                      index < 4
                        ? "bg-[#FAFAFA] text-gray-300 hover:opacity-20"
                        : "bg-violet-100 text-violet-700 hover:shadow-xl"
                    }`}
                  >

                    {item}

                  </motion.div>

                ))}

              </div>

            </div>

          </FadeUp>

        </div>

      </section>

      {/* INTERNET NEVER STOPS */}
      <section className="pb-36">

        <div className="relative overflow-hidden border-y border-violet-100 bg-white py-14">

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear",
            }}
            className="flex whitespace-nowrap text-6xl font-bold text-violet-100"
          >

            {Array(12)
              .fill("CONTENT • TRENDS • REACH • ALGORITHMS • NOISE • ")
              .map((item, index) => (

                <span key={index} className="mr-10">

                  {item}

                </span>

              ))}

          </motion.div>

        </div>

      </section>

      {/* PHILOSOPHY */}
      <section className="pb-36">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold leading-[1.02] md:text-7xl">

              Growth is not
              attention.

            </h2>

          </div>

          <div className="mt-20 grid gap-6 lg:grid-cols-2">

            {philosophyCards.map((item, index) => (

              <motion.div
                key={index}
                onClick={() => setActiveCard(index)}
                whileHover={{
                  y: -8,
                }}
                className={`cursor-pointer rounded-[38px] border p-10 transition-all duration-300 ${
                  activeCard === index
                    ? "border-violet-600 bg-violet-600 text-white shadow-2xl"
                    : "border-violet-100 bg-white shadow-lg"
                }`}
              >

                <div className="text-sm uppercase tracking-[0.3em]">

                  {item.title}

                </div>

                <div className="mt-8 text-4xl font-bold leading-[1.05]">

                  {item.content}

                </div>

                <div className="mt-10 flex items-center justify-between">

                  <div className="text-sm uppercase tracking-[0.25em] opacity-60">

                    Click To Explore

                  </div>

                  <div className="text-3xl">

                    ↗

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* SYSTEM CONNECTION */}
      <section className="pb-36">

        <div className="mx-auto max-w-7xl px-6">

          <FadeUp>

            <div className="relative overflow-hidden rounded-[52px] bg-[#151515] px-12 py-24 text-white shadow-2xl">

              <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl"></div>

              <div className="relative text-center">

                <h2 className="text-5xl font-bold leading-[1.02] md:text-7xl">

                  What happens
                  when systems
                  connect.

                </h2>

              </div>

              <div className="relative mt-24 flex flex-wrap items-center justify-center gap-8">

                {[
                  "Visibility",
                  "Trust",
                  "Positioning",
                  "Identity",
                  "Systems",
                  "Connection",
                  "Scale",
                ].map((item, index) => (

                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="relative rounded-full border border-violet-500/30 bg-white/5 px-8 py-5 text-xl font-semibold backdrop-blur-md"
                  >

                    {item}

                  </motion.div>

                ))}

              </div>

            </div>

          </FadeUp>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="pb-36">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <FadeUp>

            <h2 className="text-6xl font-bold leading-[1] md:text-7xl">

              You stayed this long
              because something
              here felt real.

            </h2>

            <p className="mx-auto mt-10 max-w-3xl text-2xl leading-relaxed text-[#666]">

              Let&apos;s build something
              people actually remember.

            </p>

            <button className="mt-14 rounded-2xl bg-violet-600 px-8 py-5 text-lg font-medium text-white transition hover:scale-[1.03]">

              Connect With Socieas

            </button>

          </FadeUp>

        </div>

      </section>

      <Footer />

    </main>
  );
}