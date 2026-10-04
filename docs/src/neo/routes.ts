export const ROOT_PATH = "/neo";
export const ICONS_PATH = "/neo/icons";
export const RELEASES_PATH = "/neo/releases";
export const DOCUMENTATION_PATH = "/neo/documentation";

export function iconPath(slug: string): string {
  return `${ICONS_PATH}/${slug}`;
}

export function releasePath(slug: string): string {
  return `${RELEASES_PATH}/${slug}`;
}

export function getSlugFromPath(pathname: string): string | null {
  if (!pathname.startsWith(`${ICONS_PATH}/`)) return null;

  return decodeURIComponent(pathname.slice(ICONS_PATH.length + 1)) || null;
}

let openedFromGridSlug: string | null = null;

export function markOpenedFromGrid(slug: string): void {
  openedFromGridSlug = slug;
}

export function getOpenedFromGridSlug(): string | null {
  return openedFromGridSlug;
}

export function clearOpenedFromGrid(): void {
  openedFromGridSlug = null;
}
