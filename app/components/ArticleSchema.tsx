interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  keywords?: string[];
}

export default function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  slug,
  keywords = [],
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "Walk-up Pros",
      url: "https://walkuppros.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Walk-up Pros",
      url: "https://walkuppros.com",
      logo: {
        "@type": "ImageObject",
        url: "https://walkuppros.com/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://walkuppros.com/blog/${slug}`,
    },
    keywords: keywords.join(", "),
    articleSection: "Moving Tips",
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
