// app/resources/thank-you/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import { getRelatedResources, getResource } from "@/data/resources";

export const metadata = {
  title: "Check your inbox | Socieas",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const related = getRelatedResources(resource);

  return (
    <main className="overflow-x-hidden bg-[#F7F7F5] text-[#111111]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#F8F8F6] pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-fuchsia-100/40 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-4xl shadow-[0_18px_45px_rgba(109,40,217,0.3)]">
            📬
          </div>

          <h1 className="mt-8 text-4xl font-black leading-[1.05] tracking-[-0.04em] md:text-5xl">
            It's on the way.
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-slate-600">
            <strong className="text-[#111111]">{resource.title}</strong> is
            heading to your inbox right now. If it's not there in 2 minutes,
            check your spam or promotions folder.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-[24px] border border-violet-100 bg-white p-6 text-left shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
              While you wait
            </p>
            <p className="mt-2 leading-7 text-slate-600">
              Most founders who download this end up asking us one question:
              <em> "Can you just build this for me?"</em> — If that's you,
              skip the line.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800"
            >
              Book a Free Strategy Call
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <FadeUp>
          <section className="px-6 py-16 sm:px-10 lg:px-20">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-center text-3xl font-black tracking-tight">
                Grab these too — they stack.
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
