// app/resources/page.tsx
import Link from "next/link";
import Image from "next/image";
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

        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
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
            problem in minutes, not weeks. Free, forever.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <FadeUp>
        <section className="px-6 py-14 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/resources/${featured.slug}`}
              className="group grid gap-8 overflow-hidden rounded-[40px] border border-violet-100 bg-white p-8 shadow-[0_25px_70px_rgba(124,58,237,0.10)] transition-all duration-300 hover:-translate-y-1 md:grid-cols-[1fr_420px] md:items-center md:p-12"
            >
              <div>
                <div className="inline-flex items-center rounded-full bg-violet-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-violet-700">
                  ⭐ Most Downloaded
                </div>
                <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                  {featured.promise}
                </p>
                <span className="mt-7 inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-bold text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-violet-800">
                  Get it free →
                </span>
              </div>
              <div className="overflow-hidden rounded-[28px]">
                <Image
                  src={`/images/resources/${featured.slug}.webp`}
                  alt={featured.title}
                  width={1600}
                  height={1000}
                  priority
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
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
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-violet-100 bg-white p-10 text-center shadow-[0_25px_70px_rgba(124,58,237,0.10)] md:p-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-fuchsia-100/50 blur-3xl" />

            <h2 className="relative mx-auto max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
              Want us to install these systems{" "}
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                for you?
              </span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
              The resources are the blueprint. If you want the done for you
              version, book a call and we will map it together.
            </p>
            <Link
              href="/contact"
              className="relative mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(109,40,217,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
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
