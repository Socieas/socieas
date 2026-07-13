"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

const viewportSoft = { once: true, amount: 0.1 };

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const hoverLift = { y: -6 };

const dateFormat = {
  day: "numeric",
  month: "short",
  year: "numeric",
} as const;

type PostItem = {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt?: string;
  publishedAt?: string;
  type?: string;
  category?: { title?: string };
};

function postPath(post: PostItem) {
  const slug = post.slug?.current || "";
  if (post.type === "blog") return `/insights/blogs/${slug}`;
  if (post.type === "article") return `/insights/articles/${slug}`;
  return `/insights/case-studies/${slug}`;
}

function postLabel(post: PostItem) {
  if (post.category?.title) return post.category.title;
  if (post.type === "blog") return "Blog";
  if (post.type === "article") return "Article";
  return "Case Study";
}

export default function InsightsEcosystem() {
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    let active = true;
    client
      .fetch(allPostsQuery)
      .then((data: PostItem[]) => {
        if (active && Array.isArray(data)) {
          setPosts(data.slice(0, 3));
        }
      })
      .catch(() => {
        if (active) setPosts([]);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-[#F8F8F6] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              We publish <span className="text-violet-600">what we practice.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Strategies, teardowns, and lessons from real client work,
              documented publicly. Judge our thinking before you pay for it.
            </p>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center rounded-2xl bg-violet-700 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-800"
          >
            Explore All Insights
          </Link>
        </div>

        {posts.length > 0 ? (
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="mt-10 grid gap-5 md:grid-cols-3"
          >
            {posts.map((post) => (
              <motion.div key={post._id} variants={itemVariants} whileHover={hoverLift}>
                <Link
                  href={postPath(post)}
                  className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-violet-300"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                        {postLabel(post)}
                      </span>
                      {post.publishedAt && (
                        <span className="text-xs font-medium text-slate-400">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-GB",
                            dateFormat
                          )}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-xl font-black leading-snug text-[#111111]">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <span className="mt-6 text-sm font-semibold text-violet-600">
                    Read more →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoft}
            className="mt-10 grid gap-5 md:grid-cols-3"
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/insights/blogs"
                className="block rounded-3xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-violet-300"
              >
                <h3 className="text-xl font-black text-[#111111]">Blogs</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Practical growth tactics you can use this week.
                </p>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/insights/articles"
                className="block rounded-3xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-violet-300"
              >
                <h3 className="text-xl font-black text-[#111111]">Articles</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Deep dives on positioning, systems, and search.
                </p>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/insights/case-studies"
                className="block rounded-3xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-violet-300"
              >
                <h3 className="text-xl font-black text-[#111111]">Case Studies</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Real client work, documented honestly.
                </p>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
