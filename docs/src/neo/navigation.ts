import {
  aiAmicons,
  aiArrowRotateRight,
  aiArrowsDownLeftRightUpCenter,
  aiArrowUp,
  aiCircleHalfInner,
  aiFlag,
  aiHeart,
  aiIcons,
  aiRocket,
  aiSpinner,
  type IAmicon,
} from "@studio384/amicons";

export type NavItem = {
  title: string;
  path: string;
  icon: IAmicon;
  match?: string[];
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type DocNavPage = NavItem & { sectionTitle: string };

export const MAIN_NAV: NavSection[] = [
  {
    title: "Browse",
    items: [
      { title: "Icons", path: "/neo/icons", icon: aiIcons, match: ["/neo", "/neo/icons"] },
      { title: "Releases", path: "/neo/releases", icon: aiRocket },
    ],
  },
];

export const DOC_NAV: NavSection[] = [
  {
    title: "Documentation",
    items: [
      { title: "Installation", path: "/neo/documentation/installation", icon: aiFlag },
      { title: "About", path: "/neo/documentation/about", icon: aiAmicons },
    ],
  },
  {
    title: "React component",
    items: [
      { title: "Spin", path: "/neo/documentation/spin", icon: aiSpinner },
      { title: "Bounce", path: "/neo/documentation/bounce", icon: aiArrowUp },
      { title: "Rotate", path: "/neo/documentation/rotate", icon: aiArrowRotateRight },
      { title: "Flip", path: "/neo/documentation/flip", icon: aiArrowsDownLeftRightUpCenter },
      { title: "Beat", path: "/neo/documentation/beat", icon: aiHeart },
      { title: "Fade", path: "/neo/documentation/fade", icon: aiCircleHalfInner },
    ],
  },
];

export const NAV: NavSection[] = [...MAIN_NAV, ...DOC_NAV];

export const DOC_PAGES: DocNavPage[] = DOC_NAV.flatMap((section) =>
  section.items.map((item) => ({
    ...item,
    sectionTitle: section.title,
  })),
);

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if ((item.match ?? []).includes(pathname)) return true;

  return pathname === item.path || pathname.startsWith(`${item.path}/`);
}
