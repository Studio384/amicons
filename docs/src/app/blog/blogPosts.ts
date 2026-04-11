import { type ComponentType } from "react";

export type BlogPostMeta = {
  title: string;
  excerpt: string;
  author: string;
  categories: string[];
  publishDate: string;
  featuredImage: string;
};

type BlogPostFrontmatter = {
  title: string;
  excerpt: string;
  author: string;
  categories: string[];
  publishDate: string;
  featuredImage: string;
};

type BlogPostModule = {
  default: ComponentType;
  frontmatter: BlogPostFrontmatter;
};

export type BlogPost = BlogPostMeta & {
  slug: string;
  Component: ComponentType;
};

const modules = import.meta.glob<BlogPostModule>("./posts/*.mdx", { eager: true });

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, module]) => {
    const parts = path.split("/");
    const fileName = parts[parts.length - 1] ?? "";
    const slug = fileName.replace(/\.mdx$/, "");

    const frontmatter = module.frontmatter;

    return {
      ...frontmatter,
      featuredImage: `${import.meta.env.BASE_URL}blog/${slug}/${frontmatter.featuredImage}`,
      slug,
      Component: module.default,
    };
  })
  .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

export function getBlogPostBySlug(slug?: string): BlogPost | undefined {
  if (!slug) return undefined;

  return blogPosts.find((post) => post.slug === slug);
}
