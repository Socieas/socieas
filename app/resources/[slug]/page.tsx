// app/resources/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { generateSEOMetadata } from "@/lib/seo";
import LeadForm from "@/components/resources/LeadForm";
import {
  getCategoryMeta,
  getRelatedResources,
  getResource,
  resources,
} from "@/data/resources";

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return { title: "Not Found | Socieas" };
  return generateSEOMetadata({
    title: `${resource.title} — Free ${resource.type}`,
    description: resource.promise,
    path: `/resources/${resource.slug}`,
  });
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const category = getCategoryMeta(resource.category);
  const related = getRelatedResources(resource);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: resource.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="overflow-x-hidden bg-[#F7F7F5] text-[#111111]">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Resources", url: "https://socieas.com/resources" },
            {
              name: resource.title,
              url: `https://socieas.com/resources/${resource.slug}`,
            },
          ]),
          faqSchema,
        ]}
        id="resource-page-schema"
      />

      <Navbar />

      {/* HERO + FORM */}
      <section className="relative overflow-hidden bg-[#F8F8F6] pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-fuchsia-100/40 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Link
                href="/resources"
                className="text-sm font-semibold text-violet-600 hover:opacity-70"
              >
                ← All resources
              </Link>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-violet-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
                  {category.label}
                </span>
                <span className="rounded-full bg-[#F3F4F6] px-4 py-1.5 text-xs font-semibold text-slate-600">
                  Free {resource.type} · ⏱ {resource.time}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.04em] md:text-5xl lg:text-6xl">
                {resource.title}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                {resource.description}
              </p>

              <div className="mt-8 space-y-3">
                {resource.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm text-violet-700">
                      ✓
                    </span>
                    <p className="text-base leading-7 text-slate-700">{b}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <LeadForm
                resourceSlug={resource.slug}
                resourceTitle={resource.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <FadeUp>
        <section className="px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            <div className="rounded-[32px] border border-black/5 bg-white p-8 md:p-10">
              <h2 className="text-2xl font-black tracking-tight">
                This is for you if…
              </h2>
              <ul className="mt-5 space-y-3">
                {resource.whoFor.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span className="text-violet-600">✓</span>
                    <span className="leading-7 text-slate-700">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] border border-black/5 bg-white p-8 md:p-10">
              <h2 className="text-2xl font-black tracking-tight">
                Skip it if…
              </h2>
              <ul className="mt-5 space-y-3">
                {resource.whoNotFor.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span className="text-slate-400">✕</span>
                    <span className="leading-7 text-slate-700">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* FAQ */}
      <FadeUp>
        <section className="px-6 pb-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-black tracking-tight md:text-4xl">
              Questions, answered.
            </h2>
            <div className="mt-8 space-y-4">
              {resource.faqs.map((f) => (
                <div
                  key={f.question}
                  className="rounded-[24px] border border-black/5 bg-white p-7"
                >
                  <h3 className="text-lg font-bold">{f.question}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* RELATED */}
      {related.length > 0 && (
        <FadeUp>
          <section className="px-6 pb-24 sm:px-10 lg:px-20">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Pairs well with
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/resources/${r.slug}`}
                    className="group rounded-[24px] border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                      Free {r.type}
                    </span>
                    <h3 className="mt-3 text-xl font-black tracking-tight">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-slate-600">
                      {r.promise}
                    </p>
                    <span className="mt-5 inline-block text-sm font-bold text-violet-600 transition-transform duration-300 group-hover:translate-x-1">
                      Get it free →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>
      )}

      <Footer />
    </main>
  );
}
