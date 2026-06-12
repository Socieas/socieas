import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

/* =========================
   METADATA
========================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://socieas.com"),

  title:
    "Socieas | AI Automation, CRM & IT Staffing Agency in India",

  description:
    "Socieas helps startups and growing businesses scale with IT staffing, CRM implementation, AI automation, and digital marketing solutions.",

  openGraph: {
    title:
      "Socieas | AI Automation, CRM & IT Staffing Agency in India",

    description:
      "Socieas helps startups and growing businesses scale with IT staffing, CRM implementation, AI automation, and digital marketing solutions.",

    url: "https://socieas.com",

    siteName: "Socieas",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Socieas - AI Automation, CRM & IT Staffing Agency",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Socieas | AI Automation, CRM & IT Staffing Agency in India",

    description:
      "Socieas helps startups and growing businesses scale with IT staffing, CRM implementation, AI automation, and digital marketing solutions.",

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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: "Socieas",
    url: "https://socieas.com",
    logo: "https://socieas.com/logo.png",

    sameAs: [
      "https://www.linkedin.com/company/socieas",
      "https://www.instagram.com/socieas",
      "https://x.com/socieas",
      "https://www.facebook.com/socieas",
    ],

    description:
      "Socieas helps businesses scale through AI automation, CRM systems, IT staffing, digital marketing, and full-stack development.",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationSchema
            ),
          }}
        />
      </head>

      <body className="antialiased">
        {children}
        <GoogleTagManager gtmId="GTM-NTK3Q4P9" />
      </body>
    </html>
  );
}