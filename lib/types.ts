export interface SanityPost {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  publishedAt: string;
  type: string;
  category?: {
    title: string;
    slug?: {
      current: string;
    };
  };
  author?: {
    name: string;
    image?: unknown;
    bio?: unknown;
  };
  content?: string;
  coverImage?: unknown;
  heroBanner?: unknown;
  showHeroBanner?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
}
