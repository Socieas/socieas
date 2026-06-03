export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage?: any;
  heroBanner?: any;
  showHeroBanner?: boolean;
  publishedAt: string;
  content: any;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  type: "blog" | "article" | "case-study";
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
