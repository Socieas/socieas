import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schema/organization";
import { websiteSchema } from "@/lib/schema/website";

/* =========================
   METADATA
========================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://socieas.com"),

  title: "Socieas | Personal Branding & AI Growth Systems for Founders",

  description:
    "Socieas helps founders and growing businesses worldwide build authority and scale through personal branding, AI automation, CRM systems, digital marketing, and full stack development.",

  openGraph: {
    title: "Socieas | Personal Branding & AI Growth Systems for Founders",

    description:
      "Socieas helps founders and growing businesses worldwide build authority and scale through personal branding, AI automation, CRM systems, digital marketing, and full stack development.",

    url: "https://socieas.com",

    siteName: "Socieas",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Socieas | Personal Branding & AI Growth Systems",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Socieas | Personal Branding & AI Growth Systems for Founders",

    description:
      "Socieas helps founders and growing businesses worldwide build authority and scale through personal branding, AI automation, CRM systems, digital marketing, and full stack development.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
  return (
    <html lang="en">
      <head>
        <JsonLd
          schema={[organizationSchema, websiteSchema]}
          id="global-organization-schema"
        />
      </head>

      <body className="antialiased">
        {children}
        <GoogleTagManager gtmId="GTM-NTK3Q4P9" />
      </body>
    </html>
  );
}
