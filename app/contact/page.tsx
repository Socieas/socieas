"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import { motion } from "framer-motion";
import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const growthNeeds = [
  "Personal Branding",
  "CRM Implementation",
  "SEO Visibility",
  "AI Automation",
  "Lead Generation",
  "Website Systems",
  "LinkedIn Positioning",
  "Content Marketing",
];

const pillars = [
  "Authority",
  "Trust",
  "Positioning",
];

const recentUpdates = [
  {
    title:
      "Why Most Personal Brands Never Build Authority",

    category:
      "Personal Branding",

    link:
      "/insights/blogs/personal-brand-authority",
  },

  {
    title:
      "CRM Systems That Actually Improve Conversion",

    category:
      "CRM Strategy",

    link:
      "/insights/articles/crm-conversion-systems",
  },

  {
    title:
      "How Businesses Lose Leads Without Automation",

    category:
      "AI Automation",

    link:
      "/insights/case-studies/lead-automation",
  },
];

// ─── SHARED STYLE ────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-2xl border border-black/5 bg-background px-6 py-5 text-lg text-foreground placeholder:text-muted/50 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10";

// ─── CONTACT INFO ────────────────────────────────────────────────────────────

function ContactInfoCard() {

  const rows = [
    {
      label: "Email",
      value:
        "hello@socieas.com",
    },

    {
      label: "Phone",
      value:
        "+91 9142874636",
    },

    {
      label: "Based In",
      value: "India",
    },
  ];

  return (

    <div className="rounded-[40px] border border-black/5 bg-white p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">

      <p className="text-xs uppercase tracking-[0.35em] text-primary">
        Reach Out
      </p>

      <div className="mt-10 space-y-10">

        {rows.map(
          ({
            label,
            value,
          }) => (

            <div key={label}>

              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                {label}
              </p>

              <p className="mt-3 text-2xl font-semibold tracking-tight">
                {value}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}

// ─── PHILOSOPHY ──────────────────────────────────────────────────────────────

function PhilosophyCard() {

  return (

    <div
      style={{
        position:
          "relative",

        overflow:
          "hidden",

        borderRadius:
          "40px",

        background:
          "linear-gradient(135deg,#7C3AED 0%,#5B21B6 55%,#4C1D95 100%)",

        padding:
          "40px",

        boxShadow:
          "0 32px 80px rgba(109,40,217,0.38),0 6px 20px rgba(0,0,0,0.16)",

        isolation:
          "isolate",
      }}
    >

      <div
        style={{
          position:
            "relative",

          zIndex: 1,
        }}
      >

        <div className="flex flex-wrap items-center justify-between gap-3">

          <span
            style={{
              fontSize:
                "11px",

              fontWeight:
                600,

              letterSpacing:
                "0.35em",

              textTransform:
                "uppercase",

              color:
                "rgba(255,255,255,0.52)",
            }}
          >
            Socieas Philosophy
          </span>

          <span
            style={{
              fontSize:
                "11px",

              fontWeight:
                600,

              letterSpacing:
                "0.25em",

              textTransform:
                "uppercase",

              color:
                "rgba(255,255,255,0.92)",

              background:
                "rgba(255,255,255,0.12)",

              border:
                "1px solid rgba(255,255,255,0.16)",

              borderRadius:
                "100px",

              padding:
                "8px 18px",
            }}
          >
            Personal Branding
          </span>

        </div>

        <h2
          style={{
            marginTop:
              "32px",

            fontSize:
              "clamp(32px,4vw,46px)",

            fontWeight:
              800,

            lineHeight:
              0.95,

            letterSpacing:
              "-0.04em",

            color:
              "#ffffff",
          }}
        >
          Visibility without
          <br />
          trust doesn&apos;t scale.
        </h2>

        <p
          style={{
            marginTop:
              "22px",

            fontSize:
              "17px",

            lineHeight:
              1.85,

            color:
              "rgba(255,255,255,0.68)",

            maxWidth:
              "380px",
          }}
        >
          Strong brands are built through positioning,
          systems, consistency, and authority — not random
          content and temporary attention.
        </p>

        <div
          style={{
            height: "1px",

            background:
              "rgba(255,255,255,0.12)",

            margin:
              "32px 0 28px",
          }}
        />

        <div className="grid grid-cols-3 gap-3">

          {pillars.map(
            (item) => (

              <motion.div
                key={item}
                whileHover={{
                  y: -4,
                }}
                style={{
                  borderRadius:
                    "20px",

                  border:
                    "1px solid rgba(255,255,255,0.15)",

                  background:
                    "rgba(255,255,255,0.10)",

                  padding:
                    "14px 8px",

                  textAlign:
                    "center",

                  fontSize:
                    "14px",

                  fontWeight:
                    600,

                  color:
                    "#ffffff",
                }}
              >
                {item}
              </motion.div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

// ─── FORM PANEL ──────────────────────────────────────────────────────────────

function FormPanel() {

  const router =
    useRouter();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);

    setError("");

    // Capture the form element BEFORE any await
    // After await, e.currentTarget becomes null (React synthetic event cleanup)
    const formEl = e.currentTarget;

    const formData =
      new FormData(formEl);

    const payload = {

      name:
        formData.get("name"),

      email:
        formData.get("email"),

      company:
        formData.get("company"),

      goal:
        formData.get("goal"),

      message:
        formData.get("message"),
    };

    try {

      const response =
        await fetch(
          "/api/contact",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      if (
        !response.ok
      ) {

        throw new Error(
          "Failed"
        );
      }

      formEl.reset();

      router.push(
        "/insights"
      );

    } catch (err) {

      setError(
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <form
      onSubmit={
        handleSubmit
      }
      className="overflow-hidden rounded-[42px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
    >

      <div className="border-b border-black/5 px-10 py-10 md:px-14">

        <div className="flex flex-wrap items-start justify-between gap-8">

          <div>

            <p className="text-xs uppercase tracking-[0.35em] text-primary">
              Start Your Project
            </p>

            <h2 className="mt-5 text-5xl font-bold leading-[0.92] tracking-[-0.05em]">
              What are
              <br />
              you trying
              <br />
              to improve?
            </h2>

          </div>

          <div className="rounded-2xl bg-surface px-5 py-4">

            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              Average Response
            </p>

            <p className="mt-2 text-lg font-semibold">
              Within 24 Hours
            </p>

          </div>

        </div>

        <div className="mt-10 flex flex-wrap gap-3">

          {growthNeeds.map(
            (item) => (

              <motion.button
                key={item}
                type="button"
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="rounded-2xl border border-primary/10 bg-primary/5 px-5 py-3 text-sm font-medium text-primary transition-all hover:bg-primary/10"
              >
                ✦ {item}
              </motion.button>
            )
          )}

        </div>

      </div>

      <div className="p-10 md:p-14">

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-3 block text-sm font-medium text-muted">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              autoComplete="name"
              className={inputCls}
            />

          </div>

          <div>

            <label className="mb-3 block text-sm font-medium text-muted">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className={inputCls}
            />

          </div>

          <div>

            <label className="mb-3 block text-sm font-medium text-muted">
              Company Name
            </label>

            <input
              type="text"
              name="company"
              placeholder="Your Company"
              autoComplete="organization"
              className={inputCls}
            />

          </div>

          <div>

            <label className="mb-3 block text-sm font-medium text-muted">
              Primary Goal
            </label>

            <select
              name="goal"
              className={inputCls}
            >

              <option value="">
                Select a goal…
              </option>

              <option>
                Personal Branding
              </option>

              <option>
                CRM Implementation
              </option>

              <option>
                SEO Optimization
              </option>

              <option>
                Lead Generation
              </option>

              <option>
                AI Automation
              </option>

              <option>
                Website Development
              </option>

            </select>

          </div>

          <div className="md:col-span-2">

            <label className="mb-3 block text-sm font-medium text-muted">
              What&apos;s Your Biggest Challenge Right Now?
            </label>

            <textarea
              rows={7}
              name="message"
              required
              placeholder="Tell us where your business is struggling or what you want to improve…"
              className={`${inputCls} resize-none rounded-3xl`}
            />

          </div>

        </div>

        <div className="mt-10 flex flex-col gap-6 rounded-[32px] bg-surface p-6 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              Socieas Systems
            </p>

            <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Strong positioning starts with better systems.
            </p>

          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="shrink-0 rounded-2xl bg-primary px-8 py-5 text-lg font-semibold text-white shadow-xl transition-all hover:bg-primary/90 disabled:opacity-70"
          >

            {loading
              ? "Sending..."
              : "Send Inquiry"}

          </motion.button>

        </div>

        {error && (

          <p className="mt-6 text-sm font-medium text-red-600">

            {error}

          </p>
        )}

      </div>

    </form>
  );
}

// ─── INSIGHT CARD ────────────────────────────────────────────────────────────

function InsightCard({
  title,
  category,
  link,
}: any) {

  return (

    <FadeUp>

      <motion.div
        whileHover={{
          y: -6,
        }}
        className="group rounded-[36px] border border-black/5 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all"
      >

        <p className="text-xs uppercase tracking-[0.3em] text-primary">
          {category}
        </p>

        <h3 className="mt-6 text-3xl font-bold leading-[1.1] tracking-[-0.04em] transition-colors group-hover:text-primary">
          {title}
        </h3>

        <Link
          href={link}
          className="mt-10 inline-flex text-lg font-medium text-primary transition-opacity hover:opacity-70"
        >
          Read More →
        </Link>

      </motion.div>

    </FadeUp>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ContactPage() {

  return (

    <main className="overflow-x-hidden bg-background text-foreground">

      <Navbar />

      <section className="relative overflow-hidden pt-36">

        <div className="mx-auto max-w-7xl px-6">

          <FadeUp>

            <div className="max-w-6xl">

              <div className="inline-flex items-center rounded-full border border-black/5 bg-white px-5 py-2 text-sm font-medium text-primary shadow-sm">
                Contact Socieas
              </div>

              <h1 className="mt-8 text-6xl font-bold leading-[0.85] tracking-[-0.06em] md:text-[110px]">
                Build a brand
                <br />
                people trust.
                <br />
                Build systems
                <br />
                that scale.
              </h1>

              <p className="mt-10 max-w-4xl text-xl leading-[1.9] text-muted md:text-2xl">
                From personal branding and CRM implementation to SEO systems and automation — Socieas helps businesses create memorable digital ecosystems designed for visibility, authority, and growth.
              </p>

            </div>

          </FadeUp>

          <div className="mt-24 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">

            <FadeUp>

              <div className="space-y-8">

                <ContactInfoCard />

                <PhilosophyCard />

              </div>

            </FadeUp>

            <FadeUp>

              <FormPanel />

            </FadeUp>

          </div>

        </div>

      </section>

      <section className="pb-36 pt-32">

        <div className="mx-auto max-w-7xl px-6">

          <FadeUp>

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              <div>

                <p className="text-xs uppercase tracking-[0.35em] text-primary">
                  Recent Updates
                </p>

                <h2 className="mt-6 text-5xl font-bold leading-[0.92] tracking-[-0.05em] md:text-7xl">
                  Insights shaping
                  <br />
                  modern growth.
                </h2>

              </div>

              <Link
                href="/insights"
                className="text-lg font-medium text-primary transition-opacity hover:opacity-70"
              >
                Explore Insights →
              </Link>

            </div>

          </FadeUp>

          <div className="mt-20 grid gap-8 md:grid-cols-3">

            {recentUpdates.map(
              (item) => (

                <InsightCard
                  key={item.link}
                  {...item}
                />
              )
            )}

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}
