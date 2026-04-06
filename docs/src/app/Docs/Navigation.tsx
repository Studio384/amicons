import { Fragment } from "react";
import { NavLink, useLocation } from "react-router";

import Amicon, {
  aiAmicons,
  aiArrowRotateRight,
  aiArrowsDownLeftRightUpCenter,
  aiArrowUp,
  aiCircleHalfInner,
  aiFlag,
  aiHeart,
  aiReact,
  aiSpinner,
  aiStar,
} from "@studio384/amicons";
import clsx from "clsx";

export default function DocsNavigation() {
  const location = useLocation();

  const pages = [
    {
      title: "Introduction",
      icon: aiAmicons,
      pages: [
        {
          title: "About",
          icon: aiAmicons,
          link: "/docs/about",
        },
        {
          title: "Installation",
          icon: aiFlag,
          link: "/docs/installation",
        },
        {
          title: "Releases",
          icon: aiStar,
          link: "/releases",
        },
      ],
    },
    {
      title: "React component",
      icon: aiReact,
      pages: [
        {
          title: "Spin",
          icon: aiSpinner,
          link: "/docs/spin",
        },
        {
          title: "Bounce",
          icon: aiArrowUp,
          link: "/docs/bounce",
        },
        {
          title: "Rotate",
          icon: aiArrowRotateRight,
          link: "/docs/rotate",
        },
        {
          title: "Flip",
          icon: aiArrowsDownLeftRightUpCenter,
          link: "/docs/flip",
        },
        {
          title: "Beat",
          icon: aiHeart,
          link: "/docs/beat",
        },
        {
          title: "Fade",
          icon: aiCircleHalfInner,
          link: "/docs/fade",
        },
      ],
    },
  ];

  return (
    <>
      {pages.map((category, key) => (
        <Fragment key={key}>
          <h3 className="font-display text-md mb-2 flex items-center gap-2 px-2.5 font-medium not-first:mt-4">
            <Amicon icon={category.icon} /> <span>{category.title}</span>
          </h3>
          <div className="flex flex-col gap-0.5">
            {category.pages.map((page) => (
              <NavLink
                key={page.link}
                to={page.link}
                data-selected={location.pathname.includes(page.link) || undefined}
                className={clsx(
                  "group flex h-8 items-center gap-2 rounded-sm px-2.5 text-start text-sm hover:cursor-pointer hover:bg-violet-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500 data-selected:focus-visible:outline-violet-700 dark:hover:bg-violet-800",
                  {
                    "bg-violet-500 text-white hover:bg-violet-600 dark:bg-violet-800":
                      location.pathname.includes(page.link),
                  },
                )}
              >
                <span className="truncate group-data-noicons:opacity-50">{page.title}</span>
              </NavLink>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
}
