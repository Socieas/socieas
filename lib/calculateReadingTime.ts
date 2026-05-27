export default function calculateReadingTime(
  content: string
) {

  const words =
    content
      .replace(
        /<[^>]*>/g,
        ""
      )
      .trim()
      .split(/\s+/).length;

  const minutes =
    Math.ceil(
      words / 200
    );

  return `${minutes} min read`;
}