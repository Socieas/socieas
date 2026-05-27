import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

/* =========================
   PRIMARY FONT SYSTEM
========================= */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

/* =========================
   METADATA
========================= */

export const metadata: Metadata = {

  metadataBase:
    new URL("https://socieas.com"),

  title:
    "Socieas | Personal Branding Agency for Founders & Professionals",

  description:
    "Socieas helps brands build stronger positioning, visibility, SEO systems, automation, and scalable digital growth ecosystems.",

  openGraph: {

    title:
      "Socieas | Personal Branding Agency for Founders & Professionals",

    description:
      "Socieas helps brands build stronger positioning, visibility, SEO systems, automation, and scalable digital growth ecosystems.",

    url:
      "https://socieas.com",

    siteName:
      "Socieas",

    images: [
      {
        url:
          "/og-image.jpg",

        width:
          1200,

        height:
          630,

        alt:
          "Socieas",
      },
    ],

    locale:
      "en_US",

    type:
      "website",
  },

  twitter: {

    card:
      "summary_large_image",

    title:
      "Socieas | Personal Branding Agency for Founders & Professionals",

    description:
      "Socieas helps brands build stronger positioning, visibility, SEO systems, automation, and scalable digital growth ecosystems.",

    images: [
      "/og-image.jpg",
    ],
  },

  robots: {

    index: true,

    follow: true,

    googleBot: {

      index: true,

      follow: true,

      "max-video-preview":
        -1,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,
    },
  },
};

/* =========================
   ROOT LAYOUT
========================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const organizationSchema = {

    "@context":
      "https://schema.org",

    "@type":
      "Organization",

    name:
      "Socieas",

    url:
      "https://socieas.com",

    logo:
      "https://socieas.com/logo.png",

    sameAs: [

      "https://www.linkedin.com/company/socieas",

    ],

    description:
      "Socieas helps businesses scale through AI automation, CRM systems, digital marketing, staffing solutions, and founder visibility infrastructure.",
  };

  return (

    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >

      <body className="min-h-screen overflow-x-hidden bg-background text-foreground">

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                organizationSchema
              ),
          }}
        />

        {children}

      </body>

    </html>

  );
}