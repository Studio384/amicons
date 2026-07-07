import {
  aiAmicons,
  aiArrowRotateRight,
  aiArrowsDownLeftRightUpCenter,
  aiArrowUp,
  aiCircleHalfInner,
  aiFlag,
  aiHeart,
  aiReact,
  aiSpinner,
  type IAmicon,
} from "@studio384/amicons";

export type DocPage = { title: string; path: string; icon: IAmicon };
export type DocSection = { title: string; icon: IAmicon; pages: DocPage[] };
export type DocNavPage = DocPage & { sectionTitle: string; sectionIcon: IAmicon };

export const DOC_NAV: DocSection[] = [
  {
    title: "Introduction",
    icon: aiAmicons,
    pages: [
      { title: "About", path: "/neo/documentation/about", icon: aiAmicons },
      { title: "Installation", path: "/neo/documentation/installation", icon: aiFlag },
    ],
  },
  {
    title: "React component",
    icon: aiReact,
    pages: [
      { title: "Spin", path: "/neo/documentation/spin", icon: aiSpinner },
      { title: "Bounce", path: "/neo/documentation/bounce", icon: aiArrowUp },
      { title: "Rotate", path: "/neo/documentation/rotate", icon: aiArrowRotateRight },
      { title: "Flip", path: "/neo/documentation/flip", icon: aiArrowsDownLeftRightUpCenter },
      { title: "Beat", path: "/neo/documentation/beat", icon: aiHeart },
      { title: "Fade", path: "/neo/documentation/fade", icon: aiCircleHalfInner },
    ],
  },
];

export const DOC_PAGES: DocNavPage[] = DOC_NAV.flatMap((section) =>
  section.pages.map((page) => ({
    ...page,
    sectionTitle: section.title,
    sectionIcon: section.icon,
  })),
);
