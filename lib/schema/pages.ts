// Page-level schema builders — WebPage, AboutPage, ContactPage

export function webPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: { "@id": "https://socieas.com/#website" },
    publisher: { "@id": "https://socieas.com/#organization" },
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://socieas.com/about#webpage",
    name: "About Socieas",
    description:
      "Learn about Socieas — a B2B service company helping businesses grow with AI automation, CRM solutions, IT staffing, and digital marketing.",
    url: "https://socieas.com/about",
    isPartOf: { "@id": "https://socieas.com/#website" },
    about: { "@id": "https://socieas.com/#organization" },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://socieas.com/contact#webpage",
    name: "Contact Socieas",
    description:
      "Get in touch with Socieas for IT staffing, CRM implementation, AI automation, digital marketing, and full-stack development services.",
    url: "https://socieas.com/contact",
    isPartOf: { "@id": "https://socieas.com/#website" },
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
  };
}
