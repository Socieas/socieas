import { SanityPost } from "./types";

export const placeholderPosts: SanityPost[] = [
  {
    _id: "1",
    title: "How AI is Transforming Modern Business Workflows",
    slug: { current: "ai-transforming-business-workflows" },
    excerpt: "Explore how AI automation is revolutionizing the way businesses operate, from lead generation to customer service.",
    publishedAt: "2024-03-20T10:00:00Z",
    type: "blog",
    category: {
      title: "AI Automation",
      slug: { current: "ai-automation" }
    },
    author: {
      name: "John Doe",
      image: null
    },
    content: []
  },
  {
    _id: "2",
    title: "Scaling Your Startup with the Right CRM Strategy",
    slug: { current: "scaling-startup-crm-strategy" },
    excerpt: "A deep dive into why CRM implementation is critical for startups looking to scale their operations effectively.",
    publishedAt: "2024-03-18T10:00:00Z",
    type: "article",
    category: {
      title: "CRM Solutions",
      slug: { current: "crm-solutions" }
    },
    author: {
      name: "Jane Smith",
      image: null
    },
    content: []
  },
  {
    _id: "3",
    title: "Case Study: 300% Growth in Lead Generation for Tech Corp",
    slug: { current: "case-study-tech-corp-growth" },
    excerpt: "How Socieas implemented a custom AI-driven marketing strategy that tripled Tech Corp's lead volume in 6 months.",
    publishedAt: "2024-03-15T10:00:00Z",
    type: "case-study",
    category: {
      title: "Digital Marketing",
      slug: { current: "digital-marketing" }
    },
    author: {
      name: "Robert Wilson",
      image: null
    },
    content: []
  }
];
