import { PortableText as PortableTextComponent } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div className="relative my-10 aspect-video w-full overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Article Image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    code: ({ value }: any) => (
      <pre className="my-6 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="mt-12 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="mt-10 mb-5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mt-8 mb-4">{children}</h3>,
    h4: ({ children }: any) => <h4 className="mt-6 mb-3">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 border-l-4 border-violet-500 bg-violet-50 p-6 italic text-slate-800 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="mb-6 list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="mb-6 list-decimal pl-6 space-y-2">{children}</ol>,
  },
  marks: {
    em: ({ children }: any) => <em className="italic">{children}</em>,
    strong: ({ children }: any) => <strong className="font-bold text-slate-900">{children}</strong>,
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="font-semibold text-violet-600 underline decoration-violet-300 underline-offset-4 hover:text-violet-800 hover:decoration-violet-500"
        >
          {children}
        </Link>
      );
    },
  },
};

export default function PortableText({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="socieas-article-content">
      <PortableTextComponent value={value} components={components} />
    </div>
  );
}
