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

export default function Page() {

  return <CRMSolutionsPage />;
}