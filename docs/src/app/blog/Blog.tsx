import { Link, NavLink } from "react-router";

import Amicon, { aiArrowRight } from "@studio384/amicons";

import Header from "@/design/layout/LayoutElements/Header";

import { blogPosts } from "./blogPosts";

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
              className="group/article relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md shadow-zinc-100 transition-all hover:shadow-lg hover:shadow-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-zinc-950 dark:hover:shadow-zinc-950"
            >
              <div className="flex flex-col gap-3 p-5">
                <img
                  src={post.featuredImage}
                  alt={`${post.title} featured image`}
                  className="h-56 w-full rounded-md object-cover"
                />
                <div className="">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {formatDate(post.publishDate)}
                  </div>

                  <NavLink to={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    <h3 className="font-display mt-0.5 mb-1 text-2xl font-medium transition-all group-has-hover/article:text-violet-900 dark:group-has-hover/article:text-violet-200">
                      {post.title}
                    </h3>
                  </NavLink>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
