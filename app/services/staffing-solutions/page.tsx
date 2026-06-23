import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema/service";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import StaffingSolutionsPage from "@/components/services/StaffingSolutionsPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "Staffing Solutions",

    description:
      "Socieas helps businesses scale teams efficiently through modern staffing systems, talent acquisition strategies, and workforce infrastructure.",

    path:
      "/services/staffing-solutions",

  });
return (
    <>
      <JsonLd schema={[
        serviceSchema({
          name: "IT Staffing Solutions",
          description: "Socieas helps businesses scale teams efficiently through modern staffing systems, talent acquisition strategies, and IT staffing solutions.",
          url: "https://socieas.com/services/staffing-solutions",
          serviceType: "IT Staffing",
        }),
        breadcrumbSchema([
          { name: "Home", url: "https://socieas.com" },
          { name: "Services", url: "https://socieas.com/services" },
          { name: "Staffing Solutions", url: "https://socieas.com/services/staffing-solutions" },
        ]),
      ]} id="staffing-page-schema" />
      <StaffingSolutionsPage />
    </>
  );
export default function Page() {

  return <StaffingSolutionsPage />;
}
