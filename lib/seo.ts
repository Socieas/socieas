import type { Metadata } from "next";

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function generateSEOMetadata({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
}: SEOProps): Metadata {

  const siteName =
    "Socieas";

  const siteUrl =
    "https://socieas.com";

  const fullTitle =
    `${title} | ${siteName}`;

  const fullUrl =
    `${siteUrl}${path}`;

  return {

    metadataBase:
      new URL(siteUrl),

    title:
      fullTitle,

    description,

    alternates: {
      canonical:
        fullUrl,
    },

    openGraph: {

      title:
        fullTitle,

      description,

      url:
        fullUrl,

      siteName,

      locale:
        "en_US",

      type:
        "website",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },

    twitter: {

      card:
        "summary_large_image",

      title:
        fullTitle,

      description,

      images: [image],
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

    category:
      "technology",
  };
}