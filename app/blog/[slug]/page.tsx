import { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../mdx-components";
import ArticleSchema from "../../components/ArticleSchema";
import BreadcrumbSchema from "../../components/BreadcrumbSchema";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

function getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data,
    content,
  };
}

function getAllSlugs() {
  const contentDir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-yellow-400 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const components = useMDXComponents({});

  const breadcrumbs = [
    { name: "Home", url: "https://walkuppros.com" },
    { name: "Blog", url: "https://walkuppros.com/blog" },
    { name: post.frontmatter.title, url: `https://walkuppros.com/blog/${slug}` },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <ArticleSchema
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        datePublished={post.frontmatter.date}
        slug={slug}
        keywords={post.frontmatter.keywords || []}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Article Header */}
      <header className="py-12 px-6 border-b border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-zinc-400 hover:text-yellow-400 transition-colors mb-8"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          <div className="text-zinc-500 font-mono text-sm mb-4">
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            {post.frontmatter.title}
          </h1>

          <p className="text-zinc-400 text-xl leading-relaxed">
            {post.frontmatter.description}
          </p>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto prose-invert">
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
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
