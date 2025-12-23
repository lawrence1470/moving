import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold mt-12 mb-4 text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold mt-8 mb-3 text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-6 mb-2 text-white">{children}</h4>
    ),

    // Paragraphs
    p: ({ children }) => (
      <p className="text-zinc-300 text-lg leading-relaxed mb-6">{children}</p>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-zinc-300 text-lg mb-6 space-y-2 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-zinc-300 text-lg mb-6 space-y-2 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // Links
    a: ({ href, children }) => {
      const isInternal = href?.startsWith("/") || href?.startsWith("#");
      if (isInternal) {
        return (
          <Link
            href={href || "#"}
            className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 transition-colors"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 transition-colors"
        >
          {children}
        </a>
      );
    },

    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-zinc-200">{children}</em>,

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-yellow-400 pl-6 py-2 my-6 text-zinc-300 italic bg-zinc-900/50">
        {children}
      </blockquote>
    ),

    // Code
    code: ({ children }) => (
      <code className="bg-zinc-800 text-yellow-400 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mb-6">
        {children}
      </pre>
    ),

    // Horizontal rule
    hr: () => <hr className="border-zinc-800 my-12" />,

    // Images
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="rounded-lg my-8"
        {...(props as ImageProps)}
        alt={props.alt || ""}
      />
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-zinc-700 bg-zinc-800 px-4 py-2 text-left text-white font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-zinc-700 px-4 py-2 text-zinc-300">
        {children}
      </td>
    ),

    // Custom CTA component
    CTA: () => (
      <div className="bg-yellow-400 text-black p-8 rounded-xl my-8 text-center">
        <h3 className="text-2xl font-black mb-3">Ready to Book Your Move?</h3>
        <p className="text-zinc-800 mb-4">
          Text us now and get a quote in under 5 minutes.
        </p>
        <a
          href="sms:3476172607"
          className="inline-block bg-black text-yellow-400 px-8 py-3 font-bold hover:bg-zinc-800 transition-colors"
        >
          Text (347) 617-2607
        </a>
      </div>
    ),

    ...components,
  };
}
