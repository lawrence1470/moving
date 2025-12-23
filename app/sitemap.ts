import { MetadataRoute } from "next";

// Blog posts - add new posts here
const blogPosts = [
  "evening-movers-manhattan",
  "walk-up-apartment-moving-guide",
  "moving-without-missing-work",
  "how-much-do-movers-cost-manhattan",
  "last-minute-movers-nyc",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://walkuppros.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Blog post pages
  const blogPages = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
