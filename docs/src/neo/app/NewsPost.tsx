import { Link, Navigate, useParams } from "react-router";

import { Separator } from "@base-ui/react";
import Amicon, { aiArrowLeft, aiArrowRight, aiMegaphone } from "@studio384/amicons";
import { format, parse } from "date-fns";

import { newsPosts, getNewsPostBySlug } from "@/neo/app/posts/newsPosts";
import { cn } from "@/utils/cn";

import PageHeader from "../design/blocks/PageHeader";

export default function NewsPost() {
  const { slug } = useParams();
  const post = getNewsPostBySlug(slug);

  if (!post) {
    return <Navigate to="/neo/news" replace />;
  }

  const PostComponent = post.Component;
  const postIndex = newsPosts.findIndex((entry) => entry.slug === post.slug);
  const newerPost = postIndex > 0 ? newsPosts[postIndex - 1] : undefined;
  const olderPost = postIndex < newsPosts.length - 1 ? newsPosts[postIndex + 1] : undefined;

  return (
    <>
      <PageHeader
        icon={aiMegaphone}
        title={post.title}
        subtitle={format(parse(post.publishDate, "yyyy-MM-dd", new Date()), "d MMMM yyyy")}
      >
        <Link
          to="/neo/news"
          className="font-display inline-flex items-center gap-1 text-violet-700 transition-colors hover:text-violet-900 dark:text-white dark:hover:text-violet-300"
        >
          <Amicon icon={aiArrowLeft} /> All news
        </Link>
      </PageHeader>

      <div className="flex flex-col gap-4 p-4">
        <article className="neo-docs container mx-auto max-w-4xl">
          <img
            src={post.featuredImage}
            alt={`${post.title} featured image`}
            className="mb-6 max-h-105 w-full rounded-sm object-cover"
          />

          <PostComponent />
        </article>

        <Separator
          orientation="horizontal"
          className="container mx-auto h-px max-w-4xl bg-zinc-950/5 dark:bg-zinc-50/10"
        />

        {(newerPost || olderPost) && (
          <div className="container mx-auto max-w-4xl">
            <nav className="@xl2/main:grid-cols-3 grid grid-cols-1 grid-rows-2 gap-1 @md/main:grid-cols-2 @md/main:grid-rows-1">
              {newerPost && (
                <Link
                  to={`/neo/news/${newerPost.slug}`}
                  className={cn(
                    "group grid grid-cols-[min-content_auto] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
                    "col-start-1 hover:bg-violet-600 hover:text-white hover:shadow-sm",
                  )}
                >
                  <Amicon
                    icon={aiArrowLeft}
                    className="mt-1 text-sm text-zinc-500 duration-150! group-hover:text-white/75"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">Newer post</span>
                    <span className="font-display my-1 text-xl/5 font-medium">{newerPost.title}</span>
                  </div>
                </Link>
              )}
              {olderPost && (
                <Link
                  to={`/neo/news/${olderPost.slug}`}
                  className={cn(
                    "group grid grid-cols-[auto_min-content] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
                    "@xl2/main:col-start-3 hover:bg-violet-600 hover:text-white hover:shadow-sm @md/main:col-start-2",
                  )}
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">Older post</span>
                    <span className="font-display my-1 text-end text-xl/5 font-medium">{olderPost.title}</span>
                  </div>
                  <Amicon
                    icon={aiArrowRight}
                    className="mt-1 text-sm text-zinc-500 duration-150! group-hover:text-white/75"
                  />
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
