import { SanityPost } from "@/lib/types";
import Link from "next/link";

export default function FeaturedBlog({ post }: { post: SanityPost }) {
  const basePath =
    post.type === "article"
      ? "/insights/articles/"
      : post.type === "case-study"
        ? "/insights/case-studies/"
        : "/insights/blogs/";

  return (
    <section
      style={{
        padding: "0 24px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <Link
          href={`${basePath}${post.slug?.current}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            background: "white",
            padding: "40px",
            borderRadius: "40px",
            border: "1px solid #E5E7EB",
            textDecoration: "none",
            alignItems: "center",
          }}
          className="hover-card group"
        >
          {/* IMAGE PLACEHOLDER */}
          <div
            style={{
              aspectRatio: "16/10",
              background: "#F5F3FF",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "4rem",
            }}
          >
            ✦
          </div>

          <div>
            <span
              style={{
                background: "#7C3AED",
                color: "white",
                padding: "8px 14px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Featured {post.type}
            </span>

            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 1,
                marginTop: "24px",
                marginBottom: "20px",
              }}
              className="group-hover:text-violet-700 transition"
            >
              {post.title}
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                color: "#6B7280",
                lineHeight: 1.7,
                marginBottom: "30px",
              }}
            >
              {post.excerpt}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "full",
                  background: "#7C3AED",
                }}
              />
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "var(--text)",
                }}
              >
                {post.author?.name || "Socieas"}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
