import { Link, Navigate, NavLink, useParams } from "react-router";

import Amicon, { aiArrowLeft } from "@studio384/amicons";

import Header from "@/design/layout/LayoutElements/Header";

import { blogPosts, getBlogPostBySlug } from "./blogPosts";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const postIndex = blogPosts.findIndex((entry) => entry.slug === post.slug);
  const newerPost = postIndex > 0 ? blogPosts[postIndex - 1] : undefined;
  const olderPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : undefined;

  const PostComponent = post.Component;

  return (
    <>
      <Header>
        <NavLink
          className="font-display inline-flex items-center gap-1 text-violet-700 transition-all hover:text-inherit dark:text-violet-300"
          to="/blog"
        >
          <Amicon icon={aiArrowLeft} /> Blog
        </NavLink>
        <h1 className="font-display text-5xl font-medium">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-200">
          <span>{formatDate(post.publishDate)}</span>
          <span>&middot;</span>
          <span>By {post.author}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.categories.map((category) => (
            <span
              key={category}
              className="font-display flex items-center gap-1 rounded-full bg-violet-500 px-2.5 py-1 text-xs text-white"
            >
              {category}
            </span>
          ))}
        </div>
      </Header>
      <div className="container m-auto my-8 max-w-7xl px-4">
        <article className="docs mx-auto max-w-3xl">
          <img
            src={post.featuredImage}
            alt={`${post.title} featured image`}
            className="mb-6 max-h-105 w-full rounded-lg object-cover"
          />

          <PostComponent />

          {(newerPost || olderPost) && (
            <nav className="mt-6 grid gap-3 sm:grid-cols-2">
              {newerPost ? (
                <Link
                  to={`/blog/${newerPost.slug}`}
                  className="rounded-md border border-zinc-200 bg-zinc-50 p-3 hover:border-violet-400 hover:bg-violet-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/40"
                >
                  <p className="m-0! text-xs text-zinc-500 dark:text-zinc-400">Newer post</p>
                  <p className="font-display m-0! text-base font-medium">{newerPost.title}</p>
                </Link>
              ) : (
                <div />
              )}

              {olderPost ? (
                <Link
                  to={`/blog/${olderPost.slug}`}
                  className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-right hover:border-violet-400 hover:bg-violet-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/40"
                >
                  <p className="m-0! text-xs text-zinc-500 dark:text-zinc-400">Older post</p>
                  <p className="font-display m-0! text-base font-medium">{olderPost.title}</p>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </article>
      </div>
    </>
  );
}
