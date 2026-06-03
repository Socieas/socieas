"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ThemeToggle from "./ThemeToggle";

import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

export default function Navbar() {

  const pathname =
    usePathname();

  const [
    servicesOpen,
    setServicesOpen,
  ] = useState(false);

  const [
    insightsOpen,
    setInsightsOpen,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  useEffect(() => {

    if (mobileMenuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };

  }, [mobileMenuOpen]);

  const services = [
    {
      title:
        "Personal Branding",

      desc:
        "Founder visibility and authority systems.",

      href:
        "/services/personal-branding",
    },

    {
      title:
        "CRM Solutions",

      desc:
        "Connected business workflow systems.",

      href:
        "/services/crm-solutions",
    },

    {
      title:
        "AI Automation",

      desc:
        "Operational automation and AI workflows.",

      href:
        "/services/ai-automation",
    },

    {
      title:
        "Full Stack Development",

      desc:
        "Modern scalable digital infrastructure.",

      href:
        "/services/full-stack-development",
    },

    {
      title:
        "Digital Marketing",

      desc:
        "Growth systems and audience acquisition.",

      href:
        "/services/digital-marketing",
    },

    {
      title:
        "Staffing Solutions",

      desc:
        "Operational hiring and scaling systems.",

      href:
        "/services/staffing-solutions",
    },
  ];

  const insights = [
    {
      title:
        "Blogs",

      desc:
        "SEO-focused educational content.",

      href:
        "/insights/blogs",
    },

    {
      title:
        "Articles",

      desc:
        "Strategic and research insights.",

      href:
        "/insights/articles",
    },

    {
      title:
        "Case Studies",

      desc:
        "Real execution and transformation breakdowns.",

      href:
        "/insights/case-studies",
    },
  ];

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full px-3 pt-3 sm:px-5">

        <div className="mx-auto max-w-[1380px]">

          {/* NAVBAR */}

          <div className="relative flex h-[68px] items-center justify-between rounded-[24px] border border-white/40 bg-[var(--surface)]/80 px-5 shadow-[0_8px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition-all duration-300 sm:px-7">

            {/* LEFT */}

            <div className="flex items-center">

              {/* LOGO */}

              <Link
                href="/"
                className="shrink-0 text-[25px] font-black tracking-[-0.08em] text-[var(--text)] transition duration-300 hover:opacity-80"
              >
                Socieas.
              </Link>

              {/* DESKTOP NAV */}

              <nav className="ml-16 hidden items-center gap-1 xl:flex">

                {/* HOME */}

                <Link
                  href="/"
                  className={`rounded-full px-4 py-2 text-[14px] font-medium transition-all duration-300 hover:bg-violet-50 hover:text-violet-700 ${
                    pathname === "/"
                      ? "bg-violet-50 text-violet-700"
                      : "text-[#6B7280]"
                  }`}
                >
                  Home
                </Link>

                {/* SERVICES */}

                <div
                  className="relative"
                  onMouseEnter={() =>
                    setServicesOpen(true)
                  }
                  onMouseLeave={() =>
                    setServicesOpen(false)
                  }
                >

                  <div
                    className={`flex items-center rounded-full transition-all duration-300 hover:bg-violet-50 ${
                      pathname.startsWith("/services")
                        ? "bg-violet-50"
                        : ""
                    }`}
                  >

                    <Link
                      href="/services"
                      className={`px-4 py-2 text-[14px] font-medium transition-all duration-300 ${
                        pathname.startsWith("/services")
                          ? "text-violet-700"
                          : "text-[#6B7280]"
                      }`}
                    >
                      Services
                    </Link>

                    <button
                      type="button"
                      aria-label="Toggle Services Menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        setServicesOpen(
                          !servicesOpen
                        );
                      }}
                      className="pr-4"
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-all duration-300 ${
                          servicesOpen
                            ? "rotate-180 text-violet-700"
                            : "text-[#6B7280]"
                        }`}
                      />
                    </button>

                  </div>

                  {/* SERVICES DROPDOWN */}

                  <div
                    className={`absolute left-1/2 top-[calc(100%+18px)] z-50 w-[460px] max-w-[92vw] -translate-x-1/2 transition-all duration-300 ${
                      servicesOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-4 opacity-0"
                    }`}
                  >

                    <div className="rounded-[28px] border border-black/5 bg-[var(--surface)] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

                      <Link
                        href="/services"
                        className="group mb-3 block rounded-[22px] bg-violet-50 p-5 transition-all duration-300 hover:bg-violet-100"
                      >

                        <div className="flex items-start justify-between">

                          <div>

                            <div className="text-[15px] font-semibold text-black">
                              Explore All Services
                            </div>

                            <div className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                              Branding, AI automation, CRM systems, marketing, and scalable infrastructure.
                            </div>

                          </div>

                          <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          />

                        </div>

                      </Link>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                        {services.map(
                          (
                            item,
                            index
                          ) => (
                            <Link
                              key={index}
                              href={item.href}
                              className="group rounded-[20px] border border-transparent p-4 transition-all duration-300 hover:border-violet-100 hover:bg-violet-50/70"
                            >

                              <div className="flex items-start justify-between">

                                <div className="text-[14px] font-semibold text-black">
                                  {item.title}
                                </div>

                                <ArrowUpRight
                                  size={15}
                                  className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-0 group-hover:opacity-100"
                                />

                              </div>

                              <div className="mt-2 text-xs leading-relaxed text-[#6B7280]">
                                {item.desc}
                              </div>

                            </Link>
                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

                {/* INSIGHTS */}

                <div
                  className="relative"
                  onMouseEnter={() =>
                    setInsightsOpen(true)
                  }
                  onMouseLeave={() =>
                    setInsightsOpen(false)
                  }
                >

                  <div
                    className={`flex items-center rounded-full transition-all duration-300 hover:bg-violet-50 ${
                      pathname.startsWith("/insights")
                        ? "bg-violet-50"
                        : ""
                    }`}
                  >

                    <Link
                      href="/insights"
                      className={`px-4 py-2 text-[14px] font-medium transition-all duration-300 ${
                        pathname.startsWith("/insights")
                          ? "text-violet-700"
                          : "text-[#6B7280]"
                      }`}
                    >
                      Insights
                    </Link>

                    <button
                      type="button"
                      aria-label="Toggle Insights Menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInsightsOpen(
                          !insightsOpen
                        );
                      }}
                      className="pr-4"
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-all duration-300 ${
                          insightsOpen
                            ? "rotate-180 text-violet-700"
                            : "text-[#6B7280]"
                        }`}
                      />
                    </button>

                  </div>

                  {/* INSIGHTS DROPDOWN */}

                  <div
                    className={`absolute left-1/2 top-[calc(100%+18px)] z-50 w-[340px] max-w-[92vw] -translate-x-1/2 transition-all duration-300 ${
                      insightsOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-4 opacity-0"
                    }`}
                  >

                    <div className="rounded-[28px] border border-black/5 bg-[var(--surface)] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

                      <Link
                        href="/insights"
                        className="group mb-3 block rounded-[22px] bg-violet-50 p-5 transition-all duration-300 hover:bg-violet-100"
                      >

                        <div className="flex items-start justify-between">

                          <div>

                            <div className="text-[15px] font-semibold text-black">
                              Explore All Insights
                            </div>

                            <div className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                              Blogs, articles, case studies, and growth systems.
                            </div>

                          </div>

                          <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          />

                        </div>

                      </Link>

                      <div className="grid gap-2">

                        {insights.map(
                          (
                            item,
                            index
                          ) => (
                            <Link
                              key={index}
                              href={item.href}
                              className="group rounded-[20px] border border-transparent p-4 transition-all duration-300 hover:border-violet-100 hover:bg-violet-50/70"
                            >

                              <div className="flex items-start justify-between">

                                <div className="text-[14px] font-semibold text-black">
                                  {item.title}
                                </div>

                                <ArrowUpRight
                                  size={15}
                                  className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-0 group-hover:opacity-100"
                                />

                              </div>

                              <div className="mt-2 text-xs leading-relaxed text-[#6B7280]">
                                {item.desc}
                              </div>

                            </Link>
                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

                {/* ABOUT */}

                <Link
                  href="/about"
                  className={`rounded-full px-4 py-2 text-[14px] font-medium transition-all duration-300 hover:bg-violet-50 hover:text-violet-700 ${
                    pathname === "/about"
                      ? "bg-violet-50 text-violet-700"
                      : "text-[#6B7280]"
                  }`}
                >
                  About
                </Link>

              </nav>

            </div>

            {/* RIGHT */}

            <div className="hidden items-center gap-3 xl:flex">

              <ThemeToggle />

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-[14px] font-semibold text-violet-700 transition-all duration-300 hover:border-violet-300 hover:bg-violet-100"
              >

                Book Call

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />

              </Link>

            </div>

            {/* MOBILE RIGHT */}

            <div className="flex items-center gap-3 xl:hidden">

              <ThemeToggle />

              <button
                onClick={() =>
                  setMobileMenuOpen(
                    !mobileMenuOpen
                  )
                }
                aria-label="Toggle Mobile Menu"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-[var(--surface)] shadow-sm transition-all duration-300 hover:bg-[var(--soft-surface)]"
              >
                {mobileMenuOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>

            </div>

          </div>

          {/* MOBILE MENU */}

          <div
            className={`xl:hidden transition-all duration-500 ${
              mobileMenuOpen
                ? "visible mt-3 translate-y-0 opacity-100"
                : "invisible pointer-events-none -translate-y-4 opacity-0"
            }`}
          >

            <div className="overflow-hidden rounded-[26px] border border-black/5 bg-[var(--surface)]/85 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">

              <div className="max-h-[82vh] overflow-y-auto px-5 py-5">

                <div className="space-y-2">

                  <Link
                    href="/"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`flex items-center justify-between rounded-2xl px-5 py-4 text-[15px] font-semibold transition-all duration-300 ${
                      pathname === "/"
                        ? "bg-violet-50 text-violet-700"
                        : "text-black hover:bg-[var(--soft-surface)]"
                    }`}
                  >
                    Home
                  </Link>

                  {/* SERVICES */}

                  <div className="rounded-[24px] border border-black/5 bg-[var(--soft-surface)] p-2">

                    <div className="flex items-center justify-between px-3 py-2">

                      <Link
                        href="/services"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                        className="text-[15px] font-semibold text-black"
                      >
                        Services
                      </Link>

                      <button
                        onClick={() =>
                          setServicesOpen(
                            !servicesOpen
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface)]"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            servicesOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                    </div>

                    <div
                      className={`grid transition-all duration-300 ${
                        servicesOpen
                          ? "mt-2 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >

                      <div className="overflow-hidden">

                        <div className="space-y-2 px-2 pb-2">

                          <Link
                            href="/services"
                            onClick={() =>
                              setMobileMenuOpen(false)
                            }
                            className="block rounded-2xl bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700"
                          >
                            Explore All Services
                          </Link>

                          {services.map(
                            (
                              item,
                              index
                            ) => (
                              <Link
                                key={index}
                                href={item.href}
                                onClick={() =>
                                  setMobileMenuOpen(false)
                                }
                                className="block rounded-2xl bg-[var(--surface)] px-4 py-4 transition-all duration-300 hover:bg-violet-50"
                              >

                                <div className="text-sm font-semibold text-black">
                                  {item.title}
                                </div>

                                <div className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                                  {item.desc}
                                </div>

                              </Link>
                            )
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* INSIGHTS */}

                  <div className="rounded-[24px] border border-black/5 bg-[var(--soft-surface)] p-2">

                    <div className="flex items-center justify-between px-3 py-2">

                      <Link
                        href="/insights"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                        className="text-[15px] font-semibold text-black"
                      >
                        Insights
                      </Link>

                      <button
                        onClick={() =>
                          setInsightsOpen(
                            !insightsOpen
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface)]"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            insightsOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                    </div>

                    <div
                      className={`grid transition-all duration-300 ${
                        insightsOpen
                          ? "mt-2 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >

                      <div className="overflow-hidden">

                        <div className="space-y-2 px-2 pb-2">

                          <Link
                            href="/insights"
                            onClick={() =>
                              setMobileMenuOpen(false)
                            }
                            className="block rounded-2xl bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700"
                          >
                            Explore All Insights
                          </Link>

                          {insights.map(
                            (
                              item,
                              index
                            ) => (
                              <Link
                                key={index}
                                href={item.href}
                                onClick={() =>
                                  setMobileMenuOpen(false)
                                }
                                className="block rounded-2xl bg-[var(--surface)] px-4 py-4 transition-all duration-300 hover:bg-violet-50"
                              >

                                <div className="text-sm font-semibold text-black">
                                  {item.title}
                                </div>

                                <div className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                                  {item.desc}
                                </div>

                              </Link>
                            )
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* ABOUT */}

                  <Link
                    href="/about"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`flex items-center justify-between rounded-2xl px-5 py-4 text-[15px] font-semibold transition-all duration-300 ${
                      pathname === "/about"
                        ? "bg-violet-50 text-violet-700"
                        : "text-black hover:bg-[var(--soft-surface)]"
                    }`}
                  >
                    About
                  </Link>

                </div>

                {/* CTA */}

                <Link
                  href="/contact"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-700"
                >

                  Book Strategy Call

                  <ArrowUpRight size={16} />

                </Link>

              </div>

            </div>

          </div>

        </div>

      </header>
    </>
  );
}