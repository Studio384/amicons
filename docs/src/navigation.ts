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
      { title: "Icons", path: "/icons", icon: aiIcons, match: ["/", "/icons"] },
      { title: "Releases", path: "/releases", icon: aiRocket },
    ],
  },
];

export const DOC_NAV: NavSection[] = [
  {
    title: "Documentation",
    items: [
      { title: "Installation", path: "/documentation/installation", icon: aiFlag },
      { title: "About", path: "/documentation/about", icon: aiAmicons },
    ],
  },
  {
    title: "React component",
    items: [
      { title: "Spin", path: "/documentation/spin", icon: aiSpinner },
      { title: "Bounce", path: "/documentation/bounce", icon: aiArrowUp },
      { title: "Rotate", path: "/documentation/rotate", icon: aiArrowRotateRight },
      { title: "Flip", path: "/documentation/flip", icon: aiArrowsDownLeftRightUpCenter },
      { title: "Beat", path: "/documentation/beat", icon: aiHeart },
      { title: "Fade", path: "/documentation/fade", icon: aiCircleHalfInner },
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
