"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    success,
    setSuccess,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function handleNewsletter() {

    if (!email) return;

    setLoading(true);

    setError("");

    setSuccess(false);

    try {

      const response =
        await fetch(
          "/api/newsletter",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
            }),
          }
        );

      if (
        !response.ok
      ) {

        throw new Error(
          "Failed"
        );
      }

      setSuccess(true);

      setEmail("");

    } catch (err) {

      setError(
        "Something went wrong."
      );

    } finally {

      setLoading(false);
    }
  }

  const services = [
    {
      title: "Personal Branding",
      href: "/services/personal-branding",
    },

    {
      title: "CRM Solutions",
      href: "/services/crm-solutions",
    },

    {
      title: "AI Automation",
      href: "/services/ai-automation",
    },

    {
      title: "Full Stack Development",
      href: "/services/full-stack-development",
    },

    {
      title: "Digital Marketing",
      href: "/services/digital-marketing",
    },

    {
      title: "Staffing Solutions",
      href: "/services/staffing-solutions",
    },
  ];

  return (

    <footer className="relative overflow-hidden border-t border-black/5 bg-[var(--background)]">

      {/* TOP SECTION */}

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-2
xl:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">

        {/* BRAND */}

        <div>

          <div className="text-[38px] font-black tracking-[-2px] text-black">
            Socieas.
          </div>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#6B7280]">
            Founder-led growth systems focused on visibility,
            positioning, and long-term digital authority.
          </p>

          {/* CONTACT */}

          <div className="mt-8 space-y-3">

            <a
              href="mailto:hello@socieas.com"
              className="block text-sm text-[#6B7280] transition hover:text-violet-600"
            >
              hello@socieas.com
            </a>

            <a
              href="tel:+9142874636"
              className="block text-sm text-[#6B7280] transition hover:text-violet-600"
            >
              +91 42874636
            </a>

          </div>

          {/* SOCIALS */}

          <div className="mt-8 flex flex-wrap gap-3">

            {[
              {
                name: "LinkedIn",
                href: "https://linkedin.com/company/socieas/",
              },

              {
                name: "Facebook",
                href: "https://facebook.com/socieas",
              },

              {
                name: "Instagram",
                href: "https://instagram.com/socieas",
              },

              {
                name: "X",
                href: "https://x.com/socieas",
              },
            ].map((item, index) => (

              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-black/10 bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[#6B7280] transition-all duration-300 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >

                {item.name}

                <ArrowUpRight
                  size={14}
                  className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />

              </a>
            ))}

          </div>

        </div>

        {/* SERVICES */}

        <div>

          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            Services
          </div>

          <div className="mt-7 space-y-4">

            {services.map(
              (service, index) => (

                <Link
                  key={index}
                  href={service.href}
                  className="group flex items-center justify-between text-sm text-[#6B7280] transition hover:text-violet-700"
                >

                  {service.title}

                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />

                </Link>
              )
            )}

          </div>

        </div>

        {/* COMPANY */}

        <div>

          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            Company
          </div>

          <div className="mt-7 space-y-4">

            {[
              {
                title: "About",
                href: "/about",
              },

              {
                title: "Blogs",
                href: "/insights/blogs",
              },

              {
                title: "Articles",
                href: "/insights/articles",
              },

              {
                title: "Case Studies",
                href: "/insights/case-studies",
              },

              {
                title: "Contact",
                href: "/contact",
              },
            ].map((item, index) => (

              <Link
                key={index}
                href={item.href}
                className="group flex items-center justify-between text-sm text-[#6B7280] transition hover:text-violet-700"
              >

                {item.title}

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />

              </Link>
            ))}

          </div>

        </div>

        {/* NEWSLETTER */}

        <div>

          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            Founder Insights
          </div>

          <p className="mt-7 text-sm leading-relaxed text-[#6B7280]">
            Weekly insights on founder visibility,
            positioning, AI systems, and scalable growth.
          </p>

          <div className="mt-8 rounded-[28px] border border-black/5 bg-[var(--surface)] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter your email"
              className="h-12 w-full rounded-2xl border border-black/10 bg-[var(--soft-surface)] px-4 text-sm outline-none transition focus:border-violet-400"
            />

            <button
              onClick={
                handleNewsletter
              }
              disabled={loading}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.01] disabled:opacity-70"
            >

              {loading
                ? "Subscribing..."
                : "Subscribe"}

              <ArrowUpRight size={15} />

            </button>

            {success && (

              <p className="mt-3 text-sm text-green-600">
                Successfully subscribed.
              </p>
            )}

            {error && (

              <p className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="border-t border-black/5">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-7 text-sm text-[#6B7280] lg:flex-row lg:items-center lg:justify-between">

          <div>
            © 2026 Socieas. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-6">

            <Link
              href="/privacy-policy"
              className="transition hover:text-violet-700"
            >
              Privacy Policy
            </Link>

            <Link
  href="/terms-and-conditions"
  className="transition hover:text-violet-700"
>
  Terms & Conditions
</Link>

          </div>

        </div>

      </div>

    </footer>
  );
}