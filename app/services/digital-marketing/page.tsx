import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema/service";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import DigitalMarketingPage from "@/components/services/DigitalMarketingPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "Digital Marketing Services",

    description:
      "Socieas helps businesses scale visibility, lead generation, audience trust, and growth through modern digital marketing systems.",

    path:
      "/services/digital-marketing",

  });
return (
    <>
      <JsonLd schema={[
        serviceSchema({
          name: "Digital Marketing Services",
          description: "Socieas helps businesses scale visibility, lead generation, audience trust, and growth through modern digital marketing strategies.",
          url: "https://socieas.com/services/digital-marketing",
          serviceType: "Digital Marketing",
        }),
        breadcrumbSchema([
          { name: "Home", url: "https://socieas.com" },
          { name: "Services", url: "https://socieas.com/services" },
          { name: "Digital Marketing", url: "https://socieas.com/services/digital-marketing" },
        ]),
      ]} id="digital-marketing-page-schema" />
      <DigitalMarketingPage />
    </>
  );
export default function Page() {

  return <DigitalMarketingPage />;
}
