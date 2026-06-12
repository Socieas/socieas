import { ImageResponse } from "next/og";

export const runtime =
  "edge";

export const alt =
  "Socieas Insights";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

export async function GET(
  request: Request
) {

  const {
    searchParams,
  } = new URL(
    request.url
  );

  const title =
    searchParams.get(
      "title"
    ) ||
    "Socieas Insights";

  const category =
    searchParams.get(
      "category"
    ) || "Insights";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",

          height: "100%",

          display: "flex",

          flexDirection:
            "column",

          justifyContent:
            "space-between",

          background:
            "#0F0F11",

          padding:
            "70px",

          color: "white",

          fontFamily:
            "sans-serif",

          position:
            "relative",
        }}
      >
        {/* BACKGROUND GLOW */}

        <div
          style={{
            position:
              "absolute",

            width: "500px",

            height: "500px",

            borderRadius:
              "999px",

            background:
              "#7C3AED",

            filter:
              "blur(120px)",

            opacity: 0.18,

            top: "-120px",

            right: "-120px",
          }}
        />

        {/* TOP */}

        <div
          style={{
            display: "flex",

            flexDirection:
              "column",

            gap: "18px",

            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize:
                "26px",

              fontWeight:
                700,

              color:
                "#A78BFA",

              letterSpacing:
                "1px",
            }}
          >
            {category}
          </div>

          <div
            style={{
              fontSize:
                "72px",

              lineHeight:
                1.05,

              fontWeight:
                800,

              maxWidth:
                "950px",

              letterSpacing:
                "-2px",
            }}
          >
            {title}
          </div>
        </div>

        {/* BOTTOM */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize:
                "34px",

              fontWeight:
                800,
            }}
          >
            Socieas.
          </div>

          <div
            style={{
              display: "flex",

              alignItems:
                "center",

              gap: "14px",

              fontSize:
                "22px",

              color:
                "#D1D5DB",
            }}
          >
            <div
              style={{
                width: "12px",

                height: "12px",

                borderRadius:
                  "999px",

                background:
                  "#7C3AED",
              }}
            />

            Founder-led
            Growth Systems
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}