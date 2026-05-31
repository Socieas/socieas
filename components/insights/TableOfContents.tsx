/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function TableOfContents({
  headings,
}: any) {

  if (!headings?.length)
    return null;

  return (
    <aside
      style={{
        position: "sticky",

        top: "120px",

        background: "white",

        border:
          "1px solid #E5E7EB",

        borderRadius: "24px",

        padding: "24px",

        height: "fit-content",

        boxShadow:
          "0 2px 10px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          fontSize: "14px",

          fontWeight: 700,

          color: "#111111",

          marginBottom: "18px",

          textTransform:
            "uppercase",

          letterSpacing:
            "0.5px",
        }}
      >
        Table Of Contents
      </div>

      <div
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "12px",
        }}
      >
        {headings.map(
          (
            heading: any,
            index: number
          ) => (
            <a
              key={index}
              href={`#${heading.id}`}
              style={{
                color: "#6B7280",

                textDecoration:
                  "none",

                lineHeight: 1.5,

                fontSize: "14px",

                transition:
                  "0.2s ease",
              }}
            >
              {heading.text}
            </a>
          )
        )}
      </div>
    </aside>
  );
}