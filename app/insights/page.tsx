import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { safeFetch } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { generateSEOMetadata } from "@/lib/seo";
import { SanityPost } from "@/lib/types";

export const metadata = generateSEOMetadata({
  title: "Insights",
  description:
    "Explore blogs, articles, and case studies from Socieas on AI automation, CRM systems, staffing, and business growth.",
  path: "/insights",
});

export const revalidate = 60;

export default async function InsightsHubPage() {
  const posts = await safeFetch<SanityPost>(allPostsQuery);

  const blogs = posts.filter((p: any) => p.type === "blog").slice(0, 3);
  const articles = posts.filter((p: any) => p.type === "article").slice(0, 3);
  const caseStudies = posts
    .filter((p: any) => p.type === "case-study")
    .slice(0, 3);

  const sections = [
    {
      label: "Blogs",
      description: "SEO-focused educational content on growth, CRM, and AI.",
      href: "/insights/blogs",
      posts: blogs,
    },
    {
      label: "Articles",
      description: "Strategic and research-backed insights for founders.",
      href: "/insights/articles",
      posts: articles,
    },
    {
      label: "Case Studies",
      description: "Real execution and transformation breakdowns.",
      href: "/insights/case-studies",
      posts: caseStudies,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* HERO */}
        <section className="bg-gradient-to-br from-violet-50 to-white py-20 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700 mb-6">
              Insights
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight text-[#111111] mb-6">
              Ideas, Research & Real Results
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Explore our latest thinking across blogs, articles, and case
              studies — all focused on helping businesses scale smarter.
            </p>
          </div>
        </section>

        {/* SECTIONS */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-7xl space-y-20">
            {sections.map((section) => section.posts.length > 0 && (
              <div key={section.label}>
                {/* SECTION HEADER */}
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-2">
                      {section.label}
                    </p>
                    <h2 className="text-3xl font-black text-[#111111]">
                      {section.description}
                    </h2>
                  </div>
                  <Link
                    href={section.href}
                    className="hidden md:inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-700"
                  >
                    View All {section.label}
                  </Link>
                </div>

                {/* POSTS GRID */}
                {section.posts.length > 0 ? (
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {section.posts.map((post: any) => (
                      <Link
                        key={post.slug?.current}
                        href={`/insights/${section.label.toLowerCase().replace(" ", "-")}/${post.slug?.current}`}
                        className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
                          {post.category?.title || section.label}
                        </p>
                        <h3 className="text-lg font-bold text-[#111111] leading-snug mb-3 group-hover:text-violet-700 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center">
                    <p className="text-gray-400 text-sm">Coming soon — check back shortly.</p>
                  </div>
                )}

                {/* MOBILE CTA */}
                <div className="mt-8 md:hidden">
                  <Link
                    href={section.href}
                    className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white"
                  >
                    View All {section.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
