export default function calculateReadingTime(content: any): string {
  if (!content || (Array.isArray(content) && content.length === 0)) return "1 min read";

  let text = "";

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    // Robust Portable Text to string conversion
    text = content
      .map((block: any) => {
        if (block._type !== "block" || !block.children) {
          return "";
        }
        return block.children
          .filter((child: any) => child.text)
          .map((child: any) => child.text)
          .join("");
      })
      .join(" ");
  }

  const words = text
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  if (words === 0) return "1 min read";

  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
}
