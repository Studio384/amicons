import { type ComponentType } from "react";

export type NewsPostMeta = {
  title: string;
  excerpt: string;
  author: string;
  categories: string[];
  publishDate: string;
  featuredImage: string;
};

type NewsPostFrontmatter = {
  title: string;
  excerpt: string;
  author: string;
  categories: string[];
  publishDate: string;
  featuredImage: string;
};

type NewsPostModule = {
  default: ComponentType;
  frontmatter: NewsPostFrontmatter;
};

export type NewsPost = NewsPostMeta & {
  slug: string;
  Component: ComponentType;
};

const modules = import.meta.glob<NewsPostModule>("./*.mdx", { eager: true });

export const newsPosts: NewsPost[] = Object.entries(modules)
  .map(([path, module]) => {
    const parts = path.split("/");
    const fileName = parts[parts.length - 1] ?? "";
    const slug = fileName.replace(/\.mdx$/, "");

    const frontmatter = module.frontmatter;

    return {
      ...frontmatter,
      featuredImage: `${import.meta.env.BASE_URL}news/${slug}/${frontmatter.featuredImage}`,
      slug,
      Component: module.default,
    };
  })
  .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

export function getNewsPostBySlug(slug?: string): NewsPost | undefined {
  if (!slug) return undefined;

  return newsPosts.find((post) => post.slug === slug);
}
