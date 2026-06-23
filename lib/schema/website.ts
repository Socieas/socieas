// WebSite schema — injected once in root layout alongside Organization
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://socieas.com/#website",
  name: "Socieas",
  url: "https://socieas.com",
  publisher: {
    "@id": "https://socieas.com/#organization",
  },
};
