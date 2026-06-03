import Link from "next/link";
import { SanityPost } from "@/lib/types";

export default function RelatedArticles({ posts }: { posts: SanityPost[] }) {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "white",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: "40px",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#7C3AED",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Keep Reading
            </span>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "var(--text)",
                marginTop: "12px",
              }}
            >
              Related Insights
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/insights/${post.type === "article" ? "articles" : post.type === "case-study" ? "case-studies" : "blogs"}/${post.slug?.current}`}
              style={{
                textDecoration: "none",
              }}
              className="group"
            >
              <div
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "var(--soft-surface)",
                  aspectRatio: "16/9",
                  position: "relative",
                  marginBottom: "20px",
                }}
              >
                {/* Fallback for image */}
                <div style={{ width: '100%', height: '100%', background: '#7C3AED', opacity: 0.1 }} />
              </div>

              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#7C3AED",
                }}
              >
                {post.category?.title}
              </span>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginTop: "8px",
                  lineHeight: 1.3,
                }}
                className="group-hover:text-violet-600 transition"
              >
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
