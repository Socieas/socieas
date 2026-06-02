/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: any;
  heroBanner?: any;
  showHeroBanner?: boolean;
  publishedAt: string;
  type: "blog" | "article" | "case-study";
  content?: any;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  category?: {
    title: string;
    slug: { current: string };
  };
  author?: {
    name: string;
    image: any;
    bio?: any;
  };
}
