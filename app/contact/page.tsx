"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FormPanel = dynamic(() => import("@/components/contact/FormPanel"), {
  ssr: false,
});

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

const pillars = ["Authority", "Trust", "Positioning"];

const recentUpdates = [
  {
    title: "Why Most Personal Brands Never Build Authority",
    category: "Personal Branding",
    link: "/insights/blogs/personal-brand-authority",
  },
  {
    title: "CRM Systems That Actually Improve Conversion",
    category: "CRM Strategy",
    link: "/insights/articles/crm-conversion-systems",
  },
  {
    title: "How Businesses Lose Leads Without Automation",
    category: "AI Automation",
    link: "/insights/case-studies/lead-automation",
  },
];

function InfoPanel() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted/60">
          Get In Touch
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Let&apos;s Build <br />
          Something <br />
          <span className="italic"> That Lasts</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted/80">
          Whether you&apos;re scaling a business, building a personal brand, or
          systemising your growth &mdash; we&apos;re here to help you move with
          clarity and precision.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {pillars.map((p) => (
          <span
            key={p}
            className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-medium text-foreground"
          >
            {p}
          </span>
        ))}
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted/60">
          We help with
        </p>
        <div className="flex flex-wrap gap-2">
          {growthNeeds.map((n) => (
            <span
              key={n}
              className="rounded-xl bg-black/5 px-3 py-1 text-xs text-foreground"
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted/60">
          Recent Insights
        </p>
        <ul className="space-y-3">
          {recentUpdates.map((u) => (
            <li key={u.title}>
              <Link
                href={u.link}
                className="group flex flex-col gap-0.5 rounded-xl p-3 transition hover:bg-black/5"
              >
                <span className="text-sm font-medium text-foreground group-hover:underline">
                  {u.title}
                </span>
                <span className="text-xs text-muted/60">{u.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9FAFB] px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <InfoPanel />
            <FormPanel />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
