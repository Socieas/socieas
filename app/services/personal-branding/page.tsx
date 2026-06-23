import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema/service";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import PersonalBrandingPage from "@/components/services/PersonalBrandingPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "Personal Branding Services",

    description:
      "Socieas helps founders and professionals build visibility, authority, audience trust, and long term positioning through strategic personal branding.",

    path:
      "/services/personal-branding",

  });
return (
    <>
      <JsonLd schema={[
        serviceSchema({
          name: "Personal Branding Services",
          description: "Socieas helps founders and professionals build visibility, authority, audience trust, and long term positioning through personal branding.",
          url: "https://socieas.com/services/personal-branding",
          serviceType: "Personal Branding",
        }),
        breadcrumbSchema([
          { name: "Home", url: "https://socieas.com" },
          { name: "Services", url: "https://socieas.com/services" },
          { name: "Personal Branding", url: "https://socieas.com/services/personal-branding" },
        ]),
      ]} id="personal-branding-page-schema" />
      <PersonalBrandingPage />
    </>
  );
export default function Page() {

  return <PersonalBrandingPage />;
}
