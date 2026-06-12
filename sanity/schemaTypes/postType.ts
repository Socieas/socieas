import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",

      options: {
        source: "title",
        maxLength: 96,
      },

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "type",
      title: "Content Type",
      type: "string",

      options: {
        list: [
          { title: "Blog", value: "blog" },
          { title: "Article", value: "article" },
          { title: "Case Study", value: "case-study" },
        ],
      },

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",

      rows: 4,
    }),

    /* HERO BANNER TOGGLE */

    defineField({
      name: "showHeroBanner",
      title: "Show Hero Banner",
      type: "boolean",

      initialValue: true,
    }),

    /* HERO BANNER IMAGE */

    defineField({
      name: "heroBanner",
      title: "Hero Banner",
      type: "image",

      options: {
        hotspot: true,
      },
    }),

    /* COVER IMAGE FOR BLOG CARDS */

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",

      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",

      to: [{ type: "category" }],
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",

      to: [{ type: "author" }],
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),

    /* HTML CONTENT */

    defineField({
      name: "content",
      title: "HTML Content",
      type: "text",

      rows: 30,
    }),

    /* TABLE OF CONTENTS */

    defineField({
      name: "tableOfContents",
      title: "Enable Table Of Contents",
      type: "boolean",

      initialValue: true,
    }),

    /* SEO TITLE */

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),

    /* SEO DESCRIPTION */

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    }),

    /* FOCUS KEYWORD */

    defineField({
      name: "focusKeyword",
      title: "Focus Keyword",
      type: "string",
    }),
  ],
});