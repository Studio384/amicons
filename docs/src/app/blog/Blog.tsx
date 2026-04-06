import { Link } from "react-router";

import { blogPosts } from "./blogPosts";
import Amicon, { aiArrowRight } from "@studio384/amicons";
import Header from "@/design/layout/LayoutElements/Header";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  if (blogPosts.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        No posts published yet.
      </div>
    );
  }

  return (
    <>
      <Header>
        <h1 className="font-display py-2 text-5xl font-medium">Blog</h1>
      </Header>
      <div className="container m-auto my-8 max-w-7xl px-4">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm shadow-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-zinc-950"
            >
              <div className="flex flex-col gap-3 p-5">
                <img
                  src={post.featuredImage}
                  alt={`${post.title} featured image`}
                  className="h-56 w-full object-cover rounded-md"
                />
                <div className="">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span>{formatDate(post.publishDate)}</span>
                    <span>&middot;</span>
                    <span>By {post.author}</span>
                  </div>

                  <h3 className="font-display text-2xl font-medium mt-0.5 mb-1">{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-violet-300 bg-violet-100 px-2 py-0.5 text-xs text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-display inline-flex rounded-sm bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600 items-center gap-1"
                  >
                    Read post <Amicon icon={aiArrowRight} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
