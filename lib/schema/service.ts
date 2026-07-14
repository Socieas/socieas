/* Service schema builder used in each service page.tsx (server component) */

interface ServiceSchemaOptions {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}

export function serviceSchema({
  name,
  description,
  url,
  serviceType,
}: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType,
    provider: { "@id": "https://socieas.com/#organization" },
    areaServed: "Worldwide",
  };
}
