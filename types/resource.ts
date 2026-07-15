// types/resource.ts

export type ResourceCategory =
  | "personal-branding"
  | "ai-automation"
  | "crm"
  | "digital-marketing"
  | "staffing";

export type ResourceType =
  | "Checklist"
  | "Swipe File"
  | "Worksheet"
  | "Prompt Pack"
  | "Template";

export type ResourceFaq = {
  question: string;
  answer: string;
};

export type Resource = {
  slug: string;
  title: string;
  promise: string;
  description: string;
  category: ResourceCategory;
  type: ResourceType;
  time: string;
  bullets: string[];
  whoFor: string[];
  whoNotFor: string[];
  faqs: ResourceFaq[];
  related: string[];
  featured?: boolean;
  filePath: string;
  keywords: string[];
};

export type CategoryMeta = {
  slug: ResourceCategory;
  label: string;
  headline: string;
  description: string;
};
