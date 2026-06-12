import AboutPage from "@/components/about/AboutPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "About Socieas",

    description:
      "Learn about Socieas, our approach to modern business growth, operational systems, founder visibility, AI automation, CRM infrastructure, and scalable digital execution.",

    path:
      "/about",

  });

export default function Page() {

  return <AboutPage />;
}