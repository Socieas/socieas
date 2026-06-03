export default function calculateReadingTime(content: any): string {
  if (!content) return "1 min read";

  let text = "";

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    // Basic Portable Text to string conversion
    text = content
      .map((block: any) => {
        if (block._type !== "block" || !block.children) {
          return "";
        }
        return block.children.map((child: any) => child.text).join("");
      })
      .join(" ");
  }

  const words = text
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/).length;

  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
}
