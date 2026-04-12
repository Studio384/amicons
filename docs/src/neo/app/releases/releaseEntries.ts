import { type ComponentType } from "react";

export type RenamedIcon = {
  old: string;
  new: string;
};

export type ReleaseFrontmatter = {
  name: string;
  version: string;
  date: string;
  publishDate: string;
  excerpt: string;
  newIcons?: string[];
  updatedIcons?: string[];
  renamedIcons?: RenamedIcon[];
  removedIcons?: string[];
};

type ReleaseModule = {
  default: ComponentType;
  frontmatter: ReleaseFrontmatter;
};

export type ReleaseEntry = ReleaseFrontmatter & {
  slug: string;
  Component: ComponentType;
};

const modules = import.meta.glob<ReleaseModule>("./posts/*.mdx", { eager: true });
const versionCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

export const releases: ReleaseEntry[] = Object.values(modules)
  .map((module) => ({
    ...module.frontmatter,
    slug: module.frontmatter.version,
    Component: module.default,
  }))
  .sort((a, b) => {
    const publishDateDifference =
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();

    if (publishDateDifference !== 0) {
      return publishDateDifference;
    }

    return versionCollator.compare(b.version, a.version);
  });

export function getReleaseBySlug(slug?: string): ReleaseEntry | undefined {
  if (!slug) return undefined;

  return releases.find((release) => release.slug === slug);
}
