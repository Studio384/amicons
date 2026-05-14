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
          <div className="flex h-64 items-center justify-center rounded-sm border-2 border-dashed border-zinc-300 dark:border-zinc-700">
            <p className="font-display text-3xl text-zinc-700 dark:text-zinc-500">No posts found</p>
          </div>
        ) : (
          <div className="@container/posts container mx-auto flex max-w-4xl flex-col gap-3">
            <div className="grid grid-cols-1 gap-3 @lg/posts:grid-cols-2">
              {newsPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/neo/news/${post.slug}`}
                  className="group flex flex-col items-start gap-2 rounded-sm bg-zinc-50 p-3 outline -outline-offset-1 outline-zinc-950/10 transition-all hover:z-10 hover:bg-violet-100 hover:shadow-sm hover:outline-violet-700/15 dark:bg-zinc-950 dark:outline-zinc-50/5 dark:focus-within:bg-violet-600/20 dark:hover:bg-violet-600/20"
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
