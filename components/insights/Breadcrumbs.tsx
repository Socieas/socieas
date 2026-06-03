import Link from "next/link";

export default function Breadcrumbs({
  post,
}: any) {

  const basePath =
    post.type === "article"
      ? "/insights/articles"
      : post.type ===
          "case-study"
        ? "/insights/case-studies"
        : "/insights/blogs";

  const label =
    post.type === "article"
      ? "Articles"
      : post.type ===
          "case-study"
        ? "Case Studies"
        : "Blogs";

  return (
    <div
      style={{
        display: "flex",

        alignItems: "center",

        gap: "10px",

        flexWrap: "wrap",

        marginBottom: "28px",

        fontSize: "14px",

        color: "#6B7280",
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration:
            "none",

          color: "inherit",
        }}
      >
        Home
      </Link>

      <span>›</span>

      <Link
        href="/insights"
        style={{
          textDecoration:
            "none",

          color: "inherit",
        }}
      >
        Insights
      </Link>

      <span>›</span>

      <Link
        href={basePath}
        style={{
          textDecoration:
            "none",

          color: "inherit",
        }}
      >
        {label}
      </Link>

      <span>›</span>

      <span
        style={{
          color: "var(--text)",

          fontWeight: 600,
        }}
      >
        {post.title}
      </span>
    </div>
  );
}