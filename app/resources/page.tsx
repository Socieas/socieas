// app/resources/page.tsx
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { generateSEOMetadata } from "@/lib/seo";
import ResourceExplorer from "@/components/resources/ResourceExplorer";
import { getFeaturedResource, resources } from "@/data/resources";

export const metadata = generateSEOMetadata({
  title: "Free Resources for Founders | Checklists, Templates & Systems",
  description:
    "Steal the systems we install for clients. Free checklists, templates, prompt packs, and worksheets for personal branding, AI automation, CRM, digital marketing, and hiring.",
  path: "/resources",
});

export default function ResourcesPage() {
  const featured = getFeaturedResource();

  return (
    <main className="overflow-x-hidden bg-[#F7F7F5] text-[#111111]">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://socieas.com" },
          { name: "Resources", url: "https://socieas.com/resources" },
        ])}
        id="resources-page-schema"
      />

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F8F8F6] pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-fuchsia-100/40 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            🧲 Free Founder Resources
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl">
            Steal the systems we{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              install for clients.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Not another PDF library. Every resource here solves one complete
            problem — in minutes, not weeks. Free, forever.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <FadeUp>
        <section className="px-6 py-14 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/resources/${featured.slug}`}
              className="group grid gap-8 rounded-[40px] bg-gradient-to-br from-violet-700 to-fuchsia-600 p-10 text-white shadow-[0_25px_60px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-1 md:grid-cols-[1fr_auto] md:items-center md:p-14"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-200">
                  ⭐ Most Downloaded
                </div>
                <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-violet-100">
                  {featured.promise}
                </p>
              </div>
              <span className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-bold text-violet-700 transition-transform duration-300 group-hover:scale-105">
                Get it free →
              </span>
            </Link>
          </div>
        </section>
      </FadeUp>

      {/* EXPLORER */}
      <FadeUp>
        <section className="px-6 pb-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <ResourceExplorer resources={resources} />
          </div>
        </section>
      </FadeUp>

      {/* CTA */}
      <FadeUp>
        <section className="px-6 pb-24 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl rounded-[40px] bg-[#111111] p-10 text-center md:p-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight text-white md:text-5xl">
              Want us to install these systems{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                for you?
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-400">
              The resources are the blueprint. If you want the done-for-you
              version, let's talk.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-500"
            >
              Book a Free Strategy Call
            </Link>
          </div>
        </section>
      </FadeUp>

      <Footer />
    </main>
  );
}
