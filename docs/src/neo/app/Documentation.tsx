import { Outlet, Link, useLocation } from "react-router";

import { Separator } from "@base-ui/react";
import Amicon, { aiBook, aiArrowLeft, aiArrowRight } from "@studio384/amicons";

import { cn } from "@/utils/cn";

import PageHeader from "../design/blocks/PageHeader";
import { DOC_PAGES } from "./docs/navigation";

export default function NeoDocumentation() {
  const location = useLocation();
  const currentPage = DOC_PAGES.find((page) => page.path === location.pathname);
  const currentIndex = DOC_PAGES.findIndex((page) => page.path === location.pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? DOC_PAGES[currentIndex - 1] : null;
  const next = currentIndex < DOC_PAGES.length - 1 ? DOC_PAGES[currentIndex + 1] : null;

  return (
    <>
      <PageHeader
        icon={currentPage?.icon ?? aiBook}
        title={currentPage?.title ?? "Documentation"}
        subtitle={currentPage?.sectionTitle ?? "Documentation"}
      />

      <div className="flex flex-col gap-4 p-4">
        <article className="neo-docs neo-doc-page container mx-auto max-w-4xl">
          <Outlet />
        </article>

        <Separator
          orientation="horizontal"
          className="container mx-auto h-px max-w-4xl bg-zinc-950/5 dark:bg-zinc-950/10"
        />

        <div className="container mx-auto max-w-4xl">
          <nav className="@xl2/main:grid-cols-3 grid grid-cols-1 grid-rows-2 gap-1 @md/main:grid-cols-2 @md/main:grid-rows-1">
            {prev && (
              <Link
                to={prev.path}
                className={cn(
                  "group grid grid-cols-[min-content_auto] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
                  "col-start-1 hover:bg-violet-600 hover:text-white hover:shadow-sm",
                )}
              >
                <Amicon
                  icon={aiArrowLeft}
                  className="mt-1 text-sm text-zinc-500 duration-150! group-hover:text-white/75"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">
                    {prev.sectionTitle}
                  </span>
                  <span className="font-display my-1 text-xl/5 font-medium">{prev.title}</span>
                </div>
              </Link>
            )}
            {next && (
              <Link
                to={next.path}
                className={cn(
                  "group grid grid-cols-[auto_min-content] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
                  "@xl2/main:col-start-3 hover:bg-violet-600 hover:text-white hover:shadow-sm @md/main:col-start-2",
                )}
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">
                    {next.sectionTitle}
                  </span>
                  <span className="font-display my-1 text-end text-xl/5 font-medium">{next.title}</span>
                </div>
                <Amicon
                  icon={aiArrowRight}
                  className="mt-1 text-sm text-zinc-500 duration-150! group-hover:text-white/75"
                />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
