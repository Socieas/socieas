// app/resources/view/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChecklistView from "@/components/resources/ChecklistView";
import { getResource } from "@/data/resources";
import { getResourceContent } from "@/data/resource-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  return {
    title: resource ? `${resource.title} | Socieas` : "Resource | Socieas",
    robots: { index: false, follow: false },
  };
}

export default async function ResourceViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const content = getResourceContent(slug);

  return (
    <main className="overflow-x-hidden bg-[#F7F7F5] text-[#111111]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#F8F8F6] pb-10 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-fuchsia-100/40 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-violet-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
              Free {resource.type}
            </span>
            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-600">
              ⏱ {resource.time} to complete
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.04em] md:text-5xl">
            {resource.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {resource.promise}
          </p>

          <div className="mt-8 overflow-hidden rounded-[28px] print:hidden">
            <Image
              src={`/images/resources/${resource.slug}.webp`}
              alt={resource.title}
              width={1600}
              height={1000}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          {content ? (
            <ChecklistView content={content} />
          ) : (
            <div className="mt-10 rounded-[28px] border border-violet-100 bg-white p-10 text-center">
              <div className="text-4xl">🛠</div>
              <h2 className="mt-4 text-2xl font-black tracking-tight">
                We are giving this one a final polish.
              </h2>
              <p className="mx-auto mt-3 max-w-md leading-8 text-slate-600">
                This resource goes live in the next few days. Your access link
                will keep working, so check back soon.
              </p>
            </div>
          )}

          <div className="mt-14 rounded-[28px] border border-violet-100 bg-white p-8 text-center md:p-10 print:hidden">
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
              Want this installed{" "}
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                for you?
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-8 text-slate-600">
              This is the exact system we build inside paid engagements. If you
              would rather have our team do it, book a free strategy call.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-violet-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
            >
              Book a Free Strategy Call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
