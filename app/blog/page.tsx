import { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "NYC Moving Guides & Tips",
  description:
    "Expert moving guides for Manhattan residents. Learn about evening moves, walk-up apartments, pricing, and more.",
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
}

function getBlogPosts(): BlogPost[] {
  const contentDir = path.join(process.cwd(), "content/blog");

  // Return empty array if directory doesn't exist yet
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        keywords: data.keywords || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-zinc-500 font-mono text-sm">[GUIDES]</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
            NYC Moving
            <br />
            <span className="text-yellow-400">Guides & Tips</span>
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl">
            Expert advice for moving in Manhattan. From walk-up apartments to
            evening moves, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 text-lg">
                Blog posts coming soon...
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-zinc-500 font-mono text-xs mb-3">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <h2 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-yellow-400 p-8 md:p-12 text-center border-4 border-black"
            style={{ boxShadow: "8px 8px 0px 0px #000" }}
          >
            <h2 className="text-3xl font-black text-black mb-4">
              Ready to Book Your Move?
            </h2>
            <p className="text-zinc-800 mb-6">
              Text us now and get a quote in under 5 minutes.
            </p>
            <a
              href="sms:3476172607"
              className="inline-block bg-black text-yellow-400 px-8 py-4 font-bold text-lg hover:bg-zinc-800 transition-colors"
            >
              Text (347) 617-2607
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <Link href="/" className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-400 rounded-lg flex items-center justify-center border-[3px] border-zinc-900">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="#231F20"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 24 L8 18 L13 18 L13 12 L18 12 L18 6 L24 6 L24 24" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight">
                Walk-up Pros
              </span>
            </Link>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm text-zinc-400">
              <div>Manhattan, NYC</div>
              <div>6PM – 1AM Daily</div>
              <div>Text: (347) 617-2607</div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© 2024 Walk-up Pros. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
