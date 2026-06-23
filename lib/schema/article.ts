// BlogPosting / Article schema builder

interface ArticleSchemaOptions {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}

export function articleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
}: ArticleSchemaOptions) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    publisher: { "@id": "https://socieas.com/#organization" },
    isPartOf: { "@id": "https://socieas.com/#website" },
  };
  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;
  if (authorName) schema.author = { "@type": "Person", name: authorName };
  if (imageUrl) schema.image = { "@type": "ImageObject", url: imageUrl };
  return schema;
}
