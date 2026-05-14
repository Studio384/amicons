import { Link } from "react-router";

import { aiMegaphone } from "@studio384/amicons";
import { format, parse } from "date-fns";

import { newsPosts } from "@/neo/app/posts/newsPosts";

import PageHeader from "../design/blocks/PageHeader";

export default function News() {
  return (
    <>
      <PageHeader icon={aiMegaphone} title="News" subtitle="Amicons" />

      <div className="flex flex-col gap-4 p-4">
        {newsPosts.length === 0 ? (
          <div className="container mx-auto max-w-4xl rounded-sm border border-zinc-200 bg-zinc-50 p-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            No posts published yet.
          </div>
        ) : (
          <div className="container mx-auto flex max-w-4xl flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {newsPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/neo/news/${post.slug}`}
                  className="group flex flex-col gap-2 overflow-hidden rounded-sm bg-zinc-50 p-4 outline -outline-offset-1 outline-zinc-950/10 transition-all hover:z-10 hover:bg-white hover:shadow-sm hover:outline-violet-700/15 sm:grid-cols-[120px_auto] dark:bg-zinc-950 dark:outline-zinc-50/5 dark:focus-within:bg-violet-600/20 dark:hover:bg-violet-600/20"
                >
                  <img
                    src={post.featuredImage}
                    alt={`${post.title} featured image`}
                    className="mb-3 h-full w-full rounded-xs object-cover"
                  />

                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-display text-2xl/5 font-bold transition-colors group-hover:text-violet-700">
                      {post.title}
                    </h3>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {format(parse(post.publishDate, "yyyy-MM-dd", new Date()), "d MMMM yyyy")}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-4 text-zinc-800 dark:text-zinc-200">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
