import Link from "next/link";

export default function NotFound() {

  return (

    <div
      style={{
        minHeight:
          "100vh",

        display: "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        background:
          "var(--background)",

        padding:
          "40px",
      }}
    >

      <div
        style={{
          textAlign:
            "center",

          maxWidth:
            "700px",
        }}
      >

        <h1
          style={{
            fontSize:
              "clamp(4rem,10vw,8rem)",

            fontWeight:
              800,

            color:
              "var(--text)",

            lineHeight:
              1,
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize:
              "2rem",

            marginTop:
              "20px",

            color:
              "var(--text)",
          }}
        >
          Page not found
        </h2>

        <p
          style={{
            color:
              "#6B7280",

            lineHeight:
              1.8,

            marginTop:
              "18px",

            marginBottom:
              "34px",
          }}
        >
          The page you are looking for
          does not exist or may have
          been moved.
        </p>

        <Link
          href="/"
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            padding:
              "14px 22px",

            borderRadius:
              "16px",

            background:
              "#7C3AED",

            color:
              "white",

            textDecoration:
              "none",

            fontWeight:
              600,
          }}
        >
          Back to Homepage
        </Link>

      </div>

    </div>
  );
}