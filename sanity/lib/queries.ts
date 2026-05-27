import { groq } from "next-sanity";

/* ALL POSTS */

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    type,

    category->{
      title,
      slug
    },

    author->{
      name,
      image
    }
  }
`;

/* SINGLE POST */

export const singlePostQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    heroBanner,
    showHeroBanner,
    publishedAt,
    content,
    seoTitle,
    seoDescription,
    focusKeyword,
    type,

    category->{
      title,
      slug
    },

    author->{
      name,
      image,
      bio
    }
  }
`;