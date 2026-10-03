export const ICONS_PATH = "/neo/icons";

export function iconPath(slug: string): string {
  return `${ICONS_PATH}/${slug}`;
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
