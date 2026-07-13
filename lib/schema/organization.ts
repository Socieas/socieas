// Canonical Organization schema — referenced by layout and other schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://socieas.com/#organization",
  name: "Socieas",
  url: "https://socieas.com",
  logo: {
    "@type": "ImageObject",
    url: "https://socieas.com/logo.png",
    width: 512,
    height: 512,
  },
  description:
    "Socieas helps businesses scale through AI automation, CRM systems, IT staffing, digital marketing, full-stack development, and personal branding.",
  telephone: "+91-9142874636",
  email: "hello@socieas.com",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+91-9142874636",
    email: "hello@socieas.com",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/socieas",
    "https://www.instagram.com/socieas",
    "https://x.com/socieas",
    "https://www.facebook.com/socieas",
  ],
};
