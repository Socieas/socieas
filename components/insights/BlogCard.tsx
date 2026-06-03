import Link from "next/link";
import { SanityPost } from "@/lib/types";

export default function BlogCard({ post }: { post: SanityPost }) {
  const basePath =
    post.type === "article"
      ? "/insights/articles/"
      : post.type === "case-study"
        ? "/insights/case-studies/"
        : "/insights/blogs/";

  return (
    <Link
      href={`${basePath}${post.slug?.current}`}
      style={{
        display: "block",
        textDecoration: "none",
        background: "white",
        borderRadius: "24px",
        padding: "24px",
        border: "1px solid #E5E7EB",
        transition: "all 0.3s ease",
      }}
      className="hover-card"
    >
      <span
        style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: 700,
          color: "#7C3AED",
          letterSpacing: "0.5px",
          marginBottom: "12px",
          textTransform: "uppercase",
        }}
      >
        {post.category?.title || "Insights"}
      </span>

      <h3
        style={{
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "var(--text)",
          lineHeight: 1.3,
          marginBottom: "10px",
        }}
      >
        {post.title}
      </h3>

      <p
        style={{
          fontSize: "14px",
          color: "#6B7280",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.excerpt}
      </p>

      <div
        style={{
          marginTop: "20px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#7C3AED",
        }}
      >
        Read More →
      </div>
    </Link>
  );
}
