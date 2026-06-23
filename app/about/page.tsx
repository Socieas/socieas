import JsonLd from "@/components/seo/JsonLd";
import { aboutPageSchema } from "@/lib/schema/pages";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
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

    return (
    <>
      <JsonLd schema={[aboutPageSchema(), breadcrumbSchema([
        { name: "Home", url: "https://socieas.com" },
        { name: "About", url: "https://socieas.com/about" },
      ])]} id="about-schema" />
      <AboutPage />
    </>
  );
}
