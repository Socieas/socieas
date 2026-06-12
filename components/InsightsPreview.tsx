import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

export default async function InsightsPreview() {
  const posts = await client.fetch(allPostsQuery);

  const latestPosts = posts.slice(0, 3);

  return (
    <section className="bg-[#F8F8F6] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
              Insights worth
              <br />
              reading and sharing.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Explore our latest thinking on personal branding, AI automation,
              CRM, staffing, marketing, and founder growth.
            </p>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
          >
            View All Insights
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {latestPosts.map((post: any) => (
            <Link
              key={post.slug?.current}
              href={`/insights/${
                post.type === "case-study"
                  ? "case-studies"
                  : `${post.type}s`
              }/${post.slug.current}`}
              className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-[0_25px_70px_rgba(15,23,42,0.08)]"
            >
              {/* Featured Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                {post.mainImage?.asset?.url ? (
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
                  {post.category?.title || post.type || "Insight"}
                </div>

                <h3 className="mt-4 text-2xl font-black leading-tight text-[#111111] transition-colors duration-300 group-hover:text-violet-700">
                  {post.title}
                </h3>

                <p className="mt-4 line-clamp-3 text-base leading-7 text-slate-600">
                  {post.excerpt}
                </p>

                <div className="mt-8 inline-flex items-center text-sm font-semibold text-violet-700">
                  Read Insight →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}