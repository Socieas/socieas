import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema/service";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import CRMSolutionsPage from "@/components/services/CRMSolutionsPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "CRM Solutions",

    description:
      "Socieas builds scalable CRM systems that improve customer management, operational visibility, lead workflows, and business efficiency.",

    path:
      "/services/crm-solutions",

  });
return (
    <>
      <JsonLd schema={[
        serviceSchema({
          name: "CRM Solutions",
          description: "Socieas builds scalable CRM systems that improve customer management, operational visibility, and lead workflow automation.",
          url: "https://socieas.com/services/crm-solutions",
          serviceType: "CRM Implementation",
        }),
        breadcrumbSchema([
          { name: "Home", url: "https://socieas.com" },
          { name: "Services", url: "https://socieas.com/services" },
          { name: "CRM Solutions", url: "https://socieas.com/services/crm-solutions" },
        ]),
      ]} id="crm-solutions-page-schema" />
      <CRMSolutionsPage />
    </>
  );
export default function Page() {

  return <CRMSolutionsPage />;
}
